export const CLICK_LETTER = 'CLICK_LETTER';
export const clickLetter = (i, letter) => ({
    type: CLICK_LETTER,
    i,
    letter
});

export const GET_NEXT_GAME = 'GET_NEXT_GAME';
export const getNextGame = (gameToReset) => ({
    type: GET_NEXT_GAME,
    gameToReset
});

export const ERASE_WORD = 'ERASE_WORD';
export const eraseWord = () => ({
    type: ERASE_WORD
});

export const PASS_GAME = 'PASS_GAME';
export const passGame = (gameToReset) => ({
    type: PASS_GAME,
    gameToReset
});

export const START_TIMER = 'START_TIMER';
export const startTimer = () => ({
    type: START_TIMER
});

export const STOP_TIMER = 'STOP_TIMER';
export const stopTimer = () => ({
    type: STOP_TIMER
});

export const COUNT_DOWN = 'COUNT_DOWN';
export const countDown = () => ({
    type: COUNT_DOWN
});

export const START_GAME = 'START_GAME';
export const startGame = () => ({
    type: START_GAME
});

export const END_GAME = 'END_GAME';
export const endGame = () => ({
    type: END_GAME
});
