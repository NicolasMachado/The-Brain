# The Brain

Thinkful (https://www.thinkful.com/) third portfolio project.

## Technology

<img src="https://raw.githubusercontent.com/NicolasMachado/The-Brain/master/src/images/react.png" height="40px" alt="ReactJS" title="ReactJS" />
<img src="https://raw.githubusercontent.com/NicolasMachado/The-Brain/master/src/images/redux.png" height="40px" alt="Redux" title="Redux" />
<img src="https://raw.githubusercontent.com/NicolasMachado/The-Brain/master/src/images/css3.png" height="40px" alt="CSS3" title="CSS3" />
<img src="https://raw.githubusercontent.com/NicolasMachado/The-Brain/master/src/images/html5.png" height="40px" alt="HTML5" title="HTML5" />

## Description
The Brain is a simple game in which the player has 2 minutes to answer as many questions as possible. After each turn,
the next mini-game is chosen randomly in a preset pool of games (currently 2: Four Letters and Calculus).
For each mini-game, the faster the player answers, the more points they get.

- Four Letters: In this mini-game, the user has to recreate a four letters word randomly chosen in a pool of 4000 words.
The letters are shuffled and the user has to click them in the right order.
- Calculus: A short calculus expression is randomly generated and the user has to find the result.

## User interface

This single-page app is designed to work on mobile, tablets and desktop. Its interface is meant to be simple and intuitive.

## Under the hood

* The frontend is entirely built using React and Redux.
* Each mini-game is a single React component sending actions to a reducer.
* Adding new mini-games can be done very quickly and easily.
* A React test suite containing more than 40 test cases is implemented.

## Test version

If you want to give the game a try, head to https://nicolasmachado.github.io/The-Brain/.
