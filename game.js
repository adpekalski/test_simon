
var wholeSite = document.querySelector('body');
var toHide = document.querySelectorAll('.to-hide');
var scoreBoard = document.querySelector('.score-board');
var startButton = document.querySelector('.start');
var switchButton = document.querySelector('.switch');
var clickedButton = document.querySelectorAll('.btn-event');
var title = document.querySelector('#level-title');
var scoreExit = document.querySelector('.score-board');

var coloursPattern = [];
var coloursClickedByUser = [];

var level = 0;
var autoplay = false;

// funkcja odpalajaca sekwencje przyciskow po uruchomieniu przyciskiem start
startButton.addEventListener('click', nextButtonPlay);
function nextButtonPlay() {
  coloursClickedByUser = [];
  level++;
  title.innerHTML = '<br>Level ' + (level);
  var randomNumber = Math.floor(Math.random() * 4);
  var colourOfButton = ['red', 'blue', 'yellow', 'green'];
  var choseRandomColour = colourOfButton[randomNumber];
  coloursPattern.push(choseRandomColour);

  $('#' + choseRandomColour).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(choseRandomColour);
}

// funkcja zbierajaca klikniecia na przyciski
clickedButton.forEach(function (forClick) {
  forClick.addEventListener('click', (e) => {
    var colourClicked = e.target.id;
    //
    if (colourClicked !== "noneone" && colourClicked !== "nonetwo" && colourClicked !== "nonethree") {
      coloursClickedByUser.push(colourClicked);
      makeSound(colourClicked);
      watchGameplay(coloursClickedByUser.length-1);
    }
    //
    if (colourClicked === "nonetwo" && autoplay === true) {
      autoplay = false;
    } else if (colourClicked === "nonetwo" && autoplay === false) {
      autoplay = true;
    }
    //
    if (colourClicked === "nonethree") {
      for (let i = 0;i < 2; i++) {
        toHide[i].classList.add('hide');
      }
      scoreBoard.classList.add('show');
    }
        animateClicked(colourClicked);
  });
});

// play sound of clicked button or randomly chosen in sequence
function makeSound(soundColour) {
  var audio = new Audio('sounds/' + soundColour + '.mp3');
  audio.play();
}

//
function animateClicked(animateColour) {
  var colourToAnimate = document.querySelector('#' + animateColour);
  colourToAnimate.classList.add('pressed');
  if (colourToAnimate.id === 'nonetwo' && autoplay === false) {
    colourToAnimate.classList.remove('pressed');
  } else if (colourToAnimate.id !== 'nonetwo') {
    setTimeout(() => {
      colourToAnimate.classList.remove('pressed')
    }, 400);
  }
}

//
function restartGame(){
  coloursPattern = [];
  level = 0;
}

//
function watchGameplay(currentLevel) {
  //
  if (coloursClickedByUser[currentLevel] === coloursPattern[currentLevel]) {
    //
    if (coloursClickedByUser.length === coloursPattern.length) {
      if (autoplay === true) {
        setTimeout(() => {
          nextButtonPlay();
        }, 3000);
      }
      wholeSite.classList.add('well-done');
      setTimeout(() => {
        wholeSite.classList.remove('well-done')
      }, 400);
    }
  //
  } else {
    wholeSite.classList.add('game-over');
    setTimeout(() => {
      wholeSite.classList.remove('game-over')
    }, 400);
    makeSound('wrong')
    title.innerHTML = 'Game Over,<br>Start Again';
    restartGame();
  }
}

//
scoreExit.addEventListener('click', () => {
  scoreBoard.classList.remove('show');
  for (let j = 0;j < 2; j++) {
    toHide[j].classList.remove('hide');
  }
});
