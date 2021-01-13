import Menu from './mainMenu';

export default class Intro {
  static init() {
    const divIntro = document.createElement('div');
    divIntro.classList.add('intro');

    const introContainer = document.createElement('div');
    introContainer.classList.add('intro__container');

    const introTop = document.createElement('div');
    introTop.classList.add('intro__top');

    // svg title letters - I n n o v a t i o n
    const introCenter = document.createElement('div');
    introCenter.classList.add('intro__center');
    introCenter.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="500px" height="120px" viewBox="0 0 500 120" enable-background="new 0 0 500 120" xml:space="preserve">
<path class="letter-1" d="M27.346,80.317c3.604,1.819,7.755,0.485,7.755,2.67c0,0.728-0.656,1.334-2.075,1.334c-0.983,0-6.117-0.606-15.292-0.606
S3.536,84.321,2.553,84.321c-1.42,0-2.184-0.606-2.184-1.334c0-2.185,4.259-0.851,7.863-2.67c3.386-1.698,3.932-4.49,3.932-9.829
v-54.61c0-5.218-0.546-8.01-3.604-9.587C5.721,4.835,0.369,5.685,0.369,3.985c0-0.728,1.857-1.213,3.167-1.213
c1.202,0,5.898,0.485,14.199,0.485c8.628,0,13.544-0.485,14.417-0.485c1.201,0,2.949,0.364,2.949,1.092
c0,1.457-3.604,0.971-7.208,2.063s-4.478,4.125-4.478,9.951v54.61C23.415,75.949,24.07,78.739,27.346,80.317z"/>
<path class="letter-2" d="M49.627,46.458c0-4.611-0.437-6.976-2.621-8.276c-2.075-1.183-5.242-0.354-5.242-1.892c0-1.064,1.638-1.3,4.26-1.892
c5.789-1.3,9.065-3.191,10.157-3.191c2.075,0,1.856,3.31,2.512,11.585c4.26-7.447,10.157-11.231,18.021-11.231
c10.375,0,16.165,5.674,16.165,15.724v27.546c0,3.901,0.109,5.439,2.622,6.74c2.839,1.419,5.243,0.709,5.243,2.6
c0,0.592-0.546,1.064-1.639,1.064c-1.419,0-5.133-0.709-11.031-0.709c-5.898,0-9.502,0.709-10.922,0.709
c-1.092,0-1.748-0.473-1.748-1.3c0-1.655,2.512-1.064,5.243-2.364c2.512-1.183,2.622-2.839,2.622-6.74V47.994
c0-8.394-3.386-12.532-10.267-12.532c-7.427,0-13.762,7.094-13.762,17.024v22.345c0,3.901,0.109,5.439,2.621,6.74
c2.84,1.419,5.243,0.709,5.243,2.6c0,0.592-0.655,1.064-1.748,1.064c-1.42,0-5.024-0.709-10.922-0.709
c-5.898,0-9.611,0.709-11.031,0.709c-1.092,0-1.638-0.473-1.638-1.3c0-1.655,2.512-1.064,5.242-2.364
c2.512-1.183,2.621-2.839,2.621-6.74V46.458z"/>
<path class="letter-3" d="M116.135,46.458c0-4.611-0.437-6.976-2.621-8.276c-2.076-1.183-5.243-0.354-5.243-1.892c0-1.064,1.638-1.3,4.26-1.892
c5.789-1.3,9.065-3.191,10.157-3.191c2.076,0,1.856,3.31,2.512,11.585c4.26-7.447,10.157-11.231,18.021-11.231
c10.376,0,16.165,5.674,16.165,15.724v62.068c0,3.901,0.109,5.439,2.622,6.74c2.839,1.419,5.243,0.709,5.243,2.6
c0,0.592-0.546,1.064-1.639,1.064c-1.42,0-5.134-0.709-11.032-0.709s-9.501,0.709-10.921,0.709c-1.092,0-1.748-0.473-1.748-1.3
c0-1.655,2.512-1.064,5.243-2.364c2.512-1.183,2.622-2.839,2.622-6.74V47.994c0-8.394-3.386-12.532-10.267-12.532
c-7.427,0-13.762,7.094-13.762,17.024v22.345c0,3.901,0.11,5.439,2.621,6.74c2.84,1.419,5.243,0.709,5.243,2.6
c0,0.592-0.655,1.064-1.748,1.064c-1.419,0-5.024-0.709-10.922-0.709s-9.611,0.709-11.032,0.709c-1.092,0-1.638-0.473-1.638-1.3
c0-1.655,2.513-1.064,5.243-2.364c2.512-1.183,2.621-2.839,2.621-6.74V46.458z"/>
<path class="letter-4" d="M189.871,31.561c6.881,0,12.779,2.72,17.584,7.803c5.025,5.438,7.864,12.532,7.864,19.153c0,7.33-2.731,14.423-7.646,19.861
c-5.133,5.677-10.813,8.275-18.131,8.275c-15.073,0-26.322-11.467-26.322-27.545C163.22,43.383,175.016,31.561,189.871,31.561z
  M188.996,84.171c10.267,0,15.728-8.631,15.728-25.417c0-16.197-6.007-24.946-15.728-24.946c-8.737,0-15.181,9.339-15.181,25.418
C173.815,75.305,179.385,84.171,188.996,84.171z"/>
<path class="letter-5" d="M254.752,48.939c0-5.218-6.116-3.761-6.116-5.825c0-0.85,0.437-1.092,1.638-1.092c1.53,0,3.715,0.486,6.443,0.486
c2.841,0,4.807-0.364,6.008-0.364c1.311,0,1.967,0.364,1.967,1.092c0,1.214-1.748,0.971-3.277,2.427
c-1.747,1.699-3.387,5.583-5.68,11.892l-12.125,26.524c-0.438,1.214-0.983,1.699-1.857,1.699c-1.748,0-1.857-1.821-3.167-5.34
l-20.852-51.993c-1.201-3.034-2.402-4.976-3.386-5.461c-3.058-1.456-4.697-0.849-4.697-2.548c0-0.85,0.656-1.092,1.857-1.092
c2.075,0,5.679,0.485,11.031,0.485c4.37,0,7.209-0.364,8.52-0.364c1.529,0,2.293,0.243,2.293,1.092c0,1.335-1.856,0.971-4.15,1.578
c-1.529,0.364-2.403,1.457-2.403,3.156c0,1.456,6.434,15.95,8.291,20.683l10.267,26.333
C252.346,52.285,254.752,52.217,254.752,48.939z"/>
<path class="letter-6" d="M269.073,82.822c-6.989,0-11.14-4.368-11.14-11.043c0-10.316,9.938-15.655,30.146-23.786v-9.587
c0-6.433-3.276-9.466-10.486-9.466c-5.461,0-8.956,2.184-9.393,5.825c-0.547,3.883-0.982,6.311-4.696,6.311
c-2.293,0-3.823-1.82-3.823-4.49c0-5.34,6.553-10.073,18.896-10.073c12.779,0,18.786,4.369,18.786,13.956v30.825
c0,4.246,1.311,6.553,3.605,6.553c2.074,0,3.385-2.307,4.477-2.307c0.654,0,0.983,0.364,0.983,1.093c0,2.063-3.933,6.31-8.847,6.31
c-5.134,0-8.848-3.276-9.83-8.494C282.509,79.91,275.845,82.822,269.073,82.822z M268.091,69.23c0,5.581,2.839,8.979,7.318,8.979
c5.68,0,12.67-5.097,12.67-10.557V50.663C274.534,56.488,268.091,61.706,268.091,69.23z"/>
<path class="letter-7" d="M315.265,36.43c-1.421,0-2.076-0.349-2.076-1.047c0-1.163,3.277-2.327,7.319-6.981c4.478-5.12,5.132-8.726,6.333-8.726
c0.765,0,0.983,0.465,0.983,1.629V32.94h10.049c2.185,0,3.167,0.116,3.167,1.746c0,1.28-0.982,1.744-3.275,1.744h-9.831v35.022
c0,7.098,1.966,10.471,6.99,10.471c5.134,0,6.444-5.584,8.192-5.584c0.655,0,1.31,0.698,1.31,1.628
c0,2.909-5.024,7.446-13.106,7.446c-9.829,0-12.67-4.537-12.67-14.543V36.43H315.265z"/>
<path class="letter-8" d="M352.395,36.349c-2.402-0.931-5.461,0.117-5.461-1.397c0-1.28,1.528-1.164,4.479-1.862
c6.772-1.514,10.485-3.608,11.469-3.608c0.873,0,1.201,0.583,1.201,1.746v41.436c0,3.839,0.109,5.47,2.622,6.634
c2.838,1.396,5.241,0.699,5.241,2.56c0,0.582-0.655,1.048-1.748,1.048c-1.31,0-4.913-0.699-10.921-0.699s-9.722,0.699-11.032,0.699
c-1.092,0-1.638-0.466-1.638-1.048c0-1.86,2.402-1.163,5.242-2.56c2.402-1.164,2.621-2.677,2.621-6.634V41.004
C354.47,38.211,354.142,37.047,352.395,36.349z M358.185-0.314c3.057,0,5.569,2.677,5.569,6.052c0,3.259-2.403,5.936-5.569,5.936
c-3.168,0-5.68-2.677-5.68-5.936C352.505,2.363,355.017-0.314,358.185-0.314z"/>
<path class="letter-9" d="M406.231,31.561c6.881,0,12.779,2.72,17.585,7.803c5.023,5.438,7.864,12.532,7.864,19.153c0,7.33-2.731,14.423-7.646,19.861
c-5.133,5.677-10.813,8.275-18.131,8.275c-15.072,0-26.321-11.467-26.321-27.545C379.582,43.383,391.378,31.561,406.231,31.561z
  M405.358,84.171c10.267,0,15.727-8.631,15.727-25.417c0-16.197-6.007-24.946-15.727-24.946c-8.738,0-15.182,9.339-15.182,25.418
C390.177,75.305,395.747,84.171,405.358,84.171z"/>
<path class="letter-10" d="M449.253,46.458c0-4.611-0.437-6.976-2.621-8.276c-2.075-1.183-5.243-0.354-5.243-1.892c0-1.064,1.64-1.3,4.261-1.892
c5.788-1.3,9.064-3.191,10.156-3.191c2.076,0,1.856,3.31,2.513,11.585c4.26-7.447,10.158-11.231,18.021-11.231
c10.378,0,16.166,5.674,16.166,15.724v27.546c0,3.901,0.108,5.439,2.621,6.74c2.84,1.419,5.243,0.709,5.243,2.6
c0,0.592-0.547,1.064-1.639,1.064c-1.421,0-5.133-0.709-11.03-0.709c-5.898,0-9.503,0.709-10.923,0.709
c-1.093,0-1.747-0.473-1.747-1.3c0-1.655,2.511-1.064,5.242-2.364c2.512-1.183,2.621-2.839,2.621-6.74V47.994
c0-8.394-3.386-12.532-10.266-12.532c-7.428,0-13.764,7.094-13.764,17.024v22.345c0,3.901,0.109,5.439,2.621,6.74
c2.841,1.419,5.244,0.709,5.244,2.6c0,0.592-0.656,1.064-1.748,1.064c-1.421,0-5.025-0.709-10.922-0.709
c-5.898,0-9.611,0.709-11.031,0.709c-1.093,0-1.64-0.473-1.64-1.3c0-1.655,2.513-1.064,5.243-2.364
c2.513-1.183,2.621-2.839,2.621-6.74V46.458z"/>
<defs>
    <filter id="mySVGfilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
    </filter>
</defs>
</svg>`;

    const introCenterTitle = document.createElement('div');
    introCenterTitle.classList.add('center__title');
    introCenter.appendChild(introCenterTitle);

    const introBottom = document.createElement('div');
    introBottom.classList.add('intro__bottom');
    const introBottomLamps = document.createElement('div');
    introBottomLamps.classList.add('bottom__lamp');
    for (let i = 0; i < 3; i += 1) {
      const introBottomLamp = document.createElement('div');
      introBottomLamp.classList.add(`bottom__lamp--${i + 1}`);
      introBottomLamps.appendChild(introBottomLamp);
    }
    introBottom.appendChild(introBottomLamps);

    const introGear = document.createElement('div');
    introGear.classList.add('intro__gear');
    const introGear1 = document.createElement('div');
    introGear1.classList.add('intro__gear1');
    const introGear2 = document.createElement('div');
    introGear2.classList.add('intro__gear2');
    introGear.appendChild(introGear1);
    introGear.appendChild(introGear2);

    introContainer.appendChild(introTop);
    introContainer.appendChild(introCenter);
    introContainer.appendChild(introBottom);
    introContainer.appendChild(introGear);
    divIntro.appendChild(introContainer);
    document.body.appendChild(divIntro);

    const img = new Image();
    img.src = './assets/img/intro/center.png';

    img.addEventListener('load', () => {
      introBottom.classList.add('show');
      // set up and display main menu
      const menu = new Menu(introTop);
      menu.render();
    });
  }
}