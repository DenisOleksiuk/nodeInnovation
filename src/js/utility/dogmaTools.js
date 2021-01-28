/* eslint-disable no-await-in-loop */
import gameState from '../components/gameState';
import gameBoard from '../components/gameBoard';
import getCardObject from '../cards/getCardObject';
import getCardElement from '../cards/getCardElement';
import renderCard from '../cards/renderCard';
import displayNewTurnModal from '../display/displayNewTurnModal';
import updateGameState from './updateGameState';
import header from '../display/playerTable/displayHeader';
import dogmaModal from '../components/dogmaModal';
import dogmas from '../components/dogma';

function moveCardToHand(card, id) {
  gameState.players[id].hand.push(card);
  if (id === gameState.currentPlayer.id) {
    const currentCard = getCardObject.byID(card);
    const cardElement = getCardElement(currentCard);
    renderCard.toHand(cardElement);
    cardElement.onclick = gameBoard.playCard;
  }
}

function showErrorModal(text) {
  const audio = new Audio('../../assets/sounds/error_sound_sms.mp3');
  const wrraper = document.querySelector('.active-zone__cards-wrapper');
  const modal = document.createElement('div');
  modal.classList.add('modal__error');
  modal.innerHTML = /* html */`
  <div class="error__message">${text}</div>
  `;
  wrraper.append(modal);
  audio.play();
  setTimeout(() => modal.remove(), 2000);
}

function addTextToModal(text) {
  const messageContainer = document.querySelector('.container__message');
  const verification = [...messageContainer.children].map((i) => i.textContent.trim());
  const cardsInHand = document.querySelector('.hand__cards');
  const cardsInActive = document.querySelector('.active-zone__cards-wrapper');

  if (verification.includes(text)) return;

  const textMessage = document.createElement('div');
  textMessage.classList.add('text__message');
  textMessage.innerHTML = /* html */`${text} <div class="text__icon"><i class="fas fa-trash" aria-hidden="true"></i></div>`;
  messageContainer.append(textMessage);

  messageContainer.onclick = (e) => {
    const cardID = e.target.closest('.text__message').textContent.trim();
    cardsInHand.querySelector(`[data-innovation="${cardID}"]`)?.classList.remove('selected__card');
    cardsInActive.querySelector(`[data-innovation="${cardID}"]`)?.classList.remove('selected__card');
    e.target.closest('.text__message').remove();
  };
}

function passTurn(player) {
  gameState.activePlayer = player;
  gameBoard.display();
}

function getMaxCard(stack) {
  let result = null;
  if (stack.length > 0) {
    result = getCardObject.byID(stack[0]);
    for (let i = 0; i < stack.length; i += 1) {
      const currentCard = getCardObject.byID(stack[i]);
      if (result.age < currentCard.age) {
        result = currentCard;
      }
    }
  }
  return result;
}

function removeCardElement(cardID) {
  const cardElement = document.querySelector(`[data-innovation="${cardID}"]`);
  if (cardElement !== null) cardElement.remove();
}

// take e as argument!!!
function getCardAge(e) {
  let cardElement = null;
  let cardObject = null;
  if (e.target) {
    cardElement = e.target.closest('.card');
    cardObject = getCardObject.byID(cardElement.dataset.innovation);
    return cardObject.age;
  }
  return false;
}
// take e as argument!!!
function getCardID(e) {
  let cardElement = null;
  if (e.target) {
    cardElement = e.target.closest('.card');
    return cardElement.dataset.innovation;
  }
  return false;
}

function getActualDeck(startAge) {
  let actualAge = -1;
  for (let i = startAge; i < 11; i += 1) {
    if (gameState.ageDecks[`age${i}`].length > 0) {
      actualAge = i;
      break;
    }
  }
  return actualAge;
}

function isHaveResource(cardObj, res) {
  let result = false;
  cardObj.resourses.forEach((item) => {
    if (item.name === res) {
      result = true;
    }
  });
  return result;
}

function getAffectedPlayers(cardObj) {
  const res = cardObj.dogma[0].resource;
  let playerIDs = [];
  if (cardObj.dogma[0].type === 'corporate') {
    playerIDs = gameState.players.filter((player) => player[res] >= gameState.currentPlayer[res])
      .map((player) => player.id);

    const currentPlayerID = playerIDs.splice(gameState.currentPlayer.id, 1);
    playerIDs.push(currentPlayerID);
  } else {
    playerIDs = gameState.players
      .filter((player) => {
        const pl = player[res] < gameState.currentPlayer[res] && player !== gameState.currentPlayer;
        return pl;
      }).map((player) => player.id);
  }
  return playerIDs.flat();
}

function takeCard(cardsNum, ageNum, playerID, render = true) {
  while (cardsNum > 0) {
    const actualAge = getActualDeck(ageNum);
    const cardID = gameState.ageDecks[`age${actualAge}`].pop();
    gameState.players[playerID].hand.push(cardID);
    cardsNum -= 1;
    if (gameState.players[playerID] === gameState.activePlayer) {
      const cardObj = getCardObject.byID(cardID);
      const cardElement = getCardElement(cardObj);
      cardElement.onclick = gameBoard.playCard;
      if (render) renderCard.toHand(cardElement);
    }
  }
}

