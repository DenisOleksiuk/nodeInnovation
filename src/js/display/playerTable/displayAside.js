const displayAside = {
  wrapper: null,
  init() {
    // create aside wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('aside');

    // append createand blocks to aside wrapper
    this.wrapper.append(this.getInfoBlock());
    this.wrapper.append(this.getCurrentDeckBlock());
    this.wrapper.append(this.getExtraCardsBlock());
    this.wrapper.append(this.getLogBlock());

    // create hidden modals blocks
    this.ageDecksBlock = this.getAgeDecksBlock();
    this.leadershipCardsBlock = this.getLeadershipCardsBlock();
    this.specialCardsBlock = this.getSpecialCardsBlock();

    // append hidden modal blocks to body
    document.body.append(this.ageDecksBlock);
    document.body.append(this.leadershipCardsBlock);
    document.body.append(this.specialCardsBlock);

    return this.wrapper;
  },

  getInfoBlock() {
    // create info block
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-table');

    // create current player block
    const currentPlayerBlock = document.createElement('div');
    currentPlayerBlock.classList.add('info-table__player-block');

    const currentPlayerText = document.createElement('div');
    currentPlayerText.innerText = 'Ход игрока: ';

    const currentPlayerName = document.createElement('div');
    currentPlayerName.classList.add('info-table__player-name');

    currentPlayerBlock.append(currentPlayerText);
    currentPlayerBlock.append(currentPlayerName);

    // create action points block
    const actionPointsBlock = document.createElement('div');
    actionPointsBlock.classList.add('info-table__action-points-block');

    const actionPointsText = document.createElement('div');
    actionPointsText.innerText = 'Осталось ОД: ';

    const actionPointsValue = document.createElement('div');
    actionPointsValue.classList.add('info-table__action-points');

    actionPointsBlock.append(actionPointsText);
    actionPointsBlock.append(actionPointsValue);

    // append created blocks to info block
    infoBlock.append(currentPlayerBlock);
    infoBlock.append(actionPointsBlock);

    return infoBlock;
  },

  getCurrentDeckBlock() {
    // create current deck block
    const currentDeck = document.createElement('div');
    currentDeck.classList.add('current-deck');

    const currentDeckTitle = document.createElement('div');
    currentDeckTitle.classList.add('current-deck__title');
    currentDeckTitle.innerText = 'Взять карту';

    const currentDeckCards = document.createElement('div');
    currentDeckCards.classList.add('current-deck__cards');

    // create hover button element
    const hoverBtn = document.createElement('button');
    hoverBtn.classList.add('hover-btn');
    hoverBtn.innerText = 'Показать все';
    hoverBtn.addEventListener('click', () => {
      this.ageDecksBlock.classList.toggle('age-decks--hidden');
    });

    // append button to deck block
    currentDeckCards.append(hoverBtn);

    // append title and cards blocks to current deck block
    currentDeck.append(currentDeckTitle);
    currentDeck.append(currentDeckCards);

    return currentDeck;
  },

  getExtraCardsBlock() {
    // create extra cards block
    const extraCards = document.createElement('div');
    extraCards.classList.add('extra-cards');

    // create special cards block
    const specialCards = document.createElement('div');
    specialCards.classList.add('extra-cards__special-block');

    const specialCardsTitle = document.createElement('div');
    specialCardsTitle.classList.add('extra-cards__special-title');
    specialCardsTitle.innerText = 'Специальные';

    const specialCardsCards = document.createElement('div');
    specialCardsCards.classList.add('extra-cards__special-cards');

    // create hover button for special cards block
    const hoverBtnSpecial = document.createElement('button');
    hoverBtnSpecial.classList.add('hover-btn');
    hoverBtnSpecial.innerText = 'Показать все';
    hoverBtnSpecial.addEventListener('click', () => {
      this.specialCardsBlock.classList.toggle('special-cards--hidden');
    });
    specialCardsCards.append(hoverBtnSpecial);

    // append title and cards to special cards block
    specialCards.append(specialCardsTitle);
    specialCards.append(specialCardsCards);

    // create leadership cards block
    const leadershipCards = document.createElement('div');
    leadershipCards.classList.add('extra-cards__leadership-block');

    const leadershipCardsTitle = document.createElement('div');
    leadershipCardsTitle.classList.add('extra-cards__leadership-title');
    leadershipCardsTitle.innerText = 'Лидерство';

    const leadershipCardsCards = document.createElement('div');
    leadershipCardsCards.classList.add('extra-cards__leadership-cards');

    // create hover button for leadership cards block
    const hoverBtnLeadership = document.createElement('button');
    hoverBtnLeadership.classList.add('hover-btn');
    hoverBtnLeadership.innerText = 'Показать все';
    hoverBtnLeadership.addEventListener('click', () => {
      this.leadershipCardsBlock.classList.toggle('leadership-cards--hidden');
    });
    leadershipCardsCards.append(hoverBtnLeadership);

    // append title and cards to leadership cards block
    leadershipCards.append(leadershipCardsTitle);
    leadershipCards.append(leadershipCardsCards);

    // apend special cards and leadership blocks to extra cards block
    extraCards.append(specialCards);
    extraCards.append(leadershipCards);

    return extraCards;
  },

  getLogBlock() {
    // create log block
    const logBlock = document.createElement('div');
    logBlock.classList.add('log');

    // create log block title
    const logBlockTitle = document.createElement('div');
    logBlockTitle.classList.add('log__title');
    logBlockTitle.innerText = 'Чат/Лог';

    // create log block text block
    const logBlockText = document.createElement('div');
    logBlockText.classList.add('log__text');

    // create log form for chat / log
    const logForm = document.createElement('form');
    const logInput = document.createElement('input');
    const logBtn = document.createElement('button');
    logForm.classList.add('log__form');
    logInput.classList.add('log__input');
    logBtn.classList.add('log__btn');
    logBtn.type = 'text';
    logBtn.textContent = 'Отправить';

    // append title and text block to log block
    logForm.append(logInput, logBtn);
    logBlock.append(logBlockTitle, logBlockText, logForm);
    // logBlock.append(logBlockText);

    return logBlock;
  },

  getAgeDecksBlock() {
    // create age decks modal block
    const agesNumber = 10;
    const ageDecksBlock = document.createElement('div');
    ageDecksBlock.classList.add('age-decks');
    ageDecksBlock.classList.add('age-decks--hidden'); // hidden by default

    const firstLine = document.createElement('div');
    firstLine.classList.add('age-decks__first-line');

    const secondLine = document.createElement('div');
    secondLine.classList.add('age-decks__second-line');

    const thirdLine = document.createElement('div');
    thirdLine.classList.add('age-decks__third-line');

    const btnLine = document.createElement('div');
    btnLine.classList.add('age-decks__btn-line');

    // create age decks
    for (let i = 0; i < agesNumber; i += 1) {
      const deck = document.createElement('div');
      deck.classList.add('age-deck');
      deck.id = `age${i + 1}`; // id age1-10 for each deck
      deck.innerText = `${i + 1} Age`; // TODO remove later
      deck.style.backgroundImage = 'url(./assets/img/cards-bg/age-01.jpg)'; //! use `` age-0${i+1} later

      deck.addEventListener('click', () => this.ageDecksBlock.classList.toggle('age-decks--hidden'));

      if (i < 4) {
        firstLine.append(deck);
      } else if (i < 7) {
        secondLine.append(deck);
      } else if (i < 10) {
        thirdLine.append(deck);
      }
      if (i === 9) {
        // create close button
        const button = document.createElement('button');
        button.classList.add('age-decks__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', () => {
          this.ageDecksBlock.classList.toggle('age-decks--hidden');
        });
        btnLine.append(button);
      }
    }

    ageDecksBlock.append(firstLine);
    ageDecksBlock.append(secondLine);
    ageDecksBlock.append(thirdLine);
    ageDecksBlock.append(btnLine);

    return ageDecksBlock;
  },

  getLeadershipCardsBlock() {
    // create leadership decks modal block
    const leadershipCardsBlock = document.createElement('div');
    leadershipCardsBlock.classList.add('leadership-cards');
    leadershipCardsBlock.classList.add('leadership-cards--hidden'); // hidden by default

    const firstLine = document.createElement('div');
    firstLine.classList.add('leadership-cards__first-line');

    const secondLine = document.createElement('div');
    secondLine.classList.add('leadership-cards__second-line');

    const btnLine = document.createElement('div');
    btnLine.classList.add('leadership-cards__btn-line');

    // create leadership cards
    const numOfLeadershipCards = 10;
    for (let i = 0; i < numOfLeadershipCards; i += 1) {
      const leadershipCard = document.createElement('div');
      leadershipCard.classList.add('leadership-cards__card');
      leadershipCard.innerText = `${i + 1}`;

      if (i < 5) firstLine.append(leadershipCard);
      else if (i < 10) secondLine.append(leadershipCard);

      if (i === 9) {
        // create close button
        const button = document.createElement('button');
        button.classList.add('leadership-cards__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', () => {
          this.leadershipCardsBlock.classList.toggle('leadership-cards--hidden');
        });
        btnLine.append(button);
      }
    }

    leadershipCardsBlock.append(firstLine);
    leadershipCardsBlock.append(secondLine);
    leadershipCardsBlock.append(btnLine);

    return leadershipCardsBlock;
  },

  getSpecialCardsBlock() {
    // create special cards modal block
    const specialCardsBlock = document.createElement('div');
    specialCardsBlock.classList.add('special-cards');
    specialCardsBlock.classList.add('special-cards--hidden');

    const firstLine = document.createElement('div');
    firstLine.classList.add('special-cards__first-line');

    const secondLine = document.createElement('div');
    secondLine.classList.add('special-cards__second-line');

    const btnLine = document.createElement('div');
    btnLine.classList.add('special-cards__btn-line');

    // create special cards
    const numOfSpecialCards = 5;
    for (let i = 0; i < numOfSpecialCards; i += 1) {
      const specialCard = document.createElement('div');
      specialCard.classList.add('special-cards__card');

      if (i < 3) firstLine.append(specialCard);
      else if (i < 5) secondLine.append(specialCard);

      if (i === 4) {
        // create close button
        const button = document.createElement('button');
        button.classList.add('special-cards__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', () => {
          this.specialCardsBlock.classList.toggle('special-cards--hidden');
        });
        btnLine.append(button);
      }
    }

    specialCardsBlock.append(firstLine);
    specialCardsBlock.append(secondLine);
    specialCardsBlock.append(btnLine);

    return specialCardsBlock;
  },
};

export default displayAside;
