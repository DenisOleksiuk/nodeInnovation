// get JSON and return array of card objects
export default function parseCards(cardsJSON) {
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
}
