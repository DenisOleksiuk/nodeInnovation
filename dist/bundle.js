/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _display_playerTable_displayPlayerTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display/playerTable/displayPlayerTable */ "./src/js/display/playerTable/displayPlayerTable.js");
/* harmony import */ var _utility_setHandControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility/setHandControls */ "./src/js/utility/setHandControls.js");
/* harmony import */ var _components_mainMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mainMenu */ "./src/js/components/mainMenu.js");
/* harmony import */ var _components_GameField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/GameField */ "./src/js/components/GameField.js");
/* harmony import */ var _components_Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Player */ "./src/js/components/Player.js");
/* harmony import */ var _components_Game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Game */ "./src/js/components/Game.js");
/* harmony import */ var _cards_cards_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cards/cards.json */ "./src/js/cards/cards.json");
/* harmony import */ var _cards_parseCards__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cards/parseCards */ "./src/js/cards/parseCards.js");
/* harmony import */ var _components_GameUI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/GameUI */ "./src/js/components/GameUI.js");
/* harmony import */ var _utility_chat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utility/chat */ "./src/js/utility/chat.js");
// import styles
 // import js modules










 // set up and display main menu

var menu = new _components_mainMenu__WEBPACK_IMPORTED_MODULE_3__.default(document.body);
menu.render(); // display game UI

document.body.prepend(_display_playerTable_displayPlayerTable__WEBPACK_IMPORTED_MODULE_1__.default.init()); // add event listeners to hand controls

(0,_utility_setHandControls__WEBPACK_IMPORTED_MODULE_2__.default)(); // contains dom elements

var gameUI = new _components_GameUI__WEBPACK_IMPORTED_MODULE_9__.default(); // contains sorted card objects

var arrOfCards = (0,_cards_parseCards__WEBPACK_IMPORTED_MODULE_8__.default)(_cards_cards_json__WEBPACK_IMPORTED_MODULE_7__);

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}

shuffle(arrOfCards);
var gameField = new _components_GameField__WEBPACK_IMPORTED_MODULE_4__.default(arrOfCards); // contains players properties and cards

var player1 = new _components_Player__WEBPACK_IMPORTED_MODULE_5__.default(gameUI, 'Player1', 1);
var player2 = new _components_Player__WEBPACK_IMPORTED_MODULE_5__.default(gameUI, 'Player2', 2); // work with all main objects

var game = new _components_Game__WEBPACK_IMPORTED_MODULE_6__.default(gameUI, player1, player2, gameField);
game.newTurn();
(0,_utility_chat__WEBPACK_IMPORTED_MODULE_10__.default)();

/***/ }),

/***/ "./src/js/cards/getCard.js":
/*!*********************************!*\
  !*** ./src/js/cards/getCard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
// take card object and return builded card DOM element
var getCard = {
  // get playing card
  frontSide: function frontSide(cardObj) {
    var divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.style.background = "url(\"".concat(cardObj.cardImg, "\")");
    divCard.appendChild(this.getCardHeader(cardObj));
    divCard.appendChild(this.getCardMain(cardObj));
    divCard.appendChild(this.getCardFooter());
    this.setObjByPosition(divCard, cardObj, cardObj.age, cardObj.color);
    return divCard;
  },
  // get card header
  getCardHeader: function getCardHeader(card) {
    var divHeader = document.createElement('div');
    divHeader.classList.add('card__card-header', "card__color--".concat(card.color));
    var posTopLeft = document.createElement('div');
    posTopLeft.classList.add('card__topLeft');
    var title = document.createElement('div');
    title.classList.add('card-header__title');
    title.textContent = card.innovation;
    divHeader.appendChild(posTopLeft);
    divHeader.appendChild(title);
    return divHeader;
  },
  // get card body
  getCardMain: function getCardMain(card) {
    var divMain = document.createElement('div');
    divMain.classList.add('card__card-main', "card__color--".concat(card.color, "-transparent"));
    card.dogma.forEach(function (item) {
      var divDogma = document.createElement('div');
      divDogma.classList.add('card__dogma');
      divDogma.setAttribute('data-dogmatype', item.dogmaType);
      var icon = document.createElement('i');
      icon.classList.add(item.dogmaIcon[0], item.dogmaIcon[1], 'card__icon', "card__icon-color--".concat(item.dogmaColor));
      divDogma.appendChild(icon);
      var dogma = document.createElement('span');
      dogma.classList.add('dogma__effect');
      dogma.innerHTML = item.dogmaEffect;
      divDogma.appendChild(dogma);
      divMain.appendChild(divDogma);
    });
    return divMain;
  },
  // get card footer
  getCardFooter: function getCardFooter() {
    var divFooter = document.createElement('div');
    divFooter.classList.add('card__card-footer');
    var posBottomLeft = document.createElement('div');
    posBottomLeft.classList.add('card__bottomLeft');
    divFooter.appendChild(posBottomLeft);
    var posBottomCenter = document.createElement('div');
    posBottomCenter.classList.add('card__bottomCenter');
    divFooter.appendChild(posBottomCenter);
    var posBottomRight = document.createElement('div');
    posBottomRight.classList.add('card__bottomRight');
    divFooter.appendChild(posBottomRight);
    return divFooter;
  },
  // place age number and resourses by card position
  setObjByPosition: function setObjByPosition(divCard, card) {
    var agePos = divCard.querySelector(".card__".concat(card.agePosition));
    agePos.classList.add("card__color--".concat(card.color), 'card__age--border');
    agePos.textContent = card.age;
    card.resourses.forEach(function (res) {
      var pos = divCard.querySelector(".card__".concat(res.resoursePosition));
      pos.classList.add("".concat(res.resourseType[0]), "".concat(res.resourseType[1]), "card__icon-color--".concat(res.resourseColor), "card__icon-border--".concat(card.color));
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCard);

/***/ }),

/***/ "./src/js/cards/parseCards.js":
/*!************************************!*\
  !*** ./src/js/cards/parseCards.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ parseCards
/* harmony export */ });
// get JSON and return array of card objects
function parseCards(cardsJSON) {
  var resultArr = [];
  cardsJSON.forEach(function (setOfCards) {
    setOfCards.cards.forEach(function (card) {
      var cardObject = {};
      Object.assign(cardObject, setOfCards, card);
      delete cardObject.cards; // remove duplicated field

      resultArr.push(cardObject);
    });
  });
  return resultArr;
}

/***/ }),

/***/ "./src/js/components/Game.js":
/*!***********************************!*\
  !*** ./src/js/components/Game.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Game
/* harmony export */ });
/* harmony import */ var _display_playerTable_displayHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../display/playerTable/displayHeader */ "./src/js/display/playerTable/displayHeader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* all game action happens here
* take gameUI obj which contains all dom elements
* take gameField obj which contains all cards avaiable for all players (ages/leadership/special)
* take players objects which contains all cards avaible for players (hand/table/lead/influence)
* count avaible actions per turn, reduce on each action
* when avaible ections ends - turn passed to next player
*/


