import {CLICK_LETTER, GET_NEXT_GAME, ERASE_WORD, PASS_GAME, START_TIMER, COUNT_DOWN,
  STOP_TIMER, START_GAME, END_GAME, UPDATE_TIME_OUT, UPDATE_POINTS, SHOW_SIDE_MENU,
  GUESS_CALCULUS, RECORD_SCORES, SET_SCORE_FORM, SET_CURRENT_PLAYER_NAME, CORRECT_CALCULUS} from '../actions/';
import {fourLetterWords} from '../utils';

// INITIALIZATION
const listGames = ['fourLetters', 'calculus'];
const newWordGame = generateWordGame();
const calculus = generateCalculusGame();
const timer = initializeTimer(120, 0.25);
export const initialState = Object.assign({}, {
    currentGame: 'intro',
    timerBetweenGames: 2000,
    timeOut: false,
    over: false,
    points: 0,
    won: false,
    maxNameLength: 5,
    scoreForm: false,
    scoreFormStatus: 'inactive',
    currentPlayerName: "",
    showSideMenu: false,
    scores: {
      highScores: [],
      recentScores: [],
      theBrain: {
        _id: null,
        score: "",
        username: ""
      }
    }
}, newWordGame, timer, calculus);

// ACTIONS
export const appReducer = (state=initialState, action) => {

    if(action.type === SHOW_SIDE_MENU) {
        return Object.assign({}, state, {showSideMenu: action.param});
    }

    if(action.type === SET_CURRENT_PLAYER_NAME) {
        return Object.assign({}, state, {currentPlayerName: action.name});
    }

    if(action.type === SET_SCORE_FORM) {
        return Object.assign({}, state, {scoreForm: action.active, scoreFormStatus: action.status});
    }

    if(action.type === RECORD_SCORES) {
        return Object.assign({}, state, {scores: action.scores, scoreForm: false, scoreFormStatus: 'recorded', points: 0});
    }

    if(action.type === UPDATE_POINTS) {
        const points = state.points + action.amount;
        return Object.assign({}, state, {points: points});
    }

    if(action.type === UPDATE_TIME_OUT) {
        return Object.assign({}, state, {timeOut: action.bool});
    }

    if(action.type === END_GAME) {
        return Object.assign({}, state, {currentGame: 'outro'});
    }

    if(action.type === START_GAME) {
        const scores = state.scores;
        const currentPlayerName = state.currentPlayerName;
        const showSideMenu = state.showSideMenu;
        const game = getRandomGame();
        const newWordGame = generateWordGame();
        const newCalculusGame = generateCalculusGame();
        return Object.assign({}, state, initialState, newWordGame, newCalculusGame, {showSideMenu}, {scores}, {currentPlayerName}, {currentGame: game});
    }

    if(action.type === COUNT_DOWN) {
        return Object.assign({}, state,
            {timer: {
                timerLength: state.timer.timerLength,
                currentTimer: state.timer.currentTimer - state.timer.timerResolution,
                timerResolution: state.timer.timerResolution,
                timerIsActive: state.timer.timerIsActive
            }});
    }

    if(action.type === START_TIMER) {
        return Object.assign({}, state,
            {timer: {
                timerLength: state.timer.timerLength,
                currentTimer: state.timer.timerLength,
                timerResolution: state.timer.timerResolution,
                timerIsActive: true
            }});
    }

    if(action.type === STOP_TIMER) {
        return Object.assign({}, state,
            {timer: {
                timerLength: state.timer.timerLength,
                currentTimer: 0,
                timerResolution: state.timer.timerResolution,
                timerIsActive: false
            }});
    }

    if(action.type === GET_NEXT_GAME && state.timer.currentTimer > 0) {
        const newGame = selectRandomNewGame(action.gameToReset);
        const game = getRandomGame();
        return Object.assign({}, state, {currentGame: game, timeOut: false, over: false, won: false}, newGame);
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
            over: isOver,
            won: isWon,
            fourLetters: {
                wordToFind: state.fourLetters.wordToFind,
                shuffledWord: state.fourLetters.shuffledWord,
                proposition: state.fourLetters.proposition + action.letter,
                selectedLetters: modifiedSelectedLetters
            }});
    }

    if(action.type === GUESS_CALCULUS && !state.over && (state.calculus.proposition.length < 6)) {
        let proposition = state.calculus.proposition + action.letter;
        let isWon, isOver = false;
        if (proposition === String(state.calculus.expectedResult)) { // is it won?
            isWon = true;
            isOver = true;
        }
        return Object.assign({}, state, {
            over: isOver,
            won: isWon,
            calculus: {
                expectedResult: state.calculus.expectedResult,
                expression: state.calculus.expression,
                proposition
            }});
    }

    if(action.type === CORRECT_CALCULUS && (state.calculus.proposition.length > 0)) {
        return Object.assign({}, state, {
            calculus: {
                expectedResult: state.calculus.expectedResult,
                expression: state.calculus.expression,
                proposition: state.calculus.proposition.slice(0, -1)
            }});
    }

    if(action.type === ERASE_WORD && !state.over && state.fourLetters.proposition.length > 0) {
        return Object.assign({}, state, {
            fourLetters: {
                wordToFind: state.fourLetters.wordToFind,
                shuffledWord: state.fourLetters.shuffledWord,
                proposition: '',
                selectedLetters: []
            }});
    }

    if(action.type === PASS_GAME && !state.over) {
        const newGame = selectRandomNewGame(action.gameToReset);
        const game = getRandomGame();
        return Object.assign({}, state, {currentGame: game}, newGame)
    }

    return state;
};

function selectRandomNewGame(gameToReset) {
    if (gameToReset === 'fourLetters') {
        return generateWordGame()
    } else if (gameToReset === 'calculus') {
        return generateCalculusGame()
    }
}

function initializeTimer(length, resolution) {
    return {
        timer: {
            timerLength: length,
            currentTimer: length,
            timerResolution: resolution,
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
            selectedLetters: selectedLetters
    }}
}

function generateCalculusGame() {
    const signs = ['+', '-', '*'];
    const randSign1 = signs[Math.floor(Math.random()*signs.length)];
    const randSign2 = signs[Math.floor(Math.random()*signs.length)];
    const randNumber1 = Math.floor(Math.random()*10);
    const randNumber2 = Math.floor(Math.random()*10);
    const randNumber3 = Math.floor(Math.random()*10);
    const randExpression = String(randNumber1) + ' ' + randSign1 + ' ' + String(randNumber2) + ' ' + randSign2 + ' ' + String(randNumber3);
    let expectedResult;
    if (randSign2 === '*') {
        expectedResult = calculate(randNumber1, calculate(randNumber2, randNumber3, randSign2), randSign1);
    } else {
        expectedResult = calculate(calculate(randNumber1, randNumber2, randSign1), randNumber3, randSign2);
    }

    return {
        calculus: {
            expression: randExpression,
            expectedResult: expectedResult,
            proposition: ''
    }}
}

function calculate(a, b, sign) {
    if (sign === '+') {
        return a + b;
    } else if (sign === '-') {
        return a - b;
    } else if (sign === '*') {
        return a * b;
    }
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
