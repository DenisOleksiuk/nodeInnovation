export default class CreateCardComponent {
  constructor(objectOfCard) {
    this.objectOfCard = objectOfCard;
    return this.createCardComponent(this.objectOfCard);
  }

  createCardComponent(cardObj) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style = `background: url(${cardObj.cardImg})`;
    card.innerHTML = /* html */ `
        <div class="card__card-header card__color--${cardObj.color}">
          <div class="card__topLeft"></div>
          <div class="card-header__title">${cardObj.innovation}</div>
        </div>
        <div class="card__card-main card__color--${cardObj.color}-transparent">
          <div class="card__dogma" data-type="${cardObj.dogma[0].type}">
            <i class=" ${cardObj.dogma[0].icon[0]} ${cardObj.dogma[0].icon[1]} card__icon card__icon-color--${cardObj.dogma[0].color}" aria-hidden="true"></i>
            <span class="dogma__effect">${cardObj.dogma[0].effect}
            </span>
          </div>
          ${cardObj.dogma[1] ? /* html */ `
          <div class="card__dogma" data-type="corporate">
            <i class=" ${cardObj.dogma[1].icon[0]} ${cardObj.dogma[1].icon[1]} card__icon card__icon-color--${cardObj.dogma[1].color}" aria-hidden="true"></i>
            <span class="dogma__effect">${cardObj.dogma[1].effect}.</span>
          </div>
          ` : ''}
        </div>
        <div class="card__card-footer">
          <div class="card__bottomLeft"></div>
          <div class="card__bottomCenter"></div>
          <div class="card__bottomRight"></div>
        </div>
    `;
    const ageSlot = card.querySelector(`.card__${cardObj.agePosition}`);
    ageSlot.textContent = cardObj.age;
    ageSlot.classList.add(`card__color--${cardObj.color}`, 'card__age--border');

    const [res0, res1, res2] = cardObj.resourses;

    const resSlot0 = card.querySelector(`.card__${res0.position}`);
    resSlot0.classList.add(res0.type[0], res0.type[1], `card__icon-color--${res0.color}`, `card__icon-border--${cardObj.color}`);
    resSlot0.setAttribute('aria-hidden', 'true');

    const resSlot1 = card.querySelector(`.card__${res1.position}`);
    resSlot1.classList.add(res1.type[0], res1.type[1], `card__icon-color--${res1.color}`, `card__icon-border--${cardObj.color}`);
    resSlot1.setAttribute('aria-hidden', 'true');

    const resSlot2 = card.querySelector(`.card__${res2.position}`);
    resSlot2.classList.add(res2.type[0], res2.type[1], `card__icon-color--${res2.color}`, `card__icon-border--${cardObj.color}`);
    resSlot2.setAttribute('aria-hidden', 'true');
    return card;
  }
}
