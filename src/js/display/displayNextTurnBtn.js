export default function displayNextTurnBtn(newTurnFunction) {
  const nextTurnBtn = document.createElement('div');
  nextTurnBtn.classList.add('info-table__next-turn-btn');
  nextTurnBtn.innerText = 'Закончить ход';
  nextTurnBtn.addEventListener('click', () => {
    newTurnFunction();
    setTimeout(() => {
      const excistedNextTurnBtn = document.querySelector('.info-table__next-turn-btn');
      excistedNextTurnBtn.remove();
    }, 500);
  });
  const infoTable = document.querySelector('.info-table');
  infoTable.append(nextTurnBtn);
}
