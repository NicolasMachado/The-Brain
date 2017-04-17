import React from 'react';
import {connect} from 'react-redux';
import Timer from './timer';
import {startTimer} from '../actions';

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
            <button onClick={() => this.props.dispatch(startTimer())}>START</button>
                <br />Timer is currently {String(this.props.timer.timerIsActive)}
                {timer()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameHeader);
