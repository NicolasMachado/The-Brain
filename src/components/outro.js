import React from 'react';
import {connect} from 'react-redux';
import {startGame, startTimer, postNewScore, setScoreForm, setCurrentPlayerName} from '../actions';

export class Outro extends React.Component {

    componentDidMount() {
        this.username.focus();
        if (this.props.currentPlayerName) {
            this.props.dispatch(setScoreForm(true, "active"));
        } else {
            this.props.dispatch(setScoreForm(true, "inactive"));
        }

    }

    submitNewComment(e) {
        e.preventDefault();
        if (this.props.scoreFormStatus !== 'inactive' && this.props.scoreFormStatus !== 'loading') {
            const currentPLayer = e.target.username.value.slice(0, this.props.maxNameLength).toUpperCase();
            this.props.dispatch(setCurrentPlayerName(currentPLayer));
            this.props.dispatch(setScoreForm(true, "loading"));
            let data = new FormData();
            data.append('username', currentPLayer);
            data.append('score', this.props.points);
            this.props.dispatch(postNewScore(data));
        }
    }

    checkInput(e) {
        const input = document.getElementsByClassName("usernameinput")[0].value;
        if (input.length > 0) {
            this.props.dispatch(setScoreForm(true, "active"));
        } else {
            this.props.dispatch(setScoreForm(true, "inactive"));
        }
    }

    getScoreForm() {
      let classes = "button submit " +  this.props.scoreFormStatus;
      if (this.props.points > -0) {
          return (
              <form onSubmit={(e) => {this.submitNewComment(e)}}>
                  <div className="outro-text marker">
                      Your score is {this.props.points}
                  </div>
                  <p className="marker">Please enter your name below to submit your score to the leaderboard</p>
                  <input defaultValue={this.props.currentPlayerName} maxLength={this.props.maxNameLength}
                      ref={(input) => { this.username = input; }}
                      type="text" name="username" className="usernameinput marker"
                      onChange={(e) => {this.checkInput()}}></input><br/>
                  <button type="submit" className={classes}>SUBMIT</button>
              </form>
          )
      }
      return null
    }

    thankYouMessage() {
        if (this.props.scoreFormStatus === 'recorded') {
            return (
                <p className="marker">THANK YOU, YOUR SCORE HAS BEEN RECORDED</p>
            )
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="outro">
                {this.getScoreForm()}
                {this.thankYouMessage()}
                <div onClick={() => {this.props.dispatch(startGame()); this.props.dispatch(startTimer())}} className="button">
                    RETRY
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Outro);
