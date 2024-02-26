// script.js
const quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris',
        hint: 'Known as the "City of Light"',
        difficulty: 'easy'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars',
        hint: 'Named after the Roman god of war',
        difficulty: 'easy'
    },
    // Add more questions here...
];

const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const timerContainer = document.getElementById('timer-container');
const timeLeft = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const hintBtn = document.getElementById('hint-btn');
const hintContainer = document.getElementById('hint-container');
const hintText = document.getElementById('hint-text');

let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 20;
let timerInterval;

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.classList.add('option');
        li.addEventListener('click', () => checkAnswer(option));
        optionsList.appendChild(li);
    });

    // Show hint if available
    if (currentQuestion.hint) {
        hintText.textContent = currentQuestion.hint;
        hintContainer.style.display = 'block';
    } else {
        hintContainer.style.display = 'none';
    }

    // Start timer
    timeLeft.textContent = timeLimit;
    startTimer();
}

function startTimer() {
    let timeLeftValue = timeLimit;
    timerInterval = setInterval(() => {
        timeLeftValue--;
        timeLeft.textContent = timeLeftValue;

        if (timeLeftValue === 0) {
            clearInterval(timerInterval);
            checkAnswer('');
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    clearInterval(timerInterval); // Stop timer

    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    if (selectedOption === correctAnswer) {
        score++;
        feedbackText.textContent = 'Correct!';
        feedbackText.classList.remove('text-red-500');
        feedbackText.classList.add('text-green-500');
    } else {
        feedbackText.textContent = 'Incorrect! The correct answer is ' + correctAnswer;
        feedbackText.classList.remove('text-green-500');
        feedbackText.classList.add('text-red-500');
    }

    scoreDisplay.textContent = score;
    feedbackContainer.classList.remove('hidden');

    // Disable options after answering
    optionsList.querySelectorAll('.option').forEach(option => {
        option.removeEventListener('click', checkAnswer);
        option.style.pointerEvents = 'none';
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        feedbackContainer.classList.add('hidden');
    } else {
        questionContainer.innerHTML = `<h2 class="text-2xl font-semibold mb-4">Quiz Completed!</h2><p class="text-lg">Your final score is <span class="font-bold text-green-600">${score}/${quizData.length}</span></p>`;
    }
}

nextBtn.addEventListener('click', nextQuestion);
hintBtn.addEventListener('click', () => hintContainer.classList.toggle('hidden'));

showQuestion();
