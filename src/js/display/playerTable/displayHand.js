const displayHand = {
  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('hand');

    this.cardsBlock = document.createElement('div');
    this.cardsBlock.classList.add('hand__cards');

    this.controlsBlock = document.createElement('div');
    this.controlsBlock.classList.add('hand__controls');

    // disabled by default
    this.arrowTop = document.createElement('button');
    this.arrowTop.classList.add('hand__btn--top', 'hand__btn');
    this.arrowTop.classList.add('hand__btn--disabled');
    this.arrowTop.disabled = true;
    this.arrowTop.innerHTML = /* html */ `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="100px" height="80px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
      xml:space="preserve">

      <polygon class='hand__controls-svg--triangle' id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
      73.5,62.5 148.5,105.8 73.5,149.1 "/>

      <circle class='hand__controls-svg--circle' id="XMLID_17_" fill="none"  stroke-width="7" stroke-linecap="round" stroke-linejoin="round"  stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"/>
    </svg>
    `;

    // disabled by default
    this.arrowBottom = document.createElement('button');
    this.arrowBottom.classList.add('hand__btn--bottom', 'hand__btn');
    this.arrowBottom.classList.add('hand__btn--disabled');
    this.arrowBottom.disabled = true;
    this.arrowBottom.innerHTML = /* html */ `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
      x="0px" y="0px" width="100px" height="80px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
      xml:space="preserve">

      <polygon class='hand__controls-svg--triangle' id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
      73.5,62.5 148.5,105.8 73.5,149.1 "/>

      <circle class='hand__controls-svg--circle' id="XMLID_17_" fill="none"  stroke-width="7" stroke-linecap="round" stroke-linejoin="round"  stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3"/>
    </svg>
    `;

    this.controlsBlock.append(this.arrowTop);
    this.controlsBlock.append(this.arrowBottom);

    this.wrapper.append(this.cardsBlock);
    this.wrapper.append(this.controlsBlock);
    return this.wrapper;
  },
};

export default displayHand;
