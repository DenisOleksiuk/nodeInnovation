// take card object and return builded card DOM element
const getCard = {
  // get playing card
  frontSide(cardObj) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.style.background = `url("${cardObj.cardImg}")`;

    divCard.appendChild(this.getCardHeader(cardObj));
    divCard.appendChild(this.getCardMain(cardObj));
    divCard.appendChild(this.getCardFooter());
    this.setObjByPosition(divCard, cardObj, cardObj.age, cardObj.color);

    return divCard;
  },

  // get card header
  getCardHeader(card) {
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
  },

  // get card body
  getCardMain(card) {
    const divMain = document.createElement('div');
    divMain.classList.add('card__card-main', `card__color--${card.color}-transparent`);

    card.dogma.forEach((item) => {
      const divDogma = document.createElement('div');
      divDogma.classList.add('card__dogma');
      divDogma.setAttribute('data-dogmatype', item.dogmaType);

      const icon = document.createElement('i');
      icon.classList.add(item.dogmaIcon[0], item.dogmaIcon[1], 'card__icon', `card__icon-color--${item.dogmaColor}`);
      divDogma.appendChild(icon);

      const dogma = document.createElement('span');
      dogma.classList.add('dogma__effect');
      dogma.innerHTML = item.dogmaEffect;
      divDogma.appendChild(dogma);

      divMain.appendChild(divDogma);
    });

    return divMain;
  },

  // get card footer
  getCardFooter() {
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
  },

  // place age number and resourses by card position
  setObjByPosition(divCard, card) {
    const agePos = divCard.querySelector(`.card__${card.agePosition}`);
    agePos.classList.add(`card__color--${card.color}`, 'card__age--border');
    agePos.textContent = card.age;

    card.resourses.forEach((res) => {
      const pos = divCard.querySelector(`.card__${res.resoursePosition}`);
      pos.classList.add(`${res.resourseType[0]}`, `${res.resourseType[1]}`,
        `card__icon-color--${res.resourseColor}`, `card__icon-border--${card.color}`);
    });
  },
};

export default getCard;
