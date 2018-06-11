var question1 = {
    question: "Who directed the so-called Cornetto Trilogy?",
    answers: ["Michael Bay", "Edgar Wright", "Wes Anderson", "David Fincher"],
    correctAnswer: "1"
}

var question2 = {
    question: "Dumb and Dumber has how many movies in the series?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "2"
}

var question3 = {
    question: "Tom Cruise onced became a Samurai in this film",
    answers: ["The Last Samurai", "Shanghai Noon", "The Great Wall", "Eastenders"],
    correctAnswer: "0"
}

var question4 = {
    question: "Which of the following is not a film directed by Michael Bay",
    answers: ["Avatar", "The Island", "Transformers", "Pacific Rim"],
    correctAnswer: "3"
}

var question5 = {
    question: "Which film is the latest installment of the Pirates of the Caribbean series?",
    answers: ["At World's End", "The Curse of the Black Pearl", "Dead Men Tell No Tales", "On Stranger Tides"],
    correctAnswer: "2"
}

var question6 = {
    question: "Who directed the ultra-gore film Kill Bill?",
    answers: ["Quintin Tarentino", "Guillermo del Torro", "Martin Scorsese", "Christopher Nolan"],
    correctAnswer: "0"
}

var question7 = {
    question: "Which of these films has Christopher Nolan NOT directed?",
    answers: ["Memento", "Inception", "The Prestige", "The Illusionist"],
    correctAnswer: "3"
}

var questionList = [question1, question2, question3, question4, question5, question6];
var subtractableList = questionList; //Copying the list so we can pop items from it and still reset it at the end to the questionList
var chosenQuestion;
var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var timer = 30;
var intervalId;

function chooseQuestion() {
    if (subtractableList.length > 0){
        chosenQuestion = subtractableList[Math.floor(Math.random() * subtractableList.length)];
        subtractableList.splice(subtractableList.indexOf(chosenQuestion), 1);
    }
    else {
        console.log("out of words");
    }
}

function setupQuestion() {
    $("#questiontext").text(chosenQuestion.question);
    for (var i = 0; i < 4; i++) {
        var locator = chosenQuestion.answers[i];
        $("#answer" + i.toString()).text(locator);
    }
}

function countDown() {
    timer--;
    $("#timer").text("Time Remaining: " + timer);
}

function startTimer() {
    intervalId = setInterval(countDown(), 1000);
}

$(".answer").on("click", function() {
    if ($(this).attr("value") === chosenQuestion.correctAnswer) {
        correct++;
        chooseQuestion();
        setupQuestion();
    }
    else {
        incorrect++;
        console.log("Incorrect:", incorrect);
        chooseQuestion();
        setupQuestion();
    }
})

startTimer();
console.log(timer);
chooseQuestion();
setupQuestion();