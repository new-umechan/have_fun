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

    let enemies = [];
    let towers = [];

    setInterval(() => {
        enemies.push(new Enemy());
    }, 1000);

    setInterval(() => {
        enemies.forEach(enemy => enemy.move());
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
            enemies.forEach(enemy => {
                const dx = parseInt(tower.style.left) - enemy.x;
                const dy = parseInt(tower.style.top) - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    score++;
                    scoreDisplay.textContent = `スコア: ${score}`;
                    gameArea.removeChild(enemy.element);
                    enemies = enemies.filter(e => e !== enemy);
                }
            });
        });
    }, 100);
});
