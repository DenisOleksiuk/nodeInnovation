import getCardObject from '../cards/getCardObject';

export default function updateGameState(gameState) {
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
        const highestCard = getCardObject.byID(highestCardInnovation);
        highestCard.resourses.forEach((e) => {
          player[e.name] += 1;
        });
      }
      // calculate shift
      if (currentStack.cards.length > 1) {
        // calculate top shift
        if (currentStack.shift === 'top') {
          const arrOfPositions = ['bottomLeft', 'bottomCenter', 'bottomRight'];
          for (let i = 0; i <= currentStack.cards.length - 2; i += 1) {
            const currentCardInnovation = currentStack.cards[i];
            const currentCardObj = getCardObject.byID(currentCardInnovation);
            currentCardObj.resourses.forEach((e) => {
              if (arrOfPositions.indexOf(e.position) > -1) {
                player[e.name] += 1;
              }
            });
          }
        }

        // calculate left shift
        if (currentStack.shift === 'left') {
          for (let i = 0; i <= currentStack.cards.length - 2; i += 1) {
            const currentCardInnovation = currentStack.cards[i];
            const currentCardObj = getCardObject.byID(currentCardInnovation);
            currentCardObj.resourses.forEach((e) => {
              if (e.position === 'bottomRight') {
                player[e.name] += 1;
              }
            });
          }
        }

        // calculate right shift
        if (currentStack.shift === 'right') {
          const arrOfPositions = ['bottomLeft', 'topLeft'];
          for (let i = 0; i <= currentStack.cards.length - 2; i += 1) {
            const currentCardInnovation = currentStack.cards[i];
            const currentCardObj = getCardObject.byID(currentCardInnovation);
            currentCardObj.resourses.forEach((e) => {
              if (arrOfPositions.indexOf(e.position) > -1) {
                player[e.name] += 1;
              }
            });
          }
        }
      }
    });
  });

  // update currentAge for each player
  gameState.players.forEach((player) => {
    player.currentAge = 1;
    Object.keys(player.activeDecks).forEach((stack) => {
      const currentStack = player.activeDecks[stack];
      if (currentStack.cards.length > 0) {
        const highestCardInnovation = currentStack.cards[currentStack.cards.length - 1];
        const highestCard = getCardObject.byID(highestCardInnovation);
        if (highestCard.age > player.currentAge) { player.currentAge = highestCard.age; }
      }
    });
  });

  // update currentDeck for each player
  gameState.players.forEach((player) => {
    for (let i = player.currentAge; i < 11; i += 1) {
      const deck = gameState.ageDecks[`age${i}`];
      if (deck.length > 0) {
        player.currentDeck = `age${i}`;
        break;
      }
    }
  });

  // update influence points for each player
  gameState.players.forEach((player) => {
    player.influence.points = 0;
    player.influence.cards.forEach((card) => {
      const cardObject = getCardObject.byID(card);
      player.influence.points += cardObject.age;
    });
  });
}
