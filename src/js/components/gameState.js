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
  player0: {
    name: null,
    id: 0,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
    activeDecks: {
      red: {
        cards: [],
        shift: 'right', //! test
      },
      green: {
        cards: [],
        shift: 'top', //! test
      },
      blue: {
        cards: [],
        shift: 'left', //! test
      },
      purple: {
        cards: [],
        shift: null,
      },
      yellow: {
        cards: [],
        shift: 'top', //! test
      },
    },
  },
  player1: {
    name: null,
    id: 1,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
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
  },
  player2: {
    name: null,
    id: 2,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
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
  },
  player3: {
    name: null,
    id: 3,
    actionPoints: 0,
    hand: [],
    currentAge: 1,
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
  },
};

export default gameState;