var Game = /*#__PURE__*/function () {
  function Game(gameUI, player1, player2, gameField) {
    var _this = this;

    _classCallCheck(this, Game);

    // TODO should take more then 2 players
    // store passed objects
    this.players = [// TODO should take all players passed as args
    player1, player2];
    this.gameField = gameField;
    this.gameUI = gameUI; // initialize game field in players objects

    this.players.forEach(function (player) {
      player.game = _this;
    }); // set default values

    this.currentPlayer = player1; // TODO should be random later

    this.currentDeck = {
      domElement: gameUI.ageDecks.age1,
      cardsArray: gameField.ageDecks.age1
    };
    this.turnPoints = 2;
  } // if current player still have turn points - recalculate active deck
  // else give turn to next player


  _createClass(Game, [{
    key: "newTurn",
    value: function newTurn() {
      this.updateInfoTable();

      if (this.turnPoints > 0) {
        this.removeActiveDeck();
        this.setActiveDeck(this.currentPlayer);
      } else {
        // TODO HARDCODED FOR TWO PLAYERS. CHANGE LATER
        // set current player
        if (this.players[0] === this.currentPlayer) this.currentPlayer = this.players[1];else if (this.players[1] === this.currentPlayer) this.currentPlayer = this.players[0];
        this.currentPlayer.renderHand();
        this.currentPlayer.renderActiveZone(); // start new turn with full(2) turn points

        this.turnPoints = 2;
        this.newTurn();
      }
    } // set active deck for current player

  }, {
    key: "setActiveDeck",
    value: function setActiveDeck(currentPlayer) {
      var _this2 = this;

      Object.keys(this.gameField.ageDecks).forEach(function (ageDeckKey) {
        if (ageDeckKey === "age".concat(currentPlayer.currentAge)) {
          // store active deck dom element
          _this2.currentDeck.domElement = _this2.gameUI.ageDecks["age".concat(currentPlayer.currentAge)]; // store active deck cards array

          _this2.currentDeck.cardsArray = _this2.gameField.ageDecks[ageDeckKey]; //! Change current players currentAge if needed deck empty to go for the next deck
          //! Need recalcualte current age after each action, done by players method setCurrentAge

          if (_this2.currentDeck.cardsArray.length === 0) {
            _this2.currentPlayer.currentAge += 1;
          }
        }
      }); // set style and event listener of active deck when all calculations finished

      this.currentDeck.domElement.classList.add('age-deck--active'); //! USED onclick because got bug with AddEvenListener - cant remove listener

      this.currentDeck.domElement.onclick = this.takeCard.bind(this); // update current active deck displayed in aside

      this.updateCurrentDeckBlock();
    } // remove active deck class and eventlistener
    //! should use before each setActiveDeck method

  }, {
    key: "removeActiveDeck",
    value: function removeActiveDeck() {
      this.currentDeck.domElement.classList.remove('age-deck--active'); //! USED onclick because got bug with AddEvenListener - cant remove listener

      this.currentDeck.domElement.onclick = '';
    } // get card and render it in hand

  }, {
    key: "takeCard",
    value: function takeCard() {
      this.currentPlayer.setCurrentAge(); // recalculate current age of player

      this.currentPlayer.hand.push(this.currentDeck.cardsArray.pop());
      this.currentPlayer.renderLastTakenCard();
      _display_playerTable_displayHeader__WEBPACK_IMPORTED_MODULE_0__.default.changePlayerStats(this.currentPlayer); // starts next phase of turn

      this.actionDone();
    } // use this after each action

  }, {
    key: "actionDone",
    value: function actionDone() {
      this.turnPoints -= 1;
      this.newTurn();
    } // update info table in aside, use after each action done in newTurn method

  }, {
    key: "updateInfoTable",
    value: function updateInfoTable() {
      this.gameUI.infoTable.name.innerText = this.currentPlayer.name;
      this.gameUI.infoTable.actionPoints.innerText = this.turnPoints;
    } // update current active deck displayed in aside, use after each time when setActiveDeck run

  }, {
    key: "updateCurrentDeckBlock",
    value: function updateCurrentDeckBlock() {
      // remove previous active deck if exists
      var prevDeckClone = document.querySelector('#cloneCurrentDeck');
      if (prevDeckClone !== null) prevDeckClone.remove(); // clone current active deck

      var cloneCurrentDeck = this.currentDeck.domElement.cloneNode();
      cloneCurrentDeck.innerText = this.currentDeck.domElement.innerText;
      cloneCurrentDeck.id = 'cloneCurrentDeck';
      cloneCurrentDeck.onclick = this.takeCard.bind(this); // display cloned deck in currentDeck block

      this.gameUI.currentDeck.append(cloneCurrentDeck);
    }
  }]);

  return Game;
}();



/***/ }),

/***/ "./src/js/components/GameField.js":
/*!****************************************!*\
  !*** ./src/js/components/GameField.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GameField
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* take cards objects and sort them to separate decks
* store all cards avaible for all players (ages/leadership/special)
* store cards as objects
* this object passed as argument to Game constructor
*/
var GameField = /*#__PURE__*/function () {
  function GameField(arrOfCardObjects) {
    _classCallCheck(this, GameField);

    // create empty decks for each age
    this.ageDecks = {
      age1: [],
      age2: [],
      age3: [],
      age4: [],
      age5: [],
      age6: [],
      age7: [],
      age8: [],
      age9: [],
      age10: []
    }; // TODO leadership later
    // create empty leadership deck

    this.leadershipDeck = []; // TODO special deck later
    // create empty special deck

    this.specialDeck = []; // fill age decks with card objects

    this.setDeckArrays(arrOfCardObjects);
  } // TODO add shuffle later
  // fill deck arays depends on card age field


  _createClass(GameField, [{
    key: "setDeckArrays",
    value: function setDeckArrays(cardsObj) {
      var _this = this;

      cardsObj.forEach(function (e) {
        switch (+e.age) {
          case 1:
            _this.ageDecks.age1.push(e);

            break;

          case 2:
            _this.ageDecks.age2.push(e);

            break;

          case 3:
            _this.ageDecks.age3.push(e);

            break;

          case 4:
            _this.ageDecks.age4.push(e);

            break;

          case 5:
            _this.ageDecks.age5.push(e);

            break;

          case 6:
            _this.ageDecks.age6.push(e);

            break;

          case 7:
            _this.ageDecks.age7.push(e);

            break;

          case 8:
            _this.ageDecks.age8.push(e);

            break;

          case 9:
            _this.ageDecks.age9.push(e);

            break;

          case 10:
            _this.ageDecks.age10.push(e);

            break;

          default:
            throw new Error("Wrong number on age field in ".concat(e));
        }
      });
    }
  }]);

  return GameField;
}();



