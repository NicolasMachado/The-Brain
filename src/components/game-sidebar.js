import React from 'react';
import {connect} from 'react-redux';

export class Sidebar extends React.Component {

    render() {
        return (
            <div className="side-menu">
                <h2>Highscores</h2>
                <ol>
                    <li>USER 1</li>
                    <li>USER 2</li>
                    <li>USER 3</li>
                    <li>USER 4</li>
                </ol>
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(Sidebar);
