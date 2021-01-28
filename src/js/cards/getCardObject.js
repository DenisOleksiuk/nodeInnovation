import cardsJSON from './cards.json';

const getCardObject = {
  all() {
    const resultArr = [];
    cardsJSON.forEach((setOfCards) => {
      setOfCards.cards.forEach((card) => {
        const cardObject = {};
        Object.assign(cardObject, setOfCards, card);
        delete cardObject.cards; // remove duplicated field
        resultArr.push(cardObject);
      });
    });
    return resultArr;
  },

  byID(id) {
    const cardObject = {};
    cardsJSON.forEach((setOfCards) => {
      setOfCards.cards.forEach((card) => {
        if (card.innovation === id) {
          Object.assign(cardObject, setOfCards, card);
          delete cardObject.cards; // remove duplicated field
        }
      });
    });
    return cardObject;
  },
};

export default getCardObject;
