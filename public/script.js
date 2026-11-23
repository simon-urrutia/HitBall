// =========================================================
// REFERENCIAS AL DOM Y CONEXIÓN SOCKET.IO
// =========================================================
const socket = typeof io !== 'undefined' ? io() : null;

const menusWrapper = document.getElementById('menus-wrapper');
const mainMenu = document.getElementById('main-menu');
const informalMenu = document.getElementById('informal-menu');
const skinMenu = document.getElementById('skin-menu');
const queueCard = document.getElementById('queue-card');
const queueTitle = document.getElementById('queue-title');
const btnCancelQueue = document.getElementById('btn-cancel-queue');
const gameScreen = document.getElementById('game-screen');

const profileRankName = document.getElementById('profile-rank-name');
const profileRankBar = document.getElementById('profile-rank-bar');
const profileRp = document.getElementById('profile-rp');
const profileNextRank = document.getElementById('profile-next-rank');

const btnRanked = document.getElementById('btn-ranked');
const btnInformal = document.getElementById('btn-informal');
const btnInformalBack = document.getElementById('btn-informal-back');

const btnOnlineInformal = document.getElementById('btn-online-informal');
const btnFriends = document.getElementById('btn-friends');
const btnAI = document.getElementById('btn-ai');
const btn2v2Friends = document.getElementById('btn-2v2-friends');
const btn2v2AI = document.getElementById('btn-2v2-ai');
const btnBack = document.getElementById('btn-back');
const btnStartMatch = document.getElementById('btn-start-match');
const btnExitGame = document.getElementById('btn-exit-game');

const skinModeTitle = document.getElementById('skin-mode-title');
const skinSubtitle = document.getElementById('skin-subtitle');
const difficultyBox = document.getElementById('difficulty-box');
const difficultyOptions = document.getElementById('difficulty-options');
const selectorsContainer = document.getElementById('selectors-container');

const p1Label = document.getElementById('p1-label');
const p2Label = document.getElementById('p2-label');
const p3Label = document.getElementById('p3-label');
const p4Label = document.getElementById('p4-label');

const p2Box = document.getElementById('p2-box');
const p3Box = document.getElementById('p3-box');
const p4Box = document.getElementById('p4-box');

const p1Preview = document.getElementById('p1-preview');
const p2Preview = document.getElementById('p2-preview');
const p3Preview = document.getElementById('p3-preview');
const p4Preview = document.getElementById('p4-preview');

const p1Options = document.getElementById('p1-options');
const p2Options = document.getElementById('p2-options');
const p3Options = document.getElementById('p3-options');
const p4Options = document.getElementById('p4-options');

const hudP1Name = document.getElementById('hud-p1-name');
const hudP2Name = document.getElementById('hud-p2-name');
const scoreP1El = document.getElementById('score-p1');
const scoreP2El = document.getElementById('score-p2');
const rallyBadge = document.getElementById('rally-badge');
const speedBadge = document.getElementById('speed-badge');
const servePrompt = document.getElementById('serve-prompt');
const gameControlsHint = document.getElementById('game-controls-hint');

const winOverlay = document.getElementById('win-overlay');
const winTitle = document.getElementById('win-title');
const winScore = document.getElementById('win-score');
const rankedResultBox = document.getElementById('ranked-result-box');
const rankedRpDelta = document.getElementById('ranked-rp-delta');
const rankedCurrentInfo = document.getElementById('ranked-current-info');
const rankedUnlockAlert = document.getElementById('ranked-unlock-alert');
const btnRematch = document.getElementById('btn-rematch');
const btnWinMenu = document.getElementById('btn-win-menu');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// =========================================================
// SISTEMA DE RANGOS Y SKINS VINCULADAS
// =========================================================
const RANKS = [
  { name: 'Clásico',    minRp: 0,    skinId: 'classic',   color: '#ffffff' },
  { name: 'Neón',       minRp: 100,  skinId: 'neon',      color: '#e879f9' },
  { name: 'Fuego',      minRp: 250,  skinId: 'fire',      color: '#f97316' },
  { name: 'Hielo',      minRp: 450,  skinId: 'ice',       color: '#38bdf8' },
  { name: 'Tóxico',     minRp: 700,  skinId: 'toxic',     color: '#4ade80' },
  { name: 'Multicolor', minRp: 1000, skinId: 'rainbow',   color: '#ec4899' },
  { name: 'Galáctico',  minRp: 1350, skinId: 'galaxy',    color: '#a78bfa' },
  { name: 'Atardecer',  minRp: 1750, skinId: 'sunset',    color: '#fb7185' },
  { name: 'Cyberpunk',  minRp: 2200, skinId: 'cyberpunk', color: '#22d3ee' },
  { name: 'Dorado',     minRp: 2700, skinId: 'gold',      color: '#facc15' }
];

const SKINS = [
  { id: 'classic',   name: 'Clásica',   className: 'skin-classic',   colors: ['#ffffff', '#e2e8f0'], glow: '#ffffff' },
  { id: 'neon',      name: 'Neón',      className: 'skin-neon',      colors: ['#e879f9', '#8b5cf6'], glow: '#d946ef' },
  { id: 'fire',      name: 'Fuego',     className: 'skin-fire',      colors: ['#fde047', '#f97316', '#dc2626'], glow: '#f97316' },
  { id: 'ice',       name: 'Hielo',     className: 'skin-ice',       colors: ['#e0f2fe', '#38bdf8', '#2563eb'], glow: '#38bdf8' },
  { id: 'toxic',     name: 'Tóxica',    className: 'skin-toxic',     colors: ['#bef264', '#22c55e', '#15803d'], glow: '#22c55e' },
  { id: 'rainbow',   name: 'Arcoíris',  className: 'skin-rainbow',   colors: ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6', '#a855f7'], glow: '#ec4899' },
  { id: 'galaxy',    name: 'Galaxia',   className: 'skin-galaxy',    colors: ['#1e1b4b', '#7c3aed', '#ec4899', '#38bdf8'], glow: '#8b5cf6' },
  { id: 'sunset',    name: 'Atardecer', className: 'skin-sunset',    colors: ['#fef08a', '#fb7185', '#c026d3', '#4c1d95'], glow: '#fb7185' },
  { id: 'cyberpunk', name: 'Cyberpunk', className: 'skin-cyberpunk', colors: ['#22d3ee', '#facc15', '#f43f5e'], glow: '#22d3ee' },
  { id: 'gold',      name: 'Dorado',    className: 'skin-gold',      colors: ['#fef9c3', '#facc15', '#b45309', '#fde047'], glow: '#facc15' }
];

const DIFFICULTIES = [
  { id: 'easy',       name: 'Fácil' },
  { id: 'medium',     name: 'Medio' },
  { id: 'hard',       name: 'Difícil' },
  { id: 'impossible', name: 'Imposible' }
];

const PROFILE_KEY = 'hitball_profile_v1';
let profile = { rp: 0, maxRankIndex: 0 };

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (saved && typeof saved.rp === 'number') {
      profile.rp = Math.max(0, saved.rp);
      profile.maxRankIndex = Math.max(0, Math.min(RANKS.length - 1, saved.maxRankIndex || 0));
    }
  } catch (_) {}
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getRankIndexFromRp(rp) {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (rp >= RANKS[i].minRp) idx = i;
  }
  return idx;
}

