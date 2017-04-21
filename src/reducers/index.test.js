import {appReducer, initialState} from './index';
import {clickLetter, getNextGame, eraseWord, passGame, startTimer, stopTimer, countDown, startGame, endGame, updateTimeOut, updatePoints, guessCalculus} from '../actions';

describe('appReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = appReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(initialState);
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = appReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toEqual(currentState);
    });

    describe('guessCalculus', () => {
        let state = Object.assign({}, initialState);
        it('Should guess and win', () => {
            state = appReducer(state, guessCalculus(initialState.calculus.expectedResult));
            expect(state.won).toEqual(true);
            expect(state.over).toEqual(true);
        });
        it('Should guess and lose', () => {
            state = appReducer(state, guessCalculus(initialState.calculus.expectedResult + 1));
            expect(state.won).toEqual(false);
            expect(state.over).toEqual(true);
        });
    });

    describe('updatePoints', () => {
        const initialPoints = 32;
        let state = Object.assign({}, initialState, {
            points: initialPoints
        });
        it('Should update points by passed amount', () => {
            state = appReducer(state, updatePoints(55));
            expect(state.points).toEqual(initialPoints + 55);
        });
    });

    describe('updateTimeOut', () => {
        let state = Object.assign({}, initialState);
        it('Should set timeOut to true', () => {
            state = appReducer(state, updateTimeOut(true));
            expect(state.timeOut).toEqual(true);
        });
        it('Should set timeOut to false', () => {
            state = appReducer(state, updateTimeOut(false));
            expect(state.timeOut).toEqual(false);
        });
    });

    describe('endGame', () => {
        let state = Object.assign({}, initialState);
        it('Should set currentGame to outro', () => {
            state = appReducer(state, endGame());
            expect(state.currentGame).toEqual('outro');
        });
    });

    describe('startGame', () => {
        let state = Object.assign({}, initialState);
        it('Should generate new random games', () => {
            state = appReducer(state, startGame());
            expect(state.fourLetters.wordToFind).not.toEqual(initialState.fourLetters.wordToFind);
            expect(state.calculus.expectedResult).not.toEqual(initialState.calculus.expectedResult);
        });
    });

    describe('countDown', () => {
        let state = Object.assign({}, initialState);
        it('Should count one tick down', () => {
            state = appReducer(state, countDown());
            expect(state.timer.currentTimer).toEqual(state.timer.timerLength - state.timer.timerResolution);
        });
    });

    describe('stopTimer', () => {
        let state = Object.assign({}, initialState);
        it('Should stop timer', () => {
            state = appReducer(state, stopTimer());
            expect(state.timer.timerIsActive).toEqual(false);
            expect(state.timer.currentTimer).toEqual(0);
        });
    });

    describe('startTimer', () => {
        let state = Object.assign({}, initialState);
        it('Should start timer', () => {
            state = appReducer(state, startTimer());
            expect(state.timer.timerIsActive).toEqual(true);
        });
    });

    describe('passGame', () => {
        let state = Object.assign({}, initialState, {
            fourLetters: {
                proposition: 'abc',
                selectedLetters: [1, 1, 1, 0]
            }});
        it('Should erase proposition', () => {
            state = appReducer(state, eraseWord());
            expect(state.fourLetters.proposition).toEqual('');
            expect(state.fourLetters.selectedLetters).toEqual([]);
        });
    });

    describe('eraseWord', () => {
        let state = Object.assign({}, initialState, {
            fourLetters: {
                proposition: 'abcd',
                selectedLetters: [1, 1, 1, 1]
            }});
        it('Should erase proposition', () => {
            state = appReducer(state, eraseWord());
            expect(state.fourLetters.proposition).toEqual('');
            expect(state.fourLetters.selectedLetters.length).toEqual(0);
        });
    });

    describe('getNextGame', () => {
        let state = Object.assign({}, initialState, {
            over: true,
            won: true,
            fourLetters: {
                proposition: 'abc',
                wordToFind: "abcd",
                selectedLetters: [0, 1, 1, 0]
            }});
        it('Should get next game', () => {
            let state;
            state = appReducer(state, getNextGame("fourLetters")); // reset fourLetters
            expect(state.fourLetters.proposition).toEqual('');
            expect(state.fourLetters.wordToFind).not.toEqual("abcd");
            expect(state.fourLetters.selectedLetters).toEqual([0, 0, 0, 0]);
            expect(state.over).toEqual(false);
            expect(state.won).toEqual(false);
            expect(["fourLetters", "calculus"]).toContain(state.currentGame);
        });
    });

    describe('clickLetter', () => {
        it('Should send letter proposition and lose game', () => {
            let state = Object.assign({}, initialState, {
                fourLetters: {
                    proposition: 'abc',
                    wordToFind: "abcd",
                    selectedLetters: [1, 1, 1, 0]
                }});
            state = appReducer(state, clickLetter(3, "a"));
            expect(state.fourLetters.proposition).toEqual("abca");
            expect(state.fourLetters.proposition).not.toEqual(state.fourLetters.wordToFind);
            expect(state.fourLetters.selectedLetters).toEqual([1, 1, 1, 1]);
            expect(state.over).toEqual(true);
            expect(state.won).toEqual(false);
        });

        it('Should send letter proposition and win game', () => {
            let state = Object.assign({}, initialState, {
                fourLetters: {
                    proposition: 'tes',
                    wordToFind: "test",
                    selectedLetters: [1, 1, 1, 0]
                }});
            state = appReducer(state, clickLetter(3, "t"));
            expect(state.fourLetters.proposition).toEqual("test");
            expect(state.fourLetters.selectedLetters).toEqual([1, 1, 1, 1]);
            expect(state.fourLetters.proposition.length).toEqual(state.fourLetters.wordToFind.length);
            expect(state.over).toEqual(true);
            expect(state.won).toEqual(true);
        });
    });
});
