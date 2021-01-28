export default function getCardElement(cardObj) {
  // get card header
  function getCardHeader(card) {
    const divHeader = document.createElement('div');
    divHeader.classList.add('card__card-header', `card__color--${card.color}`);

    const posTopLeft = document.createElement('div');
    posTopLeft.classList.add('card__topLeft');

    const title = document.createElement('div');
    title.classList.add('card-header__title');
    title.textContent = card.innovation;

    divHeader.appendChild(posTopLeft);
    divHeader.appendChild(title);

    return divHeader;
  }
  // get card body
  function getCardMain(card) {
    const divMain = document.createElement('div');
    divMain.classList.add('card__card-main', `card__color--${card.color}-transparent`);

    const divDogmsBlock = document.createElement('div');
    divDogmsBlock.classList.add('card__dogms-block');

    card.dogma.forEach((item) => {
      const divDogma = document.createElement('div');
      divDogma.classList.add('card__dogma');
      divDogma.setAttribute('data-type', item.type);

      const icon = document.createElement('i');
      icon.classList.add(item.icon[0], item.icon[1], 'card__icon', `card__icon-color--${item.color}`);
      divDogma.appendChild(icon);

      const dogma = document.createElement('span');
      dogma.classList.add('dogma__effect');
      dogma.innerHTML = item.effect;
      divDogma.appendChild(dogma);

      divDogmsBlock.appendChild(divDogma);
    });

    divMain.appendChild(divDogmsBlock);

    return divMain;
  }
  // get card footer
  function getCardFooter() {
    const divFooter = document.createElement('div');
    divFooter.classList.add('card__card-footer');

    const posBottomLeft = document.createElement('div');
    posBottomLeft.classList.add('card__bottomLeft');
    divFooter.appendChild(posBottomLeft);

    const posBottomCenter = document.createElement('div');
    posBottomCenter.classList.add('card__bottomCenter');
    divFooter.appendChild(posBottomCenter);

    const posBottomRight = document.createElement('div');
    posBottomRight.classList.add('card__bottomRight');
    divFooter.appendChild(posBottomRight);

    return divFooter;
  }
  // place age number and resourses by card position
  function setObjByPosition(divCard, card) {
    const agePos = divCard.querySelector(`.card__${card.agePosition}`);
    agePos.classList.add(`card__color--${card.color}`, 'card__age--border');
    agePos.textContent = card.age;

    card.resourses.forEach((res) => {
      const pos = divCard.querySelector(`.card__${res.position}`);
      pos.classList.add(`${res.type[0]}`, `${res.type[1]}`,
        `card__icon-color--${res.color}`, `card__icon-border--${card.color}`);
    });
  }

  const divCard = document.createElement('div');
  divCard.classList.add('card');
  divCard.style.background = `url("${cardObj.cardImg}")`;
  divCard.dataset.innovation = cardObj.innovation;

  divCard.appendChild(getCardHeader(cardObj));
  divCard.appendChild(getCardMain(cardObj));
  divCard.appendChild(getCardFooter());
  setObjByPosition(divCard, cardObj, cardObj.age, cardObj.color);

  return divCard;
}
