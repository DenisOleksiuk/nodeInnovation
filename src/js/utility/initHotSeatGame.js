import initGameState from './initGameState';
import gameBoard from '../components/gameBoard';
import header from '../display/playerTable/displayHeader';
import resetGameState from './resetGameState';

export default function initHotSeatGame(usersInfo) {
  // remove existed btn left from previous game
  const existedBtn = document.querySelector('.info-table__next-turn-btn');
  if (existedBtn !== null) existedBtn.remove();
  // reset gameState
  resetGameState();
  // reset header
  [...document.querySelectorAll('.player-container')].forEach((playerBlock) => {
    playerBlock.classList.add('player-container__hidden');
  });

  // initialize new game
  initGameState(usersInfo);
  gameBoard.display();
  header.initPlayerNames(usersInfo.names);
  gameBoard.init();
}
