/*
* take cards objects and sort them to separate decks
* store all cards avaible for all players (ages/leadership/special)
* store cards as objects
* this object passed as argument to Game constructor
*/
export default class GameField {
  constructor(arrOfCardObjects) {
    // create empty decks for each age
    this.ageDecks = {
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
    };

    // TODO leadership later
    // create empty leadership deck
    this.leadershipDeck = [];
    // TODO special deck later
    // create empty special deck
    this.specialDeck = [];

    // fill age decks with card objects
    this.setDeckArrays(arrOfCardObjects);
  }

  // TODO add shuffle later
  // fill deck arays depends on card age field
  setDeckArrays(cardsObj) {
    cardsObj.forEach((e) => {
      switch (+e.age) {
        case 1:
          this.ageDecks.age1.push(e);
          break;
        case 2:
          this.ageDecks.age2.push(e);
          break;
        case 3:
          this.ageDecks.age3.push(e);
          break;
        case 4:
          this.ageDecks.age4.push(e);
          break;
        case 5:
          this.ageDecks.age5.push(e);
          break;
        case 6:
          this.ageDecks.age6.push(e);
          break;
        case 7:
          this.ageDecks.age7.push(e);
          break;
        case 8:
          this.ageDecks.age8.push(e);
          break;
        case 9:
          this.ageDecks.age9.push(e);
          break;
        case 10:
          this.ageDecks.age10.push(e);
          break;
        default:
          throw new Error(`Wrong number on age field in ${e}`);
      }
    });
  }
}
