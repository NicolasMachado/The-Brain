import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import {Intro} from './intro';

describe('<Intro />', () => {
    it('renders without crashing', () => {
        shallow(<Intro />);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<Intro />);
        expect(wrapper.hasClass('intro')).toEqual(true);
        expect(wrapper.find('.intro-text').text()).not.toBe(null);
        expect(wrapper.find('.button').text()).toEqual("START GAME");
    });
});
