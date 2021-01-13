export default function setAsideControls() {
  const buttons = Array.from(document.querySelectorAll('.close-modal-btn'));

  function animation(e) {
    const button = e.target;
    const parentBlock = e.target.parentElement.parentElement;
    const childLines = Array.from(parentBlock.children);
    const childBlocks = childLines.map((line) => Array.from(line.children)).flat();

    button.removeEventListener('click', animation);
    parentBlock.classList.remove('xyz-in');
    parentBlock.classList.add('xyz-out');

    childBlocks.forEach((child) => {
      child.classList.remove('xyz-in');
      child.classList.add('xyz-out');
    });

    setTimeout(() => {
      parentBlock.classList.toggle(`${parentBlock.className.split(' ')[0]}--hidden`);
      childBlocks.forEach((child) => {
        child.classList.remove('xyz-out');
        child.classList.add('xyz-in');
        parentBlock.classList.remove('xyz-out');
        parentBlock.classList.add('xyz-in');
      });
      button.addEventListener('click', animation);
    }, 600);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', animation);
  });
}
