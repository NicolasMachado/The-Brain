import React from 'react';
import {connect} from 'react-redux';
import {startGame, startTimer} from '../actions';

export class Outro extends React.Component {
    render() {
        return (
            <div className="outro">
                <div className="outro-text marker">
                    Your score is {this.props.points}
                </div>
                <div onClick={() => {this.props.dispatch(startGame()); this.props.dispatch(startTimer())}} className="button">
                    RETRY
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Outro);
