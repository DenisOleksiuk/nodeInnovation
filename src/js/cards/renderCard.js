import gameState from '../components/gameState';

function getRenderCard() {
  let hand = null;
  let activeStacks = null;

  const renderCard = {
    initObject() {
      hand = document.querySelector('.hand__cards');
      activeStacks = document.querySelectorAll('.active-zone__stack');
    },

    toHand(cardElement) {
      if (hand === null || activeStacks === null) this.initObject();
      cardElement.setAttribute('xyz', 'fade right-3 flip-right rotate-left');
      cardElement.classList.add('xyz-in');
      setTimeout(() => {
        cardElement.classList.remove('xyz-in');
      }, 450);
      hand.append(cardElement);
    },

    toActive(cardElement) {
      if (hand === null || activeStacks === null) this.initObject();

      // get properties of target stack to calcualte later
      const targetStack = {};
      activeStacks.forEach((stack) => {
        if (cardElement.children[0].classList.contains(`card__color--${stack.id}`)) {
          stack.classList.remove('active-zone__stack--empty');
          targetStack.dom = stack;
          stack.style.width = null;
          targetStack.width = stack.offsetWidth;
          targetStack.height = stack.offsetHeight;
          targetStack.shift = gameState.activePlayer.activeDecks[targetStack.dom.id].shift;
          targetStack.length = gameState.activePlayer.activeDecks[targetStack.dom.id].cards.length;
        }
      });

      cardElement.style.position = 'absolute';
      cardElement.setAttribute('xyz', 'fade right-3 flip-right rotate-left');
      cardElement.classList.add('xyz-in');

      const cardHeight = cardElement.offsetHeight;
      let cardShiftValue = 40;

      switch (targetStack.shift) {
        case 'top':
          while (targetStack.height < cardHeight + (targetStack.length * cardShiftValue)
            && cardShiftValue !== 10) {
            cardShiftValue -= 10;
          }
          Array.from(targetStack.dom.children).forEach((card, i) => {
            card.style.bottom = `${i * cardShiftValue}px`;
          });
          cardElement.style.bottom = `${targetStack.length * cardShiftValue}px`;
          break;

        case 'left':
          while (targetStack.dom.parentElement.offsetWidth / 2.5 < targetStack.width
            + (targetStack.length * cardShiftValue)
            && cardShiftValue !== 10) {
            cardShiftValue -= 10;
          }
          Array.from(targetStack.dom.children).forEach((card, i) => {
            card.style.right = `${i * cardShiftValue}px`;
          });
          cardElement.style.right = `${targetStack.length * cardShiftValue}px`;
          if (targetStack.length !== 0) {
            targetStack.dom.style.width = `${targetStack.width + cardShiftValue * targetStack.length}px`;
          }
          break;

        case 'right':
          while (targetStack.dom.parentElement.offsetWidth / 2.5 < targetStack.width
            + (targetStack.length * cardShiftValue)
            && cardShiftValue !== 10) {
            cardShiftValue -= 10;
          }
          Array.from(targetStack.dom.children).forEach((card, i) => {
            card.style.left = `${i * cardShiftValue}px`;
          });
          cardElement.style.left = `${targetStack.length * cardShiftValue}px`;
          if (targetStack.length !== 0) {
            targetStack.dom.style.width = `${targetStack.width + cardShiftValue * targetStack.length}px`;
          }
          break;
        default:
          break;
      }

      targetStack.dom.append(cardElement);
      targetStack.dom.scrollIntoView();
    },

  };
  return renderCard;
}

const renderCard = getRenderCard();

export default renderCard;
