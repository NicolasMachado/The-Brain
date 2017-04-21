import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import CircularProgress from './CircularProgress';

describe('<CircularProgress />', () => {

    const CalculusGameMock = {
        expression: "1 + 2 + 3",
        expectedResult: 6,
        proposition: ''
    }
    const mockFunc = () => {};

    it('renders without crashing', () => {
        shallow(<CircularProgress />);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<CircularProgress />);
        expect(wrapper.hasClass('CircularProgress')).toEqual(true);
        expect(wrapper.find('.CircularProgress-Bg').exists()).toBe(true);
        expect(wrapper.find('.CircularProgress-Fg').exists()).toBe(true);
        expect(wrapper.find('.CircularProgress-Text').exists()).toBe(true);
    });
});
