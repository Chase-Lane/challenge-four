const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progressBarFull")


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0
let questionCounter = 0
let availableQuestions = []


let timeEl = document.querySelector(".time")
let secondsLeft = 60;


function loseGame() {
  alert("GAME OVER");
  document.location.reload();
}

function setTime() {

  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time left: " + secondsLeft + " seconds";
// test start ---------------------------------------------------------------------------

// test end -----------------------------------------------------------------------------------------
        if (secondsLeft === 0) {
          // Clears interval
          clearInterval(timerInterval);
          loseGame();
        }

      }, 1000);
    }



let questions = [
      {
        question: "What color is the sky?",
        choice1: "Blue",
        choice2: "Green",
        choice3: "White",
        choice4: "Purple",
        answer: 1,
      },

      {
        question: "What color is a basketball?",
        choice1: "Orange",
        choice2: "Green",
        choice3: "White",
        choice4: "Purple",
        answer: 1,
      },

      {
        question: "What color is a baseball?",
        choice1: "Blue",
        choice2: "Green",
        choice3: "White",
        choice4: "Purple",
        answer: 3,
      },

      {
        question: "What color is a football?",
        choice1: "Brown",
        choice2: "Green",
        choice3: "White",
        choice4: "Purple",
        answer: 1,
      }
    ]

const SCORE_POINTS = 100;
    const Total_Questions = 4;

    startGame = () => {
      questionCounter = 0
      score = 0
      availableQuestions = [...questions]
      getNewQuestion()
    }

    getNewQuestion = () => {
      if (availableQuestions.length === 0 || questionCounter > Total_Questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
      }

      questionCounter++
      progressText.innerText = `Question ${questionCounter} of ${Total_Questions}`
      progressBarFull.style.width = `${(questionCounter / Total_Questions) * 100}%`

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
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
          incrementScore(SCORE_POINTS)
        }
// test start
        
        if (classToApply === 'incorrect') {
          loseGame()
        }
// test end
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion()

        }, 1000)
      })
    })

    incrementScore = num => {
      score += num
      scoreText.innerText = score

    }

    startGame()
    setTime()