/***/ }),

/***/ "./src/js/components/GameUI.js":
/*!*************************************!*\
  !*** ./src/js/components/GameUI.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GameUI
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* store all game UI dom elements
* this obj passed as argument to Game constructor
*/
var GameUI = /*#__PURE__*/function () {
  function GameUI() {
    _classCallCheck(this, GameUI);

    this.ageDecks = {};
    this.getAgeDecks();
    this.activeStacks = {};
    this.getActiveStacks();
    this.infoTable = {};
    this.getInfoTable();
    this.currentDeck = document.querySelector('.current-deck__cards');
    this.hand = document.querySelector('.hand__cards');
  }

  _createClass(GameUI, [{
    key: "getAgeDecks",
    value: function getAgeDecks() {
      var _this = this;

      var ageDecksElements = Array.from(document.getElementsByClassName('age-deck'));
      ageDecksElements.forEach(function (ageDeck, i) {
        _this.ageDecks["age".concat(i + 1)] = ageDecksElements[i];
      });
    }
  }, {
    key: "getActiveStacks",
    value: function getActiveStacks() {
      var _this2 = this;

      var activeStacksElements = Array.from(document.getElementsByClassName('active-zone__stack'));
      activeStacksElements.forEach(function (activeStack) {
        _this2.activeStacks[activeStack.id] = activeStack;
      });
    }
  }, {
    key: "getInfoTable",
    value: function getInfoTable() {
      var currentPlayerNameBlock = document.querySelector('.info-table__player-name');
      this.infoTable.name = currentPlayerNameBlock;
      var currentPlayerActionPoints = document.querySelector('.info-table__action-points');
      this.infoTable.actionPoints = currentPlayerActionPoints;
    }
  }]);

  return GameUI;
}();



/***/ }),

/***/ "./src/js/components/Player.js":
/*!*************************************!*\
  !*** ./src/js/components/Player.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Player
/* harmony export */ });
/* harmony import */ var _cards_getCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cards/getCard */ "./src/js/cards/getCard.js");
/* harmony import */ var _display_playerTable_displayHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../display/playerTable/displayHeader */ "./src/js/display/playerTable/displayHeader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/*
* store all player cards objects (hand/table/lead/influence)
* this obj passed as argument to Game constructor
*/

var Player = /*#__PURE__*/function () {
  function Player(gameUI, playerName, id) {
    _classCallCheck(this, Player);

    // store passed values
    this.name = playerName;
    this.id = id;
    this.gameUI = gameUI; // set default values

    this.game = null; //! this field will be set at game object initialization

    this.currentAge = 1;
    this.hand = []; //! Names of stacks are color field in card objects

    this.activeStacks = {
      blue: {
        cards: [],
        shift: null
      },
      red: {
        cards: [],
        shift: null
      },
      green: {
        cards: [],
        shift: null
      },
      purple: {
        cards: [],
        shift: null
      },
      yellow: {
        cards: [],
        shift: null
      }
    }; // Resources

    this.tree = 0;
    this.tower = 0;
    this.crown = 0;
    this.bulb = 0;
    this.factory = 0;
    this.clock = 0; // player leadership and influence objects
    // TODO LATER

    this.ownedLeadership = {
      domElement: null,
      // TODO remove
      cardsArray: []
    }; // TODO LATER

    this.influence = {
      domElement: null,
      // TODO remove
      cardsArray: []
    };
  } // calculate current recourses


  _createClass(Player, [{
    key: "calculateResources",
    value: function calculateResources() {
      var _this = this;

      this.tree = 0;
      this.tower = 0;
      this.crown = 0;
      this.bulb = 0;
      this.factory = 0;
      this.clock = 0;
      Object.keys(this.activeStacks).forEach(function (stack) {
        var currentStack = _this.activeStacks[stack];

        if (currentStack.cards.length > 0) {
          var highestCard = currentStack.cards[currentStack.cards.length - 1];
          highestCard.resourses.forEach(function (e) {
            _this[e.resourceName] += 1;
          });
        }
      });
    } // calculate and set current age, iterates througth each stack
    //! Runs from Game each time when card taken

  }, {
    key: "setCurrentAge",
    value: function setCurrentAge() {
      var _this2 = this;

      Object.keys(this.activeStacks).forEach(function (stack) {
        _this2.activeStacks[stack].cards.forEach(function (card) {
          if (+card.age > _this2.currentAge) {
            _this2.currentAge = +card.age;
          }
        });
      });
    } // render last taken card in hand of current player

  }, {
    key: "renderLastTakenCard",
    value: function renderLastTakenCard() {
      var _this3 = this;

      var lastTakenCard = this.hand[this.hand.length - 1];
      var cardElement = _cards_getCard__WEBPACK_IMPORTED_MODULE_0__.default.frontSide(lastTakenCard);

      cardElement.onclick = function () {
        _this3.playCard(lastTakenCard, cardElement);
      };

      this.gameUI.hand.append(cardElement);
    } // render all cards in hand of current player

  }, {
    key: "renderHand",
    value: function renderHand() {
      var _this4 = this;

      this.gameUI.hand.innerHTML = ''; // clear previous rendered hand

      this.hand.forEach(function (card) {
        var cardElement = _cards_getCard__WEBPACK_IMPORTED_MODULE_0__.default.frontSide(card);

        cardElement.onclick = function () {
          _this4.playCard(card, cardElement);
        };

        _this4.gameUI.hand.append(cardElement);
      });
    } // render all cards in active zone of current player

  }, {
    key: "renderActiveZone",
    value: function renderActiveZone() {
      var _this5 = this;

      Object.keys(this.activeStacks).forEach(function (stackName) {
        _this5.gameUI.activeStacks[stackName].innerHTML = ''; // clear previous rendered active zone

        _this5.activeStacks[stackName].cards.forEach(function (card) {
          _this5.gameUI.activeStacks[stackName].append(_cards_getCard__WEBPACK_IMPORTED_MODULE_0__.default.frontSide(card));
        });
      });
    } // on click event for cards in hand. Play card in stack depends on category
    // TODO: later this method should add dogma function to each played card

  }, {
    key: "playCard",
    value: function playCard(cardObj, cardElement) {
      var _this6 = this;

      Object.keys(this.activeStacks).forEach(function (stackName) {
        if (stackName === cardObj.color) {
          _this6.hand.forEach(function (e, i) {
            if (e === cardObj) {
              _this6.hand.splice(i, 1);
            }
          });

          _this6.activeStacks[stackName].cards.push(cardObj);

          _this6.gameUI.activeStacks[stackName].append(cardElement);
        }
      });
      this.calculateResources();
      _display_playerTable_displayHeader__WEBPACK_IMPORTED_MODULE_1__.default.changePlayerStats(this);
      this.game.actionDone();
    }
  }]);

  return Player;
}();



