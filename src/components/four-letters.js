import React from 'react';
import {connect} from 'react-redux';
import {clickLetter, getNextGame} from '../actions';

export class FourLetters extends React.Component {
    render() {
        const letterDivs = this.props.fourLetters.shuffledWord.map((letter, i) => {
            const classClicked = this.props.fourLetters.selectedLetters[i] ? "letter-click clicked" : "letter-click";
            return <div onClick={e => this.props.dispatch(clickLetter(i, letter))} className={classClicked} key={i}>{letter.toUpperCase()}</div>
        });

        const wonDiv = () => {
            if (this.props.fourLetters.over) {
                setTimeout(() => this.props.dispatch(getNextGame('fourLetters')), 1000);
                if (this.props.fourLetters.won) {
                    return <div className="won-message won">CORRECT</div>
                } else {
                    return <div className="won-message defeat">INCORRECT</div>
                }
            }
            return ''
        }

        const eraseButton = () => {
            let myClass = "erase-button";
            if (this.props.fourLetters.proposition.length === 0) {
                myClass = "erase-button inactive";
            }
            return <div className={myClass} >ERASE</div>
        }

        return (
            <div className="four-letters">
                <h2>Find the {this.props.fourLetters.wordToFind.length} letters word</h2>
                Word to find: {this.props.fourLetters.wordToFind}<br />
                {letterDivs}
                <div className="word-proposition">
                    {this.props.fourLetters.proposition.toUpperCase()}
                </div>
                {wonDiv()}
                {eraseButton()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);
