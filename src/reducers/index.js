import {CLICK_LETTER} from '../actions/';
import {fourLetterWords} from '../utils';

const wordToFind = fourLetterWords[Math.floor(Math.random()*fourLetterWords.length)];
let selectedLetters = [];
for (let i=0; i<wordToFind.length; i++) {
    selectedLetters.push(0);
}

export const initialState = {
    currentGame: 'fourLetters',
    fourLetters: {
        wordToFind: wordToFind,
        shuffledWord: breakDownLetters(wordToFind),
        proposition: '',
        selectedLetters: selectedLetters,
        won: false,
        over: false
    }
};

export const appReducer = (state=initialState, action) => {
    if(action.type === CLICK_LETTER && !state.fourLetters.selectedLetters[action.i]) { // check if letter has been clicked before
        let modifiedSelectedLetters = state.fourLetters.selectedLetters;
        modifiedSelectedLetters[action.i] = 1;
        // check if word is found
        let isWon = false, isOver = false;
        if (state.fourLetters.proposition.length === state.fourLetters.wordToFind.length - 1) { // game is over
            isOver = true;
            setTimeout(() => console.log("BLEH"), 3000);
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
    return state;
};

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
