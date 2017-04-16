import React from 'react';
import {connect} from 'react-redux';
import FourLetters from './four-letters';

export class GameBody extends React.Component {
    render() {
        let gameToDisplay = null;
        if (this.props.currentGame === 'fourLetters') {
            gameToDisplay = <FourLetters />;
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
