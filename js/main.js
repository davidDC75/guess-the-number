let randomNumber = Math.floor(Math.random()*100)+1;

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let lastResultState = false;
const resultDisplayIcon = document.querySelector('span.result');
const resultDisplayText = document.querySelector('p.result');

console.log('Résultat: '+randomNumber);

let guessCount = 1;
let resetButton = document.querySelector('button.resetButton');

resetButton.addEventListener('click', resetGame);

function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
    return;
}

function setLastResultState(state) {
    resultDisplayIcon.textContent = state?'check':'close';
    css(resultDisplayIcon,{
        'background-color': state?'green':'red',
        'display': state?'block':'block',
    });
    css(resultDisplayText,{
        'background-color': state?'green':'red',
        'display': state?'block':'block',
    });
    return;
}

function resetResultStat() {
    css(resultDisplayIcon,{
        'display': 'none'
    });
    css(resultDisplayText,{
        'display': 'none',
    });
}

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Proposition précédente : ';
        css(guesses,{
            'display': 'block',
        });
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Bravo, vous avez trouvé le nombre !';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setLastResultState(true);
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!! PERDU !!!';
        setLastResultState(false);
        setGameOver();
    } else {
        lastResult.textContent = 'Faux !';
        lastResult.style.backgroundColor = 'red';
        setLastResultState(false);
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Le nombre saisi est trop petit !';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Le nombre saisi est trop grand !';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    css(resetButton,{
        'display': 'block',
    });
    // resetButton = document.createElement('button');
    // resetButton.textContent = 'Commencer une nouvelle partie';
    // document.body.appendChild(resetButton);
    // resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    resetResultStat();

    css(resetButton,{
        'display': 'none',
    });

    css(guesses,{
        'display': 'none',
    });

    guesses.textContent = '';

    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    // resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random()*100)+1;
}

guessSubmit.addEventListener('click', checkGuess);