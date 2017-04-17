import React from 'react';
import {connect} from 'react-redux';
import {clickLetter} from '../actions';

export class FourLetters extends React.Component {
    render() {
        const divs = this.props.fourLetters.shuffledWord.map((letter, i) => {
            console.log(this.props.fourLetters.selectedLetters[i]);
            const classClicked = this.props.fourLetters.selectedLetters[i] ? "letter-click clicked" : "letter-click";
            return <div onClick={e => this.props.dispatch(clickLetter(i, letter))} className={classClicked} key={i}>{letter.toUpperCase()}</div>
        });

        return (
            <div className="four-letters">
                <h2>Make a {this.props.fourLetters.wordToFind.length} letters word</h2>
                Word to find: {this.props.fourLetters.wordToFind}<br />
                {divs}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);