/***/ }),

/***/ "./src/js/components/mainMenu.js":
/*!***************************************!*\
  !*** ./src/js/components/mainMenu.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO need some refactor later, move to display folder, use function?
var Menu = /*#__PURE__*/function () {
  function Menu(parent) {
    _classCallCheck(this, Menu);

    this.parent = parent;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.menu = document.createElement('div');
      this.menu.classList.add('menu');
      this.menu.innerHTML =
      /* html */
      "\n      <a href=\"#\" class=\"menu__link start\">\n        \u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 152.9 43.4\" style=\"enable-background:new 0 0 152.9 43.4;\" xml:space=\"preserve\">\n          <path d=\"M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4\"/>\n        </svg>\n      </a><br>\n      <a href=\"#\" class=\"menu__link\">\n        \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0438\u0433\u0440\u0443\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 152.9 43.4\" style=\"enable-background:new 0 0 152.9 43.4;\" xml:space=\"preserve\">\n          <path d=\"M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4\"/>\n        </svg>\n      </a><br>\n      <a href=\"#\" class=\"menu__link\">\n      \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0433\u0440\u0443\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 152.9 43.4\" style=\"enable-background:new 0 0 152.9 43.4;\" xml:space=\"preserve\">\n        <path d=\"M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4\"/>\n      </svg>\n    </a><br>\n      <a href=\"#\" class=\"menu__link rules\">\n        \u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438\u0433\u0440\u044B\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 152.9 43.4\" style=\"enable-background:new 0 0 152.9 43.4;\" xml:space=\"preserve\">\n          <path d=\"M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4\"/>\n        </svg>\n      </a><br>\n      <a href=\"https://www.youtube.com/watch?v=um86iag3ip8&feature=youtu.be\" target=\"_blank\" class=\"menu__link\">\n        \u041E\u0431\u0437\u043E\u0440 \u0438\u0433\u0440\u044B\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 152.9 43.4\" style=\"enable-background:new 0 0 152.9 43.4;\" xml:space=\"preserve\">\n          <path d=\"M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4\"/>\n        </svg>\n      </a>\n    ";
      this.parent.append(this.menu);
      this.renderPdfRules();
      this.menu.addEventListener('click', function (e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
          return;
        }

        if (e.target.className.includes('start')) {
          _this.menu.classList.toggle('hide');
        }

        if (e.target.className.includes('rules')) {
          _this.rulesWrraper.hidden = false;
        }

        if (e.target.className.includes('close')) {
          _this.rulesWrraper.hidden = true;
        }
      });
    }
  }, {
    key: "renderPdfRules",
    value: function renderPdfRules() {
      this.rulesWrraper = document.createElement('div');
      this.rulesWrraper.classList.add('iframe__wrraper');
      this.rulesWrraper.hidden = true;
      this.rulesWrraper.innerHTML =
      /* html */
      "\n        <span class=\"close\">&#10006</span>\n        <iframe class=\"iframe\" src=\"./assets/innovation_rules_rus_final.pdf\" width=\"70%\" height=\"70%\"></iframe>\n    ";
      this.menu.append(this.rulesWrraper);
    }
  }]);

  return Menu;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);

/***/ }),

/***/ "./src/js/display/playerTable/displayActiveZone.js":
/*!*********************************************************!*\
  !*** ./src/js/display/playerTable/displayActiveZone.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var displayActiveZone = {
  wrapper: null,
  init: function init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('active-zone'); // create players active stacks
    // !Stack names are the color fields of cards object

    var stacksNames = ['blue', 'red', 'green', 'purple', 'yellow'];

    for (var i = 0; i < stacksNames.length; i += 1) {
      var stack = document.createElement('div');
      stack.classList.add('active-zone__stack');
      stack.id = stacksNames[i]; // id stackName for each stack

      this.wrapper.append(stack);
    }

    return this.wrapper;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayActiveZone);

/***/ }),

