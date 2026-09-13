// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const splashScreen = document.getElementById('splashScreen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game Constants
const GAME_WIDTH = 2000;
const GAME_HEIGHT = 2000;
const PLAYER_SIZE = 15;
const WEAPON_SPAWN_COUNT = 40;

// Weapon Database
const weapons = {
    m4a1: { damage: 25, fireRate: 100, ammo: 30, range: 800, name: 'M4A1', color: '#00ff00' },
    awm: { damage: 80, fireRate: 200, ammo: 5, range: 2000, name: 'AWM', color: '#ffff00' },
    shotgun: { damage: 60, fireRate: 300, ammo: 8, range: 200, name: 'Shotgun', color: '#ff6600' },
    pistol: { damage: 15, fireRate: 50, ammo: 15, range: 300, name: 'Pistol', color: '#ff0066' }
};

// Game Objects
class Player {
    constructor(x, y, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.width = PLAYER_SIZE;
        this.height = PLAYER_SIZE;
        this.health = 100;
        this.maxHealth = 100;
        this.isPlayer = isPlayer;
        this.currentWeapon = 'm4a1';
        this.ammo = { m4a1: 30, awm: 5, shotgun: 8, pistol: 15 };
        this.angle = 0;
        this.vx = 0;
        this.vy = 0;
        this.speed = 4;
        this.alive = true;
        this.kills = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.x = Math.max(0, Math.min(GAME_WIDTH - this.width, this.x));
        this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height, this.y));

        this.vx *= 0.95;
        this.vy *= 0.95;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.save();
        ctx.translate(this.x - cameraX, this.y - cameraY);
        ctx.rotate(this.angle);

        // Body
        ctx.fillStyle = this.isPlayer ? '#00ff00' : '#ff6600';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Head indicator
        ctx.fillStyle = '#ffcc99';
        ctx.fillRect(-this.width / 2, -this.height / 2 - 5, this.width, 5);

        ctx.restore();

        // Health bar
        if (!this.isPlayer) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x - cameraX - 15, this.y - cameraY - 30, 30, 5);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(this.x - cameraX - 15, this.y - cameraY - 30, 30 * (this.health / 100), 5);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.alive = false;
        }
    }
}

class Weapon {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.collected = false;
        this.rotation = 0;
    }

    draw(ctx, cameraX, cameraY) {
        ctx.save();
        ctx.translate(this.x - cameraX, this.y - cameraY);
        ctx.rotate(this.rotation);

        ctx.fillStyle = weapons[this.type].color;
        ctx.fillRect(-8, -8, 16, 16);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-8, -8, 16, 16);

        ctx.restore();

        this.rotation += 0.05;
    }

    checkCollision(player) {
        const dist = Math.hypot(this.x - player.x, this.y - player.y);
        return dist < 30;
    }
}

class Bullet {
    constructor(x, y, angle, weapon, fromPlayer) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 8;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.weapon = weapon;
        this.range = weapons[weapon].range;
        this.distTraveled = 0;
        this.active = true;
        this.fromPlayer = fromPlayer;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.distTraveled += this.speed;

