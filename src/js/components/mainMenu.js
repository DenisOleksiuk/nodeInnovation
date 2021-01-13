import initHotSeatGame from '../utility/initHotSeatGame';

const usersInfo = {};

function validation(userObj) {
  return userObj.names.every((name) => name.length > 2 && name.length < 11);
}
// TODO need some refactor later, move to display folder, use function?
class Menu {
  constructor(parent) {
    this.parent = parent;
  }

  createMenuItem(text, ...dopParam) {
    return /* html */ `<a href="#" class="menu__link ${dopParam[0] || ''}" ${dopParam[1] || ''}>
      ${text}
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
        <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
      </svg>
    </a><br>`;
  }

  render() {
    this.menu = document.createElement('div');
    this.menu.classList.add('menu');
    this.menu.innerHTML = `
    ${this.createMenuItem('Новая игра', 'start')}
    ${this.createMenuItem('Продолжить')}
    ${this.createMenuItem('Сохранить игру')}
    ${this.createMenuItem('Правила игры', 'rules')}
    ${this.createMenuItem('Обзор игры')}
    `;

    this.parent.append(this.menu);
    this.renderPdfRules();

    this.menu.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN' && e.target !== this.menu.querySelector('button')) {
        return;
      }

      if (e.target.className.includes('start')) {
        this.createChoosePlayersItems();
      } else if (e.target.className.includes('rules')) {
        this.rulesWrraper.hidden = false;
      } else if (e.target.className.includes('close')) {
        this.rulesWrraper.hidden = true;
      } else if (e.target.dataset.players) {
        this.createNameInputField(e.target.dataset.players);
      } else if (e.target.className.includes('get-names')) {
        e.preventDefault();
        this.writeNamesToObject();
        if (validation(usersInfo) && usersInfo.names.length) {
          const intro = this.menu.parentElement.parentElement.parentElement;
          intro.classList.toggle('intro--hide');
          // initHotSeatGame('Player1', 'Player2');
          initHotSeatGame(usersInfo.names); //! Hardcoded for 2 players.
          // Should take player names as arguments
        }
      } else if (e.target.className.includes('back')) {
        this.menu.remove();
        this.render();
        this.menu.classList.add('menu__used');
      }
    });
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
    usersInfo.players = numberOfFields;
    this.menu.innerHTML = /* html */ `
      <form>
        ${this.createInputs(numberOfFields)}
        <button class="menu__link get-names" type="submit">Принять</button>
      </form>
      ${this.createMenuItem('Главное меню', 'back')}
    `;
  }

  createInputs(num) {
    const inputHTML = [];

    for (let i = 1; i <= num; i += 1) {
      inputHTML.push(
        /* html */ `
        <label for="plaeyr${i}">Введити имя игрока № ${i}</label>
        <input type="text" id="player${i}" name="name" data-name="" pattern="[a-zA-Zа-яА-Я0-9_]{3,10}" title="Введите от 3 до 10 символов" required>
      `,
      );
    }

    return inputHTML;
  }

  writeNamesToObject() {
    const inputs = this.menu.querySelectorAll('[data-name]');
    const playerNames = [];
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].value) {
        playerNames.push(inputs[i].value);
      }
    }
    usersInfo.names = playerNames;

    return playerNames;
  }
}
export default Menu;
export { usersInfo };
