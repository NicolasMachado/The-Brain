import React from 'react';
import {connect} from 'react-redux';
import Timer from './timer';

export class GameHeader extends React.Component {
    render() {
        const timer = () => {
            if (this.props.timer.timerIsActive) {
                return <Timer />
            }
            return ''
        }
        return (
            <div className="game-header">
                {timer()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameHeader);
