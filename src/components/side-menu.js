import React from 'react';
import {connect} from 'react-redux';

export class SideMenu extends React.Component {
    render() {
        return (
            <div className="side-menu">
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(SideMenu);
