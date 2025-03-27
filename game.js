const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let player = { x: 400, y: 300, size: 30, speed: 3 };
let timeBalance = 30;
let debt = 0;
let level = 1;
let gameRunning = false;

function drawPlayer() {
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (!gameRunning) return;
    
    // 运动逻辑
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;

    // 限制边界
    player.x = Math.max(0, Math.min(canvas.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height, player.y));

    // 时间减少
    timeBalance -= 0.02;

    // 更新 HUD
    document.getElementById('time').textContent = timeBalance.toFixed(1);
    document.getElementById('debt').textContent = debt;
    document.getElementById('level').textContent = level;

    // 失败判断
    if (timeBalance <= 0) {
        alert("时间耗尽，游戏结束！");
        gameRunning = false;
        location.reload();
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    gameRunning = true;
    update();
}

const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);
