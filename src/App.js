import React, { Component } from 'react';
import {connect} from 'react-redux';
import './css/main.min.css';
import GameContainer from './components/game-container';
import SideMenu from './components/side-menu';

export class App extends React.Component {
    render() {
            return (
                <div className="App">
                    <SideMenu />
                    <GameContainer />
                </div>
            );
        }
}

export const mapStateToProps = state => ({
    currentGame: state.currentGame
});

export default connect(mapStateToProps)(App);
