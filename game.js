const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const trex = {
    x: 50,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    isJumping: false,
};

const obstacles = [];
let frame = 0;
let gameOver = false;

function drawTrex() {
    ctx.fillStyle = '#000';
    ctx.fillRect(trex.x, trex.y, trex.width, trex.height);
}

function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - 50,
        width: 20,
        height: 50,
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = '#000';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= 5;
    });

    if (obstacles.length && obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
    }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (trex.x < obstacle.x + obstacle.width &&
            trex.x + trex.width > obstacle.x &&
            trex.y < obstacle.y + obstacle.height &&
            trex.y + trex.height > obstacle.y) {
            gameOver = true;
        }
    });
}

function updateTrex() {
    trex.y += trex.dy;
    if (trex.y + trex.height < canvas.height) {
        trex.dy += trex.gravity;
    } else {
        trex.y = canvas.height - trex.height;
        trex.dy = 0;
        trex.isJumping = false;
    }
}

function handleJump() {
    if (trex.isJumping) return;
    trex.dy = trex.jumpPower;
    trex.isJumping = true;
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        handleJump();
    }
});

function gameLoop() {
    if (gameOver) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
        return;
    }

    frame++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTrex();
    updateTrex();

    if (frame % 100 === 0) {
        createObstacle();
    }

    drawObstacles();
    updateObstacles();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

gameLoop();
