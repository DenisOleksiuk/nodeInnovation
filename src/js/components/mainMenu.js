// TODO need some refactor later, move to display folder, use function?
class Menu {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    this.menu = document.createElement('div');
    this.menu.classList.add('menu');
    this.menu.innerHTML = /* html */ `
      <a href="#" class="menu__link start">
        Начать игру
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
          <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
        </svg>
      </a><br>
      <a href="#" class="menu__link">
        Продолжить игру
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
          <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
        </svg>
      </a><br>
      <a href="#" class="menu__link">
      Сохранить игру
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
        <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
      </svg>
    </a><br>
      <a href="#" class="menu__link rules">
        Правила игры
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
          <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
        </svg>
      </a><br>
      <a href="https://www.youtube.com/watch?v=um86iag3ip8&feature=youtu.be" target="_blank" class="menu__link">
        Обзор игры
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
          <path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
        </svg>
      </a>
    `;

    this.parent.append(this.menu);
    this.renderPdfRules();

    this.menu.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
        return;
      }
      if (e.target.className.includes('start')) {
        this.menu.classList.toggle('hide');
      }
      if (e.target.className.includes('rules')) {
        this.rulesWrraper.hidden = false;
      }
      if (e.target.className.includes('close')) {
        this.rulesWrraper.hidden = true;
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
}
export default Menu;
