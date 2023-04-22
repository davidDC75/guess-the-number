const dev = true; // mode dev

// Le numéro a deviner
let randomNumber = Math.floor(Math.random()*100)+1;

// Propositions précédentes
const guesses = document.querySelector('.guesses');


const lowOrHi = document.querySelector('p.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');


let lastResultState = false;
// texte Bravo ou faux
const lastResult = document.querySelector('.lastResult');
const lastResultContainer = document.getElementById('lastResultContainer');
const resultDisplayIcon = document.querySelector('span.result');
const resultDisplayText = document.querySelector('p.result');

const inputPatternValidation = /^(0*100|0*[1-9]|0*[1-9][\d])$/;

if (dev) {
    console.log('Résultat: '+randomNumber);
}

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

    css(lastResultContainer,{
        'background-color': state?'green':'red',
        'visibility': 'visible',
    });
    css(lowOrHi,{
        'visibility': state?'hidden':'visible',
    });
    return;
}

function resetResultStat() {
    css(lastResultContainer,{
        'visibility': 'hidden',
    });
    css(lowOrHi,{
        'visibility': 'hidden',
    });
    css(guesses,{
        'visibility': 'hidden',
    });
}

function checkGuess() {
    let userGuess = Number(guessField.value);

    if (guessField.value.match(inputPatternValidation) === null) {
        guessField.value='';
        guessField.focus();
        lastResult.textContent = 'Nombre invalide';
        lastResult.style.backgroundColor = 'red';
        setLastResultState(false);
        css(lowOrHi,{
            'visibility': 'hidden',
        });
        return;
    }
    if (guessCount === 1) {
        guesses.textContent = 'Proposition précédente : ';
        css(guesses,{
            'visibility': 'visible',
        });
        css(lowOrHi,{
            'visibility': 'visible',
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
        'visibility': 'visible',
    });
}

function resetGame() {
    guessCount = 1;
    resetResultStat();

    css(resetButton,{
        'visibility': 'hidden',
    });

    css(guesses,{
        'visibility': 'hidden',
    });

    css(lowOrHi,{
        'visibility': 'hidden',
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

    if (dev) {
        console.log('Résultat: '+randomNumber);
    }

}

guessSubmit.addEventListener('click', checkGuess);