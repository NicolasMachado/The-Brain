import React from 'react';
import {connect} from 'react-redux';
import {getScores} from '../actions';

export class Sidebar extends React.Component {

    componentDidMount() {
        this.props.dispatch(getScores());
    }

    getHighScores() {
      let count = 0;
          const scores = this.props.scores.highScores.map((score) => {
              count++;
              return (<div key={score._id}>
                    <span className="scorename">{count} - {score.username}</span>
                    <span className="scorescore">{score.score}</span>
                </div>)
          })
          return scores
      }

      getRecentScores() {
        let count = 0;
            const scores = this.props.scores.recentScores.map((score) => {
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
                <div className="scores">{this.getHighScores()}</div>
                <h2>Recent</h2>
                <div className="scores">{this.getRecentScores()}</div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Sidebar);
