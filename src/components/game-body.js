import React from 'react';
import {connect} from 'react-redux';
import FourLetters from './four-letters';
import Intro from './intro';
import Outro from './outro';
import {passGame} from '../actions';

export class GameBody extends React.Component {

    render() {

        const passButton = () => {
            let myClass = "button pass";
            if (this.props.over) {
                myClass = "button pass inactive";
            }
            return <div onClick={() => this.props.dispatch(passGame('fourLetters'))} className={myClass}>PASS</div>
        }

        const wonDiv = () => {
            if (this.props.over) {
                if (this.props.won) {
                    return <div><div className="won-message won">CORRECT</div>
                            <div className="points-display">10 + {this.bonusPoints}</div></div>
                } else {
                    return <div className="won-message defeat">INCORRECT</div>
                }
            }
            return ''
        }

        let gameToDisplay = null;
        if (this.props.currentGame === 'fourLetters') {
            gameToDisplay = <FourLetters passButton={passButton} wonDiv={wonDiv} />;
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
