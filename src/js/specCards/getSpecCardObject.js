import cardsJSON from './specCards.json';

const getSpecCardObject = {
  all() {
    const resultArr = [];
    cardsJSON.forEach((card) => {
      const cardObject = {};
      Object.assign(cardObject, card);
      resultArr.push(cardObject);
    });
    return resultArr;
  },

  byID(id) {
    const cardObject = {};
    cardsJSON.forEach((card) => {
      if (card.name === id) {
        Object.assign(cardObject, card);
      }
    });
    return cardObject;
  },
};

export default getSpecCardObject;