/***/ "./src/js/display/playerTable/displayAside.js":
/*!****************************************************!*\
  !*** ./src/js/display/playerTable/displayAside.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var displayAside = {
  wrapper: null,
  init: function init() {
    // create aside wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('aside'); // append createand blocks to aside wrapper

    this.wrapper.append(this.getInfoBlock());
    this.wrapper.append(this.getCurrentDeckBlock());
    this.wrapper.append(this.getExtraCardsBlock());
    this.wrapper.append(this.getLogBlock()); // create hidden modals blocks

    this.ageDecksBlock = this.getAgeDecksBlock();
    this.leadershipCardsBlock = this.getLeadershipCardsBlock();
    this.specialCardsBlock = this.getSpecialCardsBlock(); // append hidden modal blocks to body

    document.body.append(this.ageDecksBlock);
    document.body.append(this.leadershipCardsBlock);
    document.body.append(this.specialCardsBlock);
    return this.wrapper;
  },
  getInfoBlock: function getInfoBlock() {
    // create info block
    var infoBlock = document.createElement('div');
    infoBlock.classList.add('info-table'); // create current player block

    var currentPlayerBlock = document.createElement('div');
    currentPlayerBlock.classList.add('info-table__player-block');
    var currentPlayerText = document.createElement('div');
    currentPlayerText.innerText = 'Ход игрока: ';
    var currentPlayerName = document.createElement('div');
    currentPlayerName.classList.add('info-table__player-name');
    currentPlayerBlock.append(currentPlayerText);
    currentPlayerBlock.append(currentPlayerName); // create action points block

    var actionPointsBlock = document.createElement('div');
    actionPointsBlock.classList.add('info-table__action-points-block');
    var actionPointsText = document.createElement('div');
    actionPointsText.innerText = 'Осталось ОД: ';
    var actionPointsValue = document.createElement('div');
    actionPointsValue.classList.add('info-table__action-points');
    actionPointsBlock.append(actionPointsText);
    actionPointsBlock.append(actionPointsValue); // append created blocks to info block

    infoBlock.append(currentPlayerBlock);
    infoBlock.append(actionPointsBlock);
    return infoBlock;
  },
  getCurrentDeckBlock: function getCurrentDeckBlock() {
    var _this = this;

    // create current deck block
    var currentDeck = document.createElement('div');
    currentDeck.classList.add('current-deck');
    var currentDeckTitle = document.createElement('div');
    currentDeckTitle.classList.add('current-deck__title');
    currentDeckTitle.innerText = 'Взять карту';
    var currentDeckCards = document.createElement('div');
    currentDeckCards.classList.add('current-deck__cards'); // create hover button element

    var hoverBtn = document.createElement('button');
    hoverBtn.classList.add('hover-btn');
    hoverBtn.innerText = 'Показать все';
    hoverBtn.addEventListener('click', function () {
      _this.ageDecksBlock.classList.toggle('age-decks--hidden');
    }); // append button to deck block

    currentDeckCards.append(hoverBtn); // append title and cards blocks to current deck block

    currentDeck.append(currentDeckTitle);
    currentDeck.append(currentDeckCards);
    return currentDeck;
  },
  getExtraCardsBlock: function getExtraCardsBlock() {
    var _this2 = this;

    // create extra cards block
    var extraCards = document.createElement('div');
    extraCards.classList.add('extra-cards'); // create special cards block

    var specialCards = document.createElement('div');
    specialCards.classList.add('extra-cards__special-block');
    var specialCardsTitle = document.createElement('div');
    specialCardsTitle.classList.add('extra-cards__special-title');
    specialCardsTitle.innerText = 'Специальные';
    var specialCardsCards = document.createElement('div');
    specialCardsCards.classList.add('extra-cards__special-cards'); // create hover button for special cards block

    var hoverBtnSpecial = document.createElement('button');
    hoverBtnSpecial.classList.add('hover-btn');
    hoverBtnSpecial.innerText = 'Показать все';
    hoverBtnSpecial.addEventListener('click', function () {
      _this2.specialCardsBlock.classList.toggle('special-cards--hidden');
    });
    specialCardsCards.append(hoverBtnSpecial); // append title and cards to special cards block

    specialCards.append(specialCardsTitle);
    specialCards.append(specialCardsCards); // create leadership cards block

    var leadershipCards = document.createElement('div');
    leadershipCards.classList.add('extra-cards__leadership-block');
    var leadershipCardsTitle = document.createElement('div');
    leadershipCardsTitle.classList.add('extra-cards__leadership-title');
    leadershipCardsTitle.innerText = 'Лидерство';
    var leadershipCardsCards = document.createElement('div');
    leadershipCardsCards.classList.add('extra-cards__leadership-cards'); // create hover button for leadership cards block

    var hoverBtnLeadership = document.createElement('button');
    hoverBtnLeadership.classList.add('hover-btn');
    hoverBtnLeadership.innerText = 'Показать все';
    hoverBtnLeadership.addEventListener('click', function () {
      _this2.leadershipCardsBlock.classList.toggle('leadership-cards--hidden');
    });
    leadershipCardsCards.append(hoverBtnLeadership); // append title and cards to leadership cards block

    leadershipCards.append(leadershipCardsTitle);
    leadershipCards.append(leadershipCardsCards); // apend special cards and leadership blocks to extra cards block

    extraCards.append(specialCards);
    extraCards.append(leadershipCards);
    return extraCards;
  },
  getLogBlock: function getLogBlock() {
    // create log block
    var logBlock = document.createElement('div');
    logBlock.classList.add('log'); // create log block title

    var logBlockTitle = document.createElement('div');
    logBlockTitle.classList.add('log__title');
    logBlockTitle.innerText = 'Чат/Лог'; // create log block text block

    var logBlockText = document.createElement('div');
    logBlockText.classList.add('log__text'); // create log form for chat / log

    var logForm = document.createElement('form');
    var logInput = document.createElement('input');
    var logBtn = document.createElement('button');
    logForm.classList.add('log__form');
    logInput.classList.add('log__input');
    logBtn.classList.add('log__btn');
    logBtn.type = 'text';
    logBtn.textContent = 'Отправить'; // append title and text block to log block

    logForm.append(logInput, logBtn);
    logBlock.append(logBlockTitle, logBlockText, logForm); // logBlock.append(logBlockText);

    return logBlock;
  },
  getAgeDecksBlock: function getAgeDecksBlock() {
    var _this3 = this;

    // create age decks modal block
    var agesNumber = 10;
    var ageDecksBlock = document.createElement('div');
    ageDecksBlock.classList.add('age-decks');
    ageDecksBlock.classList.add('age-decks--hidden'); // hidden by default

    var firstLine = document.createElement('div');
    firstLine.classList.add('age-decks__first-line');
    var secondLine = document.createElement('div');
    secondLine.classList.add('age-decks__second-line');
    var thirdLine = document.createElement('div');
    thirdLine.classList.add('age-decks__third-line');
    var btnLine = document.createElement('div');
    btnLine.classList.add('age-decks__btn-line'); // create age decks

    for (var i = 0; i < agesNumber; i += 1) {
      var deck = document.createElement('div');
      deck.classList.add('age-deck');
      deck.id = "age".concat(i + 1); // id age1-10 for each deck

      deck.innerText = "".concat(i + 1, " Age"); // TODO remove later

      deck.style.backgroundImage = 'url(./assets/img/cards-bg/age-01.jpg)'; //! use `` age-0${i+1} later

      deck.addEventListener('click', function () {
        return _this3.ageDecksBlock.classList.toggle('age-decks--hidden');
      });

      if (i < 4) {
        firstLine.append(deck);
      } else if (i < 7) {
        secondLine.append(deck);
      } else if (i < 10) {
        thirdLine.append(deck);
      }

      if (i === 9) {
        // create close button
        var button = document.createElement('button');
        button.classList.add('age-decks__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', function () {
          _this3.ageDecksBlock.classList.toggle('age-decks--hidden');
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
  getLeadershipCardsBlock: function getLeadershipCardsBlock() {
    var _this4 = this;

    // create leadership decks modal block
    var leadershipCardsBlock = document.createElement('div');
    leadershipCardsBlock.classList.add('leadership-cards');
    leadershipCardsBlock.classList.add('leadership-cards--hidden'); // hidden by default

    var firstLine = document.createElement('div');
    firstLine.classList.add('leadership-cards__first-line');
    var secondLine = document.createElement('div');
    secondLine.classList.add('leadership-cards__second-line');
    var btnLine = document.createElement('div');
    btnLine.classList.add('leadership-cards__btn-line'); // create leadership cards

    var numOfLeadershipCards = 10;

    for (var i = 0; i < numOfLeadershipCards; i += 1) {
      var leadershipCard = document.createElement('div');
      leadershipCard.classList.add('leadership-cards__card');
      leadershipCard.innerText = "".concat(i + 1);
      if (i < 5) firstLine.append(leadershipCard);else if (i < 10) secondLine.append(leadershipCard);

      if (i === 9) {
        // create close button
        var button = document.createElement('button');
        button.classList.add('leadership-cards__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', function () {
          _this4.leadershipCardsBlock.classList.toggle('leadership-cards--hidden');
        });
        btnLine.append(button);
      }
    }

    leadershipCardsBlock.append(firstLine);
    leadershipCardsBlock.append(secondLine);
    leadershipCardsBlock.append(btnLine);
    return leadershipCardsBlock;
  },
  getSpecialCardsBlock: function getSpecialCardsBlock() {
    var _this5 = this;

    // create special cards modal block
    var specialCardsBlock = document.createElement('div');
    specialCardsBlock.classList.add('special-cards');
    specialCardsBlock.classList.add('special-cards--hidden');
    var firstLine = document.createElement('div');
    firstLine.classList.add('special-cards__first-line');
    var secondLine = document.createElement('div');
    secondLine.classList.add('special-cards__second-line');
    var btnLine = document.createElement('div');
    btnLine.classList.add('special-cards__btn-line'); // create special cards

    var numOfSpecialCards = 5;

    for (var i = 0; i < numOfSpecialCards; i += 1) {
      var specialCard = document.createElement('div');
      specialCard.classList.add('special-cards__card');
      if (i < 3) firstLine.append(specialCard);else if (i < 5) secondLine.append(specialCard);

      if (i === 4) {
        // create close button
        var button = document.createElement('button');
        button.classList.add('special-cards__btn');
        button.innerText = 'Закрыть';
        button.addEventListener('click', function () {
          _this5.specialCardsBlock.classList.toggle('special-cards--hidden');
        });
        btnLine.append(button);
      }
    }

    specialCardsBlock.append(firstLine);
    specialCardsBlock.append(secondLine);
    specialCardsBlock.append(btnLine);
    return specialCardsBlock;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayAside);

/***/ }),

