import React from 'react';
import {connect} from 'react-redux';
import './css/main.min.css';
import Sidebar from './components/game-sidebar';
import GameHeader from './components/game-header';
import GameBody from './components/game-body';
import Favicon from 'react-favicon';
import {showSideMenu} from './actions';

export class App extends React.Component {

    componentDidMount() {
        const bodyWidth = document.getElementsByClassName("game-body")[0].offsetWidth;
        this.props.dispatch(showSideMenu(!(bodyWidth < 650)));
    }

    containerClass() {
        if (this.props.showSideMenu) {
            return "game-container withScores"
        }
        return "game-container"
    }

    render() {
            return (
                <div className="App">
                    <Favicon url={[require('./favicon.ico')]}/>
                    <Sidebar />
                    <div className={this.containerClass()}>
                        <GameHeader />
                        <GameBody />
                    </div>
                </div>
            );
        }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(App);
