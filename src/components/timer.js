import React from 'react';
import {connect} from 'react-redux';
import {countDown, stopTimer, endGame} from '../actions';

export class Timer extends React.Component {
    componentDidMount() {
        if (this.props.timer.timerIsActive) {
            this.timer = setInterval(() => {
                this.props.dispatch(countDown());
                this.checkTimer();
            }, this.props.timer.timerResolution*1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    checkTimer() {
        console.log('checking');
        if (this.props.timer.currentTimer < 0) {
            this.props.dispatch(stopTimer());
            this.props.dispatch(endGame());
            clearInterval(this.timer);
            clearInterval(this.timerCheck);
        }
    }

    render() {
        return (
            <div className="game-header">
                <div className="timer-container">
                    {Math.floor(this.props.timer.currentTimer)}
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Timer);
