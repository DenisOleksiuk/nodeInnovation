/*
* store all game UI dom elements
* this obj passed as argument to Game constructor
*/
export default class GameUI {
  constructor() {
    this.ageDecks = {};
    this.getAgeDecks();

    this.activeStacks = {};
    this.getActiveStacks();

    this.infoTable = {};
    this.getInfoTable();

    this.currentDeck = document.querySelector('.current-deck__cards');
    this.hand = document.querySelector('.hand__cards');
  }

  getAgeDecks() {
    const ageDecksElements = Array.from(document.getElementsByClassName('age-deck'));
    ageDecksElements.forEach((ageDeck, i) => {
      this.ageDecks[`age${i + 1}`] = ageDecksElements[i];
    });
  }

  getActiveStacks() {
    const activeStacksElements = Array.from(document.getElementsByClassName('active-zone__stack'));
    activeStacksElements.forEach((activeStack) => {
      this.activeStacks[activeStack.id] = activeStack;
    });
  }

  getInfoTable() {
    const currentPlayerNameBlock = document.querySelector('.info-table__player-name');
    this.infoTable.name = currentPlayerNameBlock;
    const currentPlayerActionPoints = document.querySelector('.info-table__action-points');
    this.infoTable.actionPoints = currentPlayerActionPoints;
  }
}
