let game = document.querySelector('.game');
let result = document.querySelector('.result');
let buttonGame = document.querySelector('.new-game');
let fields = document.querySelectorAll('.field');
let step = false;
let count = 0;
let zero = `<svg class="circle">
<circle r="45" cx="68" cy="68" stroke="rgba(46, 15, 186, 0.9)" stroke-width="10" fill="none" stroke-linecap="round">
</svg>`
let cross = `<svg class="cross">
<line class="first" x1="25" y1="25" x2="110" y2="110"
stroke="rgba(176, 21, 21, 1)" stroke-width="10" stroke-linecap="round"></line>
<line class="second" x1="110" y1="25" x2="25" y2="110"
stroke="rgba(176, 21, 21, 1)" stroke-width="10" stroke-linecap="round"></line>
</svg>`

buttonGame.addEventListener('click', newGame);
game.addEventListener('click', inGame);

function newGame () {
step = false;
count = 0;
result.innerText = '';
fields.forEach(item => {
    item.innerHTML= '';
    item.classList.remove('x', 'o', 'winner-line');
})
game.addEventListener('click', inGame)
};

function win () {
let winnerCombination = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

 for (let i = 0; i < winnerCombination.length; i++) {
     if (fields[winnerCombination[i][0]].classList.contains('x') && 
          fields[winnerCombination[i][1]].classList.contains('x') && 
          fields[winnerCombination[i][2]].classList.contains('x')) {
            setTimeout(()=> {
                fields[winnerCombination[i][0]].classList.add('winner-line');
                fields[winnerCombination[i][1]].classList.add('winner-line'); 
                fields[winnerCombination[i][2]].classList.add('winner-line');
                result.innerText = 'Crosses won';
          }, 1000);
          game.removeEventListener('click', inGame);
        } else if (fields[winnerCombination[i][0]].classList.contains('o') && 
        fields[winnerCombination[i][1]].classList.contains('o') && 
        fields[winnerCombination[i][2]].classList.contains('o')) {
          setTimeout(()=> {
              fields[winnerCombination[i][0]].classList.add('winner-line');
              fields[winnerCombination[i][1]].classList.add('winner-line'); 
              fields[winnerCombination[i][2]].classList.add('winner-line');
              result.innerText = 'Toe won';
        }, 1000);
        game.removeEventListener('click', inGame);
        } else if (count == 9) {
            setTimeout(()=> {
            result.innerText = 'Tie';
            game.removeEventListener('click', inGame)}, 1000);
        }
    };
};

function inGame (e) {
if (!step) stepCross(e.target);
else stepZero(e.target);
step=!step;
win()
}

function stepCross (target) {
target.innerHTML = cross;
target.classList.add('x');
let crossAudio = new Audio ('audio/cross.mp3')
crossAudio.play();
count++
}

function stepZero (target) {
target.innerHTML = zero;
target.classList.add('o');
let zeroAudio = new Audio ('audio/zero.mp3')
zeroAudio.play();
count++
};