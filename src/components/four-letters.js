import React from 'react';
import {connect} from 'react-redux';

export function FourLetters(props) {
    return (
        <div className="four-letters">
            Game: {props.currentGame}<br />
            Word to find: {props.fourLetters.wordToFind}
        </div>
    );
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);
