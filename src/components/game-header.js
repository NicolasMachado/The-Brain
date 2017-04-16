import React from 'react';
import {connect} from 'react-redux';

export function GameHeader(props) {
    return (
            <div className="game-header">
                Game Header
            </div>
    );
}

export default connect()(GameHeader);
