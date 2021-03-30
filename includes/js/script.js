//Declare variables
let quesNum = 0;            //The current question number
let gameLost = false;       //Boolean indicating if the game end was due to  winning or losing
let gameScore = 0;          //The player score
let quizQues = "";          //Quiz question element, where the quetions are written
let quizChoices = "";       //The elemnet for the various quiz answers
let timeLeft = 0;          //Time left in the game: defal to 60 seconds
let timerElm = "";          //The timer element, where the current time left is displayed
let timerInterval = 0;      //The timerinterval, used to stop the timer if the player asnwers all the questions

// Create evet listener on the start, home, submit and Scores buttons
//The start button will start the quiz
let startBtn = document.querySelector("#startButton");
startBtn.addEventListener('click', function () {
    startTimer();
    loadQuizQues();
})

//The submit button will submit the high score to be saved to local storage
let submitBtn = document.querySelector("#submitButton");
submitBtn.addEventListener('click', function () {
    startTimer();
})
//The home button will take the user back to the start quiz page
let homeBtn = document.querySelector("#homeButton");
homeBtn.addEventListener('click', function () {
    window.location.href = "http://jsfiddle.net/Xotic750/u5nmt/"; ('./index.html', '_self', false);
})
//The scores button will take the user to the high scores page
let scoresBtn = document.querySelector("#scoresButton");
scoresBtn.addEventListener('click', function () {
    window.location.replace('./codegurus.html')
    //document.location.href = './codegurus.html'
    //window.open('./codegurus.html', '_self');
})

function startTimer() {
    //console.log(`starttimer`)
    timeLeft = 60;
    // Start interval timer

    timerElm = document.querySelector("#timer");
    timerInterval = setInterval(function () {
        if (timeLeft < 10) {
            timerElm.textContent = `0:0${timeLeft}`;  //pad a zero to single diit seconds
        }
        else {
            timerElm.textContent = `0:${timeLeft}`;
        }
        if (timeLeft === 0) {
            // Cancel interval
            clearInterval(timerInterval);
            gameLost = true;
            gameOver()
        }
        timeLeft--;
        //loadQuizQues();
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
            //alert("yes")
            gameScore += 10;
            timeLeft += 5;
            let msgCenter = document.querySelector('#msgCenter');
            msgCenter.textContent = "CORRECT: You get 10 points and 5 extra seconds."
            let msgFooter = document.querySelector('.hrFooter');
            msgFooter.style.visibility = "visible"
            //alert(gameScore)
        }
        else {
            //deduct 1- secs from timer
            timeLeft -= 10;
            let msgCenter = document.querySelector('#msgCenter');
            msgCenter.textContent = "WRONG: You get 0 points and loose 10 seconds."
            let msgFooter = document.querySelector('.hrFooter');
            msgFooter.style.visibility = "visible"
            //alert("no")
        }

        //Increase the quesNUm so next time through it will load the next question from the array
        console.log(`q# ${quesNum}`);
        quesNum++
        console.log(`q# ${quesNum}`);
        loadQuizQues()
    }
}






function gameOver() {
    clearInterval(timerInterval);
    if (gameLost) {
        //You losr you did not complete all the questions before the timer ran out... do some game loser processing here
        alert(`you lost`)

    }
    else {
        //add time to score and do some gam winning porcessing here?
        //alert(`you win`)
        gameScore = gameScore + timeLeft
        // alert(gameScore)
        let quizSection = document.querySelector('.center-quiz');
        quizSection.style.display = "none"
        let hiScoreSection = document.querySelector('.center-hiscore');
        hiScoreSection.style.display = "unset"
        let hiScoreMsg = document.querySelector('#msgHiscore')
        hiScoreMsg.textContent = `Your Score: ${gameScore}`




        ///.center-quiz
        ///.center-hiscore
    }
}
/*
//Local storage functions begin here
function getLocalStorage() {
    if (localStorage.getItem('myKey'){
        //Data item exists
    } else {
        //Data item doesn't exist,
    }
    if (localStorage.length > 0) {
        //Items are stored in local storage
    } else {
        //Local storage is empty
    }
}



let btnRollDice = document.body.querySelector('#rollDice')
btnRollDice.addEventListener('click', rollDice);


// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

function SortLocalStorage(){
   if(localStorage.length > 0){
      var localStorageArray = new Array();
      for (i=0;i<localStorage.length;i++){
          localStorageArray[i] = localStorage.key(i)+localStorage.getItem(localStorage.key(i));
      }
   }
   var sortedArray = localStorageArray.sort();
   return sortedArray;
}



*/