/***/ "./src/js/display/playerTable/displayHand.js":
/*!***************************************************!*\
  !*** ./src/js/display/playerTable/displayHand.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var displayHand = {
  init: function init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('hand');
    this.cardsBlock = document.createElement('div');
    this.cardsBlock.classList.add('hand__cards');
    this.controlsBlock = document.createElement('div');
    this.controlsBlock.classList.add('hand__controls'); // disabled by default

    this.arrowTop = document.createElement('button');
    this.arrowTop.classList.add('hand__btn--top', 'hand__btn');
    this.arrowTop.classList.add('hand__btn--disabled');
    this.arrowTop.disabled = true;
    this.arrowTop.innerHTML =
    /* html */
    "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n      xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n      x=\"0px\" y=\"0px\" width=\"100px\" height=\"80px\" viewBox=\"0 0 213.7 213.7\" enable-background=\"new 0 0 213.7 213.7\"\n      xml:space=\"preserve\">\n\n      <polygon class='hand__controls-svg--triangle' id=\"XMLID_18_\" fill=\"none\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" points=\"\n      73.5,62.5 148.5,105.8 73.5,149.1 \"/>\n\n      <circle class='hand__controls-svg--circle' id=\"XMLID_17_\" fill=\"none\"  stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  stroke-miterlimit=\"10\" cx=\"106.8\" cy=\"106.8\" r=\"103.3\"/>\n    </svg>\n    "; // disabled by default

    this.arrowBottom = document.createElement('button');
    this.arrowBottom.classList.add('hand__btn--bottom', 'hand__btn');
    this.arrowBottom.classList.add('hand__btn--disabled');
    this.arrowBottom.disabled = true;
    this.arrowBottom.innerHTML =
    /* html */
    "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n      xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n      x=\"0px\" y=\"0px\" width=\"100px\" height=\"80px\" viewBox=\"0 0 213.7 213.7\" enable-background=\"new 0 0 213.7 213.7\"\n      xml:space=\"preserve\">\n\n      <polygon class='hand__controls-svg--triangle' id=\"XMLID_18_\" fill=\"none\" stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" points=\"\n      73.5,62.5 148.5,105.8 73.5,149.1 \"/>\n\n      <circle class='hand__controls-svg--circle' id=\"XMLID_17_\" fill=\"none\"  stroke-width=\"7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"  stroke-miterlimit=\"10\" cx=\"106.8\" cy=\"106.8\" r=\"103.3\"/>\n    </svg>\n    ";
    this.controlsBlock.append(this.arrowTop);
    this.controlsBlock.append(this.arrowBottom);
    this.wrapper.append(this.cardsBlock);
    this.wrapper.append(this.controlsBlock);
    return this.wrapper;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayHand);

/***/ }),

/***/ "./src/js/display/playerTable/displayHeader.js":
/*!*****************************************************!*\
  !*** ./src/js/display/playerTable/displayHeader.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var displayHeader = {
  wrapper: null,
  headRowNames: [{
    hand: ['fas', 'fa-hand-paper', 'yellow']
  }, {
    influence: ['fas', 'fa-shield-alt', 'red']
  }, {
    leadership: ['fas', 'fa-trophy', 'yellow']
  }],
  resourcesNames: [{
    tree: ['fab', 'fa-pagelines', 'green']
  }, {
    tower: ['fab', 'fa-fort-awesome', 'grey']
  }, {
    crown: ['fas', 'fa-crown', 'yellow']
  }, {
    bulb: ['fas', 'fa-lightbulb', 'purple']
  }, {
    factory: ['fas', 'fa-industry', 'red']
  }, {
    clock: ['far', 'fa-clock', 'blue']
  }],
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
    clock: null
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
    clock: null
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
    clock: null
  },
  player4: {
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
    clock: null
  },
  initPlayerStats: function initPlayerStats(id) {
    var _this = this;

    var player = "player".concat(id);
    this[player].container = document.createElement('div');
    this[player].container.classList.add('player-container');
    var headRow = document.createElement('div');
    headRow.classList.add('head-row');
    this[player].name = document.createElement('div');
    this[player].name.classList.add('head-row__name');
    this[player].name.textContent = "Player".concat(id);
    headRow.appendChild(this[player].name);
    this.headRowNames.forEach(function (e) {
      var i = Object.keys(e)[0];
      var container = document.createElement('div');
      container.classList.add('cards-container');
      var iconContainer = document.createElement('div');
      iconContainer.classList.add("".concat(e[i][0]), "".concat(e[i][1]), 'cards-container__icon', "card__icon-color--".concat(e[i][2]));
      container.appendChild(iconContainer);
      _this[player][i] = document.createElement('div');

      _this[player][i].classList.add('cards-container__counter');

      _this[player][i].textContent = 0;
      container.appendChild(_this[player][i]);
      headRow.appendChild(container);
    });
    this[player].container.appendChild(headRow);
    var activeZoneRow = document.createElement('div');
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
    var recourcesRow = document.createElement('div');
    recourcesRow.classList.add('recources-row');
    this.resourcesNames.forEach(function (e) {
      var i = Object.keys(e)[0]; // console.log(e[i][0]);

      var container = document.createElement('div');
      container.classList.add('recource-container');
      var iconContainer = document.createElement('div');
      iconContainer.classList.add("".concat(e[i][0]), "".concat(e[i][1]), 'recource-container__icon', "card__icon-color--".concat(e[i][2]));
      container.appendChild(iconContainer);
      _this[player][i] = document.createElement('div');

      _this[player][i].classList.add('recource-container__counter');

      _this[player][i].textContent = 0;
      container.appendChild(_this[player][i]);
      recourcesRow.appendChild(container);
    });
    this[player].container.appendChild(recourcesRow);
    this.wrapper.appendChild(this[player].container);
  },
  changePlayerStats: function changePlayerStats(player) {
    var playerId = "player".concat(player.id);
    this[playerId].hand.textContent = player.hand.length;
    this[playerId].red.textContent = player.activeStacks.red.cards.length;
    this[playerId].green.textContent = player.activeStacks.green.cards.length;
    this[playerId].blue.textContent = player.activeStacks.blue.cards.length;
    this[playerId].purple.textContent = player.activeStacks.purple.cards.length;
    this[playerId].yellow.textContent = player.activeStacks.yellow.cards.length;
    this[playerId].tree.textContent = player.tree;
    this[playerId].tower.textContent = player.tower;
    this[playerId].crown.textContent = player.crown;
    this[playerId].bulb.textContent = player.bulb;
    this[playerId].factory.textContent = player.factory;
    this[playerId].clock.textContent = player.clock;
  },
  init: function init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('header');
    this.initPlayerStats(1);
    this.initPlayerStats(2);
    /* this.initPlayerStats(this.testPlayer3);
    this.initPlayerStats(this.testPlayer4); */

    return this.wrapper;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayHeader);
