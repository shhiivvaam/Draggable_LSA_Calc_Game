window.addEventListener('DOMContentLoaded', () => {
    const dropTargets = document.querySelectorAll('.drop-target');
    const draggableValues = document.querySelectorAll('.draggable');
    const scoreDisplay = document.getElementById('score');
    const celebrationContainer = document.getElementById('celebration');
    const backgroundMusic = document.getElementById('background-music');

    let score = 0;
    let correctAudio = new Audio('../assets/audio/correct.wav');
    let incorrectAudio = new Audio('../assets/audio/incorrect.wav');

    backgroundMusic.play();

    draggableValues.forEach(value => {
        value.addEventListener('dragstart', dragStart);
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', dragOver);
        target.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.value);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const value = e.dataTransfer.getData('text/plain');
        e.target.textContent = value;
        checkAnswer();
    }

    function checkAnswer() {
        const problem1 = document.querySelectorAll('.problem:nth-child(1) .drop-target');
        const problem2 = document.querySelectorAll('.problem:nth-child(2) .drop-target');
        const problem1Answer = [3, 4, 2];
        const problem2Answer = [4, 6, 6];

        let problem1Correct = true;
        let problem2Correct = true;

        problem1.forEach((target, index) => {
            if (target.textContent !== problem1Answer[index].toString()) {
                problem1Correct = false;
            }
        });

        problem2.forEach((target, index) => {
            if (target.textContent !== problem2Answer[index].toString()) {
                problem2Correct = false;
            }
        });

        if (problem1Correct && problem2Correct) {
            score += 2;
            scoreDisplay.textContent = score;
            correctAudio.play();
            showCelebration();
        } else if (problem1Correct || problem2Correct) {
            score += 1;
            scoreDisplay.textContent = score;
            correctAudio.play();
        } else {
            incorrectAudio.play();
        }
    }

    function showCelebration() {
        celebrationContainer.innerHTML = '<img src="../assets/images/celebration.png" alt="Celebration">';
        setTimeout(() => {
            celebrationContainer.innerHTML = '';
        }, 2000);
    }
});