function isSkinUnlocked(skinId) {
  const rankIdx = RANKS.findIndex((r) => r.skinId === skinId);
  return rankIdx <= profile.maxRankIndex;
}

function updateProfileCard() {
  const idx = getRankIndexFromRp(profile.rp);
  const current = RANKS[idx];
  const next = RANKS[idx + 1];

  profileRankName.textContent = current.name;
  profileRankName.style.color = current.color;
  profileRp.textContent = `${profile.rp.toLocaleString('es-AR')} RP`;

  if (next) {
    const span = next.minRp - current.minRp;
    const pct = Math.min(100, Math.max(0, ((profile.rp - current.minRp) / span) * 100));
    profileRankBar.style.width = `${pct}%`;
    profileNextRank.textContent = `Siguiente: ${next.name} (${next.minRp.toLocaleString('es-AR')} RP)`;
  } else {
    profileRankBar.style.width = '100%';
    profileNextRank.textContent = '¡Rango Máximo!';
  }
}

let gameMode = 'ranked'; // 'ranked', 'online_informal', 'friends', 'ai', '2v2_friends', '2v2_ai'
let aiDifficulty = 'medium';
let isOnlineMatch = false;
let myOnlineSide = 'left';
let lastSentInput = 0;
const selectedSkins = { p1: 'classic', p2: 'classic', p3: 'classic', p4: 'classic' };

// =========================================================
// AUDIO SINTETIZADO
// =========================================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function playPaddleHitSound(rallyCount) {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const baseFreq = 260 + Math.min(rallyCount, 30) * 18;

  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(baseFreq * 1.35, now);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, now + 0.09);
  gain1.gain.setValueAtTime(0.24, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start(now);
  osc1.stop(now + 0.11);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(baseFreq * 2.1, now);
  osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.06);
  gain2.gain.setValueAtTime(0.14, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now);
  osc2.stop(now + 0.07);
}

function playCritGlassSound(streak) {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const pitchBoost = 1 + Math.min(streak - 1, 8) * 0.07;

  const bufferSize = Math.floor(audioCtx.sampleRate * 0.16);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.2);
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(3200, now);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.22, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noise.start(now);

  const shardFreqs = [2100, 2850, 3420, 4180, 4950, 5600];
  shardFreqs.forEach((f, idx) => {
    const start = now + idx * 0.018 + Math.random() * 0.012;
    const dur = 0.08 + Math.random() * 0.11;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(f * pitchBoost, start);
    osc.frequency.exponentialRampToValueAtTime(f * pitchBoost * 0.86, start + dur);
    gain.gain.setValueAtTime(0.11, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + dur);
  });
}

function playWallSound() {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(190, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.07);
}

function playGoalSound() {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [330, 440, 587].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.07);
    gain.gain.setValueAtTime(0.14, now + i * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.16);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.17);
  });
}

// =========================================================
// MENÚS Y MATCHMAKING ONLINE
// =========================================================
function openSkinMenu(mode) {
  initAudio();
  gameMode = mode;
  mainMenu.classList.add('hidden');
  informalMenu.classList.add('hidden');
  queueCard.classList.add('hidden');
  skinMenu.classList.remove('hidden');

  p2Box.classList.add('hidden');
  p3Box.classList.add('hidden');
  p4Box.classList.add('hidden');
  difficultyBox.classList.add('hidden');
  selectorsContainer.classList.remove('single');

  if (mode === 'ranked') {
    const curRank = RANKS[getRankIndexFromRp(profile.rp)];
    skinModeTitle.textContent = `🏆 Ranked Online · ${curRank.name}`;
    skinSubtitle.textContent = 'Victoria: +25 RP · Derrota: -15 RP · Jugás contra otro jugador real';
    p1Label.textContent = 'Tu Barra (W / S o ↑ / ↓)';
    selectorsContainer.classList.add('single');
    btnStartMatch.textContent = 'Buscar Rival Online';
  } else if (mode === 'online_informal') {
    skinModeTitle.textContent = '🌐 1 vs 1 · Online Informal';
    skinSubtitle.textContent = 'Partida online sin arriesgar puntos de rango';
    p1Label.textContent = 'Tu Barra (W / S o ↑ / ↓)';
    selectorsContainer.classList.add('single');
    btnStartMatch.textContent = 'Buscar Rival Online';
  } else {
    btnStartMatch.textContent = '¡Empezar!';
    skinSubtitle.textContent = 'Desbloqueá más barras subiendo de rango en Ranked';
    if (mode === 'friends') {
      skinModeTitle.textContent = '1 vs 1 · Local con amigos';
      p1Label.textContent = 'Jugador 1 (W / S)';
      p2Label.textContent = 'Jugador 2 (↑ / ↓)';
      p2Box.classList.remove('hidden');
    } else if (mode === 'ai') {
      skinModeTitle.textContent = '1 vs 1 · Contra la IA';
      p1Label.textContent = 'Tu Barra (W / S o ↑ / ↓)';
      difficultyBox.classList.remove('hidden');
      selectorsContainer.classList.add('single');
      renderDifficultyOptions();
    } else if (mode === '2v2_ai') {
      skinModeTitle.textContent = '2 vs 2 · Amigos vs IA';
      p1Label.textContent = 'Jugador 1 · Arquero (W / S)';
      p2Label.textContent = 'Jugador 2 · Delantero (↑ / ↓)';
      p2Box.classList.remove('hidden');
      difficultyBox.classList.remove('hidden');
      renderDifficultyOptions();
    } else if (mode === '2v2_friends') {
      skinModeTitle.textContent = '2 vs 2 · Amigos vs Amigos';
      p1Label.textContent = 'Eq. 1 · Arquero (W / S)';
      p2Label.textContent = 'Eq. 1 · Delantero (T / G)';
      p3Label.textContent = 'Eq. 2 · Delantero (I / K)';
      p4Label.textContent = 'Eq. 2 · Arquero (↑ / ↓)';
      p2Box.classList.remove('hidden');
      p3Box.classList.remove('hidden');
      p4Box.classList.remove('hidden');
    }
  }

  ['p1', 'p2', 'p3', 'p4'].forEach((k) => {
    if (!isSkinUnlocked(selectedSkins[k])) selectedSkins[k] = 'classic';
  });

  renderSkinOptions('p1', p1Options, p1Preview);
  renderSkinOptions('p2', p2Options, p2Preview);
  renderSkinOptions('p3', p3Options, p3Preview);
  renderSkinOptions('p4', p4Options, p4Preview);
}

