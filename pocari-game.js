// pocari-game.js
document.addEventListener('DOMContentLoaded', (event) => {
    let count = 0;
    const countDisplay = document.getElementById('count');
    const drinkButton = document.getElementById('drinkButton');

    drinkButton.addEventListener('click', () => {
        count++;
        countDisplay.textContent = `${count}回`;
    });
});
