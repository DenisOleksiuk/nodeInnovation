// import styles
import '../scss/style.scss';
import '@animxyz/core';

// import js modules
import intro from './components/Intro';
import displayPlayerTable from './display/playerTable/displayPlayerTable';
import setHandControls from './utility/setHandControls';
import setAsideControls from './utility/setAsideControls';

// eslint-disable-next-line no-undef
const socket = io();
// display intro & menu
intro.init();

// load and display base game UI
document.body.prepend(displayPlayerTable.init());
setHandControls();
setAsideControls();

export default socket;