function renderDifficultyOptions() {
  difficultyOptions.innerHTML = '';
  DIFFICULTIES.forEach((diff) => {
    const btn = document.createElement('button');
    btn.className = 'diff-btn ' + diff.id + (aiDifficulty === diff.id ? ' active' : '');
    btn.textContent = diff.name;
    btn.addEventListener('click', () => {
      aiDifficulty = diff.id;
      renderDifficultyOptions();
    });
    difficultyOptions.appendChild(btn);
  });
}

function renderSkinOptions(playerKey, container, previewEl) {
  container.innerHTML = '';
  SKINS.forEach((skin, idx) => {
    const unlocked = isSkinUnlocked(skin.id);
    const reqRank = RANKS[idx];
    const btn = document.createElement('button');
    btn.className = 'skin-btn' +
      (selectedSkins[playerKey] === skin.id ? ' active' : '') +
      (!unlocked ? ' locked' : '');
    btn.textContent = unlocked ? skin.name : `🔒 ${skin.name}`;
    btn.disabled = !unlocked;
    if (!unlocked) btn.title = `Desbloqueable en rango ${reqRank.name} (${reqRank.minRp} RP)`;

    btn.addEventListener('click', () => {
      if (!unlocked) return;
      selectedSkins[playerKey] = skin.id;
      previewEl.className = `paddle-preview ${skin.className}`;
      renderSkinOptions(playerKey, container, previewEl);
    });
    container.appendChild(btn);
  });

  const activeSkin = SKINS.find((s) => s.id === selectedSkins[playerKey]);
  previewEl.className = `paddle-preview ${activeSkin.className}`;
}

function enterOnlineQueue() {
  if (!socket) {
    alert('No se pudo conectar al servidor. Asegurate de abrir el juego en http://localhost:3000');
    return;
  }
  const curRank = RANKS[getRankIndexFromRp(profile.rp)].name;
  skinMenu.classList.add('hidden');
  queueCard.classList.remove('hidden');
  queueTitle.textContent = gameMode === 'ranked' ? '🏆 Buscando rival Ranked...' : '🌐 Buscando rival Informal...';

  socket.emit('join_queue', {
    mode: gameMode === 'ranked' ? 'ranked' : 'informal',
    skin: selectedSkins.p1,
    rankName: curRank
  });
}

function returnToMainMenu() {
  if (isOnlineMatch && socket && !matchOver) {
    socket.emit('leave_match');
  }
  if (socket) socket.emit('leave_queue');

  inGame = false;
  isOnlineMatch = false;
  matchOver = false;
  winOverlay.classList.add('hidden');
  gameScreen.classList.add('hidden');
  menusWrapper.classList.remove('hidden');
  skinMenu.classList.add('hidden');
  informalMenu.classList.add('hidden');
  queueCard.classList.add('hidden');
  mainMenu.classList.remove('hidden');
  updateProfileCard();
}

btnRanked.addEventListener('click', () => openSkinMenu('ranked'));
btnInformal.addEventListener('click', () => {
  initAudio();
  mainMenu.classList.add('hidden');
  informalMenu.classList.remove('hidden');
});
btnInformalBack.addEventListener('click', () => {
  informalMenu.classList.add('hidden');
  mainMenu.classList.remove('hidden');
});

btnOnlineInformal.addEventListener('click', () => openSkinMenu('online_informal'));
btnFriends.addEventListener('click', () => openSkinMenu('friends'));
btnAI.addEventListener('click', () => openSkinMenu('ai'));
btn2v2Friends.addEventListener('click', () => openSkinMenu('2v2_friends'));
btn2v2AI.addEventListener('click', () => openSkinMenu('2v2_ai'));

btnBack.addEventListener('click', () => {
  skinMenu.classList.add('hidden');
  if (gameMode === 'ranked') mainMenu.classList.remove('hidden');
  else informalMenu.classList.remove('hidden');
});

btnCancelQueue.addEventListener('click', () => {
  if (socket) socket.emit('leave_queue');
  queueCard.classList.add('hidden');
  skinMenu.classList.remove('hidden');
});

btnStartMatch.addEventListener('click', () => {
  btnStartMatch.blur();
  if (gameMode === 'ranked' || gameMode === 'online_informal') {
    enterOnlineQueue();
  } else {
    startLocalGame();
  }
});

btnExitGame.addEventListener('click', returnToMainMenu);
btnWinMenu.addEventListener('click', returnToMainMenu);
btnRematch.addEventListener('click', () => {
  btnRematch.blur();
  if (isOnlineMatch) {
    winOverlay.classList.add('hidden');
    gameScreen.classList.add('hidden');
    menusWrapper.classList.remove('hidden');
    enterOnlineQueue();
  } else {
    startLocalGame();
  }
});

// =========================================================
// EVENTOS DE SOCKET.IO (PARTIDA ONLINE EN TIEMPO REAL)
// =========================================================
if (socket) {
  socket.on('match_found', (data) => {
    initAudio();
    isOnlineMatch = true;
    myOnlineSide = data.side;
    gameMode = data.mode === 'ranked' ? 'ranked' : 'online_informal';

    menusWrapper.classList.add('hidden');
    queueCard.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    winOverlay.classList.add('hidden');

    matchOver = false;
    scoreP1 = 0;
    scoreP2 = 0;
    rally = 0;
    critStreak = 0;
    waitingServe = true;
    particles = [];
    critEffects = [];
    courtFlash.alpha = 0;
    critBanner.active = false;
    bgColor.r = 0; bgColor.g = 0; bgColor.b = 0;

    paddles = [
      { side: 'left',  x: PADDLE_MARGIN, y: H / 2 - 52, h: 104, skin: data.leftSkin, critTimer: 0 },
      { side: 'right', x: W - PADDLE_MARGIN - PADDLE_W, y: H / 2 - 52, h: 104, skin: data.rightSkin, critTimer: 0 }
    ];

    hudP1Name.textContent = (myOnlineSide === 'left' ? 'Vos' : 'Rival') + ` (${data.leftRank})`;
    hudP2Name.textContent = (myOnlineSide === 'right' ? 'Vos' : 'Rival') + ` (${data.rightRank})`;
    gameControlsHint.textContent =
      `ONLINE · Sos el lado ${myOnlineSide === 'left' ? 'IZQUIERDO' : 'DERECHO'} · Mover: W/S o ↑/↓ · Espacio: Lanzar`;

    btnRematch.textContent = 'Buscar otro rival';
    updateGameHUD();
    inGame = true;
  });

  socket.on('game_state', (state) => {
    if (!isOnlineMatch || !inGame) return;
    ball.x = state.ball.x;
    ball.y = state.ball.y;
    ball.vx = state.ball.vx;
    ball.vy = state.ball.vy;
    paddles[0].y = state.leftY;
    paddles[1].y = state.rightY;
    scoreP1 = state.scoreLeft;
    scoreP2 = state.scoreRight;
    rally = state.rally;
    waitingServe = state.waitingServe;
    updateGameHUD();
  });

  socket.on('game_event', (ev) => {
    if (!isOnlineMatch || !inGame) return;
    if (ev.type === 'wall') {
      playWallSound();
    } else if (ev.type === 'goal') {
      playGoalSound();
      particles = [];
      critEffects = [];
      critBanner.active = false;
    } else if (ev.type === 'hit') {
      const p = ev.side === 'left' ? paddles[0] : paddles[1];
      const skin = SKINS.find((sk) => sk.id === p.skin) || SKINS[0];
      playPaddleHitSound(ev.rally);
      spawnHitSparks(ev.x, ev.y, skin.glow);
      hitShake = ev.rally >= 20 ? 9 : ev.rally >= 10 ? 7 : ev.rally >= 5 ? 4 : 2;
      if (ev.isCrit) {
        triggerCritEffect(p, ev.critStreak);
      }
    }
  });

  socket.on('match_over', (data) => {
    if (!isOnlineMatch) return;
    scoreP1 = data.scoreLeft;
    scoreP2 = data.scoreRight;
    const iWon = data.winnerSide === myOnlineSide;
    const winnerText = iWon
      ? (data.reason === 'disconnect' ? 'Vos (el rival salió)' : 'Vos')
      : 'el Rival';
    triggerWin(winnerText, iWon);
  });
}

