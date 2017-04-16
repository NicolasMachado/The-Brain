import {START_NEW_GAME} from '../actions/';
import {fourLetterWords} from '../utils';

export const initialState = {
    currentGame: 'fourLetters',
    fourLetters: {
        wordToFind: fourLetterWords[Math.floor(Math.random()*fourLetterWords.length)],
        proposition: ''
    }
};

export const appReducer = (state=initialState, action) => {
    return state;
};
