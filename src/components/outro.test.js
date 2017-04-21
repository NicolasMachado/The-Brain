import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import {Outro} from './outro';

describe('<Outro />', () => {
    it('renders without crashing', () => {
        shallow(<Outro />);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<Outro points={50} />);
        expect(wrapper.hasClass('outro')).toEqual(true);
        expect(wrapper.find('.outro-text').text()).toEqual("Your score is 50");
        expect(wrapper.find('.button').text()).toEqual("RETRY");
    });
});
