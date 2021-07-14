var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var started = false;
var level = 0;


$('#level-title').click(function() {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$(document).keypress(function() {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound('sounds/' + userChosenColour + '.mp3');
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('failure');
    playSound('sounds/wrong.mp3');

    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key/Click here to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound('sounds/' + randomChosenColour + '.mp3');
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}


function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}
