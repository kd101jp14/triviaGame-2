$(document).ready(function () {

    // The user has 60 seconds to answer trivia questions, so counter starts at 60.
    var counter = 60;

    //The `interval` variable is defined within the restart function.
    // It is declared globally so other functions may have access to it.
    var interval;

    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var unanswered = 0;

    // The user first sees the start screen.
    $("#startScreen").show();
    $("#gameScreen, #timeUpScreen").hide();

    // When the user presses the start button, quiz is displayed and countdown starts.
    // (This function is also executed when the user presses the restart button after results are displayed.)
    $(".playbtn").click(function () {
        $("#startScreen, #timeUpScreen").hide();
        $("#gameScreen").show();
        $("#splash")[0].play();
        counter = 60;
        restart();
    });

    // User's choices are used to determine the amount correct, incorrect, and unanswered.
    function submitAnswer() {

        var numOfQuestions = 6;
        var ansArr = ["a", "c", "b", "c", "a", "b"];

        // Get the values of the user's input ans store them in variables.
        var q1Val = $("#form1 input[type='radio']:checked").val();
        var q2Val = $("#form2 input[type='radio']:checked").val();
        var q3Val = $("#form3 input[type='radio']:checked").val();
        var q4Val = $("#form4 input[type='radio']:checked").val();
        var q5Val = $("#form5 input[type='radio']:checked").val();
        var q6Val = $("#form6 input[type='radio']:checked").val();
        

        console.log(q1Val, q2Val, q3Val, q4Val, q5Val, q6Val);

        // Loop through the values, compare them to the correct answers in the `ansArr` array,
        // and determine if it is unanaswered, correct, or incorrect. Update results accordingly.
        for (i = 1; i <= numOfQuestions; i++) {

            if (eval("q" + i + "Val") === undefined) {
                unanswered++
                console.log(unanswered);
            } else if (eval("q" + i + "Val") === ansArr[i - 1]) {
                correctAnswer++
                console.log(correctAnswer);
            } else if (eval("q" + i + "Val") !== ansArr[i - 1]) {
                incorrectAnswer++
                console.log(incorrectAnswer);
            }
            $("#correct").text("Correct: " + correctAnswer);
            $("#incorrect").text("Incorrect: " + incorrectAnswer);
            $("#unanswered").text("Unanswered: " + unanswered);
        };
    };

    // Instead of waiting for time to run out, the user may see results by pressing the submit button.
    $("#submitButton").click(function () {
        submitAnswer();
        timeUp();
    });

    function restart() {
        // All choice are cleared/unchecked.
        $('input[class=userChoice]').prop('checked', false);
        // Time starts over.
        interval = setInterval(decreaseSeconds, 1000);
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
    }

    function decreaseSeconds() {
        counter--;
        $(secondsLeft).text("Seconds remaining: " + counter);
        if (counter === 0) {
            submitAnswer();
            timeUp();
            $(secondsLeft).text("Seconds remaining: 60");
        };
    };

    function timeUp() {
        $("#startScreen, #gameScreen").hide();
        $("#timeUpScreen").show();
        $("#bubbles")[0].play();
        clearInterval(interval);
        counter = 60;
    }
});