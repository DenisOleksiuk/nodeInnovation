// import styles
import '../scss/style.scss';

// import js modules
import displayPlayerTable from './display/playerTable/displayPlayerTable';
import setHandControls from './utility/setHandControls';
import Menu from './components/mainMenu';
import GameField from './components/GameField';
import Player from './components/Player';
import Game from './components/Game';
import cardsJSON from './cards/cards.json';
import parseCards from './cards/parseCards';
import GameUI from './components/GameUI';
import chat from './utility/chat';

// set up and display main menu
const menu = new Menu(document.body);
menu.render();

// display game UI
document.body.prepend(displayPlayerTable.init());

// add event listeners to hand controls
setHandControls();

// contains dom elements
const gameUI = new GameUI();

// contains sorted card objects
const arrOfCards = parseCards(cardsJSON);
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(arrOfCards);
const gameField = new GameField(arrOfCards);

// contains players properties and cards
const player1 = new Player(gameUI, 'Player1', 1);
const player2 = new Player(gameUI, 'Player2', 2);

// work with all main objects
const game = new Game(gameUI, player1, player2, gameField);
game.newTurn();

chat();
