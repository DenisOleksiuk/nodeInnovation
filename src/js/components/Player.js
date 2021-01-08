import getCard from '../cards/getCard';
import header from '../display/playerTable/displayHeader';

/*
* store all player cards objects (hand/table/lead/influence)
* this obj passed as argument to Game constructor
*/
export default class Player {
  constructor(gameUI, playerName, id) {
    // store passed values
    this.name = playerName;
    this.id = id;
    this.gameUI = gameUI;

    // set default values
    this.game = null; //! this field will be set at game object initialization
    this.currentAge = 1;
    this.hand = [];

    //! Names of stacks are color field in card objects
    this.activeStacks = {
      blue: {
        cards: [],
        shift: null,
      },
      red: {
        cards: [],
        shift: null,
      },
      green: {
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
    };

    // Resources
    this.tree = 0;
    this.tower = 0;
    this.crown = 0;
    this.bulb = 0;
    this.factory = 0;
    this.clock = 0;

    // player leadership and influence objects
    // TODO LATER
    this.ownedLeadership = {
      domElement: null, // TODO remove
      cardsArray: [],
    };
    // TODO LATER
    this.influence = {
      domElement: null, // TODO remove
      cardsArray: [],
    };
  }

  // calculate current recourses
  calculateResources() {
    this.tree = 0;
    this.tower = 0;
    this.crown = 0;
    this.bulb = 0;
    this.factory = 0;
    this.clock = 0;
    Object.keys(this.activeStacks).forEach((stack) => {
      const currentStack = this.activeStacks[stack];
      if (currentStack.cards.length > 0) {
        const highestCard = currentStack.cards[currentStack.cards.length - 1];
        highestCard.resourses.forEach((e) => {
          this[e.resourceName] += 1;
        });
      }
    });
  }

  // calculate and set current age, iterates througth each stack
  //! Runs from Game each time when card taken
  setCurrentAge() {
    Object.keys(this.activeStacks).forEach((stack) => {
      this.activeStacks[stack].cards.forEach((card) => {
        if (+card.age > this.currentAge) {
          this.currentAge = +card.age;
        }
      });
    });
  }

  // render last taken card in hand of current player
  renderLastTakenCard() {
    const lastTakenCard = this.hand[this.hand.length - 1];
    const cardElement = getCard.frontSide(lastTakenCard);
    cardElement.onclick = () => { this.playCard(lastTakenCard, cardElement); };
    this.gameUI.hand.append(cardElement);
  }

  // render all cards in hand of current player
  renderHand() {
    this.gameUI.hand.innerHTML = ''; // clear previous rendered hand
    this.hand.forEach((card) => {
      const cardElement = getCard.frontSide(card);
      cardElement.onclick = () => {
        this.playCard(card, cardElement);
      };
      this.gameUI.hand.append(cardElement);
    });
  }

  // render all cards in active zone of current player
  renderActiveZone() {
    Object.keys(this.activeStacks).forEach((stackName) => {
      this.gameUI.activeStacks[stackName].innerHTML = ''; // clear previous rendered active zone
      this.activeStacks[stackName].cards.forEach((card) => {
        this.gameUI.activeStacks[stackName].append(getCard.frontSide(card));
      });
    });
  }

  // on click event for cards in hand. Play card in stack depends on category
  // TODO: later this method should add dogma function to each played card
  playCard(cardObj, cardElement) {
    Object.keys(this.activeStacks).forEach((stackName) => {
      if (stackName === cardObj.color) {
        this.hand.forEach((e, i) => {
          if (e === cardObj) {
            this.hand.splice(i, 1);
          }
        });
        this.activeStacks[stackName].cards.push(cardObj);
        this.gameUI.activeStacks[stackName].append(cardElement);
      }
    });
    this.calculateResources();
    header.changePlayerStats(this);
    this.game.actionDone();
  }
}
