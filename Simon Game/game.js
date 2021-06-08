
var gamePattern=[];

var buttonColours=["red","blue","green","yellow"];

var userClickedPattern=[];

var started=false;

var level=0;

$(document).keypress(function() {
    if(!started) {
        
       $("#level-title").text("Level "+level);
       nextSequencce();
       started=true;
    }
});

function nextSequencce()
{
    userClickedPattern=[];
    
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4); //random integer from 0 and 3

    var randomChosenColour=buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}
//this function work for color pattern
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    //when clicked on button (patternwise)
    playSound(userChosenColour);

    //getting the index of the color
    checkAnswer(userClickedPattern.length-1);

    //CurrentColor
    animatePress(userChosenColour);

   
})

//check answer

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("SUCCESS"); 
        
        if(userClickedPattern.length === gamePattern.length )
        {
            setTimeout(function()
            {
                nextSequencce();
            },1000);
        }
    }
    else
    {
        console.log("Wrong");
        
        playSound("wrong");

        $("body").addClass("game-over")
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any key to Restart");

        //Restart game
        startOver();
    }
}

//function to restart the game

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;

}

//function for playing the sound 
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation function

function animatePress(currentColor)
{
    var activeButton= document.querySelector("."+currentColor);

    activeButton.classList.add("pressed");
    
    setTimeout(function()
    {
        activeButton.classList.remove("pressed");
    },100);
}

