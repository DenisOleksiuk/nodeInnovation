export default function getSpecCardElement(cardObj) {
  // get card header
  function getCardHeader(card) {
    const divHeader = document.createElement('div');
    divHeader.classList.add('card__card-header');

    const title = document.createElement('div');
    title.classList.add('card-header__title');
    title.textContent = card.name;
    divHeader.appendChild(title);

    return divHeader;
  }
  // get card body
  function getCardMain(card) {
    const divMain = document.createElement('div');
    divMain.classList.add('card__card-main');

    const divRulesBlock = document.createElement('div');
    divRulesBlock.classList.add('card__rules-block');

    card.rules.forEach((item) => {
      const divRule = document.createElement('div');
      divRule.classList.add('card__rule');

      const rule = document.createElement('span');
      rule.classList.add('rule__content');
      rule.innerHTML = item;
      divRule.appendChild(rule);

      divRulesBlock.appendChild(divRule);
    });

    divMain.appendChild(divRulesBlock);

    return divMain;
  }

  const divCard = document.createElement('div');
  divCard.classList.add('special-cards__card');
  divCard.style.background = `url("${cardObj.cardImg}")`;
  divCard.dataset.name = cardObj.name;

  divCard.appendChild(getCardHeader(cardObj));
  divCard.appendChild(getCardMain(cardObj));

  return divCard;
}
