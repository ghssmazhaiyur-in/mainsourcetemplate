// quiz.js

const quizData = [{
    question: "An aqueous solution of borax is",
    a: "neutral",
    b: "pic.png",
    c: "basic",
    d: "amphoteric",
    correct: "c",
    answered: null // Initialize answered property
},
{
    question: "Boric acid is an acid because its molecule",
    a: "contains replaceable H+ ion",
    b: "gives up a proton",
    c: "combines with proton to form water molecule",
    d: "accepts OH- from water ,releasing proton.",
    correct: "d",
    answered: null // Initialize answered property
},
// Add more questions here as needed
];

let index = 0;
let correct = 0,
incorrect = 0,
total = quizData.length;

const questionBox = document.getElementById("questionBox");
const questionNav = document.getElementById("questionNav");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const homeButton = document.getElementById("homeButton");

// Function to initialize the quiz
const initializeQuiz = () => {
loadQuestion(index);
populateQuestionNav();
};

// Function to load a question
const loadQuestion = (index) => {
if (index < 0 || index >= total) {
    return;
}
const data = quizData[index];
questionBox.innerHTML = `
    <div>
        <h2>${index + 1}. ${data.question}</h2>
        <div class="options">
            <label><input type="radio" name="answer" value="a">${renderOption(data.a)}</label><br>
            <label><input type="radio" name="answer" value="b">${renderOption(data.b)}</label><br>
            <label><input type="radio" name="answer" value="c">${renderOption(data.c)}</label><br>
            <label><input type="radio" name="answer" value="d">${renderOption(data.d)}</label><br>
        </div>
    </div>
`;

// Check if there's a previously saved answer and mark it as checked
if (data.answered !== null) {
    const selectedInput = questionBox.querySelector(`input[value="${data.answered}"]`);
    if (selectedInput) {
        selectedInput.checked = true;
    }
}

updateNavigation();
};

// Function to render options (handles images)
const renderOption = (option) => {
if (option.endsWith('.png') || option.endsWith('.jpg') || option.endsWith('.jpeg') || option.endsWith('.gif')) {
    return `<img src="${option}" alt="Option Image" class="option-image">`;
} else {
    return option; // Display text if not an image path
}
};

// Function to populate question navigation bar
const populateQuestionNav = () => {
questionNav.innerHTML = '';
quizData.forEach((_, i) => {
    const li = document.createElement('li');
    li.innerText = `${i + 1}`;
    li.onclick = () => jumpToQuestion(i);
    questionNav.appendChild(li);
});
};

// Function to update navigation buttons visibility and state
const updateNavigation = () => {
prevButton.disabled = index === 0;
nextButton.disabled = index === total - 1;
submitButton.style.display = index === total - 1 ? "block" : "none";
};

// Function to navigate to a specific question
const jumpToQuestion = (i) => {
index = i;
loadQuestion(index);
};

// Function to move to the next question
const nextQuestion = () => {
const ans = getAnswer();
if (ans) {
    quizData[index].answered = ans; // Save the selected answer
}
index++;
loadQuestion(index);
};

// Function to move to the previous question
const previousQuestion = () => {
if (index > 0) {
    index--;
    loadQuestion(index);
}
};

// Function to get selected answer
const getAnswer = () => {
const selectedInput = questionBox.querySelector('input[name="answer"]:checked');
return selectedInput ? selectedInput.value : null;
};

// Function to submit the quiz
const submitQuiz = () => {
const ans = getAnswer();
if (ans) {
    quizData[index].answered = ans; // Save the selected answer for the last question

    // Calculate score based on saved answers
    quizData.forEach((data) => {
        if (data.answered === data.correct) {
            correct++;
        } else {
            incorrect++;
        }
    });

    // Display quiz end
    quizEnd();
} else {
    alert("Please select an answer before submitting.");
}
};

// Function to end the quiz
const quizEnd = () => {
let message;
const score = (correct / total) * 100;
if (score >= 75) {
    message = "Congratulations! Excellent job!";
} else if (score >= 50) {
    message = "Good job! You did well.";
} else if (score >= 25) {
    message = "You can do better. Keep practicing.";
} else {
    message = "Read more to improve your knowledge.";
}
questionBox.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Total correct answers: ${correct} out of ${total}</p>
    <p>${message}</p>
`;

// Hide question numbers and navigation bar
questionNav.style.display = "none";

// Hide navigation buttons and display Home button
prevButton.style.display = "none";
nextButton.style.display = "none";
submitButton.style.display = "none";
homeButton.style.display = "block";
};

// Function to navigate to the home page
const goToHome = () => {
window.location.href = "index.html"; // Replace with your actual home page URL
};

// Initialize the quiz
initializeQuiz();
