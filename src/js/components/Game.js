/*
* all game action happens here
* take gameUI obj which contains all dom elements
* take gameField obj which contains all cards avaiable for all players (ages/leadership/special)
* take players objects which contains all cards avaible for players (hand/table/lead/influence)
* count avaible actions per turn, reduce on each action
* when avaible ections ends - turn passed to next player
*/
import header from '../display/playerTable/displayHeader';
import displayNewTurnModal from '../display/displayNewTurnModal';
import displayNextTurnBtn from '../display/displayNextTurnBtn';
import gameState from './gameState';
import getCardObject from '../utility/getCardObject';

//! ! TEST
import renderCard from '../cards/renderCard';
import getCard from '../cards/getCard';

export default class Game {
  constructor(gameUI, gameField, players, arrOfCards) {
    // store passed objects
    this.players = players;
    this.gameField = gameField;
    this.gameUI = gameUI;

    // initialize game field in players objects
    this.players.forEach((player) => {
      player.game = this;
    });

    // set default values
    this.currentPlayer = null;
    this.currentDeck = {
      domElement: gameUI.ageDecks.age1,
      cardsArray: gameField.ageDecks.age1,
    };
    this.turnPoints = 0;
    this.initGameState(players, arrOfCards);
    header.initPlayerNames(players);
  }

  initGameState(players, arrOfCards) {
    arrOfCards.forEach((e) => {
      switch (+e.age) {
        case 1:
          gameState.ageDecks.age1.push(e.innovation);
          break;
        case 2:
          gameState.ageDecks.age2.push(e.innovation);
          break;
        case 3:
          gameState.ageDecks.age3.push(e.innovation);
          break;
        case 4:
          gameState.ageDecks.age4.push(e.innovation);
          break;
        case 5:
          gameState.ageDecks.age5.push(e.innovation);
          break;
        case 6:
          gameState.ageDecks.age6.push(e.innovation);
          break;
        case 7:
          gameState.ageDecks.age7.push(e.innovation);
          break;
        case 8:
          gameState.ageDecks.age8.push(e.innovation);
          break;
        case 9:
          gameState.ageDecks.age9.push(e.innovation);
          break;
        case 10:
          gameState.ageDecks.age10.push(e.innovation);
          break;
        default:
          throw new Error(`Wrong number on age field in ${e}`);
      }
    });
    for (let i = 0; i < players.length; i += 1) {
      const player = `player${i}`;
      gameState[player].name = players[i].name;
      gameState.players.push(gameState[player]);
    }
    gameState.currentPlayer = gameState.players[0];
    gameState.currentPlayer.actionPoints = 2;
    gameState.activePlayer = gameState.players[0];
  }

  newTurn() {
    this.setCurrentPlayer();
    displayNewTurnModal(this.currentPlayer.name);
    this.turnPoints = 100;
    // timeout to display modal
    setTimeout(() => {
      this.removeActiveDeck();
      this.setActiveDeck(this.currentPlayer);
      this.currentPlayer.renderHand();
      this.currentPlayer.renderActiveZone();
      this.updateInfoTable();
    }, 450);
  }

  // use this after each action
  actionDone() {
    this.turnPoints -= 1;
    this.updateInfoTable();
    this.removeActiveDeck();
    if (this.turnPoints > 0) {
      this.setActiveDeck(this.currentPlayer);
    } else {
      this.disableHandEvents();
      displayNextTurnBtn(this.newTurn.bind(this));
    }
  }

  // set current players depends on previous player
  setCurrentPlayer() {
    if (this.currentPlayer === null) {
      this.currentPlayer = this.players[0];
    } else {
      for (let i = 0; i < this.players.length; i += 1) {
        if (this.currentPlayer === this.players[i]) {
          i += 1;
          if (i === this.players.length) i = 0;
          this.currentPlayer = this.players[i];
          break;
        }
      }
    }
  }