// =========================================================
// LÓGICA DE LA CANCHA Y SISTEMA DE CRÍTICOS
// =========================================================
const W = canvas.width;
const H = canvas.height;
const WIN_SCORE = 10;
const PADDLE_W = 16;
const PADDLE_MARGIN = 28;
const PADDLE_SPEED = 520;
const BASE_BALL_SPEED = 430;

let inGame = false;
let matchOver = false;
let waitingServe = true;
let scoreP1 = 0;
let scoreP2 = 0;
let rally = 0;
let critStreak = 0;
let hitShake = 0;

const keys = {};
let particles = [];
let critEffects = [];
let paddles = [];
const bgColor = { r: 0, g: 0, b: 0 };

const courtFlash = { alpha: 0, color: '#fde047' };
const critBanner = { active: false, text: '', color: '#ffffff', timer: 0, maxTime: 1.75 };
const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0, radius: 11 };

function setupLocalPaddles() {
  const is2v2 = gameMode === '2v2_ai' || gameMode === '2v2_friends';
  const h = is2v2 ? 86 : 104;
  const aiSkinBack = aiDifficulty === 'impossible' ? 'fire' : 'neon';
  const aiSkinFront = aiDifficulty === 'impossible' ? 'gold' : 'cyberpunk';

  if (gameMode === 'friends') {
    paddles = [
      { side: 'left',  control: 'ws',     x: PADDLE_MARGIN, y: H / 2 - h / 2, h, skin: selectedSkins.p1, critTimer: 0 },
      { side: 'right', control: 'arrows', x: W - PADDLE_MARGIN - PADDLE_W, y: H / 2 - h / 2, h, skin: selectedSkins.p2, critTimer: 0 }
    ];
  } else if (gameMode === 'ai') {
    paddles = [
      { side: 'left',  control: 'solo', x: PADDLE_MARGIN, y: H / 2 - h / 2, h, skin: selectedSkins.p1, critTimer: 0 },
      { side: 'right', control: 'ai', role: 'back', x: W - PADDLE_MARGIN - PADDLE_W, y: H / 2 - h / 2, h, skin: aiSkinBack, critTimer: 0 }
    ];
  } else if (gameMode === '2v2_ai') {
    paddles = [
      { side: 'left',  control: 'ws',     x: PADDLE_MARGIN, y: H / 2 - h / 2, h, skin: selectedSkins.p1, critTimer: 0 },
      { side: 'left',  control: 'arrows', x: PADDLE_MARGIN + 150, y: H / 2 - h / 2, h, skin: selectedSkins.p2, critTimer: 0 },
      { side: 'right', control: 'ai', role: 'front', x: W - PADDLE_MARGIN - PADDLE_W - 150, y: H / 2 - h / 2, h, skin: aiSkinFront, critTimer: 0 },
      { side: 'right', control: 'ai', role: 'back',  x: W - PADDLE_MARGIN - PADDLE_W, y: H / 2 - h / 2, h, skin: aiSkinBack, critTimer: 0 }
    ];
  } else if (gameMode === '2v2_friends') {
    paddles = [
      { side: 'left',  control: 'ws',     x: PADDLE_MARGIN, y: H / 2 - h / 2, h, skin: selectedSkins.p1, critTimer: 0 },
      { side: 'left',  control: 'tg',     x: PADDLE_MARGIN + 150, y: H / 2 - h / 2, h, skin: selectedSkins.p2, critTimer: 0 },
      { side: 'right', control: 'ik',     x: W - PADDLE_MARGIN - PADDLE_W - 150, y: H / 2 - h / 2, h, skin: selectedSkins.p3, critTimer: 0 },
      { side: 'right', control: 'arrows', x: W - PADDLE_MARGIN - PADDLE_W, y: H / 2 - h / 2, h, skin: selectedSkins.p4, critTimer: 0 }
    ];
  }
}

function willReachRivalWithoutWall(hitPaddle) {
  const targetX = hitPaddle.side === 'left'
    ? (W - PADDLE_MARGIN - PADDLE_W - ball.radius)
    : (PADDLE_MARGIN + PADDLE_W + ball.radius);
  const dx = targetX - ball.x;
  if ((dx > 0 && ball.vx <= 0) || (dx < 0 && ball.vx >= 0)) return false;
  const t = dx / ball.vx;
  const projectedY = ball.y + ball.vy * t;
  return projectedY > ball.radius && projectedY < H - ball.radius;
}

