import React from 'react';
import {connect} from 'react-redux';
import {countDown, stopTimer, endGame} from '../actions';
import CircularProgress from './CircularProgress';

export class Timer extends React.Component {
    componentDidMount() {
        if (this.props.timer.timerIsActive) {
            this.timer = setInterval(() => {
                this.checkTimer();
            }, this.props.timer.timerResolution*1000);
        }
    }

    checkTimer() {
        if (!this.props.timeOut) {
            this.props.dispatch(countDown());
        }
        if (this.props.timer.currentTimer <= 0) {
            this.props.dispatch(stopTimer());
            this.props.dispatch(endGame());
            clearInterval(this.timer);
        }
    }

    displayTime() {
        const minutes = Math.floor(this.props.timer.currentTimer/60);
        const seconds = Math.floor(this.props.timer.currentTimer - (minutes*60));
        const addedZeroS = seconds < 10 ? '0' : '';
        const addedZeroM = minutes < 10 ? '0' : '';
        return `${addedZeroM}${minutes}:${addedZeroS}${seconds}`
    }

    render() {
        return (
            <div className="timer-and-points">
                <div className="timer-container">
                    <CircularProgress
                        strokeWidth="15"
                        radius="80"
                        percentage={(this.props.timer.currentTimer/this.props.timer.timerLength)*100}
                        timeText={this.displayTime()}/>
                </div>
                <div className="total-points-display marker">
                    Points: {this.props.points}
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Timer);
