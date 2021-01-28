const gameState = {
  ageDecks: {
    age1: [],
    age2: [],
    age3: [],
    age4: [],
    age5: [],
    age6: [],
    age7: [],
    age8: [],
    age9: [],
    age10: [],
  },
  leadershipDeck: [],
  specialDeck: [],
  players: [],
  currentPlayer: null,
  activePlayer: null,
  dogmPlayers: null,
  player0: {
    name: null,
    id: 0,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
    currentDeck: 'age1', // test
    specialCards: [],
    specArchieveCount: 0,
    specInfluenceCount: 0,
    leadershipCards: [],
    activeDecks: {
      red: {
        cards: [],
        shift: '',
      },
      green: {
        cards: [],
        shift: '',
      },
      blue: {
        cards: [],
        shift: '',
      },
      purple: {
        cards: [],
        shift: '',
      },
      yellow: {
        cards: [],
        shift: '',
      },
    },
    influence: {
      points: 0,
      cards: [],
    },
    tree: 0,
    tower: 0,
    crown: 0,
    bulb: 0,
    factory: 0,
    clock: 0,
  },
  player1: {
    name: null,
    id: 1,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
    specialCards: [],
    leadershipCards: [],
    activeDecks: {
      red: {
        cards: [],
        shift: '',
      },
      green: {
        cards: [],
        shift: '',
      },
      blue: {
        cards: [],
        shift: '',
      },
      purple: {
        cards: [],
        shift: '',
      },
      yellow: {
        cards: [],
        shift: '',
      },
    },
    influence: {
      points: 0,
      cards: [],
    },
    tree: 0,
    tower: 0,
    crown: 0,
    bulb: 0,
    factory: 0,
    clock: 0,
  },
  player2: {
    name: null,
    id: 2,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
    specialCards: [],
    leadershipCards: [],
    activeDecks: {
      red: {
        cards: [],
        shift: null,
      },
      green: {
        cards: [],
        shift: null,
      },
      blue: {
        cards: [],
        shift: null,
      },
      purple: {
        cards: [],
        shift: null,
      },
      yellow: {
        cards: [],
        shift: null,
      },
    },
    influence: {
      points: 0,
      cards: [],
    },
    tree: 0,
    tower: 0,
    crown: 0,
    bulb: 0,
    factory: 0,
    clock: 0,
  },
  player3: {
    name: null,
    id: 3,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
    specialCards: [],
    leadershipCards: [],
    activeDecks: {
      red: {
        cards: [],
        shift: null,
      },
      green: {
        cards: [],
        shift: null,
      },
      blue: {
        cards: [],
        shift: null,
      },
      purple: {
        cards: [],
        shift: null,
      },
      yellow: {
        cards: [],
        shift: null,
      },
    },
    influence: {
      points: 0,
      cards: [],
    },
    tree: 0,
    tower: 0,
    crown: 0,
    bulb: 0,
    factory: 0,
    clock: 0,
  },
};

export default gameState;
