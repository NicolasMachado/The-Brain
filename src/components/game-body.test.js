import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import FourLetters from './four-letters';
import Intro from './intro';
import Outro from './outro';
import Calculus from './calculus';

import {GameBody} from './game-body';

describe('<GameBody />', () => {
    it('renders without crashing', () => {
        shallow(<GameBody />);
    });

    it('Renders four letters game', () => {
        const wrapper = shallow(<GameBody currentGame="fourLetters" />);
        expect(wrapper.find(FourLetters).exists()).toBe(true);
    });

    it('Renders intro', () => {
        const wrapper = shallow(<GameBody currentGame="intro" />);
        expect(wrapper.find(Intro).exists()).toBe(true);
    });

    it('Renders outro', () => {
        const wrapper = shallow(<GameBody currentGame="outro" />);
        expect(wrapper.find(Outro).exists()).toBe(true);
    });

    it('Renders calculus game', () => {
        const wrapper = shallow(<GameBody currentGame="calculus" />);
        expect(wrapper.find(Calculus).exists()).toBe(true);
    });
});