function triggerCritEffect(paddle, streak) {
  const skin = SKINS.find((s) => s.id === paddle.skin) || SKINS[0];
  const cx = paddle.x + PADDLE_W / 2;
  const cy = paddle.y + paddle.h / 2;
  const dir = paddle.side === 'left' ? 1 : -1;

  paddle.critTimer = 0.65;
  playCritGlassSound(streak);

  critBanner.active = true;
  critBanner.text = streak > 1 ? `CRÍTICO x${streak}` : 'CRÍTICO';
  critBanner.color = skin.glow;
  critBanner.timer = critBanner.maxTime;

  switch (paddle.skin) {
    case 'classic':
      for (let i = 0; i < 2; i++) {
        critEffects.push({
          type: 'ring', x: cx, y: cy, radius: 14 + i * 16, maxRadius: 110 + i * 35,
          color: '#ffffff', life: 0.55 + i * 0.12, maxLife: 0.55 + i * 0.12
        });
      }
      break;
    case 'neon':
      for (let i = 0; i < 6; i++) {
        const pts = [];
        let px = cx, py = paddle.y + Math.random() * paddle.h;
        pts.push({ x: px, y: py });
        for (let seg = 0; seg < 4; seg++) {
          px += dir * (14 + Math.random() * 20);
          py += (Math.random() - 0.5) * 34;
          pts.push({ x: px, y: py });
        }
        critEffects.push({
          type: 'bolt', points: pts, color: i % 2 === 0 ? '#e879f9' : '#c084fc',
          life: 0.38 + Math.random() * 0.15, maxLife: 0.53
        });
      }
      break;
    case 'fire': {
      const fireCols = ['#ffffff', '#fde047', '#f97316', '#dc2626'];
      for (let i = 0; i < 26; i++) {
        critEffects.push({
          type: 'orb', x: cx + (Math.random() - 0.5) * 14, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (70 + Math.random() * 190), vy: -30 + (Math.random() - 0.5) * 130,
          size: 4 + Math.random() * 7, color: fireCols[Math.floor(Math.random() * fireCols.length)],
          life: 0.45 + Math.random() * 0.35, maxLife: 0.8
        });
      }
      break;
    }
    case 'ice': {
      const iceCols = ['#ffffff', '#e0f2fe', '#38bdf8', '#60a5fa'];
      for (let i = 0; i < 18; i++) {
        critEffects.push({
          type: 'shard', x: cx, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (60 + Math.random() * 170), vy: (Math.random() - 0.5) * 160,
          size: 5 + Math.random() * 7, rot: Math.random() * Math.PI, vrot: (Math.random() - 0.5) * 8,
          color: iceCols[Math.floor(Math.random() * iceCols.length)],
          life: 0.6 + Math.random() * 0.35, maxLife: 0.95
        });
      }
      break;
    }
    case 'toxic': {
      const toxCols = ['#bef264', '#4ade80', '#22c55e'];
      for (let i = 0; i < 20; i++) {
        critEffects.push({
          type: 'bubble', x: cx + (Math.random() - 0.5) * 26, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (25 + Math.random() * 90), vy: -(45 + Math.random() * 110),
          size: 4 + Math.random() * 7, color: toxCols[Math.floor(Math.random() * toxCols.length)],
          life: 0.65 + Math.random() * 0.4, maxLife: 1.05
        });
      }
      break;
    }
    case 'rainbow': {
      const rbCols = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
      critEffects.push({
        type: 'ring', x: cx, y: cy, radius: 12, maxRadius: 130,
        color: '#ec4899', life: 0.6, maxLife: 0.6
      });
      for (let i = 0; i < 20; i++) {
        critEffects.push({
          type: 'star', x: cx, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (60 + Math.random() * 180), vy: (Math.random() - 0.5) * 180,
          size: 6 + Math.random() * 6, rot: Math.random() * Math.PI, vrot: (Math.random() - 0.5) * 7,
          color: rbCols[i % rbCols.length], life: 0.65 + Math.random() * 0.35, maxLife: 1.0
        });
      }
      break;
    }
    case 'galaxy': {
      const galCols = ['#ffffff', '#e9d5ff', '#38bdf8', '#ec4899', '#a78bfa'];
      for (let i = 0; i < 24; i++) {
        critEffects.push({
          type: 'star', x: cx + (Math.random() - 0.5) * 18, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (40 + Math.random() * 155), vy: (Math.random() - 0.5) * 145,
          size: 5 + Math.random() * 8, rot: Math.random() * Math.PI, vrot: (Math.random() - 0.5) * 6,
          color: galCols[Math.floor(Math.random() * galCols.length)],
          life: 0.75 + Math.random() * 0.45, maxLife: 1.2
        });
      }
      break;
    }
    case 'sunset': {
      const sunCols = ['#fef08a', '#fb7185', '#f472b6', '#c026d3'];
      for (let i = 0; i < 20; i++) {
        critEffects.push({
          type: 'orb', x: cx, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (45 + Math.random() * 130), vy: (Math.random() - 0.5) * 130,
          size: 5 + Math.random() * 9, color: sunCols[Math.floor(Math.random() * sunCols.length)],
          life: 0.65 + Math.random() * 0.4, maxLife: 1.05
        });
      }
      break;
    }
    case 'cyberpunk': {
      const cybCols = ['#22d3ee', '#facc15', '#f43f5e'];
      for (let i = 0; i < 18; i++) {
        critEffects.push({
          type: 'glitch', x: cx + dir * (Math.random() * 75), y: paddle.y + Math.random() * paddle.h,
          vx: dir * (40 + Math.random() * 120), vy: (Math.random() - 0.5) * 40,
          w: 10 + Math.random() * 24, h: 3 + Math.random() * 6,
          color: cybCols[Math.floor(Math.random() * cybCols.length)],
          life: 0.35 + Math.random() * 0.25, maxLife: 0.6
        });
      }
      break;
    }
    case 'gold': {
      courtFlash.alpha = 0.42;
      courtFlash.color = '#fde047';
      const goldCols = ['#ffffff', '#fef08a', '#facc15', '#eab308'];
      for (let i = 0; i < 26; i++) {
        critEffects.push({
          type: 'star', x: cx, y: paddle.y + Math.random() * paddle.h,
          vx: dir * (70 + Math.random() * 210), vy: (Math.random() - 0.5) * 180,
          size: 6 + Math.random() * 8, rot: Math.random() * Math.PI, vrot: (Math.random() - 0.5) * 7,
          color: goldCols[Math.floor(Math.random() * goldCols.length)],
          life: 0.7 + Math.random() * 0.4, maxLife: 1.1
        });
      }
      break;
    }
  }
}

function getSpeedMultiplier() {
  if (rally >= 40) return 5.0;
  if (rally >= 30) return 4.0;
  if (rally >= 20) return 3.0;
  if (rally >= 10) return 2.0;
  if (rally >= 5)  return 1.5;
  return 1.0;
}

function getTargetBgColor() {
  if (rally >= 40) return { r: 120, g: 10, b: 20 };
  if (rally >= 30) return { r: 115, g: 20, b: 70 };
  if (rally >= 20) return { r: 88,  g: 12, b: 120 };
  if (rally >= 10) return { r: 58,  g: 12, b: 105 };
  if (rally >= 5)  return { r: 10,  g: 38, b: 96 };
  return { r: 0, g: 0, b: 0 };
}

function updateGameHUD() {
  scoreP1El.textContent = scoreP1;
  scoreP2El.textContent = scoreP2;
  const mult = getSpeedMultiplier();
  rallyBadge.textContent = `🔥 Racha: ${rally}`;
  speedBadge.textContent = `x${mult.toFixed(1)}`;
  speedBadge.style.color =
    rally >= 30 ? '#ef4444' :
    rally >= 20 ? '#f97316' :
    rally >= 10 ? '#e879f9' :
    rally >= 5  ? '#38bdf8' : '#facc15';
  servePrompt.classList.toggle('hidden', !waitingServe || matchOver);
}

