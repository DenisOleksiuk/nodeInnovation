// function which disable passed dom element button
function disableBtn(btnElement) {
  btnElement.disabled = true;
  btnElement.classList.add('hand__btn--disabled');
}

// function which enable passed dom element button
function enableBtn(btnElement) {
  btnElement.disabled = false;
  btnElement.classList.remove('hand__btn--disabled');
}

export default function setGameControls() {
  // get needed dom elements
  const btnTop = document.querySelector('.hand__btn--top');
  const btnBottom = document.querySelector('.hand__btn--bottom');
  const hand = document.querySelector('.hand__cards');

  // const height of one line of cards (current = 200px card + 70px margins/decoration)
  // dinamically calculated depends on html font-size property
  const html = document.documentElement;
  const style = window.getComputedStyle(html, null).getPropertyValue('font-size');
  const fontSize = parseFloat(style);

  const cardsLineHeight = fontSize * 27;
  // const timeout used because time needed for scroll animation before values updated
  const timeoutTime = 350;

  // disable scrolling in hand block
  hand.onwheel = function disableScroll() { return false; };

  // event activated on each inserted card
  hand.addEventListener('DOMNodeInserted', () => {
    // scroll to inserted card (or do nothing)
    hand.scrollTop = hand.scrollHeight - cardsLineHeight;
    disableBtn(btnBottom);
    // if scrolled to second+ line of cards
    if (hand.scrollHeight > cardsLineHeight) {
      enableBtn(btnTop);
    }
  });

  // event activated on each removed card
  hand.addEventListener('DOMNodeRemoved', () => {
    setTimeout(() => {
      // only one line of card left - disable both buttons
      if (hand.scrollHeight === cardsLineHeight) {
        disableBtn(btnBottom);
        disableBtn(btnTop);
      // if point of view is on last line
      //! cardsLineHeight * 2 because at different resolutions height in px may differ a bit
      } else if (hand.scrollHeight - hand.scrollTop < cardsLineHeight * 2) {
        disableBtn(btnBottom);
      }
    }, timeoutTime);
  });

  // event on click at top button
  btnTop.addEventListener('click', () => {
    // block multiple clicks faster then timeoutTime value
    btnTop.disabled = true;

    // scroll up one line
    hand.scrollTop -= cardsLineHeight;

    // disable/enable buttons depends on scroll position
    // !important: dont use else here, need 2 separate if blocks
    setTimeout(() => {
      // if point of view at first line
      if (hand.scrollTop === 0) {
        disableBtn(btnTop);
        enableBtn(btnBottom);
      }
      // if point of view not at first line
      if (hand.scrollTop !== 0) {
        enableBtn(btnBottom);
        // remove disabled attribute added for blocking multiple clicks
        btnTop.disabled = false;
      }
    }, timeoutTime);
  });

  // event on click at botom button
  btnBottom.addEventListener('click', () => {
    // block multiple clicks faster then timeoutTime value
    btnBottom.disabled = true;

    // scroll down on one line
    hand.scrollTop += cardsLineHeight;

    // disable/enable buttons depends on scroll position
    setTimeout(() => {
      // if point of view isnt on first line
      if (hand.scrollTop !== 0) {
        enableBtn(btnTop);
        // remove disabled attribute added for blocking multiple clicks
        btnBottom.disabled = false;
      }
      // if point of view on last line
      //! cardsLineHeight * 2 because at different resolutions height in px may differ a bit
      if (hand.scrollHeight - hand.scrollTop < cardsLineHeight * 2 && hand.scrollTop !== 0) {
        disableBtn(btnBottom);
      }
    }, timeoutTime);
  });
}
