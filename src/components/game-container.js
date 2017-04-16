import React from 'react';
import {connect} from 'react-redux';

export function GameContainer(props) {
    return (
        <div className="game-container">
            <div className="game-header">
                Game Header
            </div>
            <div className="game-body">
                Game Body
            </div>
        </div>
    );
}

export default connect()(GameContainer);
