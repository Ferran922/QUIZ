const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: '¿Qué significa la sigla "IoT" en inglés?',
        choice1: 'Internet of Technology',
        choice2: 'Internet of Things',
        choice3: 'Internet of Trends',
        choice4: 'Internet of Telecommunications',
        answer: 2,
    },
    {
        question:
            "¿Cuál de los siguientes dispositivos se considera comúnmente como un ejemplo de un dispositivo IoT?",
        choice1: "Refrigerador",
        choice2: "Taza de café",
        choice3: "Lápiz",
        choice4: "Espejo",
        answer: 1,
    },
    {
        question: "¿Qué tecnología de comunicación inalámbrica es ampliamente utilizada en dispositivos IoT para la transferencia de datos?",
        choice1: " NFC (Near Field Communication)",
        choice2: "Bluetooth",
        choice3: "Wi-Fi",
        choice4: "Todos los anteriores",
        answer: 4,
    },
    {
        question: "¿Cuál de las siguientes afirmaciones es verdadera sobre la seguridad en el Internet de las cosas?",
        choice1: "La seguridad no es importante en IoT.",
        choice2: " Los dispositivos IoT son inherentemente seguros y no necesitan medidas adicionales.",
        choice3: "La seguridad en IoT es un desafío importante debido a la variedad de dispositivos conectados.",
        choice4: "La seguridad solo es relevante en dispositivos IoT industriales.",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()