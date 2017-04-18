import React from 'react';
import {connect} from 'react-redux';
import {startGame, startTimer} from '../actions';

export class Intro extends React.Component {
    render() {
        return (
            <div className="intro">
                <div onClick={() => {this.props.dispatch(startGame()); this.props.dispatch(startTimer())}} className="button">
                    START GAME
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Intro);
