import React from 'react';
import {connect} from 'react-redux';
import FourLetters from './four-letters';
import Intro from './intro';
import Outro from './outro';

export class GameBody extends React.Component {
    render() {
        let gameToDisplay = null;
        if (this.props.currentGame === 'fourLetters') {
            gameToDisplay = <FourLetters />;
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
