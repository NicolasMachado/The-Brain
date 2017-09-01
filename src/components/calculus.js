import React from 'react';
import {connect} from 'react-redux';
import {getNextGame, updateTimeOut, updatePoints, guessCalculus} from '../actions';
import KeyHandler, {KEYUP} from 'react-key-handler';

export class Calculus extends React.Component {
    componentDidMount() {
        this.resetBonusPoints();
        this.calculusGuess.focus();
    }

    componentWillUnmount() {
        clearInterval(this.innerTimer);
    }

    componentDidUpdate() {
        if (this.props.over) {
            setTimeout(() => this.calculusGuess.value = "", this.props.timerBetweenGames - 10)
            clearInterval(this.innerTimer);
            if (this.props.timeOut === false) {
                this.props.dispatch(updateTimeOut(true));
                setTimeout(() => this.props.dispatch(getNextGame('calculus')), this.props.timerBetweenGames);
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

    submitCalculusResult(number) {
        this.props.dispatch(guessCalculus(Number(number)));
    }

    render() {
        return (
            <div className="calculus">
                <h2 className="marker">Find the result</h2>
                <div className="calculus-expression marker">
                    {this.props.calculus.expression}
                </div>
                <p>
                    <KeyHandler keyEventName={KEYUP} keyValue="p"
                        onKeyHandle={e => console.log("bleh")}></KeyHandler>
                    <input ref={(input) => { this.calculusGuess = input; }} type="number" className="marker"
                        id='calculusGuess' onInput={(e) => (this.submitCalculusResult(e.target.value))}></input>
                </p>
                {this.props.passButton()}
                {this.props.wonDiv(this.bonusPoints)}
            </div>
        );
    }
}

export const mapStateToProps = ({won, over, timeOut, calculus, timerBetweenGames}) => ({
    timerBetweenGames,
    timeOut,
    over,
    calculus,
    won
});

export default connect(mapStateToProps)(Calculus);
