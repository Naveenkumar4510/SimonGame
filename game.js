var buttonColors=["red", "blue", "green" , "yellow" ];

var gamePattern=[];
var userClickedpattern=[];

var started=false;
var level=0;


$(document).keydown(function()
{
  
if(!started)
{
  $("#level-title").text("Level "+ level);
  nextSequence();
started=true;
}
});

$(".btn").click(function()
{
var userChosenColor=$(this).attr("id");

userClickedpattern.push(userChosenColor);
console.log(userClickedpattern);
playSound(userChosenColor);
animatePress(userChosenColor);

checkAnswer(userClickedpattern.length-1);

});


function nextSequence(){
  userClickedpattern=[];
  level++;
$("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColor=buttonColors[randomNumber];

gamePattern.push(randomChosenColor);

$("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);

}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){

$("#"+currentColor).addClass("pressed");
setTimeout(function()
{
  $("#"+currentColor).removeClass("pressed");
},100);
  
}

function checkAnswer(currentLevel1)
{
if(userClickedpattern[currentLevel1]===gamePattern[currentLevel1])
{
  console.log("success");

if(userClickedpattern.length===gamePattern.length){
setTimeout(function () {
  nextSequence();

},1000);
}
}
else{

  console.log("wrong");
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function()
{
  $("body").removeClass("game-over");
},200);
$("#level-title").text("Game Over,Press Any key to Restart");
startOver();
}
}
function startOver()
{

  level=0;
  gamePattern=[];
  started=false;
}