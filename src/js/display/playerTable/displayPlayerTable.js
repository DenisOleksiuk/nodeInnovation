import displayHeader from './displayHeader';
import displayAside from './displayAside';
import displayActiveZone from './displayActiveZone';
import displayHand from './displayHand';

const displayPlayerTable = {
  wrapper: null,
  header: null,
  aside: null,
  activeZone: null,
  hand: null,
  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.wrapperMain = document.createElement('div');
    this.wrapperMain.classList.add('wrapper__main');

    this.header = displayHeader.init();
    this.wrapperMain.appendChild(this.header);

    this.activeZone = displayActiveZone.init();
    this.wrapperMain.appendChild(this.activeZone);

    this.hand = displayHand.init();
    this.wrapperMain.appendChild(this.hand);

    this.aside = displayAside.init();

    this.wrapper.appendChild(this.wrapperMain);
    this.wrapper.appendChild(this.aside);

    return this.wrapper;
  },

};

export default displayPlayerTable;
