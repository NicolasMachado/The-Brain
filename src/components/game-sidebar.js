import React from 'react';
import {connect} from 'react-redux';
import {getScores, showSideMenu} from '../actions';

export class Sidebar extends React.Component {

    componentDidMount() {
        this.props.dispatch(getScores());
    }

    getHighScores() {
        if (this.props.scores.highScores.length > 0) {
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
    }

    getRecentScores() {
          if (this.props.scores.recentScores.length > 0) {
              const scores = this.props.scores.recentScores.map((score) => {
                  return (<div key={score._id}>
                        <span className="scorename">{score.username}</span>
                        <span className="scorescore">{score.score}</span>
                    </div>)
              })
              return scores
          }
      }

    sideCSS() {
        if (this.props.showSideMenu) {
            return "side-menu"
        }
        return "side-menu hidden"
    }

    clickClose() {
        this.props.dispatch(showSideMenu(false));
    }

    render() {
        return (
            <div className={this.sideCSS()}>
                <div className="sidewrapper">
                    <div className="expandside" onClick={(e) => {this.clickClose()}}>x</div>
                    <h3 className="brainscoretitle"><img className="imgh3" src={require("../images/brain.png")} width="20px" alt="crown" /> The Brain</h3>
                    <div className="scores userbrain">
                        <span className="scorename">{this.props.scores.theBrain.username}</span>
                        <span className="scorescore">{this.props.scores.theBrain.score}</span>
                    </div>
                    <h3><img className="imgh3" src={require("../images/medal.png")} width="20px" alt="medal" /> Highscores</h3>
                    <div className="scores">{this.getHighScores()}</div>
                    <h3><img className="imgh3" src={require("../images/recent.png")} width="20px" alt="recent" /> Latest</h3>
                    <div className="scores">{this.getRecentScores()}</div>
                    <div className="githublink">
                        <a href="https://github.com/NicolasMachado/The-Brain" target="_blank">
                        <img src={require("../images/github-logo-light.png")} width="35px" alt="Github" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Sidebar);
