import React from 'react';
import {connect} from 'react-redux';
import './css/main.min.css';
import Sidebar from './components/game-sidebar';
import GameHeader from './components/game-header';
import GameBody from './components/game-body';
import Favicon from 'react-favicon';

export class App extends React.Component {
    render() {
            return (
                <div className="App">
                    <Favicon url={[require('./favicon.ico')]}/>
                    <Sidebar />
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
