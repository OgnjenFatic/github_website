document.addEventListener('DOMContentLoaded', () => {
    const flames = document.querySelectorAll('.flame');
    const timerDisplay = document.getElementById('time');
    const bestTimeDisplay = document.getElementById('best-time');
    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    let startTime, timerInterval, bestTime = null;
    let gameStarted = false;

    // Function to start the timer
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            timerDisplay.textContent = elapsedTime.toFixed(2);
        }, 10);
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
        const elapsedTime = (Date.now() - startTime) / 1000;
        if (!bestTime || elapsedTime < bestTime) {
            bestTime = elapsedTime;
            bestTimeDisplay.textContent = bestTime.toFixed(2);
        }
    }

    // Function to reset the game
    function resetGame() {
        flames.forEach(flame => {
            flame.style.display = 'block'; // Re-show all flames
        });
        timerDisplay.textContent = '0.00';
        clearInterval(timerInterval);
        gameStarted = false;
        startButton.disabled = false;
        restartButton.disabled = true;
    }

    // Event listener for clicking on flames
    flames.forEach(flame => {
        flame.addEventListener('click', () => {
            if (gameStarted) {
                flame.style.display = 'none'; // Hide the flame when clicked
                if ([...flames].every(f => f.style.display === 'none')) {
                    stopTimer(); // Stop the timer if all flames are blown out
                }
            }
        });
    });

    // Event listener for the start button
    startButton.addEventListener('click', () => {
        gameStarted = true;
        startTimer();
        startButton.disabled = true;
        restartButton.disabled = false;
    });

    // Event listener for the restart button
    restartButton.addEventListener('click', resetGame);

    // Disable the restart button initially
    restartButton.disabled = true;
});
