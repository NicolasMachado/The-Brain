import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import {FourLetters} from './four-letters';

describe('<FourLetters />', () => {

    const fourlettersGameMock = {
        wordToFind: "test",
        shuffledWord: ["s", "t", "e", "t"],
        proposition: 'tes',
        selectedLetters: [1, 1, 1, 0]
    }
    const mockFunc = () => {};

    it('renders without crashing', () => {
        shallow(<FourLetters fourLetters={fourlettersGameMock} passButton={mockFunc} wonDiv={mockFunc}/>);
    });

    it('Renders the right divs initially', () => {
        const wrapper = shallow(<FourLetters fourLetters={fourlettersGameMock} passButton={mockFunc} wonDiv={mockFunc}/>);
        expect(wrapper.hasClass('four-letters')).toEqual(true);
        expect(wrapper.find('.letter-click').length).toBe(4);
        expect(wrapper.find('.erase').exists()).toBe(true);
        expect(wrapper.find('.word-proposition').exists()).toBe(true);
    });
});
