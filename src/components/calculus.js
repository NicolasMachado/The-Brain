import React from 'react';
import {connect} from 'react-redux';
import {getNextGame, updateTimeOut, updatePoints, guessCalculus, correctCalculus} from '../actions';
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

    submitCalculusResult(e) {
        e.preventDefault();
        if (e.target.calculusGuess) {
            this.props.dispatch(guessCalculus(Number(e.target.calculusGuess.value)));
            e.target.calculusGuess.value = "";
        }
    }

    keyHandlers() {
        let handlers = [];
        for (let i=0; i<10; i++) {
            handlers.push(<KeyHandler key={i} keyEventName={KEYUP} keyValue={String(i)} onKeyHandle={e => this.props.dispatch(guessCalculus(String(i)))}></KeyHandler>)
        }
        handlers.push(<KeyHandler key={1000} keyEventName={KEYUP} keyValue="-" onKeyHandle={e => this.props.dispatch(guessCalculus('-'))}></KeyHandler>)
        handlers.push(<KeyHandler key={2000} keyEventName={KEYUP} keyValue="Backspace" onKeyHandle={e => this.props.dispatch(correctCalculus())}></KeyHandler>)
        return handlers
    }

    render() {
        return (
            <div className="calculus">
                <h2 className="marker">Find the result</h2>
                {this.keyHandlers()}
                <div className="calculus-expression marker">
                    {this.props.calculus.expression}
                </div>
                {this.props.passButton()}
                <div className="marker word-proposition">
                    {this.props.calculus.proposition || "?"}
                </div>
                {this.props.wonDiv(this.bonusPoints)}
                <input ref={(input) => { this.calculusGuess = input; }} type="number" id='calculusGuess' hidden></input>
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