function resetBall() {
  ball.x = W / 2;
  ball.y = H / 2;
  ball.vx = 0;
  ball.vy = 0;
  rally = 0;
  critStreak = 0;
  waitingServe = true;
  particles = [];
  critEffects = [];
  courtFlash.alpha = 0;
  critBanner.active = false;
  updateGameHUD();
}

function launchLocalBall() {
  if (!waitingServe || matchOver) return;
  initAudio();
  waitingServe = false;
  const dirX = Math.random() < 0.5 ? -1 : 1;
  const angle = Math.random() * 0.9 - 0.45;
  const speed = BASE_BALL_SPEED * getSpeedMultiplier();
  ball.vx = Math.cos(angle) * speed * dirX;
  ball.vy = Math.sin(angle) * speed;
  updateGameHUD();
}

function triggerWin(winnerName, playerWon) {
  matchOver = true;
  waitingServe = true;
  ball.vx = 0;
  ball.vy = 0;
  winTitle.textContent = `¡Ganó ${winnerName}!`;
  winScore.textContent = `${scoreP1} - ${scoreP2}`;

  if (gameMode === 'ranked') {
    const oldRankIdx = getRankIndexFromRp(profile.rp);
    const delta = playerWon ? 25 : -15;
    profile.rp = Math.max(0, profile.rp + delta);
    const newRankIdx = getRankIndexFromRp(profile.rp);

    let unlockedText = '';
    if (newRankIdx > profile.maxRankIndex) {
      profile.maxRankIndex = newRankIdx;
      const unlockedSkin = SKINS.find((s) => s.id === RANKS[newRankIdx].skinId);
      unlockedText = `🎉 ¡Ascendiste a ${RANKS[newRankIdx].name} y desbloqueaste la barra ${unlockedSkin.name}!`;
    } else if (newRankIdx > oldRankIdx) {
      unlockedText = `⬆️ ¡Volviste a subir a rango ${RANKS[newRankIdx].name}!`;
    }

    saveProfile();
    updateProfileCard();

    rankedResultBox.classList.remove('hidden');
    rankedRpDelta.textContent = delta > 0 ? `+${delta} RP` : `${delta} RP`;
    rankedRpDelta.className = 'rp-delta ' + (delta > 0 ? 'win' : 'loss');
    rankedCurrentInfo.textContent = `Rango: ${RANKS[newRankIdx].name} · ${profile.rp.toLocaleString('es-AR')} RP`;

    if (unlockedText) {
      rankedUnlockAlert.textContent = unlockedText;
      rankedUnlockAlert.classList.remove('hidden');
    } else {
      rankedUnlockAlert.classList.add('hidden');
    }
  } else {
    rankedResultBox.classList.add('hidden');
  }

  winOverlay.classList.remove('hidden');
  updateGameHUD();
}

function startLocalGame() {
  initAudio();
  isOnlineMatch = false;
  menusWrapper.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  winOverlay.classList.add('hidden');
  btnRematch.textContent = 'Revancha';

  matchOver = false;
  scoreP1 = 0;
  scoreP2 = 0;
  setupLocalPaddles();

  const diffLabel = DIFFICULTIES.find((d) => d.id === aiDifficulty).name;
  if (gameMode === 'friends') {
    hudP1Name.textContent = 'Jugador 1';
    hudP2Name.textContent = 'Jugador 2';
    gameControlsHint.textContent = 'J1: W / S · J2: Flechas ↑ / ↓ · Espacio: Lanzar · Gana el primero a 10';
  } else if (gameMode === 'ai') {
    hudP1Name.textContent = 'Vos';
    hudP2Name.textContent = `IA (${diffLabel})`;
    gameControlsHint.textContent = 'Mover: W / S o Flechas ↑ / ↓ · Espacio: Lanzar · Gana el primero a 10';
  } else if (gameMode === '2v2_ai') {
    hudP1Name.textContent = 'Equipo Amigos';
    hudP2Name.textContent = `Equipo IA (${diffLabel})`;
    gameControlsHint.textContent = 'J1 (Atrás): W / S · J2 (Adelante): Flechas ↑ / ↓ · Espacio: Lanzar';
  } else {
    hudP1Name.textContent = 'Equipo 1';
    hudP2Name.textContent = 'Equipo 2';
    gameControlsHint.textContent = 'Eq.1: W/S y T/G · Eq.2: I/K y ↑/↓ · Espacio: Lanzar';
  }

  bgColor.r = 0; bgColor.g = 0; bgColor.b = 0;
  resetBall();
  inGame = true;
}

function predictBallLandingY(targetX) {
  if (ball.vx <= 0) return H / 2;
  const distX = (targetX - ball.radius) - ball.x;
  if (distX <= 0) return ball.y;
  const timeToReach = distX / ball.vx;
  let predY = ball.y + ball.vy * timeToReach;
  const minY = ball.radius;
  const maxY = H - ball.radius;
  let guard = 0;
  while ((predY < minY || predY > maxY) && guard < 20) {
    if (predY < minY) predY = minY + (minY - predY);
    if (predY > maxY) predY = maxY - (predY - maxY);
    guard++;
  }
  return Math.max(minY, Math.min(maxY, predY));
}

function updateAIPaddle(p, dt) {
  const aiCenter = p.y + p.h / 2;
  const isFront = p.role === 'front';

  if (aiDifficulty === 'impossible') {
    const targetY = (ball.vx > 0 && ball.x < p.x) ? predictBallLandingY(p.x) : H / 2;
    const diff = targetY - aiCenter;
    const maxMove = 2400 * dt;
    if (Math.abs(diff) <= maxMove) p.y = targetY - p.h / 2;
    else p.y += Math.sign(diff) * maxMove;
    return;
  }

  let speed = 360, deadzone = 14;
  let targetY = (ball.vx > 0 && ball.x < p.x + 20) ? ball.y : H / 2;

  if (aiDifficulty === 'easy') {
    speed = (isFront ? 210 : 230) + Math.min(rally, 8) * 10;
    deadzone = 26;
    if (ball.x < W * 0.45) targetY = H / 2;
  } else if (aiDifficulty === 'medium') {
    speed = (isFront ? 330 : 370) + Math.min(rally, 15) * 16;
    deadzone = 12;
  } else if (aiDifficulty === 'hard') {
    speed = (isFront ? 520 : 580) + Math.min(rally, 25) * 24;
    deadzone = 6;
    if (ball.vx > 0 && ball.x < p.x && ball.x > W * 0.35) {
      targetY = predictBallLandingY(p.x);
    }
  }

  const diff = targetY - aiCenter;
  if (Math.abs(diff) > deadzone) {
    p.y += Math.sign(diff) * Math.min(Math.abs(diff) * 7, speed) * dt;
  }
}

