import initHotSeatGame from '../utility/initHotSeatGame';
import displayNewTurnModal from '../display/displayNewTurnModal';
import header from '../display/playerTable/displayHeader';
import gameBoard from './gameBoard';
import gameState from './gameState';
import setChat from '../utility/setChat';

const users = {};
const audio = new Audio('../../assets/sounds/Dear-Friends.mp3');
let sound = false;
function isValid(userObj) {
  if (userObj.names.length === userObj.players) {
    return userObj.names.every((name) => name.length > 2 && name.length < 8);
  }
  return false;
}

function transform(state) {
  const currPlayerID = state.currentPlayer.id;
  const activePlayerID = state.activePlayer.id;
  const player0 = state.player0.id;
  const player1 = state.player1.id;
  const player2 = state.player2.id;
  const player3 = state.player3.id;

  state.players.forEach((player) => {
    if (player.id === currPlayerID) {
      state.currentPlayer = player;
    }
    if (player.id === activePlayerID) {
      state.activePlayer = player;
    }
    if (player.id === player0) {
      state.player0 = player;
    }
    if (player.id === player1) {
      state.player1 = player;
    }
    if (player.id === player2) {
      state.player2 = player;
    }
    if (player.id === player3) {
      state.player3 = player;
    }
  });
}

function loadTheGame() {
  const loadedGameState = JSON.parse(localStorage.getItem('innovation'));
  Object.entries(loadedGameState).forEach(([key, value]) => { gameState[key] = value; });
  transform(gameState);
  displayNewTurnModal(gameState.currentPlayer.name);
  gameBoard.display();
  const names = loadedGameState.players.map((player) => player.name);
  header.initPlayerNames(names);
  gameBoard.init();
  gameState.activePlayer.actionPoints += 1;
  gameBoard.update();
}

class Menu {
  constructor(parent) {
    this.parent = parent;
  }

  validateInputs() {
    const inputs = this.menu.querySelectorAll('input');
    const values = [...inputs].map((input) => input.value);
    for (let i = 0; i < inputs.length; i += 1) {
      const { value } = inputs[i];
      if (value.length < 3 || value.length > 7 || values.filter((v) => v === value).length > 1) {
        inputs[i].setCustomValidity('Invalid');
      } else {
        inputs[i].setCustomValidity('');
      }
    }
  }

  createMenuItem(text, ...dopParam) {
    return /* html */ `<div><a href="#" class="menu__link ${dopParam[0] || ''}" ${dopParam[1] || ''}>
      ${text}
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 120" style="enable-background:new 0 0 500 120;" xml:space="preserve">
      <linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="122.5156" y1="182.4863" x2="382.0009" y2="-76.9989">
      <stop  offset="0" style="stop-color:#FFC200"/>
      <stop  offset="0.0503" style="stop-color:#F8B700"/>
      <stop  offset="0.255" style="stop-color:#E08F00"/>
      <stop  offset="0.4561" style="stop-color:#CD6F00"/>
      <stop  offset="0.65" style="stop-color:#C05800"/>
      <stop  offset="0.8336" style="stop-color:#B84B00"/>
      <stop  offset="0.996" style="stop-color:#B54600"/>
      </linearGradient>  
      <path stroke="url(#grad)" d="M471.5,4.5v89c0,5.522-4.478,10-10,10h-431c-5.523,0-10-4.478-10-10v-69c0-5.523,4.477-10,10-10h461"/>
      </svg>
    </a></div>`;
  }

  render() {
    this.menu = document.createElement('div');
    this.menu.classList.add('menu', 'main');
    this.menu.innerHTML = `
    ${this.createMenuItem('Новая игра', 'start')}
    ${this.createMenuItem('Правила игры', 'rules')}
    ${this.createMenuItem('Продолжить', 'continue disabled')}
    ${this.createMenuItem('Настройки', 'settings')}
    ${this.createMenuItem('Загрузить игру', 'load disabled')}
    ${this.createMenuItem('Наша команда', 'about')}
    ${this.createMenuItem('Сохранить игру', 'save disabled')}
    ${this.createMenuItem('Включить звук', 'sound')}
    `;

    this.parent.append(this.menu);
    this.renderPdfRules();

    this.menu.addEventListener('click', (e) => {
      if (e.target.tagName !== 'DIV' && e.target.tagName !== 'A' && e.target.tagName !== 'SPAN' && e.target !== this.menu.querySelector('button')) {
        return;
      }
      const intro = this.menu.parentElement.parentElement.parentElement;
      if (e.target.className.includes('start')) {
        this.menu.classList.remove('main');
        this.createChoosePlayersItems();
      } else if (e.target.className.includes('rules')) {
        this.rulesWrraper.hidden = false;
      } else if (e.target.className.includes('close')) {
        this.rulesWrraper.hidden = true;
      } else if (e.target.dataset.players) {
        this.createNameInputField(e.target.dataset.players);
      } else if (e.target.className.includes('get-names')) {
        e.preventDefault();
        this.addNamesToUsers();
        if (isValid(users)) {
          displayNewTurnModal(users.names[0]);
          initHotSeatGame(users);
          setChat(users.names);
          setTimeout(() => {
            intro.classList.toggle('intro--hide');
          }, 500);
        } else {
          this.validateInputs();
          this.showErrorMessage();
        }
      } else if (e.target.className.includes('back')) {
        this.menu.classList.add('main');
        this.menu.classList.remove('about');
        this.menu.remove();
        this.render();
        this.menu.classList.add('menu__used');
      } else if (e.target.className.includes('continue')) {
        intro.classList.toggle('intro--hide');
      } else if (e.target.className.includes('load')) {
        loadTheGame();
        intro.classList.toggle('intro--hide');
      } else if (e.target.className.includes('save')) {
        this.menu.querySelector('.load').classList.remove('disabled');
        localStorage.setItem('innovation', JSON.stringify(gameState));
        this.showSaveGameModal();
      } else if (e.target.className.includes('about')) {
        this.menu.classList.remove('main');
        this.menu.classList.add('about');
        this.createAboutItems();
        Array.from(this.menu.children).forEach((item, ind) => {
          if (ind < 5) {
            const href = item.children[0].getAttribute('data-link');
            item.children[0].setAttribute('href', href);
            item.children[0].setAttribute('target', 'blank');
            item.children[0].removeAttribute('data-link');
          }
        });
      } else if (e.target.className.includes('sound')) {
        audio.loop = true;
        sound = !sound;
        if (sound) {
          audio.play();
          e.target.textContent = 'Выключить звук';
        }
        if (!sound) {
          audio.pause();
          e.target.textContent = 'Включить звук';
        }
      }
    });
    if (JSON.parse(localStorage.getItem('innovation'))) this.menu.querySelector('.load').classList.remove('disabled');
  }

