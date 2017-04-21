import {
    CLICK_LETTER,
    clickLetter,
    GET_NEXT_GAME,
    getNextGame,
    ERASE_WORD,
    eraseWord,
    PASS_GAME,
    passGame,
    START_TIMER,
    startTimer,
    STOP_TIMER,
    stopTimer,
    COUNT_DOWN,
    countDown,
    START_GAME,
    startGame,
    END_GAME,
    endGame,
    UPDATE_TIME_OUT,
    updateTimeOut,
    UPDATE_POINTS,
    updatePoints,
    GUESS_CALCULUS,
    guessCalculus,
} from './index';

describe('guessCalculus', () => {
    it('Should return the action', () => {
        const number = 50;
        const action = guessCalculus(number);
        expect(action.type).toEqual(GUESS_CALCULUS);
        expect(action.number).toEqual(number);
    });
});

describe('updatePoints', () => {
    it('Should return the action', () => {
        const amount = 50;
        const action = updatePoints(amount);
        expect(action.type).toEqual(UPDATE_POINTS);
        expect(action.amount).toEqual(amount);
    });
});

describe('updateTimeOut', () => {
    it('Should return the action', () => {
        const bool = true;
        const action = updateTimeOut(bool);
        expect(action.type).toEqual(UPDATE_TIME_OUT);
        expect(action.bool).toEqual(bool);
    });
});

describe('endGame', () => {
    it('Should return the action', () => {
        const action = endGame();
        expect(action.type).toEqual(END_GAME);
    });
});

describe('startGame', () => {
    it('Should return the action', () => {
        const action = startGame();
        expect(action.type).toEqual(START_GAME);
    });
});

describe('countDown', () => {
    it('Should return the action', () => {
        const action = countDown();
        expect(action.type).toEqual(COUNT_DOWN);
    });
});

describe('stopTimer', () => {
    it('Should return the action', () => {
        const action = stopTimer();
        expect(action.type).toEqual(STOP_TIMER);
    });
});

describe('startTimer', () => {
    it('Should return the action', () => {
        const action = startTimer();
        expect(action.type).toEqual(START_TIMER);
    });
});

describe('passGame', () => {
    it('Should return the action', () => {
        const gameToReset = "fourLetters";
        const action = passGame(gameToReset);
        expect(action.type).toEqual(PASS_GAME);
        expect(action.gameToReset).toEqual(gameToReset);
    });
});

describe('eraseWord', () => {
    it('Should return the action', () => {
        const action = eraseWord();
        expect(action.type).toEqual(ERASE_WORD);
    });
});

describe('clickLetter', () => {
    it('Should return the action', () => {
        const i = "10";
        const letter = "x";
        const action = clickLetter(i, letter);
        expect(action.type).toEqual(CLICK_LETTER);
        expect(action.i).toEqual(i);
        expect(action.letter).toEqual(letter);
    });
});

describe('getNextGame', () => {
    it('Should return the action', () => {
        const gameToReset = "fourLetters";
        const action = getNextGame(gameToReset);
        expect(action.type).toEqual(GET_NEXT_GAME);
        expect(action.gameToReset).toEqual(gameToReset);
    });
});
