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
