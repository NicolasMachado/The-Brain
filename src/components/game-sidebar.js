import React from 'react';
import {connect} from 'react-redux';
import {getScores} from '../actions';

export class Sidebar extends React.Component {

    componentDidMount() {
        this.props.dispatch(getScores());
    }

    getHighScores() {
      let count = 1;
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
            const scores = this.props.scores.recentScores.map((score) => {
                return (<div key={score._id}>
                      <span className="scorename">{score.username}</span>
                      <span className="scorescore">{score.score}</span>
                  </div>)
            })
            return scores
        }

    render() {
        return (
            <div className="side-menu">
                <h3><img className="imgh3" src={require("../images/brain.png")} width="20px" alt="crown" /> The Brain</h3>
                <div className="scores userbrain">
                    <span className="scorename">1 - {this.props.scores.theBrain.username}</span>
                    <span className="scorescore">{this.props.scores.theBrain.score}</span>
                </div>
                <h3><img className="imgh3" src={require("../images/medal.png")} width="20px" alt="medal" /> Highscores</h3>
                <div className="scores">{this.getHighScores()}</div>
                <h3><img className="imgh3" src={require("../images/recent.png")} width="20px" alt="recent" /> Recent</h3>
                <div className="scores">{this.getRecentScores()}</div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Sidebar);
