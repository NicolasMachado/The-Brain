import React from 'react';
import {connect} from 'react-redux';
import {getNextGame, updateTimeOut, updatePoints, guessCalculus} from '../actions';

export class Calculus extends React.Component {
    componentDidMount() {
        this.resetBonusPoints();
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

    render() {
        return (
            <div className="calculus">
                <h2 className="marker">Find the result</h2>
                <div className="calculus-expression marker">
                    {this.props.calculus.expression}
                </div>
                <div className="calculus-proposition">
                    <form id="calculus-form" onSubmit={e => this.submitCalculusResult(e)}>
                        <input id='calculusGuess' className="marker" name='calculusGuess' placeholder="?" autoComplete="off" required="true"></input>
                        <div>
                            {this.props.submitButton()}
                            {this.props.passButton()}
                        </div>
                    </form>
                </div>
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