/* 'tower', 'crown', 'bulb', 'factory', 'clock' */

/***/ }),

/***/ "./src/js/display/playerTable/displayPlayerTable.js":
/*!**********************************************************!*\
  !*** ./src/js/display/playerTable/displayPlayerTable.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _displayHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayHeader */ "./src/js/display/playerTable/displayHeader.js");
/* harmony import */ var _displayAside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayAside */ "./src/js/display/playerTable/displayAside.js");
/* harmony import */ var _displayActiveZone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayActiveZone */ "./src/js/display/playerTable/displayActiveZone.js");
/* harmony import */ var _displayHand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayHand */ "./src/js/display/playerTable/displayHand.js");




var displayPlayerTable = {
  wrapper: null,
  header: null,
  aside: null,
  activeZone: null,
  hand: null,
  init: function init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    this.wrapperMain = document.createElement('div');
    this.wrapperMain.classList.add('wrapper__main');
    this.header = _displayHeader__WEBPACK_IMPORTED_MODULE_0__.default.init();
    this.wrapperMain.appendChild(this.header);
    this.activeZone = _displayActiveZone__WEBPACK_IMPORTED_MODULE_2__.default.init();
    this.wrapperMain.appendChild(this.activeZone);
    this.hand = _displayHand__WEBPACK_IMPORTED_MODULE_3__.default.init();
    this.wrapperMain.appendChild(this.hand);
    this.aside = _displayAside__WEBPACK_IMPORTED_MODULE_1__.default.init();
    this.wrapper.appendChild(this.wrapperMain);
    this.wrapper.appendChild(this.aside);
    return this.wrapper;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayPlayerTable);

/***/ }),

/***/ "./src/js/utility/chat.js":
/*!********************************!*\
  !*** ./src/js/utility/chat.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function chat() {
  var socket = io();
  var messageContainer = document.querySelector('.log__text');
  var messageForm = document.querySelector('.log__form');
  var messageInput = document.querySelector('.log__input');
  var players = document.querySelectorAll('.head-row__name');
  var userName = prompt('What is your name?');

  function appendMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }

  appendMessage('You joined');
  console.log('yo');
  socket.emit('new-user', userName);
  socket.on('chat-message', function (data) {
    appendMessage("".concat(data.name, ": ").concat(data.message));
  });
  socket.on('user-connected', function (name) {
    appendMessage("".concat(name, " connected"));
  });
  socket.on('players', function (name) {
    var nameOfUsers = Object.values(name);
    players.forEach(function (el, i) {
      el.textContent = nameOfUsers[i];
    });
  });
  socket.on('user-disconnected', function (name) {
    appendMessage("".concat(name, " disconnected"));
  });
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (messageInput.value === '') return;
    var message = messageInput.value;
    appendMessage("You: ".concat(message));
    socket.emit('send-chat-message', message);
    messageInput.value = '';
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chat);

/***/ }),

/***/ "./src/js/utility/setHandControls.js":
/*!*******************************************!*\
  !*** ./src/js/utility/setHandControls.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ setGameControls
/* harmony export */ });
// function which disable passed dom element button
function disableBtn(btnElement) {
  btnElement.disabled = true;
  btnElement.classList.add('hand__btn--disabled');
} // function which enable passed dom element button


function enableBtn(btnElement) {
  btnElement.disabled = false;
  btnElement.classList.remove('hand__btn--disabled');
}

