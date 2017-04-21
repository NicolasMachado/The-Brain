import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import {GameHeader} from './game-header';

describe('<GameHeader />', () => {
    it('renders without crashing', () => {
        shallow(<GameHeader timer={{timerIsActive: true}} />);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<GameHeader timer={{timerIsActive: true}} />);
        expect(wrapper.hasClass('game-header')).toEqual(true);
    });
});
