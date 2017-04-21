import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import {Timer} from './timer';

describe('<Timer />', () => {
    it('renders without crashing', () => {
        shallow(<Timer timer={{currentTimer: 100}}/>);
    });

    it('Renders the form-guess initially', () => {
        const wrapper = shallow(<Timer points={50} timer={{currentTimer: 100}}/>);
        expect(wrapper.hasClass('timer-and-points')).toEqual(true);
        expect(wrapper.find('.total-points-display').text()).toEqual("Points: 50");
        expect(wrapper.find('.timer-container')).not.toBe(null);
    });
});
