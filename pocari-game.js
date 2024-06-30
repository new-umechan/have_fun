// pocari-game.js
document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    const countDisplay = document.getElementById('count');
    const drinkButton = document.getElementById('drinkButton');
    const pocariLevel = document.getElementById('pocariLevel');

    const levels = [100, 75, 50, 25, 0];
    let currentLevelIndex = 0;

    drinkButton.addEventListener('click', () => {
        count++;
        countDisplay.textContent = `${count}回`;

        if (currentLevelIndex < levels.length - 1) {
            currentLevelIndex++;
            pocariLevel.style.height = `${levels[currentLevelIndex]}%`;
        }
    });
});