  renderPdfRules() {
    this.rulesWrraper = document.createElement('div');
    this.rulesWrraper.classList.add('iframe__wrraper');
    this.rulesWrraper.hidden = true;
    this.rulesWrraper.innerHTML = /* html */ `
        <span class="close">&#10006</span>
        <iframe class="iframe" src="./assets/innovation_rules_rus_final.pdf" width="70%" height="70%"></iframe>
    `;

    this.menu.append(this.rulesWrraper);
  }

  createChoosePlayersItems() {
    for (let i = 0; i < this.menu.children.length; i += 1) {
      this.menu.children[i].hidden = true;
    }
    this.menu.innerHTML = /* html */ `
    ${this.createMenuItem('2 игрока', '', 'data-players=2')}
    ${this.createMenuItem('3 игрока', '', 'data-players=3')}
    ${this.createMenuItem('4 игрока', '', 'data-players=4')}
    ${this.createMenuItem('Главное меню', 'back')}
    `;
  }

  createNameInputField(numberOfFields) {
    users.players = +numberOfFields;
    this.menu.innerHTML = /* html */ `
      <form class="form">
        ${this.createInputs(numberOfFields)}
        <button class="menu__link get-names" type="submit">Принять
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 120" style="enable-background:new 0 0 500 120;" xml:space="preserve">
        <linearGradient id="grad" gradientUnits="userSpaceOnUse" x1="122.5156" y1="182.4863" x2="382.0009" y2="-76.9989">
        <stop  offset="0" style="stop-color:#FFC200"/>
        <stop  offset="0.0503" style="stop-color:#F8B700"/>
        <stop  offset="0.255" style="stop-color:#E08F00"/>
        <stop  offset="0.4561" style="stop-color:#CD6F00"/>
        <stop  offset="0.65" style="stop-color:#C05800"/>
        <stop  offset="0.8336" style="stop-color:#B84B00"/>
        <stop  offset="0.996" style="stop-color:#B54600"/>
        </linearGradient>  
        <path stroke="url(#grad)" d="M471.5,4.5v89c0,5.522-4.478,10-10,10h-431c-5.523,0-10-4.478-10-10v-69c0-5.523,4.477-10,10-10h461"/>
        </svg></button>
      </form>
      ${this.createMenuItem('Главное меню', 'back')}
    `;
  }

  createInputs(num) {
    const inputHTML = [];

    for (let i = 1; i <= num; i += 1) {
      inputHTML.push(
        /* html */ `
        <label for="plaeyr${i}">Введите имя игрока № ${i}</label>
        <input type="text" id="player${i}" value="player${i}" name="name" data-name="" pattern="[a-zA-Zа-яА-Я0-9_]{3,7}" title="Введите от 3 до 7 символов" required>
      `,
      );
    }

    return inputHTML.join('');
  }

  addNamesToUsers() {
    const inputs = this.menu.querySelectorAll('[data-name]');
    const playerNames = [];
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].value && !playerNames.includes(inputs[i].value)) {
        playerNames.push(inputs[i].value);
      }
    }
    users.names = playerNames;

    return playerNames;
  }

  createAboutItems() {
    for (let i = 0; i < this.menu.children.length; i += 1) {
      this.menu.children[i].hidden = true;
    }
    this.menu.innerHTML = /* html */ `
    ${this.createMenuItem('', 'logo', 'data-link="https://rs.school/js/"')}
    ${this.createMenuItem('Yaroslav Abrasimov', 'person ya', 'data-link="https://github.com/Ferri0"')}
    ${this.createMenuItem('Igor Alexeyenko', 'person ia', 'data-link="https://github.com/IgorAleks88"')}
    ${this.createMenuItem('Ekaterina Titova', 'person et', 'data-link="https://github.com/kattitova"')}
    ${this.createMenuItem('Denis<br>Oleksiuk', 'person do', 'data-link="https://github.com/DenisOleksiuk"')}
    ${this.createMenuItem('Главное меню', 'back')}
    `;
  }

  showSaveGameModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal__save');
    modal.innerHTML = /* html */`
      <div class="save__message">Игра сохранена</div>
    `;
    this.menu.append(modal);
    setTimeout(() => modal.remove(), 1500);
  }

  showErrorMessage() {
    if (document.querySelector('.error')) return;
    const form = this.menu.querySelector('.form');
    const errorMessgae = document.createElement('div');
    errorMessgae.classList.add('menu__link', 'error');
    errorMessgae.innerHTML = 'Имена не должны повторяться<br> Длина от 3 до 7 символов';
    form.prepend(errorMessgae);
  }
}

export default Menu;
export { transform };
