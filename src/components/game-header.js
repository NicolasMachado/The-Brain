import React from 'react';
import {connect} from 'react-redux';
import Timer from './timer';
import {showSideMenu} from '../actions';

export class GameHeader extends React.Component {

    closeMenu() {
        this.props.dispatch(showSideMenu(!this.props.showSideMenu));
    }


    render() {
        const timer = () => {
            if (this.props.timer.timerIsActive) {
                return <Timer />
            }
            return ''
        }
        return (
            <div className="game-header">
                <div className="expandside header" title="High Scores" onClick={(e) => {this.closeMenu()}}></div>
                {timer()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(GameHeader);
