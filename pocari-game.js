// game.js
document.addEventListener('DOMContentLoaded', (event) => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    let score = 0;

    class Enemy {
        constructor() {
            this.element = document.createElement('div');
            this.element.className = 'enemy';
            this.x = 0;
            this.y = Math.random() * (gameArea.offsetHeight - 40);
            this.element.style.top = `${this.y}px`;
            gameArea.appendChild(this.element);
        }

        move() {
            this.x += 2;
            this.element.style.left = `${this.x}px`;

            if (this.x > gameArea.offsetWidth) {
                gameArea.removeChild(this.element);
                enemies = enemies.filter(e => e !== this);
            }
        }
    }

    class Bullet {
        constructor(x, y, target) {
            this.element = document.createElement('div');
            this.element.className = 'bullet';
            this.x = x;
            this.y = y;
            this.target = target;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            gameArea.appendChild(this.element);
        }

        move() {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 5) {
                gameArea.removeChild(this.element);
                bullets = bullets.filter(b => b !== this);
                gameArea.removeChild(this.target.element);
                enemies = enemies.filter(e => e !== this.target);
                score++;
                scoreDisplay.textContent = `スコア: ${score}`;
            } else {
                this.x += dx / distance * 5;
                this.y += dy / distance * 5;
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
            }
        }
    }

    let enemies = [];
    let towers = [];
    let bullets = [];

    setInterval(() => {
        enemies.push(new Enemy());
    }, 1000);

    setInterval(() => {
        enemies.forEach(enemy => enemy.move());
        bullets.forEach(bullet => bullet.move());
    }, 50);

    gameArea.addEventListener('click', (event) => {
        const tower = document.createElement('div');
        tower.className = 'tower';
        tower.style.left = `${event.clientX - gameArea.offsetLeft - 25}px`;
        tower.style.top = `${event.clientY - gameArea.offsetTop - 25}px`;
        gameArea.appendChild(tower);
        towers.push(tower);
    });

    setInterval(() => {
        towers.forEach(tower => {
            if (enemies.length > 0) {
                const enemy = enemies[Math.floor(Math.random() * enemies.length)];
                const bullet = new Bullet(parseInt(tower.style.left) + 25, parseInt(tower.style.top) + 25, enemy);
                bullets.push(bullet);
            }
        });
    }, 1000);
});
