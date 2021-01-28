const displayActiveZone = {
  wrapper: null,
  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('active-zone');

    this.activeZoneTitle = document.createElement('div');
    this.activeZoneTitle.classList.add('active-zone__title');

    this.cardsBlock = document.createElement('div');
    this.cardsBlock.classList.add('active-zone__cards-block');

    this.cardsBlockWrapper = document.createElement('div');
    this.cardsBlockWrapper.classList.add('active-zone__cards-wrapper');

    this.cardsBlock.append(this.cardsBlockWrapper);

    this.cardsBlockOverlay = document.createElement('div');
    this.cardsBlockOverlay.classList.add('active-zone__overlay');

    // create players active stacks
    const stacksNames = ['red', 'green', 'blue', 'purple', 'yellow'];
    for (let i = 0; i < stacksNames.length; i += 1) {
      const stack = document.createElement('div');
      stack.classList.add('active-zone__stack');
      stack.classList.add('active-zone__stack--empty');
      stack.id = stacksNames[i];
      stack.dataset.innovation = stacksNames[i];
      this.cardsBlockWrapper.append(stack);
    }

    // add menu slide icon
    this.menuIcon = document.createElement('div');
    this.menuIcon.classList.add('active-zone__menu-icon');
    this.menuButton = document.createElement('div');
    this.menuButton.classList.add('menu-icon__menu-button');
    this.menuArrow = document.createElement('div');
    this.menuArrow.classList.add('menu-icon__open-arrow');
    this.menuIcon.append(this.menuButton, this.menuArrow);
    this.menuIcon.addEventListener('click', () => {
      const back = document.querySelector('.menu__link.back');
      if (back !== null) back.click();
      const menuItems = document.querySelectorAll('.menu__link');
      menuItems.forEach((i) => {
        if (!i.classList.contains('load')) {
          i.classList.remove('disabled');
        }
      });
      const intro = document.querySelector('.intro');
      intro.classList.toggle('intro--hide');
    });
    this.wrapper.append(this.menuIcon);

    this.wrapper.append(this.activeZoneTitle);
    this.wrapper.append(this.cardsBlockOverlay);
    this.wrapper.append(this.cardsBlock);
    return this.wrapper;
  },
};

export default displayActiveZone;
