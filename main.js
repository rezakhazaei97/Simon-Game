var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

$(document).keydown(function(){
    if (!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var urlName = "sounds/" + userChosenColour + ".mp3"
    playSound(urlName);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence(),1000);
        }
    }else{
        var wrong = "sounds/wrong.mp3";
        playSound(wrong);
        $("body").addClass("game-over").delay(200).queue(function(next){
            $(this).removeClass("game-over");
            next();
        });
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var name = "sounds/" + randomChosenColour + ".mp3";
    playSound(name);
}

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    });
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}