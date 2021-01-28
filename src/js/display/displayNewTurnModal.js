export default function displayModal(playerName, activePlayerActionName = null) {
  return new Promise((resolve) => {
    const modalBg = document.createElement('div');
    modalBg.classList.add('modal');
    modalBg.classList.add('modal--hidden');

    const modalBlock = document.createElement('div');
    modalBlock.classList.add('modal__block');

    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal__overlay');

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal__wrapper');

    const modalText = document.createElement('div');
    modalText.classList.add('modal__text');
    if (activePlayerActionName !== null) {
      modalText.innerText = `Сейчас действие игрока ${activePlayerActionName}`;
    } else {
      modalText.innerText = `Сейчас ход игрока ${playerName}`;
    }

    const modalBtn = document.createElement('button');
    modalBtn.classList.add('modal__btn');
    modalBtn.innerText = 'Начать ход!';
    modalBtn.addEventListener('click', () => {
      modalBg.style = '';
      modalBg.classList.toggle('modal--hidden');
      setTimeout(() => {
        modalBg.remove();
        resolve();
      }, 500);
    });

    modalWrapper.append(modalText, modalBtn);
    modalBlock.append(modalOverlay, modalWrapper);
    modalBg.append(modalBlock);

    document.body.prepend(modalBg);
    setTimeout(() => {
      modalBg.classList.toggle('modal--hidden');
    }, 0);
  });
}
