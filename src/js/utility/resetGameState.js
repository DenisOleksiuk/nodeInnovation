import gameState from '../components/gameState';

export default function resetGameState() {
  Object.keys(gameState.ageDecks).forEach((key) => {
    gameState.ageDecks[key] = [];
  });
  gameState.leadershipDeck = [];
  gameState.specialDeck = [];
  gameState.players = [];
  gameState.currentPlayer = null;
  gameState.activePlayer = null;
  gameState.dogmPlayers = null;
  gameState.specialDeck = ['Дипломатия', 'Строительство', 'Наука', 'Военное дело', 'Культура'];
  gameState.specArchieveCount = 0;
  gameState.specInfluenceCount = 0;
  for (let i = 0; i < 4; i += 1) {
    gameState[`player${i}`].name = null;
    gameState[`player${i}`].actionPoints = 0;
    // gameState[`player${i}`].hand = [];
    gameState[`player${i}`].currentAge = 1;
    gameState[`player${i}`].currentDeck = 'age1';
    gameState[`player${i}`].specialCards = [];
    gameState[`player${i}`].leadershipCards = [];
    // Object.keys(gameState[`player${i}`].activeDecks).forEach((key) => {
    //   gameState[`player${i}`].activeDecks[key].cards = [];
    //   gameState[`player${i}`].activeDecks[key].shift = '';
    // });
  }
}
