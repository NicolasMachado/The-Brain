import React from 'react';
import {connect} from 'react-redux';
import {postNewScore, getScores} from '../actions';

export class Sidebar extends React.Component {

    componentDidMount() {
        this.props.dispatch(getScores());
    }

    submitNewComment(e) {
        e.preventDefault();
        let data = new FormData();
        data.append('username', e.target.username.value);
        data.append('score', e.target.score.value);
        this.props.dispatch(postNewScore(data));
    }

    scores() {
      let count = 0;
          const scores = this.props.scores.map((score) => {
              count++;
              return (<div key={score._id}>
                    <span className="scorename">{count} - {score.username}</span>
                    <span className="scorescore">{score.score}</span>
                </div>)
          })
          return scores
      }

    render() {
        return (
            <div className="side-menu">
                <h2>Highscores</h2>
                <div className="scores">{this.scores()}</div>
                <form onSubmit={(e) => {this.submitNewComment(e)}}>
                    <input type="text" name="username"></input><br />
                    <input type="number" name="score"></input><br />
                    <input type="submit"></input>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Sidebar);
