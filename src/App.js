import React, { Component } from 'react';
import {connect} from 'react-redux';
import './css/main.min.css';
import SideMenu from './components/side-menu';
import GameHeader from './components/game-header';
import GameBody from './components/game-body';

export class App extends React.Component {
    render() {
            return (
                <div className="App">
                    <SideMenu />
                    <div className="game-container">
                        <GameHeader />
                        <GameBody />
                    </div>
                </div>
            );
        }
}

export const mapStateToProps = state => (state);

export default connect(mapStateToProps)(App);
