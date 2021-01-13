export default function displayModal(playerName) {
  const modalBg = document.createElement('div');
  modalBg.classList.add('modal');
  modalBg.classList.add('modal--hidden');

  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal__block');

  const modalText = document.createElement('div');
  modalText.classList.add('modal__text');
  modalText.innerText = `Сейчас ход игрока ${playerName}`;

  const modalBtn = document.createElement('button');
  modalBtn.classList.add('modal__btn');
  modalBtn.innerText = 'Начать ход!';
  modalBtn.addEventListener('click', () => {
    modalBg.style = '';
    modalBg.classList.toggle('modal--hidden');
    setTimeout(() => {
      modalBg.remove();
    }, 500);
  });

  modalBlock.append(modalText, modalBtn);
  modalBg.append(modalBlock);

  document.body.prepend(modalBg);
  setTimeout(() => {
    modalBg.classList.toggle('modal--hidden');
  }, 0);
}
