
const welcomeScreen = document.getElementById("welcome");
const riddleScreen = document.getElementById("riddle");
const revealScreen = document.getElementById("reveal");

const startButton = document.getElementById("startButton");
const unlockButton = document.getElementById("unlockButton");
const hintButton = document.getElementById("hintButton");
const againButton = document.getElementById("againButton");

const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const hint = document.getElementById("hint");

// Display one screen at a time.
function showScreen(screenToShow) {
    [welcomeScreen, riddleScreen, revealScreen].forEach((screen) => {
        const shouldShow = screen === screenToShow;

        screen.hidden = !shouldShow;
        screen.classList.toggle("active", shouldShow);
    });
}

// Start the mystery.
startButton.addEventListener("click", () => {
    feedback.textContent = "";
    answerInput.value = "";
    hint.hidden = true;

    showScreen(riddleScreen);
    answerInput.focus();
});

// Check the answer to the riddle.
function checkAnswer() {
    const answer = answerInput.value
        .toLowerCase()
        .trim()
        .replace(/[.,!?]/g, "");

    if (!answer) {
        feedback.textContent = "Try entering an answer first. 🙂";
        answerInput.focus();
        return;
    }

    const correctAnswers = [
        "neighbour",
        "neighbor",
        "a neighbour",
        "a neighbor",
        "next door",
        "nextdoor"
    ];

    if (correctAnswers.includes(answer)) {
        feedback.textContent = "";
        showScreen(revealScreen);
    } else {
        feedback.textContent =
            "Not quite. Think about someone who lives nearby. 👀";
    }
}

unlockButton.addEventListener("click", checkAnswer);

// Pressing Enter also checks the answer.
answerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Show or hide the hint.
hintButton.addEventListener("click", () => {
    hint.hidden = !hint.hidden;

    hintButton.textContent = hint.hidden
        ? "Need a hint?"
        : "Hide hint";
});

// Let the visitor start over.
againButton.addEventListener("click", () => {
    answerInput.value = "";
    feedback.textContent = "";
    hint.hidden = true;
    hintButton.textContent = "Need a hint?";

    showScreen(welcomeScreen);
});
