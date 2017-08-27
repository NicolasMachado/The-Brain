import React from 'react';
import {connect} from 'react-redux';
import KeyHandler, {KEYUP} from 'react-key-handler';
import {clickLetter, getNextGame, eraseWord, updateTimeOut, updatePoints} from '../actions';

export class FourLetters extends React.Component {
    componentDidMount() {
        this.resetBonusPoints();
        this.letterTimer = null;
    }

    componentWillUnmount() {
        clearInterval(this.innerTimer);
    }

    componentDidUpdate() {
        if (this.props.over) {
            clearInterval(this.innerTimer);
            if (this.props.timeOut === false) {
                this.props.dispatch(updateTimeOut(true));
                setTimeout(() => this.props.dispatch(getNextGame('fourLetters')), this.props.timerBetweenGames);
                if (this.props.won) {
                    this.props.dispatch(updatePoints(10 + this.bonusPoints));
                }
                setTimeout(() => this.resetBonusPoints(), this.props.timerBetweenGames);
            }
        }
    }

    resetBonusPoints(bonusPoints, innerTimer) {
        if (innerTimer) {
            clearInterval(innerTimer);
        }
        this.bonusPoints = 50;
        this.innerTimer = setInterval(() => { this.innerTimerTick()}, 250);
    }

    innerTimerTick() {
        this.bonusPoints = this.props.innerTimerTick(this.bonusPoints, this.innerTimer);
    }

    letterSelect(i, letter) {
        console.log(this.letterTimer + ' ' + i + ' ' + letter)
        if (!this.letterTimer && !this.props.fourLetters.selectedLetters[i]) {
            this.props.dispatch(clickLetter(i, letter));
            this.letterTimer = setTimeout(() => { this.letterTimer = null }, 50);
        }
    }

    render() {
        const letterDivs = this.props.fourLetters.shuffledWord.map((letter, i) => {
            const classClicked = this.props.fourLetters.selectedLetters[i] ? "letter-click clicked" : "letter-click";
            return (
                <div onClick={e => this.props.dispatch(clickLetter(i, letter))}
                    className={classClicked} key={i}>{letter.toUpperCase()}</div>
            );
        });

        const letterHandlers = this.props.fourLetters.shuffledWord.map((letter, i) => (
            <KeyHandler key={i} keyEventName={KEYUP} keyValue={letter}
                onKeyHandle={e => this.letterSelect(i, letter)}></KeyHandler>
        ));

        const eraseButton = () => {
            let myClass = "button erase";
            if (this.props.fourLetters.proposition.length === 0 || this.props.over) {
                myClass = "button erase inactive";
            }
            return <div onClick={() => this.props.dispatch(eraseWord())} className={myClass} >ERASE</div>
        }

        return (
            <div className="four-letters">
                <h2 className="marker">Find the {this.props.fourLetters.wordToFind.length} letters word</h2>
                {letterDivs}

                {letterHandlers}
                <KeyHandler keyEventName={KEYUP} keyValue='Backspace'
                    onKeyHandle={e => this.props.dispatch(eraseWord())}></KeyHandler>
                <KeyHandler keyEventName={KEYUP} keyValue='Delete'
                    onKeyHandle={e => this.props.dispatch(eraseWord())}></KeyHandler>

                <div>
                    {eraseButton()}
                    {this.props.passButton()}
                </div>
                <div className="word-proposition marker">
                    {this.props.fourLetters.proposition.toUpperCase()}
                </div>
                    {this.props.wonDiv(this.bonusPoints)}
            </div>
        );
    }
}

export const mapStateToProps = ({won, over, timeOut, fourLetters, timerBetweenGames}) => ({
    timerBetweenGames,
    timeOut,
    over,
    fourLetters,
    won
});

export default connect(mapStateToProps)(FourLetters);