  // set active deck for current player
  setActiveDeck(currentPlayer) {
    Object.keys(this.gameField.ageDecks).forEach((ageDeckKey) => {
      if (ageDeckKey === `age${currentPlayer.currentAge}`) {
        // store active deck dom element
        this.currentDeck.domElement = this.gameUI.ageDecks[`age${currentPlayer.currentAge}`];
        // store active deck cards array
        this.currentDeck.cardsArray = this.gameField.ageDecks[ageDeckKey];
        //! Change current players currentAge if needed deck empty to go for the next deck
        //! Need recalcualte current age after each action, done by players method setCurrentAge
        if (this.currentDeck.cardsArray.length === 0) {
          this.currentPlayer.currentAge += 1;
        }
      }
    });
    // set style and event listener of active deck when all calculations finished
    this.currentDeck.domElement.classList.add('age-deck--active');
    //! USED onclick because got bug with AddEvenListener - cant remove listener
    this.currentDeck.domElement.onclick = this.takeCard.bind(this);

    // update current active deck displayed in aside
    this.updateCurrentDeckBlock();
  }

  // remove active deck class and eventlistener
  //! should use before each setActiveDeck method
  removeActiveDeck() {
    const cloneCurrentDeck = document.querySelector('#cloneCurrentDeck');
    if (cloneCurrentDeck !== null) cloneCurrentDeck.onclick = '';

    this.currentDeck.domElement.classList.remove('age-deck--active');
    this.currentDeck.domElement.onclick = '';
  }

  disableHandEvents() {
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card) => {
      card.onclick = '';
    });
  }

  // get card and render it in hand
  takeCard() {
    const cardObject = this.currentDeck.cardsArray.pop();
    this.currentPlayer.hand.push(cardObject);

    const cardElement = getCard.frontSide(cardObject);

    cardElement.onclick = () => { this.currentPlayer.playCard(cardObject, cardElement); }; //! TEMP

    renderCard.toHand(cardElement);

    this.currentPlayer.setCurrentAge();
    header.changePlayerStats(this.currentPlayer);

    this.actionDone();
  }

  // update info table in aside, use after each action done in newTurn method
  updateInfoTable() {
    this.gameUI.infoTable.name.innerText = this.currentPlayer.name;
    this.gameUI.infoTable.actionPoints.innerText = this.turnPoints;
  }

  // update current active deck displayed in aside, use after each time when setActiveDeck run
  updateCurrentDeckBlock() {
    // remove previous active deck if exists
    const prevDeckClone = document.querySelector('#cloneCurrentDeck');
    if (prevDeckClone !== null) prevDeckClone.remove();

    // clone current active deck
    const cloneCurrentDeck = this.currentDeck.domElement.cloneNode();
    cloneCurrentDeck.innerText = this.currentDeck.domElement.innerText;
    cloneCurrentDeck.id = 'cloneCurrentDeck';
    cloneCurrentDeck.onclick = this.takeCard.bind(this);

    // remove animation on each update of aside current deck
    cloneCurrentDeck.classList.remove('xyz-in');

    // display cloned deck in currentDeck block
    this.gameUI.currentDeck.append(cloneCurrentDeck);
  }

  updateGameState() {
    // update resources for each player
    gameState.players.forEach((player) => {
      player.tree = 0;
      player.tower = 0;
      player.crown = 0;
      player.bulb = 0;
      player.factory = 0;
      player.clock = 0;
      Object.keys(player.activeDecks).forEach((stack) => {
        const currentStack = player.activeDecks[stack];
        if (currentStack.cards.length > 0) {
          const highestCardInnovation = currentStack.cards[currentStack.cards.length - 1];
          const highestCard = getCardObject(highestCardInnovation);
          highestCard.resourses.forEach((e) => {
            player[e.resourceName] += 1;
          });
        }
      });
    });

    // update currentAge for each player
    gameState.players.forEach((player) => {
      Object.keys(player.activeDecks).forEach((stack) => {
        const currentStack = player.activeDecks[stack];
        if (currentStack.cards.length > 0) {
          const highestCardInnovation = currentStack.cards[currentStack.cards.length - 1];
          const highestCard = getCardObject(highestCardInnovation);
          if (highestCard.age > player.currentAge) { player.currentAge = highestCard.age; }
        }
      });
    });
  }
}
