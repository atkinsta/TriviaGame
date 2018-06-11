var question1 = {
    question: "Who directed the so-called Cornetto Trilogy?",
    answers: ["Michael Bay", "Edgar Wright", "Wes Anderson", "David Fincher"],
    correctAnswer: "1",
    searchTerm: "Shaun of the Dead"
}

var question2 = {
    question: "Dumb and Dumber has how many movies in the series?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "2",
    searchTerm: "Dumb and Dumber"
}

var question3 = {
    question: "Tom Cruise onced became a Samurai in which film?",
    answers: ["The Last Samurai", "Shanghai Noon", "The Great Wall", "Eastenders"],
    correctAnswer: "0",
    searchTerm: "The Last Samurai"
}

var question4 = {
    question: "Which of the following is not a film directed by Michael Bay?",
    answers: ["Avatar", "The Island", "Transformers", "Pacific Rim"],
    correctAnswer: "3",
    searchTerm: "Avatar Film"
}

var question5 = {
    question: "Which film is the latest installment of the Pirates of the Caribbean series?",
    answers: ["At World's End", "The Curse of the Black Pearl", "Dead Men Tell No Tales", "On Stranger Tides"],
    correctAnswer: "2",
    searchTerm: "Captain Jack Sparrow"
}

var question6 = {
    question: "Who directed the ultra-gore film Kill Bill?",
    answers: ["Quintin Tarantino", "Guillermo del Torro", "Martin Scorsese", "Christopher Nolan"],
    correctAnswer: "0",
    searchTerm: "Quintin Tarantino"
}

var question7 = {
    question: "Which of these films has Christopher Nolan NOT directed?",
    answers: ["Memento", "Inception", "The Prestige", "The Illusionist"],
    correctAnswer: "3",
    searchTerm: "Christopher Nolan"
}

var question8 = {
    question: "Which of Alfred Hitchcock films is seemingly one continuous shot?",
    answers: ["North by Northwest", "Dial M for Murder", "Rope", "Vertigo"],
    correctAnswer: "2",
    searchTerm: "Alfred Hitchcock"
}

var question9 = {
    question: "Prior to 2001: A Space Odyssey, Stanley Kubrick directed which war satire film?",
    answers: ["Dr. Strangelove", "Starship Troopers", "The Great Dictator", "M*A*S*H"],
    correctAnswer: "0",
    searchTerm: "Dr. Strangelove"
}

var question10 = {
    question: "All of the following films are musicals except for which?",
    answers: ["Sweeney Todd", "Whiplash", "Westside Story", "La La Land"]
}

var questionList = [question1, question2, question3, question4, question5, question6];
var subtractableList = questionList; //Copying the list so we can pop items from it and still reset it at the end to the questionList
var chosenQuestion;
var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var timer = 20;
var intervalId;
var timerRunning = false;

function countDown() {
    timer--;
    $("#timer").text("Time remaining: " + timer);
    if (timer <= 0) {
        noAnswer++;
        timeoutDisplay();
        dynamicImage();
        stopTimer();
        setTimeout(function () {
            setupQuestion();
        }, 5000);
    }
};

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        intervalId = setInterval(countDown, 1000)
    }
};

function stopTimer() {
    timer = 20;
    $("#timer").text("Time Remaining: 20")
    clearInterval(intervalId);
    timerRunning = false;
};

function chooseQuestion() {
    if (subtractableList.length > 0) {
        chosenQuestion = subtractableList[Math.floor(Math.random() * subtractableList.length)];
        subtractableList.splice(subtractableList.indexOf(chosenQuestion), 1);
    }
    else {
        finalscoreDisplay();
    }
};

function setupQuestion() {
    $("#questiontext").text(chosenQuestion.question);
    answerDisplay();
    for (var i = 0; i < 4; i++) {
        var locator = chosenQuestion.answers[i];
        $("#answer" + i.toString()).text(locator);
    }
    startTimer();
};

function winDisplay() {                       //The three display functions below this one could probably be written with if statements. Might come back to it if I have time. 
    $("#answerholder").empty();
    $("#answerholder").append($("<h2>").text("Correct!"));
    $("#answerholder").append($("<h3>").text("The answer was " + chosenQuestion.answers[chosenQuestion.correctAnswer]));
};

function lossDisplay() {
    $("#answerholder").empty();
    $("#answerholder").append($("<h2>").text("Incorrect!"));
    $("#answerholder").append($("<h3>").text("The answer was " + chosenQuestion.answers[chosenQuestion.correctAnswer]));
};

function timeoutDisplay() {
    $("#answerholder").empty();
    $("#answerholder").append($("<h2>").text("Out of Time!"));
    $("#answerholder").append($("<h3>").text("The answer was " + chosenQuestion.answers[chosenQuestion.correctAnswer]));
}

function answerDisplay() { 
    $("#imageholder").attr("src", "assets/images/trivia.gif")
    $("#answerholder").empty();
    $("#answerholder").append('<h3 class="answer" id="answer0" value="0"></h3>' +
                              '<h3 class="answer" id="answer1" value="1"></h3>' + 
                              '<h3 class="answer" id="answer2" value="2"></h3>' +
                              '<h3 class="answer" id="answer3" value="3"></h3>')
};

function finalscoreDisplay() {
    $("#question").empty();
    $("#question").append("<h2> Thank you for playing. Below is your final score </h2>" +
                          "<h3> Total correct answers: &emsp;" + correct + "</h3>" +
                          "<h3> Total incorrect answers: &emsp;" + incorrect + "</h3>" +
                          "<h3> Total time-outs: &emsp;&emsp;" + noAnswer + "</h3>" +
                          "<h1 class='answer' id='playagain'> Start over? </h1>")
};

function resetDisplay() {
    subtractableList = questionList;
    $("#questiontext").text("Welcome to Movie Trivia! Press start to being. You have 20 seconds for each question.")
    $("answerholder").empty();
    $("answerholder").append('<button id="startbutton" type="button" class="btn btn-info btn-large">Start!</button>');
}

function dynamicImage() {
    var APIKey = "BDU3KiPFpEdQOmsEDOWmrTfIrkdzo4Ji";
    var APIUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + chosenQuestion.searchTerm + "&limit=1&offset=0&rating=PG&lang=en"
    $.ajax({
        url: APIUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#imageholder").attr("src", response.data[0].images.original.url);
    });
};

$(document).on("click", ".answer", function () {
    if ($(this).attr("value") === chosenQuestion.correctAnswer) {
        correct++;
        dynamicImage();
        winDisplay();
        chooseQuestion();
        stopTimer();
        setTimeout(function () {
            setupQuestion();
        }, 5000);
    }
    else {
        incorrect++;
        dynamicImage();
        lossDisplay();
        chooseQuestion();
        stopTimer();
        setTimeout(function () {
            setupQuestion()
        }, 5000);
    }
})

$(document).on("click", "#startbutton", function() {
    startTimer();
    chooseQuestion();
    setupQuestion();
});

$(document).on("click", "#startbutton", resetDisplay());
