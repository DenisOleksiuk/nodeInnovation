const displayActiveZone = {
  wrapper: null,
  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('active-zone');

    // create players active stacks
    // !Stack names are the color fields of cards object
    const stacksNames = ['blue', 'red', 'green', 'purple', 'yellow'];
    for (let i = 0; i < stacksNames.length; i += 1) {
      const stack = document.createElement('div');
      stack.classList.add('active-zone__stack');
      stack.id = stacksNames[i]; // id stackName for each stack
      this.wrapper.append(stack);
    }

    return this.wrapper;
  },
};

export default displayActiveZone;
