import React from 'react';
import {connect} from 'react-redux';
import FourLetters from './four-letters';
import Intro from './intro';
import Outro from './outro';
import Calculus from './calculus';
import {passGame} from '../actions';
import KeyHandler, {KEYUP} from 'react-key-handler';

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
            return (<div>
            <div onClick={() => this.props.dispatch(passGame(this.props.currentGame))} className={myClass}>PASS</div>
            <KeyHandler keyEventName={KEYUP} keyValue=' '
                onKeyHandle={e => this.props.dispatch(passGame(this.props.currentGame))}></KeyHandler>
            </div>)
        }

        const submitButton = () => {
            if (this.props.over) {
                return <button className='button submit inactive'>SUBMIT</button>
            }
            return <button type="submit" className='button submit'>SUBMIT</button>
        }

        const wonDiv = (bonusPoints) => {
            if (this.props.over) {
                if (this.props.won) {
                    const bonus = bonusPoints > 0 ? <span className='bonus-points-display'>+ {bonusPoints}</span> : '';
                    return (<div>
                            <div className="points-display marker">10 {bonus} points</div>
                            <div className="won-message won marker">CORRECT</div>
                        </div>)
                } else {
                    return <div className="won-message defeat marker">INCORRECT</div>
                }
            }
            return ''
        }

        const submitFormButton = () => {
            if (!this.props.scoreForm) {
                return <button className='button submit inactive'>SUBMIT</button>
            }
            return <button type="submit" className='button submit'>SUBMIT</button>
        }

        let gameToDisplay = null;
        if (this.props.currentGame === 'fourLetters') {
            gameToDisplay = <FourLetters passButton={passButton} wonDiv={wonDiv} innerTimerTick={this.innerTimerTick} resetBonusPoints={this.resetBonusPoints}/>;
        } else if (this.props.currentGame === 'calculus') {
            gameToDisplay = <Calculus passButton={passButton} wonDiv={wonDiv} innerTimerTick={this.innerTimerTick} resetBonusPoints={this.resetBonusPoints} submitButton={submitButton} />;
        } else if (this.props.currentGame === 'intro') {
            gameToDisplay = <Intro />;
        } else if (this.props.currentGame === 'outro') {
            gameToDisplay = <Outro submitFormButton={submitFormButton} />;
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
