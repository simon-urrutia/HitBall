const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Constantes de la cancha (idénticas al cliente)
const W = 960;
const H = 560;
const WIN_SCORE = 10;
const PADDLE_W = 16;
const PADDLE_H = 104;
const PADDLE_MARGIN = 28;
const BASE_BALL_SPEED = 430;

const queues = {
  ranked: [],
  informal: []
};

const rooms = new Map();

function getSpeedMultiplier(rally) {
  if (rally >= 40) return 5.0;
  if (rally >= 30) return 4.0;
  if (rally >= 20) return 3.0;
  if (rally >= 10) return 2.0;
  if (rally >= 5)  return 1.5;
  return 1.0;
}

function createRoom(p1, p2, mode) {
  const roomId = `room_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  p1.socket.join(roomId);
  p2.socket.join(roomId);

  const room = {
    id: roomId,
    mode,
    players: {
      left:  { socket: p1.socket, skin: p1.skin, rankName: p1.rankName, y: H / 2 - PADDLE_H / 2 },
      right: { socket: p2.socket, skin: p2.skin, rankName: p2.rankName, y: H / 2 - PADDLE_H / 2 }
    },
    ball: { x: W / 2, y: H / 2, vx: 0, vy: 0, radius: 11 },
    scores: { left: 0, right: 0 },
    rally: 0,
    critStreak: 0,
    waitingServe: true,
    matchOver: false,
    interval: null
  };

  rooms.set(roomId, room);
  p1.socket.roomId = roomId;
  p1.socket.side = 'left';
  p2.socket.roomId = roomId;
  p2.socket.side = 'right';

  p1.socket.emit('match_found', {
    side: 'left',
    mode,
    leftSkin: p1.skin,
    rightSkin: p2.skin,
    leftRank: p1.rankName,
    rightRank: p2.rankName
  });

  p2.socket.emit('match_found', {
    side: 'right',
    mode,
    leftSkin: p1.skin,
    rightSkin: p2.skin,
    leftRank: p1.rankName,
    rightRank: p2.rankName
  });

  let lastTime = Date.now();
  room.interval = setInterval(() => {
    const now = Date.now();
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    updateRoom(room, dt);
  }, 1000 / 60);
}

function resetRoomBall(room) {
  room.ball.x = W / 2;
  room.ball.y = H / 2;
  room.ball.vx = 0;
  room.ball.vy = 0;
  room.rally = 0;
  room.critStreak = 0;
  room.waitingServe = true;
}

function updateRoom(room, dt) {
  if (room.matchOver) return;

  // Mover pelota y chequear colisiones
  if (!room.waitingServe) {
    const ball = room.ball;
    const speedMag = Math.hypot(ball.vx, ball.vy);
    const steps = Math.max(1, Math.ceil((speedMag * dt) / 6));
    const subDt = dt / steps;

    for (let s = 0; s < steps; s++) {
      ball.x += ball.vx * subDt;
      ball.y += ball.vy * subDt;

      // Techo y piso
      if (ball.y - ball.radius <= 0) {
        ball.y = ball.radius;
        ball.vy = Math.abs(ball.vy);
        io.to(room.id).emit('game_event', { type: 'wall' });
      } else if (ball.y + ball.radius >= H) {
        ball.y = H - ball.radius;
        ball.vy = -Math.abs(ball.vy);
        io.to(room.id).emit('game_event', { type: 'wall' });
      }

      // Colisión con barras
      const leftX = PADDLE_MARGIN;
      const rightX = W - PADDLE_MARGIN - PADDLE_W;

      let hitSide = null;
      if (
        ball.vx < 0 &&
        ball.x - ball.radius <= leftX + PADDLE_W &&
        ball.x + ball.radius >= leftX &&
        ball.y + ball.radius >= room.players.left.y &&
        ball.y - ball.radius <= room.players.left.y + PADDLE_H
      ) {
        hitSide = 'left';
      } else if (
        ball.vx > 0 &&
        ball.x + ball.radius >= rightX &&
        ball.x - ball.radius <= rightX + PADDLE_W &&
        ball.y + ball.radius >= room.players.right.y &&
        ball.y - ball.radius <= room.players.right.y + PADDLE_H
      ) {
        hitSide = 'right';
      }

      if (hitSide) {
        const pl = room.players[hitSide];
        room.rally++;
        const hitPos = (ball.y - (pl.y + PADDLE_H / 2)) / (PADDLE_H / 2);
        const bounceAngle = Math.max(-1, Math.min(1, hitPos)) * 0.95;
        const speed = BASE_BALL_SPEED * getSpeedMultiplier(room.rally);

        if (hitSide === 'left') {
          ball.x = leftX + PADDLE_W + ball.radius;
          ball.vx = Math.cos(bounceAngle) * speed;
        } else {
          ball.x = rightX - ball.radius;
          ball.vx = -Math.cos(bounceAngle) * speed;
        }
        ball.vy = Math.sin(bounceAngle) * speed;

        // Chequeo de CRÍTICO
        const targetX = hitSide === 'left'
          ? (W - PADDLE_MARGIN - PADDLE_W - ball.radius)
          : (PADDLE_MARGIN + PADDLE_W + ball.radius);
        const t = (targetX - ball.x) / ball.vx;
        const projectedY = ball.y + ball.vy * t;
        const isCrit = projectedY > ball.radius && projectedY < H - ball.radius;

        if (isCrit) {
          room.critStreak++;
        } else {
          room.critStreak = 0;
        }

        io.to(room.id).emit('game_event', {
          type: 'hit',
          side: hitSide,
          x: ball.x,
          y: ball.y,
          rally: room.rally,
          isCrit,
          critStreak: room.critStreak
        });
        break;
      }

      // Goles
      if (ball.x + ball.radius < 0) {
        room.scores.right++;
        io.to(room.id).emit('game_event', { type: 'goal' });
        if (room.scores.right >= WIN_SCORE) {
          finishRoom(room, 'right');
        } else {
          resetRoomBall(room);
        }
        break;
      } else if (ball.x - ball.radius > W) {
        room.scores.left++;
        io.to(room.id).emit('game_event', { type: 'goal' });
        if (room.scores.left >= WIN_SCORE) {
          finishRoom(room, 'left');
        } else {
          resetRoomBall(room);
        }
        break;
      }
    }
  }

  // Enviar estado sincronizado a ambos jugadores
  io.to(room.id).emit('game_state', {
    ball: { x: room.ball.x, y: room.ball.y, vx: room.ball.vx, vy: room.ball.vy },
    leftY: room.players.left.y,
    rightY: room.players.right.y,
    scoreLeft: room.scores.left,
    scoreRight: room.scores.right,
    rally: room.rally,
    waitingServe: room.waitingServe
  });
}

function finishRoom(room, winnerSide, reason = 'score') {
  if (room.matchOver) return;
  room.matchOver = true;
  clearInterval(room.interval);

  io.to(room.id).emit('match_over', {
    winnerSide,
    scoreLeft: room.scores.left,
    scoreRight: room.scores.right,
    reason
  });

  delete room.players.left.socket.roomId;
  delete room.players.right.socket.roomId;
  rooms.delete(room.id);
}

function removeFromQueues(socketId) {
  queues.ranked = queues.ranked.filter((p) => p.socket.id !== socketId);
  queues.informal = queues.informal.filter((p) => p.socket.id !== socketId);
}

io.on('connection', (socket) => {
  console.log(`🟢 Conectado: ${socket.id}`);

  socket.on('join_queue', ({ mode, skin, rankName }) => {
    removeFromQueues(socket.id);
    const q = mode === 'ranked' ? queues.ranked : queues.informal;
    q.push({ socket, skin: skin || 'classic', rankName: rankName || 'Clásico' });

    if (q.length >= 2) {
      const p1 = q.shift();
      const p2 = q.shift();
      createRoom(p1, p2, mode);
    }
  });

  socket.on('leave_queue', () => {
    removeFromQueues(socket.id);
  });

  socket.on('paddle_move', (y) => {
    const room = rooms.get(socket.roomId);
    if (!room || !socket.side || typeof y !== 'number') return;
    room.players[socket.side].y = Math.max(8, Math.min(H - PADDLE_H - 8, y));
  });

  socket.on('launch_ball', () => {
    const room = rooms.get(socket.roomId);
    if (!room || !room.waitingServe || room.matchOver) return;
    room.waitingServe = false;
    const dirX = Math.random() < 0.5 ? -1 : 1;
    const angle = Math.random() * 0.9 - 0.45;
    const speed = BASE_BALL_SPEED * getSpeedMultiplier(room.rally);
    room.ball.vx = Math.cos(angle) * speed * dirX;
    room.ball.vy = Math.sin(angle) * speed;
  });

  socket.on('leave_match', () => {
    const room = rooms.get(socket.roomId);
    if (room && socket.side) {
      const winnerSide = socket.side === 'left' ? 'right' : 'left';
      finishRoom(room, winnerSide, 'disconnect');
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Desconectado: ${socket.id}`);
    removeFromQueues(socket.id);
    const room = rooms.get(socket.roomId);
    if (room && socket.side) {
      const winnerSide = socket.side === 'left' ? 'right' : 'left';
      finishRoom(room, winnerSide, 'disconnect');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor de HitBall corriendo en http://localhost:${PORT}`);
});