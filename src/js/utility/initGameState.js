import gameState from '../components/gameState';
import getCardObject from '../cards/getCardObject';
import shuffleArr from './shuffleArr';

export default function initGameState(usersInfo) {
  // fill age decks
  const arrOfCardObjects = getCardObject.all();
  arrOfCardObjects.forEach((cardObj) => {
    switch (+cardObj.age) {
      case 1:
        gameState.ageDecks.age1.push(cardObj.innovation);
        break;
      case 2:
        gameState.ageDecks.age2.push(cardObj.innovation);
        break;
      case 3:
        gameState.ageDecks.age3.push(cardObj.innovation);
        break;
      case 4:
        gameState.ageDecks.age4.push(cardObj.innovation);
        break;
      case 5:
        gameState.ageDecks.age5.push(cardObj.innovation);
        break;
      case 6:
        gameState.ageDecks.age6.push(cardObj.innovation);
        break;
      case 7:
        gameState.ageDecks.age7.push(cardObj.innovation);
        break;
      case 8:
        gameState.ageDecks.age8.push(cardObj.innovation);
        break;
      case 9:
        gameState.ageDecks.age9.push(cardObj.innovation);
        break;
      case 10:
        gameState.ageDecks.age10.push(cardObj.innovation);
        break;
      default:
        throw new Error(`Wrong number on age field in ${cardObj}`);
    }
  });

  // shuffle each age deck & fill leadership deck
  Object.values(gameState.ageDecks).forEach((ageDeck, i) => {
    gameState.ageDecks[`age${i + 1}`] = shuffleArr(ageDeck);
    gameState.leadershipDeck.push(ageDeck.pop());
  });

  // set up players fields
  for (let i = 0; i < usersInfo.players; i += 1) {
    const player = `player${i}`;
    gameState[player].name = usersInfo.names[i];
    gameState.players.push(gameState[player]);
  }
  gameState.currentPlayer = gameState.players[0];
  gameState.activePlayer = gameState.players[0];
  gameState.currentPlayer.actionPoints = 2; // test
}
