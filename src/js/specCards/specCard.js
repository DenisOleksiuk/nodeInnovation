import gameState from '../components/gameState';
import getCardObject from '../cards/getCardObject';
import { messageToLog } from '../utility/dogmaTools';

const specCard = {
  getAvailable() {
    if (gameState.specArchieveCount >= 12) {
      this.getCard('Дипломатия');
    }

    if (gameState.specArchieveCount >= 6 && gameState.specInfluenceCount >= 6) {
      this.getCard('Строительство');
    }

    if (isAllActive8()) {
      this.getCard('Наука');
    }

    if (isAllResourses3()) {
      this.getCard('Военное дело');
    }

    if (isAllShiftedRightOrTop()) {
      this.getCard('Культура');
    }
  },

  getCard(cardName) {
    const index = gameState.specialDeck.indexOf(`${cardName}`);
    if (index !== -1) {
      gameState.activePlayer.specialCards.push(gameState.specialDeck.splice(index, 1).join());
      document.querySelector(`[data-name="${cardName}"]`).classList.add('inactive');
      messageToLog(gameState.currentPlayer.name, `получил специальную карту ${cardName}`);
    }
  },
};

function isAllActive8() {
  const resArr = [];
  Object.keys(gameState.activePlayer.activeDecks).forEach((deckColor) => {
    resArr.push(getCardObject.byID(gameState.activePlayer
      .activeDecks[deckColor].cards[gameState.activePlayer
        .activeDecks[deckColor].cards.length - 1]).age);
  });
  const filteredResArr = resArr.filter((element) => {
    if (element < 8) return false;
    return true;
  });
  return resArr.length === filteredResArr.length;
}

function isAllResourses3() {
  if (gameState.activePlayer.tree >= 3
    && gameState.activePlayer.tower >= 3
    && gameState.activePlayer.bulb >= 3
    && gameState.activePlayer.crown >= 3
    && gameState.activePlayer.factory >= 3
    && gameState.activePlayer.clock >= 3) {
    return true;
  }
  return false;
}

function isAllShiftedRightOrTop() {
  const resArr = [];
  Object.keys(gameState.activePlayer.activeDecks).forEach((deckColor) => {
    if (gameState.activePlayer.activeDecks[deckColor].cards.length > 1
      && gameState.activePlayer.activeDecks[deckColor].shift !== 'left'
      && gameState.activePlayer.activeDecks[deckColor].shift !== ''
      && gameState.activePlayer.activeDecks[deckColor].shift !== null) {
      resArr.push(1);
    }
  });
  return resArr.length === 5;
}

export default specCard;
