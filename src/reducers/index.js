import {CLICK_LETTER, GET_NEXT_GAME, ERASE_WORD, PASS_GAME} from '../actions/';
import {fourLetterWords} from '../utils';

// INITIALIZATION
const listGames = ['fourLetters'];
const game = getRandomGame();
const newWordGame = generateWordGame();
const timer = initializeTimer();
export const initialState = Object.assign({}, {
    currentGame: game,
    timerBetweenGames: 1000,
}, newWordGame, timer);

export const appReducer = (state=initialState, action) => {

    if(action.type === GET_NEXT_GAME) {
        let newGame;
        if (action.gameToReset === 'fourLetters') {
            newGame = generateWordGame();
        }
        const game = getRandomGame();
        return Object.assign({}, state, {currentGame: game}, newGame);
    }

    if(action.type === CLICK_LETTER && !state.fourLetters.selectedLetters[action.i]) { // check if letter has been clicked before
        let modifiedSelectedLetters = state.fourLetters.selectedLetters;
        modifiedSelectedLetters[action.i] = 1;
        let isWon = false, isOver = false;
        if (state.fourLetters.proposition.length === state.fourLetters.wordToFind.length - 1) { // game is over
            isOver = true;
            if (fourLetterWords.indexOf(state.fourLetters.proposition + action.letter) > -1) { // is it won?
                isWon = true;
            }
        }
        return Object.assign({}, state, {
            fourLetters: {
                wordToFind: state.fourLetters.wordToFind,
                shuffledWord: state.fourLetters.shuffledWord,
                proposition: state.fourLetters.proposition + action.letter,
                selectedLetters: modifiedSelectedLetters,
                won: isWon,
                over: isOver
            }});
    }

    if(action.type === GET_NEXT_GAME) {
        let newGame;
        if (action.gameToReset === 'fourLetters') {
            newGame = generateWordGame();
        }
        const game = getRandomGame();
        return Object.assign({}, state, {currentGame: game}, newGame);
    }

    if(action.type === ERASE_WORD && !state.fourLetters.over && state.fourLetters.proposition.length > 0) {
        return Object.assign({}, state, {
            fourLetters: {
                wordToFind: state.fourLetters.wordToFind,
                shuffledWord: state.fourLetters.shuffledWord,
                proposition: '',
                selectedLetters: [],
                won: state.fourLetters.won,
                over: state.fourLetters.over
            }});
    }

    if(action.type === PASS_GAME && !state.fourLetters.over) {
        let newGame;
        if (action.gameToReset === 'fourLetters') {
            newGame = generateWordGame();
        }
        const game = getRandomGame();
        return Object.assign({}, state, {currentGame: game}, newGame)
    }

    return state;
};

function initializeTimer() {
    return {
        timer: {
            timerLength: 120,
            currentTimer: 0,
            timerResolution: 0.5,
            timerIsActive: false
        }}
}

function getRandomGame() {
    return listGames[Math.floor(Math.random()*listGames.length)];
}

function generateWordGame() {
    const wordToFind = fourLetterWords[Math.floor(Math.random()*fourLetterWords.length)];
    let selectedLetters = [];
    for (let i=0; i<wordToFind.length; i++) {
        selectedLetters.push(0);
    }
    return {
        fourLetters: {
        wordToFind: wordToFind,
        shuffledWord: breakDownLetters(wordToFind),
        proposition: '',
        selectedLetters: selectedLetters,
        won: false,
        over: false
    }}
}

function breakDownLetters(word) {
    const arrayLetters = [];
    for (let i = 0; i < word.length; i++) {
        arrayLetters.push(word[i]);
    }
    shuffle(arrayLetters);
    return arrayLetters
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
