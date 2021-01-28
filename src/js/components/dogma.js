/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import renderCard from '../cards/renderCard';
import getCardElement from '../cards/getCardElement';
import getCardObject from '../cards/getCardObject';
import gameState from './gameState';
import gameBoard from './gameBoard';
import header from '../display/playerTable/displayHeader';
import dogmaModalMessages from './dogmaModal';
import displayNewTurnModal from '../display/displayNewTurnModal';
import updateGameState from '../utility/updateGameState';
import specCard from '../specCards/specCard';
import getManualDogma from '../utility/getManualDogma';
import {
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
} from '../utility/dogmaTools';

const dogmas = {
  письменность: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      takeCard(1, 2, id);
    });
    corporateBonus(arrOfId);
  },
  колесо: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      takeCard(2, 1, id);
    });
    corporateBonus(arrOfId);
  },
  парус: (cardObj) => {
    const text = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${text}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      takeCard(1, 1, id, false);
      playCard(gameState.players[id].hand[gameState.players[id].hand.length - 1], id);
    });
    corporateBonus(arrOfId);
  },
  скотоводство: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    // get affected players
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    // function which get affected cards of active player
    // return empty arr if any properties dont match!
    function getAffectedCards() {
      const cardsFromHand = [];
      gameState.activePlayer.hand.forEach((cardID) => {
        cardsFromHand.push(getCardObject.byID(cardID));
      });
      const lowerCards = cardsFromHand.sort((a, b) => b.age - a.age).filter((card, i, arr) => {
        return card.age === arr[arr.length - 1].age;
      });
      const lowerCardsID = lowerCards.map((cardObject) => cardObject.innovation);
      return lowerCardsID;
    }
    function listener(e) {
      takeCard(1, gameState.activePlayer.currentAge, gameState.activePlayer.id);
      gameBoard.playCard(e);
    }
    getManualDogma()(listener, getAffectedCards, 1);
  },
  кузнечноедело: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      let repeat = true;
      do {
        const actualAge = getActualDeck(1);
        const cardID = gameState.ageDecks[`age${actualAge}`].pop();
        // const currentPlayerName = gameState[`player${id}`].name;
        const currentCard = getCardObject.byID(cardID);
        repeat = isHaveResource(currentCard, 'tower');
        if (repeat) {
          gameState.specInfluenceCount += 1;
          gameState.players[id].influence.cards.push(cardID);
        } else {
          moveCardToHand(cardID, id);
        }
      } while (repeat);
    });
    corporateBonus(arrOfId);
  },
  мистицизм: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      const actualAge = getActualDeck(1);
      const cardID = gameState.ageDecks[`age${actualAge}`].pop();
      // const currentPlayerName = gameState[`player${id}`].name;
      const currentCard = getCardObject.byID(cardID);
      if (gameState.players[id].activeDecks[currentCard.color].cards.length > 0) {
        gameState.players[id].activeDecks[currentCard.color].cards.push(cardID);
        if (id === gameState.currentPlayer.id) {
          const cardElement = getCardElement(currentCard);
          renderCard.toActive(cardElement);
          if (dogmas[currentCard.innovation]) {
            cardElement.onclick = () => dogmas[currentCard.innovation](cardObj);
          }
        }
      } else {
        moveCardToHand(cardID, id);
      }
    });
  },
  инструменты: (cardObj) => { // TODO
    const text = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${text}">${cardObj.innovation}</u>`);
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const handOfCurrent = gameState.activePlayer.hand;
      const thirdAgeCards = [];
      handOfCurrent.forEach((cardID) => {
        if (getCardObject.byID(cardID).age === 3) thirdAgeCards.push(cardID);
      });
      let resArr = [];
      if (handOfCurrent.length - thirdAgeCards.length < 3 && thirdAgeCards.length !== 0) {
        resArr = resArr.concat(thirdAgeCards);
      } else if (handOfCurrent.length >= 3 && thirdAgeCards.length === 0) {
        resArr = resArr.concat(handOfCurrent);
      } else if (handOfCurrent.length > 3 && thirdAgeCards.length !== 0) {
        resArr = resArr.concat(handOfCurrent);
      }
      return resArr;
    }

    let counter = 0;
    function listener(e) {
      if (getCardAge(e) === 3 && gameState.activePlayer.actionPoints >= 3) {
        gameState.activePlayer.actionPoints -= 2;
        recycle(gameState.activePlayer.id, [getCardID(e)]);
        removeCardElement(getCardID(e));
        gameBoard.update();
        takeCard(3, 1, gameState.activePlayer.id);
        updateGameState(gameState);
        header.changePlayerStats(gameState.activePlayer);
        gameBoard.display();
      } else {
        recycle(gameState.activePlayer.id, [getCardID(e)]);
        removeCardElement(getCardID(e));
        gameBoard.update();
        counter += 1;
        if (counter === 3) {
          counter = 0;
          takeCard(1, 3, gameState.activePlayer.id, false);
          const lastCardInHand = gameState.activePlayer
            .hand[gameState.activePlayer.hand.length - 1];
          playCard(lastCardInHand, gameState.activePlayer.id);
          updateGameState(gameState);
          header.changePlayerStats(gameState.activePlayer);
          gameBoard.display();
        }
      }
    }
    getManualDogma(listener, getAffectedCards, 3, null, true, true);
  },
  виноделие: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      const numberOfCards = Math.trunc(gameState[`player${id}`].tree / 2);
      takeCard(numberOfCards, 2, id);
    });
    corporateBonus(arrOfId);
  },
  календарь: (cardObj) => {
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      if (gameState[`player${id}`].influence.cards.length > gameState[`player${id}`].hand.length) {
        takeCard(2, 3, id);
      }
    });
    corporateBonus(arrOfId);
  },
  эксперименты: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      const actualAge = getActualDeck(5);
      const cardID = gameState.ageDecks[`age${actualAge}`].pop();
      playCard(cardID, id);
    });
    corporateBonus(arrOfId);
  },
  пароваямашина: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      for (let i = 0; i < 2; i += 1) {
        const actualAge = getActualDeck(4);
        const cardID = gameState.ageDecks[`age${actualAge}`].pop();
        const cardObject = getCardObject.byID(cardID);
        const cardElement = getCardElement(cardObject);
        const cardColor = cardObject.color;
        gameState[`player${id}`].activeDecks[cardColor].cards.unshift(cardID);
        if (gameState.currentPlayer.id === id) {
          renderCard.archive(cardElement);
        }
      }
      const lastYellowCardID = gameState[`player${id}`].activeDecks.yellow.cards.shift();
      gameState.specInfluenceCount += 1;
      gameState[`player${id}`].influence.cards.push(lastYellowCardID);
      const lastYellowCardElement = getCardElement(getCardObject.byID(lastYellowCardID));
      renderCard.removeCardFromActive(lastYellowCardElement);
    });
    corporateBonus(arrOfId);
  },
  станки: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      let currentAge = 1;
      const currentPlayer = gameState[`player${id}`];
      const maxCard = getMaxCard(currentPlayer.influence.cards);
      if (maxCard) {
        currentAge = maxCard.age;
      }
      currentAge = getActualDeck(currentAge);
      const currentCard = gameState.ageDecks[`age${currentAge}`].pop();
      gameState.specInfluenceCount += 1;
      currentPlayer.influence.cards.push(currentCard);
    });
    corporateBonus(arrOfId);
  },
  генетика: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    arrOfId.forEach((id) => {
      const currentPlayer = gameState[`player${id}`];
      const currentAge = getActualDeck(10);
      const currentCard = gameState.ageDecks[`age${currentAge}`].pop();
      const stackColor = getCardObject.byID(currentCard).color;
      playCard(currentCard, id);
      const currentDeck = currentPlayer.activeDecks[stackColor].cards;
      if (currentDeck.length > 1) {
        for (let i = 0; i < currentDeck.length - 1; i += 1) {
          const cardID = currentDeck[i];
          gameState.specInfluenceCount += 1;
          currentPlayer.influence.cards.push(cardID);
          renderCard.removeCardFromActive(getCardElement(getCardObject.byID(cardID)));
        }
        currentDeck.splice(0, currentDeck.length - 1);
      }
    });
    corporateBonus(arrOfId);
  },
  сводзаконов: (cardObj) => {
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const notEmptyStacks = Object.keys(gameState.activePlayer.activeDecks).filter((deck) => {
        return gameState.activePlayer.activeDecks[deck].cards.length !== 0;
      });
      return gameState.activePlayer.hand.filter((cardID) => {
        return notEmptyStacks.includes(getCardObject.byID(cardID).color);
      });
    }
    function listener(e) {
      const cardID = getCardID(e);
      const cardObject = getCardObject.byID(cardID);
      const cardElement = document.querySelector(`[data-innovation="${cardID}"]`);

      gameState.activePlayer.hand.splice(gameState.activePlayer.hand.indexOf(cardID), 1);
      gameState.activePlayer.activeDecks[cardObject.color].cards.unshift(cardID);
      renderCard.archive(cardElement);
      cardElement.classList.remove('active');
      cardElement.onclick = null;
      gameBoard.update();
      Array.from(document.querySelector('.hand__cards').childNodes).forEach((cardElem) => {
        cardElem.classList.remove('active');
        cardElem.onclick = null;
      });
      const targetStack = document.getElementById(`${cardObject.color}`);
      targetStack.classList.add('active');
      if (gameState.activePlayer.activeDecks[targetStack.id].shift !== 'left') {
        return [targetStack.id];
      }
      gameBoard.update();
    }
    function secondListener(e) {
      const targetStack = e.target.closest('.active-zone__stack');
      gameState.activePlayer.activeDecks[targetStack.id].shift = 'left';
      gameBoard.display();
      gameBoard.init();
      gameBoard.update();
      targetStack.onclick = null;
      targetStack.classList.remove('active');
    }
    getManualDogma(listener, getAffectedCards, 2, secondListener, true, true);
  },
  бумага: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.activePlayer.name, `сыграл карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const resultArr = [];
      Object.keys(gameState.activePlayer.activeDecks).forEach((stackID) => {
        if (gameState.activePlayer.activeDecks[stackID].cards.length > 1
          && gameState.activePlayer.activeDecks[stackID].shift !== 'left'
          && (stackID === 'blue' || stackID === 'green')) {
          resultArr.push(stackID);
        }
      });
      return resultArr;
    }
    function listener(e) {
      const targetElement = e.target.closest('.active-zone__stack');
      let textToLog1;
      if (targetElement.id === 'blue') {
        textToLog1 = 'синего';
      } else if (targetElement.id === 'green') {
        textToLog1 = 'зеленого';
      }
      messageToLog(gameState.activePlayer.name, `сдвинул стопку ${textToLog1} цвета влево`);
      gameState.activePlayer.activeDecks[targetElement.id].shift = 'left';
      [...document.querySelectorAll('.active')].forEach((element) => {
        element.classList.remove('active');
      });
      gameBoard.update();
      gameBoard.displayActive();
    }
    function callback() {
      let counter = 0;
      gameState.activePlayer.actionPoints += 1;
      Object.keys(gameState.activePlayer.activeDecks).forEach((stackName) => {
        if (gameState.activePlayer.activeDecks[stackName].shift === 'left') counter += 1;
      });
      messageToLog(gameState.activePlayer.name, `взял ${counter} карту(ы)`);
      takeCard(counter, 4, gameState.activePlayer.id, true);
      gameBoard.update();
    }
    getManualDogma(listener, getAffectedCards, 1, null, true, true, callback);
  },
  математика: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.activePlayer.name, `активировал карту: <u title="${textToLog}">${cardObj.innovation}</u>`);
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      return gameState.activePlayer.hand.length > 0 ? gameState.activePlayer.hand : [];
    }
    function listener(e) {
      const targetID = getCardID(e);
      messageToLog(gameState.activePlayer.name, `переработал карту ${getCardObject.byID(targetID).age} века с руки`);
      recycle(gameState.activePlayer.id, [targetID]);
      removeCardElement(targetID);
      takeCard(1, getCardAge(e) + 1, gameState.activePlayer.id, false);
      const textToLog1 = getCardElement(getCardObject.byID(gameState.activePlayer
        .hand[gameState.activePlayer.hand.length - 1])).innerText;
      messageToLog(gameState.activePlayer.name, `взял и сыграл карту: <u title="${textToLog1}">${getCardObject
        .byID(gameState.activePlayer.hand[gameState.activePlayer.hand.length - 1]).innovation}</u>`);
      playCard(gameState.activePlayer.hand[gameState.activePlayer.hand.length - 1],
        gameState.activePlayer.id);
      [...document.querySelectorAll('.active')].forEach((element) => {
        element.classList.remove('active');
      });
      gameBoard.update();
    }
    getManualDogma(listener, getAffectedCards, 1, null, true, true);
  },
  философия: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.activePlayer.name, `активировал карту: <u title="${textToLog}">${cardObj.innovation}</u>`);
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const resultArr = [];
      Object.keys(gameState.activePlayer.activeDecks).forEach((stackID) => {
        if (gameState.activePlayer.activeDecks[stackID].cards.length > 1
          && gameState.activePlayer.activeDecks[stackID].shift !== 'left') resultArr.push(stackID);
      });
      return resultArr;
    }
    function listener(e) {
      let textToLog1;
      const targetElement = e.target.closest('.active-zone__stack');
      if (targetElement.id === 'red') textToLog1 = 'красную';
      else if (targetElement.id === 'green') textToLog1 = 'зеленую';
      else if (targetElement.id === 'blue') textToLog1 = 'синюю';
      else if (targetElement.id === 'purple') textToLog1 = 'фиолетовую';
      else if (targetElement.id === 'yellow') textToLog1 = 'желтую';
      messageToLog(gameState.activePlayer.name, `сдвинул ${textToLog1} стопку влево`);
      gameState.activePlayer.activeDecks[targetElement.id].shift = 'left';
      [...document.querySelectorAll('.active')].forEach((element) => {
        element.classList.remove('active');
      });
      gameBoard.update();
      gameBoard.displayActive();
      gameState.activePlayer.hand.forEach((cardID) => {
        document.querySelector(`[data-innovation='${cardID}']`).classList.add('active');
      });
      return gameState.activePlayer.hand;
    }
    function listener2(e) {
      const textToLog1 = document.querySelector(`[data-innovation="${getCardObject.byID(getCardID(e)).innovation}"]`).innerText;
      messageToLog(gameState.activePlayer.name, `переместил в зону влияния карту: <u title="${textToLog1}">${getCardObject.byID(getCardID(e)).innovation}</u>`);
      gameState.activePlayer.influence.cards.push(getCardID(e));
      removeCardElement(getCardID(e));
      [...document.querySelectorAll('.active')].forEach((element) => {
        element.classList.remove('active');
      });
      gameBoard.update();
    }
    getManualDogma(listener, getAffectedCards, 2, listener2, true, true);
  },
  перевод: (cardObj) => { // TODO
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.activePlayer.name, `активировал карту: <u title="${textToLog}">${cardObj.innovation}</u>`);
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const resultArr = [];
      if (gameState.activePlayer.influence.cards.length !== 0) {
        resultArr.push(`influence${gameState.activePlayer.id}`);
      }
      return resultArr;
    }
    function listener() {
      messageToLog(gameState.activePlayer.name, 'ввел в игру все карты из своей зоны влияния');
      gameState.activePlayer.influence.cards.forEach((cardID) => {
        playCard(cardID, gameState.activePlayer.id);
      });
      gameState.activePlayer.influence.cards = [];
      header.changePlayerStats(gameState.activePlayer);
      gameBoard.update();
    }
    getManualDogma(listener, getAffectedCards, 1, null, true, true);
  },
  алхимия: (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.activePlayer.name, `активировал карту: <u title="${textToLog}">${cardObj.innovation}</u>`);
    let arrOfId = getAffectedPlayers(cardObj);
    arrOfId = arrOfId.filter((id) => {
      return gameState[`player${id}`].tower >= 3;
    });
    if (arrOfId.length < 1) {
      showErrorModal('Первую часть никто не может выполнить');
    } else {
      arrOfId.forEach((id) => {
        const cardsNum = Math.floor(gameState[`player${id}`].tower / 3);
        takeCard(cardsNum, 4, id, true);
        let recycleAll = false;
        const hand = gameState[`player${id}`].hand;
        for (let i = cardsNum; i === 1; i -= 1) {
          const textToLog1 = getCardObject.byID(hand[hand.length - i]).innovation;
          messageToLog(gameState.activePlayer.name, `взял и показал всем карту: <u title="${textToLog1}">${hand[hand.length - i]}</u>`);
          if (getCardObject.byID(hand[hand.length - i]).color === 'red') recycleAll = true;
        }
        if (recycleAll) {
          messageToLog(gameState.activePlayer.name, `Одна из взятых карт красного цвета. 
          ${gameState.activePlayer.name} переработал все карты с руки`);
          const arrOfCardID = gameState.activePlayer.hand.slice();
          recycle(id, arrOfCardID);
          gameState.activePlayer.hand = [];
          [...document.querySelector('.hand__cards').childNodes].forEach((card) => card.remove());
        } else {
          messageToLog(gameState.activePlayer.name, `Все взятые карты не красного цвета. 
          ${gameState.activePlayer.name} забирает их на руку`);
        }
      });
    }
    // manual part
    gameState.affectedPlayers = getAffectedPlayers(cardObj);
    function getAffectedCards() {
      const resultArr = [];
      gameState.activePlayer.hand.forEach((card) => resultArr.push(card));
      return resultArr;
    }
    function listener(e) {
      messageToLog(gameState.activePlayer.name, `сыграл карту: <u>${getCardID(e)}</u>`);
      playCard(getCardID(e), gameState.activePlayer.id);
      document.querySelector(`[data-innovation="${getCardID(e)}"]`).classList.remove('active');
      header.changePlayerStats(gameState.activePlayer);
      gameBoard.update();
      return gameState.activePlayer.hand.length > 0 ? gameState.activePlayer.hand : undefined;
    }
    function listener2(e) {
      messageToLog(gameState.activePlayer.name, `зачел карту ${getCardObject.byID(getCardID(e)).age} века с руки`);
      gameState.activePlayer.influence.cards.push(getCardID(e));
      removeCardElement(getCardID(e));
      [...document.querySelectorAll('.active')].forEach((element) => {
        element.classList.remove('active');
      });
      gameBoard.update();
    }
    getManualDogma(listener, getAffectedCards, 2, listener2, true, false);
  },
  земледелие: async (cardObj) => {
    await canReworkAndInfluence(cardObj, 1);
  },
  гончарноедело: async (cardObj) => {
    await canReworkAndInfluence(cardObj, 3);
  },
  города: async (cardObj) => {
    const arrOfId = getAffectedPlayers(cardObj);
    const currentPlayer = gameState.currentPlayer;
    let isNotTower = true;

    if (gameState.players[arrOfId[0]]?.tower >= 4) {
      const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
      messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    }

    for (let i = 0; i < arrOfId.length; i += 1) {
      const player = gameState.players.find((pl) => pl.id === arrOfId[i]);
      if (player.tower >= 4) {
        await displayNewTurnModal(player.name);
        passTurn(player);
        gameBoard.setHeaderCurrent();
        const cardsInActive = document.querySelectorAll('.active-zone__stack');
        for (let card = 0; card < cardsInActive.length; card += 1) {
          if (cardsInActive[card].lastElementChild) {
            cardsInActive[card].lastElementChild.onclick = (e) => {
              const text = e.target.closest('.card').dataset.innovation;
              const hasResource = getCardObject.byID(text).resourses.some((resource) => resource.name.includes('tower'));
              if (!hasResource) return;
              const containerMessage = document.querySelector('.container__message');
              if (containerMessage.childElementCount >= 1) return;
              e.target.closest('.card').classList.add('selected__card');
              addTextToModal(text);
            };
          }
        }

        const answer = await dogmaModalMessages(cardObj.dogma[0].effect, player.name, 'agr');

        const color = getCardObject.byID(answer.join('')).color;
        const card = player.activeDecks[color].cards.pop();
        gameState.currentPlayer.activeDecks[color].cards.push(card);
        const textToLog = document.querySelector(`[data-innovation="${answer.join()}"]`).innerText;
        messageToLog(player.name, `передал карту <u title="${textToLog}">${answer.join()}</u> игроку ${gameState.currentPlayer.name}`);
        takeCard(1, 1, player.id);
        messageToLog(player.name, 'взял карту из колоды');
        updateGameState(gameState);
        gameState.players.forEach((pl) => header.changePlayerStats(pl));

        isNotTower = false;
      }
    }

    if (isNotTower) {
      showErrorModal('У соперников не достаточно карт');
      gameState.currentPlayer.actionPoints += 1;
      return;
    }

    await displayNewTurnModal(currentPlayer.name);
    passTurn(currentPlayer);
    gameState.players.forEach((pl) => header.changePlayerStats(pl));
    gameBoard.setHeaderCurrent();

    if (currentPlayer.actionPoints > 0) {
      gameBoard.init();
    } else {
      gameBoard.disableEvents();
    }
  },
  лукистрелы: async (cardObj) => {
    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);
    const arrOfId = getAffectedPlayers(cardObj);
    for (let i = 0; i < arrOfId.length; i += 1) {
      const player = gameState.players.find((pl) => pl.id === arrOfId[i]);
      await displayNewTurnModal(player.name);
      passTurn(player);
      gameBoard.setHeaderCurrent();
      const cardsInHand = document.querySelector('.hand__cards').children;
      const deck = document.querySelector('.age-deck--active');

      deck.onclick = (e) => {
        let ageDeck = e.target.id;
        if (ageDeck === 'cloneCurrentDeck') {
          ageDeck = gameState.activePlayer.currentDeck;
        }

        const cardID = gameState.ageDecks[ageDeck].pop();
        gameState.activePlayer.hand.push(cardID);

        const card = getCardObject.byID(cardID);
        const movingCardElement = getCardElement(card);
        renderCard.toHand(movingCardElement);
        messageToLog(player.name, 'взял карту из колоды');
        header.changePlayerStats(player);

        const cardIDs = [...cardsInHand]
          .map((item) => getCardObject.byID(item.dataset.innovation).age);

        const higerAge = Math.max(...cardIDs);
        const backgroundStyle = `url("./assets/img/cards-bg/age-0${higerAge}.jpg")`;

        const higherCards = [...cardsInHand]
          .filter((item) => item.style.background === backgroundStyle);

        for (let higherCard = 0; higherCard < higherCards.length; higherCard += 1) {
          higherCards[higherCard].onclick = handleCards(1);
        }
        deck.onclick = null;
      };

      const answer = await dogmaModalMessages(cardObj.dogma[0].effect, player.name, 'agr');

      const cardIdx = player.hand.indexOf(answer.join(''));
      gameState.currentPlayer.hand.push(player.hand[cardIdx]);
      player.hand.splice(cardIdx, 1);
      messageToLog(player.name, `отдал карту игроку ${gameState.currentPlayer.name}`);
      updateGameState(gameState);
      gameState.players.forEach((pl) => header.changePlayerStats(pl));
    }

    await displayNewTurnModal(gameState.currentPlayer.name);
    passTurn(gameState.currentPlayer);
    gameState.players.forEach((pl) => header.changePlayerStats(pl));
    gameBoard.setHeaderCurrent();

    if (gameState.currentPlayer.actionPoints > 0) {
      gameBoard.init();
    } else {
      gameBoard.disableEvents();
    }
  },
  деньги: async (cardObj) => {
    await canReworkAndInfluence(cardObj, Infinity);
  },
  каналы: async (cardObj) => {
    const arrOfId = getAffectedPlayers(cardObj);
    let bonus = false;

    if (gameState.currentPlayer.hand.length < 1) {
      showErrorModal('Не достаточно карт');
      gameState.currentPlayer.actionPoints += 1;
      return;
    }

    if (gameState.currentPlayer.influence.cards.length === 0) {
      showErrorModal('У Вас нет карт влияния');
      gameState.currentPlayer.actionPoints += 1;
      return;
    }

    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);

    for (let i = 0; i < arrOfId.length; i += 1) {
      const player = gameState.players.find((pl) => pl.id === arrOfId[i]);

      if (player.influence.cards.length === 0) {
        continue;
      }

      if (player.hand.length >= 1) {
        await displayNewTurnModal(player.name);
        passTurn(player);
        gameBoard.setHeaderCurrent();
      }

      gameBoard.disableEvents();
      const answer = await dogmaModalMessages(cardObj.dogma[0].effect, player.name, false, 'ok');
      if (answer === 'ok') {
        const influnceAges = player.influence.cards.map((card) => getCardObject.byID(card).age);
        const handCardsAges = player.hand.map((card) => getCardObject.byID(card).age);
        const higherInfluceNum = Math.max(...influnceAges);
        const higherCardNum = Math.max(...handCardsAges);
        const cardsFromInflunce = [];
        const cardsFromHand = [];

        player.influence.cards
          .filter((card) => getCardObject.byID(card).age === higherInfluceNum)
          .forEach((card) => {
            const idx = player.influence.cards.indexOf(card);
            const forHand = player.influence.cards.splice(idx, 1).join();
            cardsFromInflunce.push(forHand);
          });

        player.hand
          .filter((card) => getCardObject.byID(card).age === higherCardNum)
          .forEach((card) => {
            const idx = player.hand.indexOf(card);
            const forInflunce = player.hand.splice(idx, 1).join();
            cardsFromHand.push(forInflunce);
          });

        cardsFromInflunce.forEach((card) => player.hand.push(card));
        cardsFromHand.forEach((card) => player.influence.cards.push(card));

        messageToLog(player.name, 'обменял карты с руки на карты с зоны влияния');
        updateGameState(gameState);
        gameState.players.forEach((pl) => header.changePlayerStats(pl));

        if (i !== arrOfId.length - 1) {
          bonus = true;
        }
      }
    }

    if (bonus) {
      corporateBonus(arrOfId);
      messageToLog(gameState.currentPlayer.name, 'получил кооперативный бонус');
    }

    gameBoard.display();
    gameState.players.forEach((pl) => header.changePlayerStats(pl));

    if (gameState.currentPlayer.actionPoints > 0) {
      gameBoard.init();
    } else {
      gameBoard.disableEvents();
    }
  },
  каменнаякладка: async (cardObj) => {
    const arrOfId = getAffectedPlayers(cardObj);
    let bonus = false;
    let tower = false;

    gameState.currentPlayer.hand.forEach((card) => {
      const hasResource = getCardObject.byID(card).resourses.some((resource) => resource.name.includes('tower'));
      if (hasResource) tower = true;
    });

    if (!tower) {
      showErrorModal('У Вас нет ресурса "замок"');
      gameState.currentPlayer.actionPoints += 1;
      return;
    }

    const textToLog = document.querySelector(`[data-innovation="${cardObj.innovation}"]`).innerText;
    messageToLog(gameState.currentPlayer.name, `активировал карту <u title="${textToLog}">${cardObj.innovation}</u>`);

    for (let i = 0; i < arrOfId.length; i += 1) {
      const player = gameState.players.find((pl) => pl.id === arrOfId[i]);

      let hasActivePlrResrs = false;
      player.hand.forEach((card) => {
        const hasResource = getCardObject.byID(card).resourses.some((resource) => resource.name.includes('tower'));
        if (hasResource) {
          hasActivePlrResrs = true;
        }
      });

      if (!hasActivePlrResrs) {
        continue;
      }

      await displayNewTurnModal(player.name);
      passTurn(player);
      gameBoard.setHeaderCurrent();
      const cardsInActive = document.querySelector('.hand__cards').children;
      for (let card = 0; card < cardsInActive.length; card += 1) {
        if (cardsInActive[card]) {
          cardsInActive[card].onclick = (e) => {
            const text = e.target.closest('.card').dataset.innovation;
            const hasResource = getCardObject.byID(text).resourses.some((resource) => resource.name.includes('tower'));
            if (!hasResource) return;
            e.target.closest('.card').classList.add('selected__card');
            addTextToModal(text);
          };
        }
      }
      const answer = await dogmaModalMessages(cardObj.dogma[0].effect, player.name);

      if (answer.length !== 0) {
        answer.forEach((cardID) => playCard(cardID, player.id));
        let wordEndings = 'т';
        if (answer.length < 2) wordEndings = 'ту';
        if (answer.length > 1 && answer.length < 5) wordEndings = 'ты';
        messageToLog(player.name, `сыграл с руки ${answer.length} кар${wordEndings}`);

        if (answer.length >= 4) {
          specCard.getCard('Строительство');
        }
        updateGameState(gameState);
        gameState.players.forEach((pl) => header.changePlayerStats(pl));

        if (i !== arrOfId.length - 1) {
          bonus = true;
        }
      }
    }

    if (bonus) {
      corporateBonus(arrOfId);
      messageToLog(gameState.currentPlayer.name, 'получил кооперативный бонус');
    }

    gameBoard.display();
    gameState.players.forEach((pl) => header.changePlayerStats(pl));

    if (gameState.currentPlayer.actionPoints > 0) {
      gameBoard.init();
    } else {
      gameBoard.disableEvents();
    }
  },
};

export default dogmas;
