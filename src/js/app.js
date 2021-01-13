// import styles
import '../scss/style.scss';
import '@animxyz/core';

// import js modules
import displayPlayerTable from './display/playerTable/displayPlayerTable';
import setHandControls from './utility/setHandControls';
import setAsideControls from './utility/setAsideControls';
import Intro from './components/Intro';

// display intro & menu
Intro.init();

// display game UI
document.body.prepend(displayPlayerTable.init());

// add event listeners to hand controls
setHandControls();

// add event listeners and animations to aside buttons
setAsideControls();
