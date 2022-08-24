let GameObj = {
  config: {
    
  },
  
  time: {
    season: ['spring', 'summer', 'fall', 'winter'],
    day: 1,
    daysPerSeason: 10,
    year: 1750,
    minute: 301,
    minutesPerDay: (16 * 60), // 960 minutes per day is how the game reckons
    wakeHour: 6,
    sleepHour: 22
  },
  
  update: function () {
    console.log('game update');
    let timeBarWidth = 100 - (GameObj.time.minute / GameObj.time.minutesPerDay * 100);
    document.querySelector('.health-bar').style.width = '50%';
    document.querySelector('.time-bar').style.width = timeBarWidth + '%';
  }
  
};

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

    { name: 'tool', perform: selectTool },
    { name: 'inv.', perform: inventory },
    { name: 'look', perform: look },
    { name: 'journal', perform: journal }
  ],

  inventory: [],

  update: function () {
    console.log('character update')
  }
};


let dialogContainer = document.querySelector('.dialog-container');

function eat() {
  dialogContainer.innerText = 'munch munch munch';
}

function nap() {
  console.log('nap');
}

function think() {

}

function rage() {

}

function selectTool() {

}

function inventory() {
  document.querySelector('.journal-container').classList.add('hide');
  document.querySelector('.inventory-container').classList.remove('hide');
}

function look() {

}

function journal() {
  document.querySelector('.inventory-container').classList.add('hide');
  document.querySelector('.journal-container').classList.remove('hide');
}

function convertTime(time) {
  let hour = GameObj.time.wakeHour + Math.floor(time / 60);
  let minute = time % 60;
  let suffix;

  if(hour >= 12) {
    hour -= 12;
    suffix = 'pm';
  }else{
    suffix = 'am'
  }

  if(minute < 10){ minute = '0' + minute; }

  let timeString = `${hour}:${minute} ${suffix}`;

  return timeString;
}

// genGame is composed of generating each html container contents
function genGame() {
  // the left container is for Stats
  function genLeftContainer() {
    let leftContainer = document.querySelector('.left-container');
    let statsLength = Object.keys(CharObj.stats).length;

    for (i = 0; i < statsLength; i++) {
      let statContainer = document.createElement('div');
      let statBar = document.createElement('div');
      let stat = CharObj.stats[i];

      statContainer.innerText = stat.name;
      statContainer.classList.add('statContainer');
      statBar.classList.add('stat-bar');
      statBar.classList.add(`${stat.name}-bar`);
      statBar.style.backgroundColor = stat.color;

      statContainer.appendChild(statBar);
      leftContainer.appendChild(statContainer);
    }
  }

  // the header container is for time display
  function genHeaderContainer() {
    let container = document.querySelector('.header-container');
    let timeBar = document.createElement('div');
    time = convertTime(GameObj.time.minute);

    timeBar.classList.add('time-bar');
    container.innerText = time;
    container.appendChild(timeBar);
  }

  function genFunctionBtnContainer() {
    let container = document.querySelector('.function-btn-container');
    let configBtn = document.createElement('div');
    let homeBtn = document.createElement('div');
    let infoBtn = document.createElement('div');

    configBtn.innerText = 'Cfg';
    homeBtn.innerText = 'Home';
    infoBtn.innerText = '?';

    container.appendChild(configBtn);
    container.appendChild(homeBtn);
    container.appendChild(infoBtn);
  }

  // the right container is toggled to show the journal or inventory
  function genRightContainer() {
    let container = document.querySelector('.right-container');
    let journalContainer = document.createElement('div');
    let inventoryContainer = document.createElement('div');

    journalContainer.classList.add('journal-container');
    journalContainer.innerText = 'this is the journal';
    inventoryContainer.classList.add('inventory-container', 'hide');
    inventoryContainer.innerText = 'this is the inventory';

    container.appendChild(journalContainer);
    container.appendChild(inventoryContainer);
  }

  // left btn container is static "eat" "nap" "think" "rage"
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

  // also displays interactive feedback 
  function genDialogContainer() {

  }

  // the right btn container is "tool" "journal" "look" "inventory"
  // "tool" is contextual to the current equipped tool
  // "look" asks "Look for what?" "a fight!", "supplies...", "answers..."
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

  /* the view container is the big middle screen, here is where things will appear after an action is performed.
  for example, after performing "fish" a fish image would pop up and the dialog would describe the result of the fish action */
  function genViewContainer() {

  }

  genLeftContainer();
  genHeaderContainer();
  genFunctionBtnContainer();
  genRightContainer();
  genLeftBtnContainer();
  genDialogContainer();
  genRightBtnContainer();
  genViewContainer();
}

genGame();
GameObj.update();
