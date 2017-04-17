import React from 'react';
import {connect} from 'react-redux';
import {clickLetter, getNextGame, eraseWord, passGame} from '../actions';

export class FourLetters extends React.Component {
    render() {
        const letterDivs = this.props.fourLetters.shuffledWord.map((letter, i) => {
            const classClicked = this.props.fourLetters.selectedLetters[i] ? "letter-click clicked" : "letter-click";
            return <div onClick={e => this.props.dispatch(clickLetter(i, letter))} className={classClicked} key={i}>{letter.toUpperCase()}</div>
        });

        const wonDiv = () => {
            if (this.props.fourLetters.over) {
                setTimeout(() => this.props.dispatch(getNextGame('fourLetters')), this.props.timerBetweenGames);
                if (this.props.fourLetters.won) {
                    return <div className="won-message won">CORRECT</div>
                } else {
                    return <div className="won-message defeat">INCORRECT</div>
                }
            }
            return ''
        }

        const eraseButton = () => {
            let myClass = "button erase";
            if (this.props.fourLetters.proposition.length === 0 || this.props.fourLetters.over) {
                myClass = "button erase inactive";
            }
            return <div onClick={() => this.props.dispatch(eraseWord())} className={myClass} >ERASE</div>
        }

        const passButton = () => {
            let myClass = "button pass";
            if (this.props.fourLetters.over) {
                myClass = "button pass inactive";
            }
            return <div onClick={() => this.props.dispatch(passGame('fourLetters'))} className={myClass}>PASS</div>
        }

        return (
            <div className="four-letters">
                <h2>Find the {this.props.fourLetters.wordToFind.length} letters word</h2>
                {letterDivs}
                <div>
                    {eraseButton()}
                    {passButton()}
                </div>
                <div className="word-proposition">
                    {this.props.fourLetters.proposition.toUpperCase()}
                </div>
                    {wonDiv()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);
