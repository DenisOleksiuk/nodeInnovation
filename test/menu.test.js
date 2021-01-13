import Menu from '../src/js/mainMenu';

describe('menu class', () => {
  test('metod render is truthful', () => {
    expect(new Menu().render).toBeTruthy();
    expect(new Menu().renderPdfRules).toBeTruthy();
  });
});
