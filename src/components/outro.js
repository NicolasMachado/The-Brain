import React from 'react';
import {connect} from 'react-redux';
import {startGame, startTimer, postNewScore} from '../actions';

export class Outro extends React.Component {

    submitNewComment(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('username', e.target.username.value);
        data.append('score', this.props.points);
        this.props.dispatch(postNewScore(data));
    }

    render() {
        return (
            <div className="outro">
                <div className="outro-text marker">
                    Your score is {this.props.points}
                </div>
                <form onSubmit={(e) => {this.submitNewComment(e)}}>
                    <input type="text" name="username"></input><br />
                    <input type="submit"></input>
                </form>
                <div onClick={() => {this.props.dispatch(startGame()); this.props.dispatch(startTimer())}} className="button">
                    RETRY
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Outro);
