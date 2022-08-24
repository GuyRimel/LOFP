let GameObj = {
  config: {

  },

  time: {
    totalIncrements: 96,
    currentTime: 48
  }

}

let CharObj = {
  stats: [
    { name: 'health', value: 50, color: 'red' },
    { name: 'stamina', value: 50, color: 'lime' },
    { name: 'accuracy', value: 50, color: 'turquoise' },
    { name: 'power', value: 50, color: 'purple' },
    { name: 'luck', value: 50, color: 'orange' },
  ],

  actions: [
    { name: 'eat', perform: eat },
    { name: 'nap', perform: nap },
    { name: 'think', perform: think },
    { name: 'rage', perform: rage },

    { name: 'fish', perform: fish },
    { name: 'search', perform: search },
    { name: 'fight', perform: fight },
    { name: 'use', perform: use },
  ],

  inventory: []
}

function eat() {
  console.log('eat');
}

function nap() {
  console.log('nap');
}

function think() {

}

function rage() {

}

function search() {

}

function fight() {

}

function fish() {

}

function use() {

}

function genGame() {
  function genLeftContainer() {
    let leftContainer = document.querySelector('.left-container');
    let statsLength = Object.keys(CharObj.stats).length;

    for (i = 0; i < statsLength; i++) {
      let statContainer = document.createElement('div');
      let statBar = document.createElement('div');
      let stat = CharObj.stats[i];

      statContainer.innerText = stat.name;
      statContainer.classList.add('statContainer');
      statBar.classList.add('statBar');
      statBar.classList.add(`${stat.name}Bar`);
      statBar.style.backgroundColor = stat.color;

      statContainer.appendChild(statBar);
      leftContainer.appendChild(statContainer);
    }
  }

  function genHeaderContainer() {
    let container = document.querySelector('.header-container');
    let timeBar = document.createElement('div');

    timeBar.classList.add('time-bar');
    container.innerText = '2:00 pm';
    container.appendChild(timeBar);
  }

  function genRightContainer() {

  }

  function genLeftBtnContainer() {
    let container = document.querySelector('.left-btn-container');
    
    for(i = 0; i < 4; i++) {
      let button = document.createElement('button');
      let buttonName = CharObj.actions[i].name;
      let buttonAction = CharObj.actions[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn')
      button.addEventListener('click', (event) => buttonAction() );
      container.appendChild(button);
    }
  }

  function genDialogContainer() {

  }

  function genRightBtnContainer() {
    let container = document.querySelector('.right-btn-container');
    
    for(i = 4; i < 8; i++) {
      let button = document.createElement('button');
      let buttonName = CharObj.actions[i].name;
      let buttonAction = CharObj.actions[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn')
      button.addEventListener('click', (event) => buttonAction() );
      container.appendChild(button);
    }
  }

  function genViewContainer() {

  }

  genLeftContainer();
  genHeaderContainer();
  genRightContainer();
  genLeftBtnContainer();
  genDialogContainer();
  genRightBtnContainer();
  genViewContainer();
}

genGame();

document.querySelector('.healthBar').style.width = '50%';