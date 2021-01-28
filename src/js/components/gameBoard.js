import gameState from './gameState';
import getCardObject from '../cards/getCardObject';
import getCardElement from '../cards/getCardElement';
import renderCard from '../cards/renderCard';
import updateGameState from '../utility/updateGameState';
import displayNewTurnModal from '../display/displayNewTurnModal';
import header from '../display/playerTable/displayHeader';
import dogmas from './dogma';
import specCard from '../specCards/specCard';
import socket from '../app';

const gameBoard = {
  display() {
    // display info block aside
    const nameBlock = document.querySelector('.info-table__player-name');
    nameBlock.innerText = gameState.activePlayer.name;
    const actionPointsBlock = document.querySelector('.info-table__action-points');
    actionPointsBlock.innerText = gameState.activePlayer.actionPoints;

    // remove previous active age deck
    let cloneCurrentDeck = document.querySelector('#cloneCurrentDeck');
    if (cloneCurrentDeck !== null) cloneCurrentDeck.onclick = '';
    const activeDeck = document.querySelector('.age-deck--active');
    if (activeDeck !== null) {
      activeDeck.classList.remove('age-deck--active');
      activeDeck.onclick = '';
    }

    // set avaiable age deck in modal block
    while (gameState.ageDecks[`age${gameState.activePlayer.currentAge}`].length === 0) {
      gameState.activePlayer.currentAge += 1;
    }
    const avaiableAgeDeck = document.querySelector(`#age${gameState.activePlayer.currentAge}`);
    avaiableAgeDeck.classList.add('age-deck--active');

    // set avaiable age deck in aside
    const prevDeckClone = document.querySelector('#cloneCurrentDeck');
    if (prevDeckClone !== null) prevDeckClone.remove();
    // clone current active deck
    cloneCurrentDeck = avaiableAgeDeck.cloneNode();
    cloneCurrentDeck.id = 'cloneCurrentDeck';
    cloneCurrentDeck.classList.add('age-deck--active');
    cloneCurrentDeck.classList.remove('xyz-in');
    if (gameState.activePlayer.currentAge !== 10) {
      cloneCurrentDeck.style.backgroundImage = `url(/assets/img/cards-bg/age-0${gameState.activePlayer.currentAge}-title.png)`;
    } else {
      cloneCurrentDeck.style.backgroundImage = 'url(/assets/img/cards-bg/age-10-title.png)';
    }
    // display cloned deck in currentDeck block
    document.querySelector('.current-deck__cards').append(cloneCurrentDeck);

    // get hand cards of active player
    const hand = document.querySelector('.hand__cards');
    hand.innerHTML = '';
    gameState.activePlayer.hand.forEach((cardID) => {
      const cardObject = getCardObject.byID(cardID);
      const cardElement = getCardElement(cardObject);
      hand.append(cardElement);
    });

    // get active cards of active player
    const stacks = document.querySelectorAll('.active-zone__stack');
    stacks.forEach((stackElement) => {
      stackElement.innerHTML = '';
      stackElement.classList.add('active-zone__stack--empty');
      stackElement.style = null;
      Object.keys(gameState.activePlayer.activeDecks).forEach((activeDeckName) => {
        if (activeDeckName === stackElement.id) {
          gameState.activePlayer.activeDecks[activeDeckName].cards.forEach((card) => {
            const cardObj = getCardObject.byID(card);
            const cardElement = getCardElement(cardObj);
            renderCard.toActive(cardElement);
            cardElement.classList.remove('xyz-in');
          });
        }
      });
    });
  },

  displayActive() {
    const stacks = document.querySelectorAll('.active-zone__stack');
    stacks.forEach((stackElement) => {
      stackElement.innerHTML = '';
      stackElement.classList.add('active-zone__stack--empty');
      stackElement.style = null;
      Object.keys(gameState.activePlayer.activeDecks).forEach((activeDeckName) => {
        if (activeDeckName === stackElement.id) {
          gameState.activePlayer.activeDecks[activeDeckName].cards.forEach((card) => {
            const cardObj = getCardObject.byID(card);
            const cardElement = getCardElement(cardObj);
            renderCard.toActive(cardElement);
            cardElement.classList.remove('xyz-in');
          });
        }
      });
    });
  },

  init() {
    // set hand events
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((elem) => {
      if (gameState.currentPlayer.hand.indexOf(elem.dataset.innovation) > -1) {
        elem.onclick = this.playCard;
      }
    });
    // set age decks events
    const ageDeckElements = document.querySelectorAll('.age-deck--active');
    ageDeckElements.forEach((elem) => {
      elem.onclick = this.takeCard;
    });
    // set active zone events
    const activeZoneStacks = document.querySelectorAll('.active-zone__stack');
    activeZoneStacks.forEach((stack) => {
      const stackLength = stack.childNodes.length;
      if (stackLength >= 1) {
        const stackTopCardElement = stack.childNodes[stackLength - 1];
        stackTopCardElement.onclick = async () => {
          const cardID = stackTopCardElement.dataset.innovation;
          const cardObj = getCardObject.byID(cardID);
          const joinWords = cardID.split(' ').join('');
          await dogmas[joinWords](cardObj);
          gameBoard.update();
        };
      }
    });
    this.setHeaderCurrent();
    updateGameState(gameState);
    gameState.players.forEach((player) => header.changePlayerStats(player));
  },

  update() {
    gameState.activePlayer.actionPoints -= 1;

    if (gameState.currentPlayer.actionPoints < 1) {
      const activeElems = document.querySelectorAll('.active');
      if (activeElems.length !== 0) {
        activeElems.forEach((elem) => {
          elem.onclick = null;
          elem.classList.remove('active');
        });
      }
      this.displayNextTurnBtn();
    } else if (gameState.activePlayer.actionPoints === 0
      && gameState.currentPlayer !== gameState.activePlayer) {
      this.displayFinishActionBtn();
    }

    updateGameState(gameState);
    specCard.getAvailable();
    gameState.players.forEach((player) => header.changePlayerStats(player));

    document.querySelector('.info-table__player-name').innerText = gameState.activePlayer.name;
    document.querySelector('.info-table__action-points').innerText = gameState.activePlayer.actionPoints;
  },

  takeCard(e) {
    // protection of multiple clicks
    e.target.onclick = null;

    // hide age decks modal block after card taken
    const ageDecksBlock = document.querySelector('.age-decks');
    ageDecksBlock.classList.add('age-decks--hidden');

    // get age deck form which card was taken to use in next block
    let ageDeck = e.target.id;
    if (ageDeck === 'cloneCurrentDeck') { ageDeck = gameState.activePlayer.currentDeck; }

    // change gameState
    const cardID = gameState.ageDecks[ageDeck].pop();
    gameState.activePlayer.hand.push(cardID);

    // get card DOM element and render it to hand
    const cardObj = getCardObject.byID(cardID);
    const movingCardElement = getCardElement(cardObj);
    movingCardElement.onclick = gameBoard.playCard;
    renderCard.toHand(movingCardElement);

    gameBoard.update();

    // protection of multiple clicks
    setTimeout(() => {
      if (gameState.activePlayer.actionPoints !== 0) {
        e.target.onclick = gameBoard.takeCard;
      }
    }, 250);
    const player = JSON.stringify(gameState);
    socket.emit('state', player);
  },

  playCard(e) {
    // get current card
    const cardID = e.target.closest('.card').dataset.innovation;
    const cardElement = e.target.closest('.card');
    const cardObj = getCardObject.byID(cardID);

    // change gameState
    const cardIndex = gameState.activePlayer.hand.indexOf(cardID);
    gameState.activePlayer.hand.splice(cardIndex, 1);
    const targetStack = gameState.activePlayer.activeDecks[cardObj.color].cards;
    targetStack.push(cardID);

    // set dogma function
    cardElement.onclick = async () => {
      const joinWords = cardID.split(' ').join('');
      await dogmas[joinWords](cardObj);
      gameBoard.update();
    };
    cardElement.classList.remove('active');
    renderCard.toActive(cardElement);

    gameBoard.update();
    const player = JSON.stringify(gameState);
    socket.emit('state', player);
  },

  displayFinishActionBtn() {
    const nextTurnBtn = document.createElement('div');
    nextTurnBtn.classList.add('info-table__next-turn-btn');
    nextTurnBtn.innerText = 'Завершить действие';
    const infoTable = document.querySelector('.info-table');
    this.disableEvents();
    infoTable.append(nextTurnBtn);
  },

  displaySkipActionBtn() {
    const skipActionBtn = document.createElement('div');
    skipActionBtn.classList.add('info-table__skip-action-btn');
    skipActionBtn.classList.add('info-table__next-turn-btn');
    skipActionBtn.innerText = 'Пропустить';
    const infoTable = document.querySelector('.info-table');
    infoTable.append(skipActionBtn);
  },

  displayNextTurnBtn() {
    const nextTurnBtn = document.createElement('div');
    nextTurnBtn.classList.add('info-table__next-turn-btn');
    nextTurnBtn.innerText = 'Закончить ход';
    nextTurnBtn.addEventListener('click', () => {
      gameState.specArchieveCount = 0;
      gameState.specInfluenceCount = 0;
      // change current player
      for (let i = 0; i < gameState.players.length; i += 1) {
        if (gameState.currentPlayer === gameState.players[i]) {
          i += 1;
          if (i === gameState.players.length) i = 0;
          gameState.currentPlayer = gameState.players[i];
          gameState.activePlayer = gameState.currentPlayer;
          gameState.currentPlayer.actionPoints = 2;
          break;
        }
      }
      displayNewTurnModal(gameState.currentPlayer.name);
      setTimeout(() => {
        gameBoard.display();
        gameBoard.init();
        const excistedNextTurnBtns = Array.from(document.querySelectorAll('.info-table__next-turn-btn'));
        if (excistedNextTurnBtns.length !== 0) {
          excistedNextTurnBtns.forEach((btn) => {
            btn.remove();
          });
        }
      }, 500);
    });
    const infoTable = document.querySelector('.info-table');
    this.disableEvents();
    infoTable.append(nextTurnBtn);
  },

  setHeaderCurrent() {
    Array.from(document.querySelectorAll('.head-row__name')).forEach((headerName) => {
      headerName.parentElement.parentElement.classList.remove('player-container--active');
      if (headerName.innerText === gameState.activePlayer.name) {
        setTimeout(() => {
          headerName.parentElement.parentElement.classList.add('player-container--active');
        }, 250);
      }
    });
  },

  disableEvents() {
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card) => {
      card.onclick = '';
      card.style.cursor = 'default';
      card.style.transform = 'none';
    });
    const cardDogms = Array.from(document.querySelectorAll('.card__dogma'));
    cardDogms.forEach((cardDogma) => {
      cardDogma.onclick = '';
      cardDogma.style.cursor = 'default';
      cardDogma.style.transform = 'none';
    });
    const decks = Array.from(document.querySelectorAll('.age-deck'));
    decks.forEach((deck) => {
      deck.onclick = '';
      deck.classList.remove('age-deck--active');
    });
  },
};

export default gameBoard;
