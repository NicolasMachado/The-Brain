const request = require('superagent');

export const SET_SCORE_FORM = 'SET_SCORE_FORM';
export const setScoreForm = (active, status) => ({
    type: SET_SCORE_FORM,
    active,
    status
});

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

export const UPDATE_TIME_OUT = 'UPDATE_TIME_OUT';
export const updateTimeOut = (bool) => ({
    type: UPDATE_TIME_OUT,
    bool
});

export const UPDATE_POINTS = 'UPDATE_POINTS';
export const updatePoints = (amount) => ({
    type: UPDATE_POINTS,
    amount
});

export const GUESS_CALCULUS = 'GUESS_CALCULUS';
export const guessCalculus = (number) => ({
    type: GUESS_CALCULUS,
    number
});

export const RECORD_SCORES = 'RECORD_SCORES';
export const recordScores = response => ({
    type: RECORD_SCORES,
    scores: response
});

export const postNewScore = (data) => dispatch => {
    SARequestAPI('post', '/tbscore', data, recordScores, dispatch);
};

export const getScores = () => dispatch => {
    SARequestAPI('get', '/tbscore', null, recordScores, dispatch);
};

//const API_URL = "https://rimworld-stories.herokuapp.com";
const API_URL = "http://127.0.0.1:8080";

// blueprint superagent function to request data from the API
function SARequestAPI(type, url, data, actionCreator, dispatch) {
    //console.log('SA request to:' + API_URL + url);
    request(type, API_URL + url)
      .send(data)
      .end(function(err, resp) {
          const apiResp = JSON.parse(resp.text);
          dispatch(actionCreator(apiResp))
    });
}
