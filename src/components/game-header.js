import React from 'react';
import {connect} from 'react-redux';
import {startTimer} from '../actions';

export class GameHeader extends React.Component {

    componentWillMount() {
        this.props.dispatch(startTimer(this.props.timer.timerLength));
    }

    render() {
        return (
            <div className="game-header">
                <div className="timer-container">
                    {this.props.timer.currentTimer}
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameHeader);
