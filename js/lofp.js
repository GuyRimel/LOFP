let GameObj = {
  config: {
    
  },
  
  time: {
    season: ['spring', 'summer', 'fall', 'winter'],
    day: 1,
    daysPerSeason: 10,
    year: 1750,
    minute: 900,
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
    { name: 'journal', perform: journal },
    { name: 'look', perform: look },
    { name: 'inv.', perform: inventory },
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

function look() {

}

function fight() {

}

function selectTool() {

}

function inventory() {

}

function journal() {

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

  if(minute === 0){ minute = '00'; }

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

  // the right container is toggled to show the journal or inventory
  function genRightContainer() {

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
  genRightContainer();
  genLeftBtnContainer();
  genDialogContainer();
  genRightBtnContainer();
  genViewContainer();
}

genGame();
GameObj.update();
