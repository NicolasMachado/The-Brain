import React from 'react';
import {connect} from 'react-redux';

export function GameContainer(props) {
    return (
        <div className="game-container">
            Game container
        </div>
    );
}

export default connect()(GameContainer);