        if (this.distTraveled > this.range) {
            this.active = false;
        }
        if (this.x < 0 || this.x > GAME_WIDTH || this.y < 0 || this.y > GAME_HEIGHT) {
            this.active = false;
        }
    }

    draw(ctx, cameraX, cameraY) {
        ctx.fillStyle = weapons[this.weapon].color;
        ctx.beginPath();
        ctx.arc(this.x - cameraX, this.y - cameraY, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    checkCollision(player) {
        const dist = Math.hypot(this.x - player.x, this.y - player.y);
        return dist < player.width + 5;
    }
}

// Game State
let gameState = {
    players: [],
    weapons: [],
    bullets: [],
    zone: { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, radius: 800 },
    zoneRadius: 800,
    zonePhase: 0,
    gameTime: 0,
    playersAlive: 50,
    killFeed: [],
    gameOver: false,
    gameWon: false
};

// Initialize Game
function initGame() {
    gameState.players = [];
    gameState.weapons = [];
    gameState.bullets = [];
    gameState.killFeed = [];
    gameState.gameOver = false;
    gameState.gameWon = false;

    // Create player
    gameState.players.push(new Player(GAME_WIDTH / 2 + 200, GAME_HEIGHT / 2, true));

    // Create AI players
    for (let i = 0; i < 49; i++) {
        gameState.players.push(new Player(
            Math.random() * GAME_WIDTH,
            Math.random() * GAME_HEIGHT,
            false
        ));
    }

    // Spawn weapons
    for (let i = 0; i < WEAPON_SPAWN_COUNT; i++) {
        const weaponTypes = Object.keys(weapons);
        const randomWeapon = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
        gameState.weapons.push(new Weapon(
            Math.random() * GAME_WIDTH,
            Math.random() * GAME_HEIGHT,
            randomWeapon
        ));
    }
}

// Input Handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

window.addEventListener('mousemove', (e) => {
    const player = gameState.players[0];
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    player.angle = Math.atan2(mouseY - canvas.height / 2, mouseX - canvas.width / 2);
});

window.addEventListener('click', () => {
    shootBullet();
});

// Weapon switching
document.querySelectorAll('.weapon').forEach(btn => {
    btn.addEventListener('click', () => {
        const player = gameState.players[0];
        const weapon = btn.dataset.weapon;
        player.currentWeapon = weapon;

        document.querySelectorAll('.weapon').forEach(w => w.classList.remove('active'));
        btn.classList.add('active');
        updateUI();
    });
});

function shootBullet() {
    const player = gameState.players[0];
    if (player.ammo[player.currentWeapon] > 0 && player.alive && !gameState.gameOver && !gameState.gameWon) {
        gameState.bullets.push(new Bullet(player.x, player.y, player.angle, player.currentWeapon, true));
        player.ammo[player.currentWeapon]--;
        updateUI();
    }
}

// Update Player Movement
function updatePlayerMovement() {
    const player = gameState.players[0];
    player.vx = 0;
    player.vy = 0;

    if (keys['w'] || keys['arrowup'] || keys[' ']) player.vy -= player.speed;
    if (keys['s'] || keys['arrowdown']) player.vy += player.speed;
    if (keys['a'] || keys['arrowleft']) player.vx -= player.speed;
    if (keys['d'] || keys['arrowright']) player.vx += player.speed;

    const magnitude = Math.hypot(player.vx, player.vy);
    if (magnitude > player.speed) {
        player.vx = (player.vx / magnitude) * player.speed;
        player.vy = (player.vy / magnitude) * player.speed;
    }
}

// Update Game Logic
function update() {
    if (gameState.gameOver || gameState.gameWon) return;

    gameState.gameTime++;

    // Update players
    updatePlayerMovement();
    gameState.players.forEach(player => {
        player.update();

        // AI behavior
        if (!player.isPlayer && player.alive && Math.random() < 0.02) {
            player.vx = (Math.random() - 0.5) * 6;
            player.vy = (Math.random() - 0.5) * 6;
        }

        // AI shooting
        if (!player.isPlayer && player.alive && Math.random() < 0.001) {
            const targetPlayer = gameState.players[0];
            if (Math.hypot(player.x - targetPlayer.x, player.y - targetPlayer.y) < 500) {
                player.angle = Math.atan2(targetPlayer.y - player.y, targetPlayer.x - player.x);
                if (player.ammo[player.currentWeapon] > 0) {
                    gameState.bullets.push(new Bullet(player.x, player.y, player.angle, player.currentWeapon, false));
                    player.ammo[player.currentWeapon]--;
                }
            }
        }

        // Zone damage
        const distToZone = Math.hypot(player.x - gameState.zone.x, player.y - gameState.zone.y);
        if (distToZone > gameState.zoneRadius) {
            player.takeDamage(0.5);
        }
    });

    // Update bullets
    gameState.bullets = gameState.bullets.filter(bullet => bullet.active);
    gameState.bullets.forEach(bullet => {
        bullet.update();

        gameState.players.forEach(player => {
            if (bullet.checkCollision(player) && player.alive) {
                const damage = weapons[bullet.weapon].damage;
                player.takeDamage(damage);
                bullet.active = false;

                if (!player.alive) {
                    if (bullet.fromPlayer) {
                        gameState.players[0].kills++;
                        const killerName = gameState.players[0].isPlayer ? 'You' : 'AI';
                        const victimName = player.isPlayer ? 'Player' : 'Enemy';
                        gameState.killFeed.unshift(`${killerName} eliminated ${victimName}`);
                    } else if (player.isPlayer) {
                        gameState.killFeed.unshift(`You were eliminated!`);
                    }
                    if (gameState.killFeed.length > 8) gameState.killFeed.pop();
                }
            }
        });
    });

    // Weapon collection
    gameState.weapons.forEach(weapon => {
        const player = gameState.players[0];
        if (weapon.checkCollision(player)) {
            player.ammo[weapon.type] += weapons[weapon.type].ammo;
            gameState.weapons = gameState.weapons.filter(w => w !== weapon);
        }
    });

    // Zone shrinking
    if (gameState.gameTime % 300 === 0 && gameState.zonePhase < 5) {
        gameState.zonePhase++;
        gameState.zoneRadius = Math.max(100, gameState.zoneRadius - 100);
    }

    // Update alive players count
    gameState.playersAlive = gameState.players.filter(p => p.alive).length;

    // Check win condition
    if (gameState.playersAlive === 1 && gameState.players[0].alive) {
        gameState.gameWon = true;
    }

    // Check lose condition
    if (!gameState.players[0].alive) {
        gameState.gameOver = true;
    }
}

// Draw Game
function draw() {
    const player = gameState.players[0];
    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = -cameraX % 100; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = -cameraY % 100; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Draw zone circle
    ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(gameState.zone.x - cameraX, gameState.zone.y - cameraY, gameState.zoneRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw weapons
    gameState.weapons.forEach(weapon => weapon.draw(ctx, cameraX, cameraY));

    // Draw players
    gameState.players.forEach(p => {
        if (p.alive) p.draw(ctx, cameraX, cameraY);
    });

    // Draw bullets
    gameState.bullets.forEach(bullet => bullet.draw(ctx, cameraX, cameraY));
}

// Update UI
function updateUI() {
    const player = gameState.players[0];
    document.getElementById('health-fill').style.width = Math.max(0, (player.health / player.maxHealth) * 100) + '%';
    document.getElementById('health-text').textContent = `${Math.ceil(player.health)}/100`;
    document.getElementById('ammo-count').textContent = `Ammo: ${player.ammo[player.currentWeapon]}`;
    document.getElementById('players-left').textContent = `Players Left: ${gameState.playersAlive}`;
    document.getElementById('zone-timer').textContent = `Zone: Phase ${gameState.zonePhase + 1}/5`;

    // Update kill feed
    const killFeedEl = document.getElementById('kill-feed');
    killFeedEl.innerHTML = '';
    gameState.killFeed.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'kill-message';
        div.textContent = msg;
        killFeedEl.appendChild(div);
    });
}

// Game Loop
function gameLoop() {
    update();
    draw();
    updateUI();

    // Check game over
    if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0000';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Kills: ' + gameState.players[0].kills, canvas.width / 2, canvas.height / 2 + 40);
        ctx.font = '20px Arial';
        ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 100);
    }

    if (gameState.gameWon) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('BOOYAH! YOU WIN!', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '30px Arial';
        ctx.fillStyle = '#ffff00';
        ctx.fillText('Kills: ' + gameState.players[0].kills, canvas.width / 2, canvas.height / 2 + 40);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 100);
    }

    requestAnimationFrame(gameLoop);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Initialize and hide splash after 3 seconds
setTimeout(() => {
    splashScreen.style.display = 'none';
    initGame();
    gameLoop();
}, 3000);
