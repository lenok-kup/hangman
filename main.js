const body = document.body;
btn = document.createElement('button');
btn.classList.add('start-btn');
btn.textContent = "Let's play";
body.appendChild(btn);


const words = [{ hint: 'This is small box under the christmas tree', answer: 'present' }, { hint: 'Next season after autumn', answer: 'winter' }, { hint: 'A man, who brings presents for children', answer: 'santa' }, { hint: 'The name of the holiday like New Year', answer: 'christmas' }, { hint: 'Frozen water', answer: 'ice' }, { hint: 'A place, where you can go skating', answer: 'rink' }, { hint: 'White on the ground in winter', answer: 'snow' }, { hint: 'Children sing it for the holiday', answer: 'song' }];

let attempts = 0,
    previousIndex,
    index = chooseWord(words),
    gameWord = index.answer,
    isGameOver = false,
    wordHint = index.hint,
    guessLetter = 0;


const boardAttempts = document.createElement('p'),
    gameContainer = document.createElement('div'),
    boardInfo = document.createElement('div'),
    boardTitle = document.createElement('h1'),
    gallowsBlock = document.createElement('div'),
    boardList = document.createElement('ul'),
    gameBoard = document.createElement('div'),
    boardVisual = document.createElement('div'),
    modalWindow = document.createElement('div'),
    modalMessage = document.createElement('div'),
    modalWord = document.createElement('div'),
    boardDescription = document.createElement('p'),
    keyboard = document.createElement('ul'),
    modalBtn = document.createElement('button');

gameBoard.classList.add('game-board');
gameContainer.classList.add('game-container');
gameContainer.classList.add('hidden');
boardVisual.classList.add('game-board__visual');
keyboard.classList.add('game__keyboard');
boardInfo.classList.add('game-board__info');
boardTitle.classList.add('game-board__title');
gallowsBlock.classList.add('gallows-block');
boardList.classList.add('game-board__list');
boardDescription.classList.add('game-board__description');
boardAttempts.classList.add('game-board__attempt');
modalWindow.classList.add('modal__block');
modalMessage.classList.add('modal__title');
modalWord.classList.add('modal__word');
modalBtn.classList.add('modal__btn');

body.appendChild(gameContainer);
gameContainer.appendChild(gameBoard);
gameContainer.appendChild(keyboard);
gameBoard.appendChild(boardVisual);
gameBoard.appendChild(boardInfo);
boardVisual.appendChild(boardTitle);
boardVisual.appendChild(gallowsBlock);
boardInfo.appendChild(boardList);
boardInfo.appendChild(boardDescription);
boardInfo.appendChild(boardAttempts);
body.appendChild(modalWindow);
modalWindow.appendChild(modalMessage);
modalWindow.appendChild(modalWord);
modalWindow.appendChild(modalBtn);


boardTitle.textContent = 'Hangman game';
boardDescription.textContent = `Hint: ${wordHint}`;
boardAttempts.textContent = `Incorrect guesses: ${attempts} / 6`;

for (let i = 97; i <= 122; i++) {
    let letter = String.fromCharCode(i);
    const letterItem = document.createElement('li');
    letterItem.classList.add('game__letter');
    keyboard.appendChild(letterItem);
    letterItem.textContent = letter;
}

const letters = document.querySelectorAll('.game__letter'),
    numAlphabet = 26,
    arrUsedLetter = [],
    emptyLetter = ' ';

btn.addEventListener('click', startGame);

function startGame() {
    btn.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    console.log(gameWord);
}


function chooseWord(arr) {
    let index;
    do {
        index = arr[Math.floor(Math.random() * arr.length)];
    }
    while (index === previousIndex);
    previousIndex = index;
    return index;
}


for (let i = 0; i < gameWord.length; i++) {
    const liElement = document.createElement('li');
    liElement.classList.add('game-board__list-item');
    boardList.appendChild(liElement);
    liElement.textContent = emptyLetter;
}
let arrLi = document.querySelectorAll('.game-board__list-item');


letters.forEach((item) => {
    item.addEventListener('click', () => {
        let pressedLetter = item.innerHTML;
        let pressedButton = item;
        checkLetter(pressedLetter, pressedButton);
    })

})

document.addEventListener('keydown', (event) => {
    let pressedLetter = event.key.toLowerCase();
    let pressedButton = isLetterAlphabet(pressedLetter);
    checkLetter(pressedLetter, pressedButton);
})

