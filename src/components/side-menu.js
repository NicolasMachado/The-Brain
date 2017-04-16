import React from 'react';
import {connect} from 'react-redux';

export function SideMenu(props) {
    return (
        <div className="side-menu">
            Side Menu
        </div>
    );
}

export default connect()(SideMenu);