function setGameControls() {
  // get needed dom elements
  var btnTop = document.querySelector('.hand__btn--top');
  var btnBottom = document.querySelector('.hand__btn--bottom');
  var hand = document.querySelector('.hand__cards'); // const height of one line of cards (current = 200px card + 10px margin + 10px margin)

  var cardsLineHeight = 220; // const timeout used because time needed for scroll animation before values updated

  var timeoutTime = 300; // disable scrolling in hand block

  hand.onwheel = function disableScroll() {
    return false;
  }; // event activated on each inserted card


  hand.addEventListener('DOMNodeInserted', function () {
    // scroll to inserted card (or do nothing)
    hand.scrollTop = hand.scrollHeight - cardsLineHeight;
    disableBtn(btnBottom); // if scrolled to second+ line of cards

    if (hand.scrollHeight > cardsLineHeight) {
      enableBtn(btnTop);
    }
  }); // event activated on each removed card

  hand.addEventListener('DOMNodeRemoved', function () {
    setTimeout(function () {
      // only one line of card left - disable both buttons
      if (hand.scrollHeight === cardsLineHeight) {
        disableBtn(btnBottom);
        disableBtn(btnTop); // if point of view is on last line
        //! cardsLineHeight * 2 because at different resolutions height in px may differ a bit
      } else if (hand.scrollHeight - hand.scrollTop < cardsLineHeight * 2) {
        disableBtn(btnBottom);
      }
    }, timeoutTime);
  }); // event on click at top button

  btnTop.addEventListener('click', function () {
    // block multiple clicks faster then timeoutTime value
    btnTop.disabled = true; // scroll up one line

    hand.scrollTop -= cardsLineHeight; // disable/enable buttons depends on scroll position
    // !important: dont use else here, need 2 separate if blocks

    setTimeout(function () {
      // if point of view at first line
      if (hand.scrollTop === 0) {
        disableBtn(btnTop);
        enableBtn(btnBottom);
      } // if point of view not at first line


      if (hand.scrollTop !== 0) {
        enableBtn(btnBottom); // remove disabled attribute added for blocking multiple clicks

        btnTop.disabled = false;
      }
    }, timeoutTime);
  }); // event on click at botom button

  btnBottom.addEventListener('click', function () {
    // block multiple clicks faster then timeoutTime value
    btnBottom.disabled = true; // scroll down on one line

    hand.scrollTop += cardsLineHeight; // disable/enable buttons depends on scroll position

    setTimeout(function () {
      // if point of view isnt on first line
      if (hand.scrollTop !== 0) {
        enableBtn(btnTop); // remove disabled attribute added for blocking multiple clicks

        btnBottom.disabled = false;
      } // if point of view on last line
      //! cardsLineHeight * 2 because at different resolutions height in px may differ a bit


      if (hand.scrollHeight - hand.scrollTop < cardsLineHeight * 2 && hand.scrollTop !== 0) {
        disableBtn(btnBottom);
      }
    }, timeoutTime);
  });
}

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/cards/cards.json":
/*!*********************************!*\
  !*** ./src/js/cards/cards.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse("[{\"age\":1,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\",\"resourceName\":\"bulb\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\",\"resourceName\":\"bulb\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\",\"resourceName\":\"bulb\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\",\"resourceName\":\"bulb\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"}]}]},{\"age\":1,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\",\"resourceName\":\"bulb\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]}]},{\"age\":1,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"}]}]},{\"age\":1,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]}]},{\"age\":1,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\",\"resourceName\":\"crown\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\",\"resourceName\":\"tower\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\",\"resourceName\":\"tree\"}]}]},{\"age\":2,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":2,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":2,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":2,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":2,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":3,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":3,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":3,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":3,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":3,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":4,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":4,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":4,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":4,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":4,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":5,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":5,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":5,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":5,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":5,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":6,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":6,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":6,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":6,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":6,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":7,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":7,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":7,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":7,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":7,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":8,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":8,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":8,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":8,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":8,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":9,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":9,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":9,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":9,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":9,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":10,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"blue\",\"cards\":[{\"innovation\":\"гончарное дело\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> до трех карт с руки. Если сделали это, возьмите и зачтите карту того уровня, сколько карт переработали.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"инструменты\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> три карты с руки. Если сделали это, возьмите и сыграйте <span class = 'age__number'>3</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> <span class = 'age__number'>3</span> с руки. Если сделали это, возьмите три <span class = 'age__number'>1</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"письменность\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> <span class = 'age__number'>2</span>\",\"dogmaIcon\":[\"fas\",\"fa-lightbulb\"],\"dogmaColor\":\"purple\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"}]}]},{\"age\":10,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"red\",\"cards\":[{\"innovation\":\"кузнечное дело\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если она приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i>, зачтите ее и выполните эту догму снова. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"лук и стрелы\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> возьмите <span class = 'age__number'>1</span> ! Затем переместите старшую карту с руки мне на руку!\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-lightbulb\"],\"resourseColor\":\"purple\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"вёсла\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> переместите с руки в мою зону влияния карту, которая приносит <i class='fas fa-crown resourse__icon card__icon-color--yellow'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span> !\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Если</b> по предыдущей догме не перемещена ни одна карта, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":10,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"green\",\"cards\":[{\"innovation\":\"колесо\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите</b> две <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"одежда\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> с руки карту, если у вас в игре нет стопки того же цвета.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"},{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и зачтите</b> <span class = 'age__number'>1</span> за каждый цвет, который есть у вас в игре, но отсутствует в игре у всех соперников\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"парус\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и сырайте</b> <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]},{\"age\":10,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"purple\",\"cards\":[{\"innovation\":\"города\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"aggressive\",\"dogmaEffect\":\"<b>Я требую:</b> если ваши карты приносят 4 <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> или больше, переместите мне в игру активную карту, которая приносит <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> ! Если сделали это, возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"свод законов\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете архивировать</b> с руки карту любого цвета, который есть у вас в игре. Если сделали это, можете сдвинуть стопку этого цвета влево.\",\"dogmaIcon\":[\"fas\",\"fa-crown\"],\"dogmaColor\":\"yellow\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]},{\"innovation\":\"мистицизм\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Возьмите и покажите</b> всем игрокам <span class = 'age__number'>1</span>. Если у вас в игре есть стопка того же цвета, сыграйте взятую карту и возьмите <span class = 'age__number'>1</span>. В противном случае заберите ее на руку.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]}]},{\"age\":10,\"cardImg\":\"./assets/img/cards-bg/age-01.jpg\",\"color\":\"yellow\",\"cards\":[{\"innovation\":\"каменная кладка\",\"agePosition\":\"bottomLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете сыграть</b> с руки сколько угодно карт, которые приносят <i class='fab fa-fort-awesome resourse__icon card__icon-color--grey'></i> Если сыграли 4 или больше карт, добейтесь лидерства в \\\"Строительстве\\\".\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"скотоводство\",\"agePosition\":\"bottomCenter\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Сыграйте</b> младшую карту с руки. Возьмите <span class = 'age__number'>1</span>.\",\"dogmaIcon\":[\"fab\",\"fa-fort-awesome\"],\"dogmaColor\":\"grey\"}],\"resourses\":[{\"resoursePosition\":\"topLeft\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"},{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fas\",\"fa-crown\"],\"resourseColor\":\"yellow\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-fort-awesome\"],\"resourseColor\":\"grey\"}]},{\"innovation\":\"земледелие\",\"agePosition\":\"topLeft\",\"dogma\":[{\"dogmaType\":\"corporate\",\"dogmaEffect\":\"<b>Вы можете переработать</b> карту с руки. Если сделали это, возьмите и зачтите карту, уровень которой на 1 выше, чем у переработанной.\",\"dogmaIcon\":[\"fab\",\"fa-pagelines\"],\"dogmaColor\":\"green\"}],\"resourses\":[{\"resoursePosition\":\"bottomLeft\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomCenter\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"},{\"resoursePosition\":\"bottomRight\",\"resourseType\":[\"fab\",\"fa-pagelines\"],\"resourseColor\":\"green\"}]}]}]");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map