function isLetterAlphabet(symbol) {
    for (let i = 0; i < numAlphabet; i++) {
        if (letters[i].innerHTML === symbol) {
            return letters[i];
        }
    }
}


function checkLetter(letter, btn) {
    if (gameWord.includes(letter)) {
        btn.classList.add('right--green');
        for (let i = 0; i < gameWord.length; i++) {
            if (gameWord[i] === letter && arrLi[i].textContent === emptyLetter) {
                arrLi[i].textContent = gameWord[i];
                arrLi[i].style.border = 'none';
            }
            if (arrLi[i].textContent === gameWord[i]) {
                guessLetter += 1;
            }
        }
        if (guessLetter === gameWord.length) {
            setTimeout(showModal, 300);
        } else {
            guessLetter = 0;
        }
    } else if (!arrUsedLetter.includes(letter)) {
        btn.classList.add('wrong--red');
        attempts += 1;
        boardAttempts.textContent = `Incorrect guesses: ${attempts} / 6`;
        arrUsedLetter.push(letter);
        showBodyElements(attempts);
    }
}


function showBodyElements(attempt) {
    let visibleFullBody = false;

    switch (attempt) {
        case 1:
            const head = document.createElement('div');
            head.classList.add('game-board__body-part');
            head.classList.add('game-board__head');
            gallowsBlock.appendChild(head);
            break;
        case 2:
            const body = document.createElement('div');
            body.classList.add('game-board__body-part');
            body.classList.add('game-board__full-body');
            gallowsBlock.appendChild(body);
            break;
        case 3:
            const leftHand = document.createElement('div');
            leftHand.classList.add('game-board__body-part');
            leftHand.classList.add('game-board__hand-left');
            gallowsBlock.appendChild(leftHand);
            break;
        case 4:
            const rightHand = document.createElement('div');
            rightHand.classList.add('game-board__body-part');
            rightHand.classList.add('game-board__hand-right');
            gallowsBlock.appendChild(rightHand);
            break;
        case 5:
            const leftLeg = document.createElement('div');
            leftLeg.classList.add('game-board__body-part');
            leftLeg.classList.add('game-board__leg-left');
            gallowsBlock.appendChild(leftLeg);
            break;
        case 6:
            const rightLeg = document.createElement('div');
            rightLeg.classList.add('game-board__body-part');
            rightLeg.classList.add('game-board__leg-right');
            gallowsBlock.appendChild(rightLeg);
            visibleFullBody = true;
            break;
    }

    if (attempts === 6 && visibleFullBody) {
        setTimeout(showModal, 300);
    }
}


function showModal() {
    isGameOver = true;
    gameContainer.style.display = 'none';
    modalWindow.style.display = 'flex';
    modalWord.textContent = `The word was: ${gameWord}`;
    modalBtn.textContent = 'Play again';
    if (attempts === 6) {
        modalMessage.textContent = "Game over! You've run out of attempts";
    }
    else if (guessLetter === gameWord.length) {
        modalMessage.textContent = "Congratulations! You guessed the word correctly";
    }
}


modalBtn.addEventListener('click', () => {
    replyGame();
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isGameOver) {
        replyGame();
    }
})

function replyGame() {
    modalWindow.style.display = 'none';
    gameContainer.style.display = 'flex';
    isGameOver = false;
    attempts = 0;
    guessLetter = 0;
    boardAttempts.textContent = `Incorrect guesses: ${attempts} / 6`;

    for (let j = 0; j < letters.length; j++) {
        letters[j].classList.remove('right--green');
        letters[j].classList.remove('wrong--red');
    }

    index = chooseWord(words);
    gameWord = index.answer;
    wordHint = index.hint;
    console.log(gameWord);
    boardDescription.textContent = `Hint: ${wordHint}`;
    arrUsedLetter.length = 0;

    for (let i = 0; i < arrLi.length; i++) {
        el = arrLi[i];
        el.remove();
    }

    for (let n = 0; n < gameWord.length; n++) {
        const liElement = document.createElement('li');
        liElement.classList.add('game-board__list-item');
        boardList.appendChild(liElement);
        liElement.textContent = emptyLetter;
    }

    arrLi = document.querySelectorAll('.game-board__list-item');
    gallowsBlock.innerHTML = '';

}








