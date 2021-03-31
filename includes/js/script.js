//Declare variables
let quesNum = 0;            //The current question number
let gameLost = false;       //Boolean indicating if the game end was due to  winning or losing
let gameScore = 0;          //The player score
let quizQues = "";          //Quiz question element, where the quetions are written
let quizChoices = "";       //The elemnet for the various quiz answers
let timeLeft = 0;           //Time left in the game: defal to 60 seconds
let timerElm = "";          //The timer element, where the current time left is displayed
let timerInterval = 0;      //The timerinterval, used to stop the timer if the player asnwers all the questions
let highScores = [];        //The array to store the high scores, that will write them to local storage

// Create evet listener on the start, home, submit and Scores buttons
//The start button will start the quiz
let startBtn = document.querySelector("#startButton");
startBtn.addEventListener('click', function () {
    buttonControl()
    startTimer();
    loadQuizQues();
})

//The home button will reload the page.  hide/Show is controlledwith JS
let hometBtn = document.querySelector("#homeButton");

//The submit button will submit the high score to be saved to local storage
let submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener('click', function () {
    saveHighScore();
})
//The scores button will display the high scores list
let scoresBtn = document.querySelector("#scoresButton");
scoresBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    showHighScores();
})
//The rest scores button will erase the high scores list
let resetBtn = document.querySelector("#resetButton");
resetBtn.addEventListener('click', function () {
    resetHighScores();
})
function buttonControl() {
    //hides/shows buttons based on where in the quiz the user is
    startBtn.style.visibility = 'hidden'
    hometBtn.style.display = 'unset'

}
function startTimer() {
    timeLeft = 60;
    // Start interval timer
    timerElm = document.querySelector("#timer");
    timerInterval = setInterval(function () {
        if (timeLeft < 10) {
            timerElm.textContent = `0:0${timeLeft}`;  //pad a zero to single digit seconds
        }
        else {
            timerElm.textContent = `0:${timeLeft}`;
        }
        if (timeLeft <= 0) {
            // Cancel interval
            clearInterval(timerInterval);
            timerElm.textContent = `0:00`
            gameLost = true;
            gameOver()
        }
        timeLeft--;
    }, 1000);
}

function loadQuizQues() {
    console.log(`LoadQuizQues`)
    //function load the question and answer options for each quiz question
    //Only load questions if the quesNum is not greater than the length of questions Array (quizQuestions.length)
    if (quesNum < quizQuestions.length) {
        //Set the Header for the quiz box to the Number of the quiz question
        let quizH2 = document.querySelector("h2")
        quizH2.textContent = `Question: #${quesNum + 1}`;
        //Load the quiz box with the question text
        quizQues = document.querySelector("#quiz-question")
        quizChoices = document.querySelectorAll("#answer-choices li")
        quizQues.textContent = quizQuestions[quesNum][0];
        //for loop to set the answer choices for each question and 
        //to set the EventListener on click for the user answer selection
        for (let i = 0; i < quizChoices.length; i++) {
            quizChoices[i].textContent = quizQuestions[quesNum][1][i];
            quizChoices[i].addEventListener("click", (answerClicked));
        }
    }
    else {
        gameLost = false;
        gameOver()
    }
}

function answerClicked(event) {
    let ansElem = event.target;
    //Check the clicked answer against the correct asnswer
    if (ansElem.matches("li")) {
        //if answer correct 
        if (ansElem.textContent === quizQuestions[quesNum][2]) {
            //add to 5 secs to timer add 10 to score, display answer coorect message
            gameScore += 10;
            timeLeft += 5;
            let msgCenter = document.querySelector('#msgCenter');
            msgCenter.textContent = "CORRECT: You get 10 points and 5 extra seconds."
            let msgFooter = document.querySelector('.hrFooter');
            msgFooter.style.visibility = "visible"
        }
        else {
            //deduct 10 secs from timer
            timeLeft -= 10;
            let msgCenter = document.querySelector('#msgCenter');
            msgCenter.textContent = "WRONG: You get 0 points and loose 10 seconds."
            let msgFooter = document.querySelector('.hrFooter');
            msgFooter.style.visibility = "visible"
            //alert("no")
        }

        //Increase the quesNUm so next time through it will load the next question from the array
        quesNum++
        loadQuizQues()
    }
}

function gameOver() {
    clearInterval(timerInterval);
    let quizSection = document.querySelector('.center-quiz');
    quizSection.style.display = "none"
    let hiScoreSection = document.querySelector('.center-hiscore');
    hiScoreSection.style.display = "unset"
    gameScore = gameScore + timeLeft
    if (gameLost || gameScore < 65) {
        //You lost you did not complete all the questions before the timer ran out... or you got a score below 65
        let playerInitials = document.querySelector('#initials');
        playerInitials.style.display = "none"
        let playerInitLbl = document.querySelector('.initials');
        playerInitLbl.style.display = "none"
        submitBtn.style.display = "none"
        let youLostMsg = document.querySelector('#highScoreTitle');
        youLostMsg.textContent = "You Failed The Quiz.  You Should Study More."
        let hiScoreMsg = document.querySelector('#msgHiscore')
        hiScoreMsg.textContent = `Your Score: ${gameScore}`
    }
    else {
        //add time to score and do some game winning porcessing here, display Your score
        //gameScore = gameScore + timeLeft
        let hiScoreMsg = document.querySelector('#msgHiscore')
        hiScoreMsg.textContent = `Your Score: ${gameScore}`
    }
}

function saveHighScore() {
    //Get the Highscores from localstorage and save them in the highScores array
    highScores = JSON.parse(localStorage.getItem("highScores"));
    //Get player Initials and save them to playInitHiScr array and then 
    //push to HighScores array to save to localstorage
    if (!highScores) {
        localStorage.setItem("highScores", JSON.stringify(""));
        highScores = [];
    }
    let playerInitials = document.querySelector('#initials');
    let playInitHiScr = [playerInitials.value, gameScore]
    highScores.push(playInitHiScr);
    //Save new score and player initials to local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showHighScores() {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores) {
        alert("The highscores list is currently empty.  Please take the quiz and save your score to start a High Scores List.");
    }
    else {
        buttonControl()
        resetBtn.style.display = 'unset'
        scoresBtn.style.display = 'none'
        let quizSection = document.querySelector('.center-quiz');
        quizSection.style.display = "none"
        let hiScoreSection = document.querySelector('.center-hiscore');
        hiScoreSection.style.display = "none"
        let hiScoreList = document.querySelector('.center-scoresList');
        hiScoreList.style.display = "unset"
        let highScoresSorted = highScores.sort(function (a, b) {
            return b[1] - a[1];
        })
        let highInitUl = document.querySelector('#highInitUL')
        let highScoreUl = document.querySelector('#highScoreUL')
        for (i = 0; i < highScoresSorted.length; i++) {
            let newNameLi = document.createElement("li");
            let newScoreLi = document.createElement("li");
            newNameLi.textContent = highScoresSorted[i][0];
            newScoreLi.textContent = highScoresSorted[i][1];
            highInitUl.appendChild(newNameLi);
            highScoreUl.appendChild(newScoreLi);
        }
    }


}
function resetHighScores() {
    window.localStorage.clear();
    document.querySelector('#highInitUL').textContent = ""
    document.querySelector('#highScoreUL').textContent = ""
}

/*// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}*/