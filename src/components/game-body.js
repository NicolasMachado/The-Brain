import React from 'react';
import {connect} from 'react-redux';
import FourLetters from './four-letters';
import Intro from './intro';
import Outro from './outro';
import Calculus from './calculus';
import {passGame} from '../actions';

export class GameBody extends React.Component {

    innerTimerTick(bonusPoints, innerTimer) {
        if (bonusPoints < 1) {
            clearInterval(innerTimer);
        }
        return bonusPoints -= 1;
    }

    render() {

        const passButton = () => {
            let myClass = "button pass";
            if (this.props.over) {
                myClass = "button pass inactive";
            }
            return <div onClick={() => this.props.dispatch(passGame(this.props.currentGame))} className={myClass}>PASS</div>
        }

        const wonDiv = (bonusPoints) => {
            if (this.props.over) {
                if (this.props.won) {
                    return <div><div className="won-message won">CORRECT</div>
                            <div className="points-display">10 + {bonusPoints}</div></div>
                } else {
                    return <div className="won-message defeat">INCORRECT</div>
                }
            }
            return ''
        }

        let gameToDisplay = null;
        if (this.props.currentGame === 'fourLetters') {
            gameToDisplay = <FourLetters passButton={passButton} wonDiv={wonDiv} innerTimerTick={this.innerTimerTick} resetBonusPoints={this.resetBonusPoints}/>;
        } else if (this.props.currentGame === 'calculus') {
            gameToDisplay = <Calculus passButton={passButton} wonDiv={wonDiv} innerTimerTick={this.innerTimerTick} resetBonusPoints={this.resetBonusPoints} />;
        } else if (this.props.currentGame === 'intro') {
            gameToDisplay = <Intro />;
        } else if (this.props.currentGame === 'outro') {
            gameToDisplay = <Outro />;
        }

        return (
            <div className="game-body">
                {gameToDisplay}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameBody);
