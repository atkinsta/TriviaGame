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

var questionList = [question1, question2, question3, question4, question5, question6]
var chosenQuestion;

function chooseQuestion() {
    chosenQuestion = questionList[Math.floor(Math.random() * questionList.length)];
}

function setupQuestion() {
    $("#questiontext").text(chosenQuestion.question);
    for (var i = 0; i < 4; i++) {
        var locator = chosenQuestion.answers[i];
        $("#answer" + i.toString()).text(locator);
    }
}

$(".answer").on("click", function() {
    if ($(this).attr("value") === chosenQuestion.correctAnswer) {
        console.log("correct");
        chooseQuestion();
        setupQuestion();
    }
    else {
        console.log("incorrect");
        chooseQuestion();
        setupQuestion();
    }
})

chooseQuestion();
setupQuestion();