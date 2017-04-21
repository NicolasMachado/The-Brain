import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import {Calculus} from './calculus';

describe('<Calculus />', () => {

    const CalculusGameMock = {
        expression: "1 + 2 + 3",
        expectedResult: 6,
        proposition: ''
    }
    const mockFunc = () => {};

    it('renders without crashing', () => {
        shallow(<Calculus calculus={CalculusGameMock} submitButton={mockFunc} passButton={mockFunc} wonDiv={mockFunc} />);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<Calculus calculus={CalculusGameMock} submitButton={mockFunc} passButton={mockFunc} wonDiv={mockFunc} />);
        expect(wrapper.hasClass('calculus')).toEqual(true);
        expect(wrapper.find('#calculus-form').exists()).toBe(true);
        expect(wrapper.find('#calculusGuess').exists()).toBe(true);
    });
});
