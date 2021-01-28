import gameState from '../components/gameState';
import gameBoard from '../components/gameBoard';
import header from '../display/playerTable/displayHeader';
import displayNewTurnModal from '../display/displayNewTurnModal';
import { takeCard, showErrorModal } from './dogmaTools';

const getManualDogma = function closureWrapper(listener,
  getCardsID, count, secondListener = null, isCorporate = true,
  isSkippable = false, callbackFunc = null) {
  // store current action points, -1 becuase dogma activation cost 1 point
  gameState.storedActionPoints = gameState.activePlayer.actionPoints - 1;

  let soloCorporate = gameState.affectedPlayers.length === 1 && isCorporate;
  let corporateCard = false;

  function setManualDogma() {
    // block corporate dogm if currentPlayer cant do it | dont activated in aggresive dogm
    if (isCorporate) {
      gameState.activePlayer = gameState.currentPlayer;
      if (getCardsID().length === 0) {
        gameState.activePlayer.actionPoints += 1; // return point taked on dogm activation
        showErrorModal('У вас нет возможности выполнить эту корпоративную догму!');
        return;
      }
    }

    // change active players while find one with not null affected cards array
    let arrOfCardsID = null;
    let counter = 0;
    do {
      // check if affectedPlayers dont have needed cards
      counter += 1;
      if (gameState.affectedPlayers.length - counter < 0) soloCorporate = true;

      gameState.activePlayer = gameState.players[gameState.affectedPlayers.shift()];
      arrOfCardsID = getCardsID();
    } while (arrOfCardsID.length === 0 && gameState.affectedPlayers.length >= 1);

    // set avaiable action points
    if (gameState.activePlayer !== gameState.currentPlayer) {
      gameState.activePlayer.actionPoints = count + 1;
      corporateCard = true;
    } else if (soloCorporate) {
      gameState.activePlayer.actionPoints = gameState.storedActionPoints + count + 1;
    } else {
      gameState.activePlayer.actionPoints = gameState.storedActionPoints + count;
    }

    // display skip action btn if 4th argument passed true
    if (isSkippable) {
      gameBoard.displaySkipActionBtn();
      const skipBtn = document.querySelector('.info-table__skip-action-btn');
      skipBtn.onclick = () => {
        gameState.activePlayer.actionPoints = 0;
        skipBtn.remove();
        [...document.querySelectorAll('.active')].forEach((element) => {
          element.classList.remove('active');
        });
        if (gameState.activePlayer !== gameState.currentPlayer) {
          setManualDogma();
        } else {
          if (gameState.storedActionPoints === 1) {
            gameState.activePlayer.actionPoints = gameState.storedActionPoints + 1;
          } else {
            gameState.activePlayer.actionPoints = gameState.storedActionPoints;
          }
          [...document.querySelectorAll('.active-zone__stack')].forEach((element) => {
            element.onclick = null;
          });
          gameBoard.display();
          gameBoard.init();
          gameBoard.update();
        }
      };
    }

    displayNewTurnModal(null, gameState.activePlayer.name);
    setTimeout(() => {
      gameBoard.display();
      gameBoard.setHeaderCurrent();
      arrOfCardsID.forEach((cardID) => {
        document.querySelector(`[data-innovation='${cardID}']`).onclick = (e) => {
          const targetsOfSecondEvent = listener(e);
          listenerFunc();
          if (targetsOfSecondEvent !== undefined) {
            targetsOfSecondEvent.forEach((elementID) => {
              document.querySelector(`[data-innovation='${elementID}']`).onclick = (ev) => {
                secondListener(ev);
                listenerFunc();
              };
            });
          }
        };
        document.querySelector(`[data-innovation='${cardID}']`).classList.add('active');
      });
    }, 300);

    function listenerFunc() {
      if (gameState.affectedPlayers.length === 0
        && gameState.activePlayer.actionPoints === gameState.storedActionPoints) {
        gameState.activePlayer = gameState.currentPlayer;
        gameState.activePlayer.actionPoints = gameState.storedActionPoints;
        const skipActionBtn = document.querySelector('.info-table__skip-action-btn');
        if (skipActionBtn !== null) skipActionBtn.remove();
        if (callbackFunc !== null) callbackFunc();
        if (corporateCard) {
          takeCard(1, gameState.activePlayer.currentAge, gameState.activePlayer.id);
          header.changePlayerStats(gameState.currentPlayer);
        }
        if (gameState.currentPlayer.actionPoints !== 0) {
          gameBoard.display();
          gameBoard.init();
        }
      } else if (gameState.activePlayer.actionPoints === 0) {
        if (callbackFunc !== null) callbackFunc();
      }
    }

    document.querySelector('.info-table').onclick = () => {
      if (gameState.activePlayer.actionPoints === 0) {
        const nextActionBtns = [...document.querySelectorAll('.info-table__next-turn-btn')];
        if (nextActionBtns.length !== 0) {
          nextActionBtns.forEach((element) => {
            element.remove();
          });
        }
        if (gameState.activePlayer.actionPoints === 0 && gameState.affectedPlayers.length !== 0) {
          setManualDogma(listener, getCardsID, count, isSkippable);
        } else if (gameState.affectedPlayers.length === 0) {
          gameState.activePlayer = gameState.currentPlayer;
          if (corporateCard) {
            takeCard(1, gameState.activePlayer.currentAge, gameState.activePlayer.id);
            header.changePlayerStats(gameState.currentPlayer);
          }
          if (gameState.currentPlayer.actionPoints !== 0) {
            gameBoard.display();
            gameBoard.init();
          }
        }
      }
    };
  }

  return setManualDogma();
};

export default getManualDogma;
