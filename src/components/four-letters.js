import React from 'react';
import {connect} from 'react-redux';
import {clickLetter} from '../actions';

export class FourLetters extends React.Component {
    render() {
        const letterDivs = this.props.fourLetters.shuffledWord.map((letter, i) => {
            const classClicked = this.props.fourLetters.selectedLetters[i] ? "letter-click clicked" : "letter-click";
            return <div onClick={e => this.props.dispatch(clickLetter(i, letter))} className={classClicked} key={i}>{letter.toUpperCase()}</div>
        });

        const wonDiv = () => {
            if (this.props.fourLetters.over) {
                console.log('gdf')
                if (this.props.fourLetters.won) {
                    return <div className="won-message">VICTORY</div>
                } else {
                    return <div className="won-message">DEFEAT</div>
                }
            }
            return ''
        }

        return (
            <div className="four-letters">
                <h2>Make a {this.props.fourLetters.wordToFind.length} letters word</h2>
                Word to find: {this.props.fourLetters.wordToFind}<br />
                {letterDivs}
                <div className="word-proposition">
                    {this.props.fourLetters.proposition.toUpperCase()}
                </div>
                {wonDiv()}
            </div>
        );
    }
}

export const mapStateToProps = state => (state);
export default connect(mapStateToProps)(FourLetters);