function playCard(cardID, playerID) {
  const cardIndex = gameState.players[playerID].hand.indexOf(cardID);
  if (cardIndex > -1) {
    gameState.players[playerID].hand.splice(cardIndex, 1);
  }
  const cardObj = getCardObject.byID(cardID);
  const cardElement = getCardElement(cardObj);
  const renderedCard = document.querySelector(`[data-innovation='${cardID}']`);
  if (renderedCard !== null) renderedCard.remove();
  const targetStack = gameState.players[playerID].activeDecks[cardObj.color].cards;
  targetStack.push(cardID);
  if (gameState.players[playerID] === gameState.activePlayer) {
    cardElement.onclick = () => dogmas['письменность'](cardObj); //! change later
    renderCard.toActive(cardElement);
  }
}

function recycle(playerID, arrCardID) {
  const cardObjs = {};
  for (let id = 0; id < arrCardID.length; id += 1) {
    cardObjs[arrCardID[id]] = getCardObject.byID(arrCardID[id]).age;

    const indexCard = gameState.players[playerID].hand.indexOf(arrCardID[id]);
    const cardID = gameState.players[playerID].hand[indexCard];

    if (!cardID) return;

    gameState.ageDecks[`age${cardObjs[arrCardID[id]]}`].unshift(cardID);
    gameState.players[playerID].hand.splice(indexCard, 1);
  }
}

function corporateBonus(arrOfId) {
  if (arrOfId.length > 1) {
    takeCard(1, gameState.currentPlayer.currentAge, gameState.currentPlayer.id);
  }
}

const handleCards = (n) => (event) => {
  const text = event.target.closest('.card').dataset.innovation;
  const containerMessage = document.querySelector('.container__message');
  if (containerMessage.childElementCount >= n) return;
  event.target.closest('.card').classList.add('selected__card');
  addTextToModal(text);
};

async function canReworkAndInfluence(cardObj, quantity) {
  const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
  messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
  const arrOfId = getAffectedPlayers(cardObj);
  const currentPlayer = gameState.currentPlayer;
  const dogmaName = cardObj.innovation;
  let bonus = false;
  if (currentPlayer.hand.length < 1) {
    showErrorModal('Не достаточно карт');
    gameState.currentPlayer.actionPoints += 1;
    return;
  }

  for (let i = 0; i < arrOfId.length; i += 1) {
    const player = gameState.players.find((pl) => pl.id === arrOfId[i]);

    if (player.hand.length >= 1) {
      await displayNewTurnModal(player.name);
      passTurn(player);
      gameBoard.setHeaderCurrent();
      const cardsInHand = document.querySelector('.hand__cards').children;

      for (let card = 0; card < cardsInHand.length; card += 1) {
        cardsInHand[card].onclick = handleCards(quantity);
      }
      const answer = await dogmaModal(cardObj.dogma[0].effect, player.name);

      if (answer.length !== 0) {
        let wordEndings = 'т';
        if (answer.length < 2) wordEndings = 'ту';
        if (answer.length > 1 && answer.length < 5) wordEndings = 'ты';

        recycle(player.id, answer);
        messageToLog(player.name, `переработал ${answer.length} кар${wordEndings}`);

        if (dogmaName === 'деньги') {
          const difference = new Set();
          answer.forEach((cardID) => difference.add(getCardObject.byID(cardID).age));

          for (let it = 0; it < difference.size; it += 1) {
            takeCard(1, 2, player.id, false);
            gameState.specInfluenceCount += 1;
            player.influence.cards.push(player.hand.pop());
          }
          messageToLog(player.name, `переработал ${answer.length} кар${wordEndings} и ${difference.size} зачёл`);
        }

        if (dogmaName === 'земледелие') {
          const ageCardNum = getCardObject.byID(answer[0]).age + 1;
          takeCard(1, ageCardNum, player.id, false);
          gameState.specInfluenceCount += 1;
          player.influence.cards.push(player.hand.pop());
          messageToLog(player.name, 'взял карту из колоды и зачёл');
        }

        if (dogmaName === 'гончарное дело') {
          takeCard(1, answer.length, player.id, false);
          gameState.specInfluenceCount += 1;
          player.influence.cards.push(player.hand.pop());
          messageToLog(player.name, 'взял карту из колоды и зачёл');
        }

        updateGameState(gameState);
        gameState.players.forEach((pl) => header.changePlayerStats(pl));

        if (i !== arrOfId.length - 1) {
          bonus = true;
        }
      }
    }
  }

  if (bonus) {
    corporateBonus(arrOfId);
    messageToLog(currentPlayer.name, 'получил кооперативный бонус');
  }

  gameBoard.display();
  gameState.players.forEach((pl) => header.changePlayerStats(pl));

  if (currentPlayer.actionPoints > 0) {
    gameBoard.init();
  } else {
    gameBoard.disableEvents();
  }
}

function messageToLog(playerName, message) {
  const log = document.querySelector('.log-block');
  log.innerHTML += `<b>${playerName}</b> ${message} ${'_'.repeat(30)}`;
}

export {
  canReworkAndInfluence,
  moveCardToHand,
  showErrorModal,
  addTextToModal,
  passTurn,
  getMaxCard,
  removeCardElement,
  getCardAge,
  getCardID,
  getActualDeck,
  isHaveResource,
  getAffectedPlayers,
  takeCard,
  playCard,
  recycle,
  corporateBonus,
  messageToLog,
  handleCards,
};