function spawnFireParticles(level) {
  const count = level === 2 ? 5 : 2;
  for (let i = 0; i < count; i++) {
    const colors = level === 2
      ? ['#ffffff', '#fef08a', '#fb923c', '#ef4444', '#c026d3']
      : ['#fef08a', '#fb923c', '#f97316'];
    particles.push({
      x: ball.x + (Math.random() - 0.5) * (level === 2 ? 14 : 8),
      y: ball.y + (Math.random() - 0.5) * (level === 2 ? 14 : 8),
      vx: -ball.vx * 0.1 + (Math.random() - 0.5) * (level === 2 ? 95 : 45),
      vy: -ball.vy * 0.1 + (Math.random() - 0.5) * (level === 2 ? 95 : 45),
      size: level === 2 ? 4 + Math.random() * 6 : 2.5 + Math.random() * 3.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: level === 2 ? 0.32 + Math.random() * 0.18 : 0.22 + Math.random() * 0.14,
      maxLife: level === 2 ? 0.5 : 0.36
    });
  }
}

function spawnHitSparks(x, y, color) {
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2;
    const spd = 80 + Math.random() * 200;
    particles.push({
      x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
      size: 2.5 + Math.random() * 3, color,
      life: 0.28 + Math.random() * 0.15, maxLife: 0.43
    });
  }
}

// =========================================================
// CONTROLES DE TECLADO
// =========================================================
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (inGame && (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
    e.preventDefault();
  }
  if (inGame && e.code === 'Space' && waitingServe && !matchOver) {
    if (isOnlineMatch && socket) {
      socket.emit('launch_ball');
    } else {
      launchLocalBall();
    }
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

// =========================================================
// ACTUALIZACIÓN (UPDATE)
// =========================================================
function update(dt) {
  if (!inGame || matchOver) return;

  const targetBg = getTargetBgColor();
  bgColor.r += (targetBg.r - bgColor.r) * Math.min(1, 4.5 * dt);
  bgColor.g += (targetBg.g - bgColor.g) * Math.min(1, 4.5 * dt);
  bgColor.b += (targetBg.b - bgColor.b) * Math.min(1, 4.5 * dt);

  if (hitShake > 0) hitShake = Math.max(0, hitShake - 28 * dt);
  if (courtFlash.alpha > 0) courtFlash.alpha = Math.max(0, courtFlash.alpha - 0.9 * dt);
  if (critBanner.active) {
    critBanner.timer -= dt;
    if (critBanner.timer <= 0) critBanner.active = false;
  }

  for (const p of paddles) {
    if (p.critTimer > 0) p.critTimer = Math.max(0, p.critTimer - dt);
  }

  if (isOnlineMatch) {
    // En modo online solo enviamos nuestro input al servidor
    let dir = 0;
    if (keys['KeyW'] || keys['ArrowUp']) dir -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) dir += 1;
    if (dir !== lastSentInput && socket) {
      lastSentInput = dir;
      socket.emit('player_input', dir);
    }
  } else {
    // Físicas locales
    for (const p of paddles) {
      let dir = 0;
      if (p.control === 'ws') {
        if (keys['KeyW']) dir -= 1;
        if (keys['KeyS']) dir += 1;
        p.y += dir * PADDLE_SPEED * dt;
      } else if (p.control === 'tg') {
        if (keys['KeyT']) dir -= 1;
        if (keys['KeyG']) dir += 1;
        p.y += dir * PADDLE_SPEED * dt;
      } else if (p.control === 'ik') {
        if (keys['KeyI']) dir -= 1;
        if (keys['KeyK']) dir += 1;
        p.y += dir * PADDLE_SPEED * dt;
      } else if (p.control === 'arrows') {
        if (keys['ArrowUp']) dir -= 1;
        if (keys['ArrowDown']) dir += 1;
        p.y += dir * PADDLE_SPEED * dt;
      } else if (p.control === 'solo') {
        if (keys['KeyW'] || keys['ArrowUp']) dir -= 1;
        if (keys['KeyS'] || keys['ArrowDown']) dir += 1;
        p.y += dir * PADDLE_SPEED * dt;
      } else if (p.control === 'ai') {
        updateAIPaddle(p, dt);
      }
      p.y = Math.max(8, Math.min(H - p.h - 8, p.y));
    }

    if (!waitingServe) {
      const speedMag = Math.hypot(ball.vx, ball.vy);
      const steps = Math.max(1, Math.ceil((speedMag * dt) / 6));
      const subDt = dt / steps;

      for (let s = 0; s < steps; s++) {
        ball.x += ball.vx * subDt;
        ball.y += ball.vy * subDt;

        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy);
          playWallSound();
        } else if (ball.y + ball.radius >= H) {
          ball.y = H - ball.radius;
          ball.vy = -Math.abs(ball.vy);
          playWallSound();
        }

        let hitAny = false;
        for (const p of paddles) {
          const approachingLeft = p.side === 'left' && ball.vx < 0;
          const approachingRight = p.side === 'right' && ball.vx > 0;
          if (!approachingLeft && !approachingRight) continue;

          if (
            ball.x + ball.radius >= p.x &&
            ball.x - ball.radius <= p.x + PADDLE_W &&
            ball.y + ball.radius >= p.y &&
            ball.y - ball.radius <= p.y + p.h
          ) {
            rally++;
            const hitPos = (ball.y - (p.y + p.h / 2)) / (p.h / 2);
            const bounceAngle = Math.max(-1, Math.min(1, hitPos)) * 0.95;
            const speed = BASE_BALL_SPEED * getSpeedMultiplier();

            if (p.side === 'left') {
              ball.x = p.x + PADDLE_W + ball.radius;
              ball.vx = Math.cos(bounceAngle) * speed;
            } else {
              ball.x = p.x - ball.radius;
              ball.vx = -Math.cos(bounceAngle) * speed;
            }
            ball.vy = Math.sin(bounceAngle) * speed;

            const skin = SKINS.find((sk) => sk.id === p.skin);
            playPaddleHitSound(rally);
            spawnHitSparks(ball.x, ball.y, skin.glow);
            hitShake = rally >= 20 ? 9 : rally >= 10 ? 7 : rally >= 5 ? 4 : 2;

            if (willReachRivalWithoutWall(p)) {
              critStreak++;
              triggerCritEffect(p, critStreak);
            } else {
              critStreak = 0;
            }

            updateGameHUD();
            hitAny = true;
            break;
          }
        }
        if (hitAny) break;

        if (ball.x + ball.radius < 0) {
          scoreP2++;
          playGoalSound();
          if (scoreP2 >= WIN_SCORE) {
            const rightWinner =
              gameMode === 'friends' ? 'Jugador 2' :
              gameMode === '2v2_friends' ? 'el Equipo 2' :
              gameMode === '2v2_ai' ? 'el Equipo IA' : 'la IA';
            triggerWin(rightWinner, false);
          } else {
            resetBall();
          }
          break;
        } else if (ball.x - ball.radius > W) {
          scoreP1++;
          playGoalSound();
          if (scoreP1 >= WIN_SCORE) {
            const leftWinner =
              gameMode === 'friends' ? 'Jugador 1' :
              gameMode === '2v2_friends' ? 'el Equipo 1' :
              gameMode === '2v2_ai' ? 'el Equipo Amigos' : 'Vos';
            triggerWin(leftWinner, true);
          } else {
            resetBall();
          }
          break;
        }
      }
    }
  }

  // Partículas de fuego (tanto local como online)
  if (!waitingServe && !matchOver) {
    if (rally >= 10) spawnFireParticles(2);
    else if (rally >= 5) spawnFireParticles(1);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.life -= dt;
    if (pt.life <= 0) particles.splice(i, 1);
  }

  for (let i = critEffects.length - 1; i >= 0; i--) {
    const ef = critEffects[i];
    ef.life -= dt;
    if (ef.life <= 0) {
      critEffects.splice(i, 1);
      continue;
    }
    if (ef.type === 'ring') {
      const progress = 1 - ef.life / ef.maxLife;
      ef.radius = 14 + (ef.maxRadius - 14) * progress;
    } else if (ef.type !== 'bolt') {
      ef.x += ef.vx * dt;
      ef.y += ef.vy * dt;
      if (ef.vrot) ef.rot += ef.vrot * dt;
    }
  }
}

