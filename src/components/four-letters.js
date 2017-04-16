import React from 'react';
import {connect} from 'react-redux';

export function FourLetters(props) {

    breakDownLetters('bleh');

    return (
        <div className="four-letters">
            <h2>Make a {props.fourLetters.wordToFind.length} letters word</h2>
            Word to find: {props.fourLetters.wordToFind}<br />
            {breakDownLetters(props.fourLetters.wordToFind)}
        </div>
    );
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);

function breakDownLetters(word) {
    const arrayLetters = [];
    for (let i = 0; i < word.length; i++) {
        arrayLetters.push(word[i]);
    }
    shuffle(arrayLetters);
    const divsToReturn = arrayLetters.map((letter, index) => {
        return <div className="letter-click" key={index}>{letter.toUpperCase()}</div>
    })
    return divsToReturn
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
