import React from 'react';
import {connect} from 'react-redux';
import {startGame, startTimer} from '../actions';

export class Intro extends React.Component {
    render() {
        return (
            <div className="intro">
                <h2 className="marker">The brain</h2>
                <div className="intro-text marker">You have 2 minutes to answer as many questions as possible.
                <br/><br/>The faster you answer, the more bonus points you get.
                <br /><br /> Good luck!</div>
                <div onClick={() => {this.props.dispatch(startGame()); this.props.dispatch(startTimer())}} className="button">
                    START GAME
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Intro);