// =========================================================
// DIBUJADO (DRAW)
// =========================================================
function drawStarShape(x, y, spikes, outerR, innerR, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  let angle = -Math.PI / 2;
  const step = Math.PI / spikes;
  ctx.moveTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
  for (let i = 0; i < spikes; i++) {
    angle += step;
    ctx.lineTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
    angle += step;
    ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCritEffects() {
  for (const ef of critEffects) {
    const alpha = Math.max(0, ef.life / ef.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = ef.color;
    ctx.shadowBlur = 12;

    if (ef.type === 'ring') {
      ctx.strokeStyle = ef.color;
      ctx.lineWidth = 4 * alpha;
      ctx.beginPath();
      ctx.arc(ef.x, ef.y, ef.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (ef.type === 'bolt') {
      ctx.strokeStyle = ef.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ef.points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    } else if (ef.type === 'star') {
      ctx.fillStyle = ef.color;
      drawStarShape(ef.x, ef.y, 4, ef.size, ef.size * 0.38, ef.rot);
    } else if (ef.type === 'shard') {
      ctx.translate(ef.x, ef.y);
      ctx.rotate(ef.rot);
      ctx.fillStyle = ef.color;
      ctx.beginPath();
      ctx.moveTo(0, -ef.size);
      ctx.lineTo(ef.size * 0.55, 0);
      ctx.lineTo(0, ef.size);
      ctx.lineTo(-ef.size * 0.55, 0);
      ctx.closePath();
      ctx.fill();
    } else if (ef.type === 'bubble') {
      ctx.strokeStyle = ef.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ef.x, ef.y, ef.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ef.color;
      ctx.globalAlpha = alpha * 0.25;
      ctx.fill();
    } else if (ef.type === 'orb') {
      ctx.fillStyle = ef.color;
      ctx.beginPath();
      ctx.arc(ef.x, ef.y, ef.size * alpha + 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (ef.type === 'glitch') {
      ctx.fillStyle = ef.color;
      ctx.fillRect(ef.x - ef.w / 2, ef.y - ef.h / 2, ef.w, ef.h);
    }
    ctx.restore();
  }
}

function drawCritBanner() {
  if (!critBanner.active) return;
  const elapsed = critBanner.maxTime - critBanner.timer;
  let scale = 1;
  if (elapsed < 0.16) scale = 0.5 + (elapsed / 0.16) * 0.68;
  else if (elapsed < 0.28) scale = 1.18 - ((elapsed - 0.16) / 0.12) * 0.18;
  const alpha = critBanner.timer < 0.4 ? Math.max(0, critBanner.timer / 0.4) : 1;

  ctx.save();
  ctx.translate(W / 2, 58);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;
  ctx.font = '900 34px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = critBanner.color;
  ctx.shadowBlur = 24;
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.78)';
  ctx.strokeText(critBanner.text, 0, 0);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(critBanner.text, 0, 0);
  ctx.restore();
}

function drawPaddle(paddle) {
  const skin = SKINS.find((s) => s.id === paddle.skin) || SKINS[0];
  const grad = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.h);
  skin.colors.forEach((col, i) => {
    grad.addColorStop(i / Math.max(1, skin.colors.length - 1), col);
  });

  const pulse = paddle.critTimer > 0 ? Math.sin((paddle.critTimer / 0.65) * Math.PI) * 5 : 0;
  const x = paddle.x - pulse * 0.5;
  const y = paddle.y - pulse;
  const w = PADDLE_W + pulse;
  const h = paddle.h + pulse * 2;
  const r = 8;

  ctx.save();
  ctx.shadowColor = skin.glow;
  ctx.shadowBlur = paddle.critTimer > 0 ? 34 : 16;
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function draw() {
  if (!inGame) return;

  ctx.save();
  if (hitShake > 0) {
    ctx.translate((Math.random() - 0.5) * hitShake, (Math.random() - 0.5) * hitShake);
  }

  ctx.fillStyle = `rgb(${Math.round(bgColor.r)}, ${Math.round(bgColor.g)}, ${Math.round(bgColor.b)})`;
  ctx.fillRect(0, 0, W, H);

  if (courtFlash.alpha > 0) {
    ctx.save();
    ctx.globalAlpha = courtFlash.alpha;
    const flashGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.65);
    flashGrad.addColorStop(0, '#ffffff');
    flashGrad.addColorStop(0.5, courtFlash.color);
    flashGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
    ctx.fillStyle = flashGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 12]);
  ctx.beginPath();
  ctx.moveTo(W / 2, 14);
  ctx.lineTo(W / 2, H - 14);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 64, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.stroke();

  for (const pt of particles) {
    ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
    ctx.fillStyle = pt.color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  drawCritEffects();

  for (const p of paddles) {
    drawPaddle(p);
  }

  ctx.save();
  if (rally >= 10) {
    ctx.shadowColor = rally >= 20 ? '#ef4444' : '#f97316';
    ctx.shadowBlur = rally >= 20 ? 38 : 30;
    const fireGrad = ctx.createRadialGradient(ball.x, ball.y, 2, ball.x, ball.y, ball.radius + 7);
    fireGrad.addColorStop(0, '#ffffff');
    fireGrad.addColorStop(0.45, '#fde047');
    fireGrad.addColorStop(0.8, '#f97316');
    fireGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');
    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius + 7, 0, Math.PI * 2);
    ctx.fill();
  } else if (rally >= 5) {
    ctx.shadowColor = '#fb923c';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#fff7ed';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  } else {
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  drawCritBanner();
  ctx.restore();
}

// =========================================================
// INICIALIZACIÓN Y BUCLE PRINCIPAL
// =========================================================
loadProfile();
updateProfileCard();

let lastTime = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);