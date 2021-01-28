const displayHeader = {
  wrapper: null,
  headRowNames: [{ hand: ['fas', 'fa-hand-paper', 'yellow'] }, { influence: ['fas', 'fa-shield-alt', 'red'] }, { leadership: ['fas', 'fa-trophy', 'yellow'] }],
  resourcesNames: [{ tree: ['fab', 'fa-pagelines', 'green'] }, { tower: ['fab', 'fa-fort-awesome', 'grey'] }, { crown: ['fas', 'fa-crown', 'yellow'] }, { bulb: ['fas', 'fa-lightbulb', 'purple'] }, { factory: ['fas', 'fa-industry', 'red'] }, { clock: ['far', 'fa-clock', 'blue'] }],
  player0: {
    container: null,
    name: null,
    hand: null,
    influence: null,
    leadership: null,
    red: null,
    green: null,
    blue: null,
    purple: null,
    yellow: null,
    tree: null,
    tower: null,
    crown: null,
    bulb: null,
    factory: null,
    clock: null,
  },
  player1: {
    container: null,
    name: null,
    hand: null,
    influence: null,
    leadership: null,
    red: null,
    green: null,
    blue: null,
    purple: null,
    yellow: null,
    tree: null,
    tower: null,
    crown: null,
    bulb: null,
    factory: null,
    clock: null,
  },
  player2: {
    container: null,
    name: null,
    hand: null,
    influence: null,
    leadership: null,
    red: null,
    green: null,
    blue: null,
    purple: null,
    yellow: null,
    tree: null,
    tower: null,
    crown: null,
    bulb: null,
    factory: null,
    clock: null,
  },
  player3: {
    container: null,
    name: null,
    hand: null,
    influence: null,
    leadership: null,
    red: null,
    green: null,
    blue: null,
    purple: null,
    yellow: null,
    tree: null,
    tower: null,
    crown: null,
    bulb: null,
    factory: null,
    clock: null,
  },

  initPlayerStats(id) {
    const player = `player${id}`;

    this[player].container = document.createElement('div');
    this[player].container.classList.add('player-container');

    const headRow = document.createElement('div');
    headRow.classList.add('head-row');
    this[player].name = document.createElement('div');
    this[player].name.classList.add('head-row__name');
    this[player].name.textContent = `Player${id}`;
    headRow.appendChild(this[player].name);

    this.headRowNames.forEach((e) => {
      const i = Object.keys(e)[0];
      const container = document.createElement('div');
      container.classList.add('cards-container');
      const iconContainer = document.createElement('div');
      iconContainer.classList.add(`${e[i][0]}`, `${e[i][1]}`, 'cards-container__icon', `card__icon-color--${e[i][2]}`);
      container.appendChild(iconContainer);
      this[player][i] = document.createElement('div');
      this[player][i].classList.add('cards-container__counter');
      this[player][i].textContent = 0;
      container.appendChild(this[player][i]);
      headRow.appendChild(container);
    });

    this[player].container.appendChild(headRow);

    const activeZoneRow = document.createElement('div');
    activeZoneRow.classList.add('active-zone-row');

    this[player].red = document.createElement('div');
    this[player].red.classList.add('active-zone-row__red');
    this[player].red.textContent = 0;
    activeZoneRow.appendChild(this[player].red);

    this[player].green = document.createElement('div');
    this[player].green.classList.add('active-zone-row__green');
    this[player].green.textContent = 0;
    activeZoneRow.appendChild(this[player].green);

    this[player].blue = document.createElement('div');
    this[player].blue.classList.add('active-zone-row__blue');
    this[player].blue.textContent = 0;
    activeZoneRow.appendChild(this[player].blue);

    this[player].purple = document.createElement('div');
    this[player].purple.classList.add('active-zone-row__purple');
    this[player].purple.textContent = 0;
    activeZoneRow.appendChild(this[player].purple);

    this[player].yellow = document.createElement('div');
    this[player].yellow.classList.add('active-zone-row__yellow');
    this[player].yellow.textContent = 0;
    activeZoneRow.appendChild(this[player].yellow);

    this[player].container.appendChild(activeZoneRow);

    const recourcesRow = document.createElement('div');
    recourcesRow.classList.add('recources-row');
    this.resourcesNames.forEach((e) => {
      const i = Object.keys(e)[0];
      // console.log(e[i][0]);
      const container = document.createElement('div');
      container.classList.add('recource-container');
      const iconContainer = document.createElement('div');
      iconContainer.classList.add(`${e[i][0]}`, `${e[i][1]}`, 'recource-container__icon', `card__icon-color--${e[i][2]}`);
      container.appendChild(iconContainer);
      this[player][i] = document.createElement('div');
      this[player][i].classList.add('recource-container__counter');
      this[player][i].textContent = 0;
      container.appendChild(this[player][i]);
      recourcesRow.appendChild(container);
    });

    this[player].container.appendChild(recourcesRow);
    this[player].container.classList.add('player-container__hidden');
    this.headerTableWrapper.appendChild(this[player].container);
  },

  changePlayerStats(player) {
    const playerId = `player${player.id}`;

    this[playerId].hand.textContent = player.hand.length;
    this[playerId].red.textContent = player.activeDecks.red.cards.length;
    this[playerId].green.textContent = player.activeDecks.green.cards.length;
    this[playerId].blue.textContent = player.activeDecks.blue.cards.length;
    this[playerId].purple.textContent = player.activeDecks.purple.cards.length;
    this[playerId].yellow.textContent = player.activeDecks.yellow.cards.length;
    this[playerId].tree.textContent = player.tree;
    this[playerId].tower.textContent = player.tower;
    this[playerId].crown.textContent = player.crown;
    this[playerId].bulb.textContent = player.bulb;
    this[playerId].factory.textContent = player.factory;
    this[playerId].clock.textContent = player.clock;
    this[playerId].influence.textContent = player.influence.points;
    this[playerId].leadership.textContent = player.specialCards.length
      + player.leadershipCards.length;
  },

  initPlayerNames(players) {
    for (let i = 0; i < players.length; i += 1) {
      const currentPlayer = `player${i}`;
      this[currentPlayer].name.textContent = players[i];
      this[currentPlayer].container.classList.remove('player-container__hidden');

      const influenceBlocks = document.querySelectorAll('.fa-shield-alt');
      influenceBlocks[i].parentElement.dataset.innovation = `influence${i}`;
    }
  },

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('header');

    this.headerTitle = document.createElement('div');
    this.headerTitle.classList.add('header__title');
    this.wrapper.appendChild(this.headerTitle);

    this.headerOverlay = document.createElement('div');
    this.headerOverlay.classList.add('header__overlay');
    this.wrapper.appendChild(this.headerOverlay);

    this.headerTable = document.createElement('div');
    this.headerTable.classList.add('header__table');
    this.headerTableWrapper = document.createElement('div');
    this.headerTableWrapper.classList.add('header__table__wrapper');
    this.headerTable.appendChild(this.headerTableWrapper);
    this.wrapper.appendChild(this.headerTable);

    this.initPlayerStats(0);
    this.initPlayerStats(1);
    this.initPlayerStats(2);
    this.initPlayerStats(3);
    return this.wrapper;
  },
};

export default displayHeader;

/* 'tower', 'crown', 'bulb', 'factory', 'clock' */
