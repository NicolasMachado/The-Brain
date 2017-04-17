import React from 'react';
import {connect} from 'react-redux';

export class GameHeader extends React.Component {

    const timer = () => {
        var countdownNumberEl = document.getElementsByClassName('countdown-number')[0];
        var countdown = 10;

        countdownNumberEl.textContent = countdown;

        setInterval(function() {
          countdown = --countdown < 0 ? 10 : countdown;

          countdownNumberEl.textContent = countdown;
        }, 1000);

        return <circle r="18" cx="20" cy="20"></circle>
    }

    render() {
        return (
            <div className="game-header">
                <div className="timer-container">
                <div className="countdown-number"></div>
                  <svg>
                    {timer()}
                  </svg>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameHeader);
