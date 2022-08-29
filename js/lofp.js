let Game = {
  config: {
    
  },
  
  time: {
    season: 'spring',
    day: 1,
    daysPerSeason: 10,
    year: 1750,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,

    dayStart: function dayStart() {
      Character.isAsleep = false;
      Character.changeStat('health', 20);
      Character.stats.health = 100;
      document.querySelector('.view-container').style.backgroundColor = 'skyblue';
      Game.time.day++;
      Game.time.minute = 0;
      Game.dialog.setDialog('Goodmorning!', 60);
    },
    
    dayEnd: function dayEnd() {
      Character.isAsleep = true;
      document.querySelector('#btn2').innerText = "Wake";
      document.querySelector('.view-container').style.backgroundColor = 'darkblue';
      Game.dialog.setDialog('Goodniiiight... zzz...', 60);
    },
    
    changeTime: function changeTime(amount) {
      let time = Game.time.minute;
      time += amount;
      let timeElement = document.querySelector('.time');
      let timeBar = document.querySelector('.time-bar');
      // set the timeBarWidth to a percentage of time remaining in the day
      let timeBarWidth = 100 - (Game.time.minute / Game.time.minutesPerDay * 100);
      timeBar.style.width = timeBarWidth + '%';

      let hour = Game.time.wakeHour + Math.floor(time / 60);
      let minute = time % 60;
      if(minute < 10){ minute = '0' + minute; }
      let suffix;
      
      if(hour >= 12) {
        hour -= 12;
        suffix = 'pm';
      }else{
        suffix = 'am'
      }
      
      let timeString = `${hour}:${minute} ${suffix}`;
      timeElement.innerText = timeString;
  
      if (Game.time.minute >= Game.time.minutesPerDay) {
        Game.time.dayEnd();
      }
    },

    changeDate: function changeDate(days){
      let dateElement = document.querySelector('.date');
      let season = Game.time.season;
      let day = Game.time.day += days;
      let year = Game.time.year;
      let dateString = `${season} ${day}, ${year}`;
      dateElement.innerText = dateString;
    }
  },

  dialog: {
    setDialog: function setDialog(text) {
      document.querySelector('.dialog-container').innerText = text;
    },

    sayDialog: function sayDialog(text, rate) {
      let container = document.querySelector('.dialog-container');
      container.innerText = ``;
      let i = 0;
      let interval = setInterval(sayLetter, rate);

  
      function sayLetter() {
        if(i > text.length){
          clearInterval(interval);
        }
        if(text.charAt(i) === ' '){
          let spaceChar = '\xa0';
          container.innerText += spaceChar;
          i++;
        }else{
          container.innerText += text.charAt(i);
          i++
        }
      }
    }
  },

  update: () => {}
};

let Character = {
  isAlive: true,
  isAsleep: false,
  stats: {
    health: 10,
    stamina: 50,
    accuracy: 50,
    power: 50,
    luck: 50
  },

  changeStat: (stat, amount) => {
    if(Character.isAsleep || !Character.isAlive){return};
    let statBar = document.querySelector(`.${stat}-bar`);
    let statSpan = statBar.previousElementSibling;
    let statValue = Character.stats[stat];

    statValue += amount;
    statSpan.innerText = statValue;

    if(statValue < 0) {statBar.style.width = '0%'};
    if(statValue > 100) {statBar.style.width = '100%'};
    statBar.style.width = Character.stats[stat] + '%';
  },

  actions: [
    { name: 'eat', perform: eat },
    { name: 'nap', perform: nap },
    { name: 'think', perform: think },
    { name: 'rage', perform: rage },

    { name: 'tool', perform: selectTool },
    { name: 'inv.', perform: inventory },
    { name: 'look', perform: look },
    { name: 'journal', perform: journal },

    { name: 'wake', perform: wake },
  ],

  inventory: [],

  update: function update() {},

  death: function() {
    this.isAlive = false;
    document.querySelector('.view-container').style.backgroundColor = 'darkred';
    Game.dialog.sayDialog(`YOU DIED.............`, 60);
  }
};


let dialogContainer = document.querySelector('.dialog-container');

function eat() {
  Character.changeStat('health', 10);
  Character.changeStat('stamina', 5);
  
  if(!Character.isAsleep){
    Game.dialog.sayDialog('munch, munch - *BURP');
  }
}

function nap() {
  if(Character.isAsleep){
    return wake();
  }
}

function wake() {
  Game.time.dayStart();
  document.querySelector('#btn2').innerText = "nap";
}

function think() {
  Character.changeStat('stamina', -1);
  Character.changeStat('accuracy', 10);
  Character.changeStat('power', -10);
  Game.update();
}

function rage() {
  Character.changeStat('stamina', -3);
  Character.changeStat('accuracy', -10);
  Character.changeStat('power', 10);
  Game.update();
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

// genGame is composed of generating each html container contents
function genGame() {
  // the left container is for Stats
  function genLeftContainer() {
    let leftContainer = document.querySelector('.left-container');
    let statsList = Object.keys(Character.stats);
    
    for (i = 0; i < statsList.length; i++) {
      let statContainer = document.createElement('div');
      let statBarElement = document.createElement('div');
      let statNameElement = document.createElement('strong');
      let statValueElement = document.createElement('span');
      let statName = statsList[i];
      console.log(statName);

      statNameElement.innerText = statName;
      statValueElement.innerText = Character.stats[statName];
      statContainer.classList.add('statContainer');
      statBarElement.classList.add('stat-bar');
      statBarElement.classList.add(`${statName}-bar`);

      statContainer.appendChild(statNameElement);
      statContainer.appendChild(statValueElement);
      statContainer.appendChild(statBarElement);
      leftContainer.appendChild(statContainer);
    }
  }

  // the header container is for time display
  function genHeaderContainer() {
    let container = document.querySelector('.header-container');
    let timeDateContainer = document.createElement('div');
    let timeElement = document.createElement('div');
    let dateElement = document.createElement('div');
    let timeBar = document.createElement('div');
    
    timeElement.classList.add('time');
    dateElement.classList.add('date');
    timeBar.classList.add('time-bar');
    timeDateContainer.classList.add('time-date-container');
    timeDateContainer.appendChild(timeElement);
    timeDateContainer.appendChild(dateElement);
    container.appendChild(timeDateContainer);
    container.appendChild(timeBar);
    Game.time.changeTime(0);
    Game.time.changeDate(0);
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
      let buttonName = Character.actions[i].name;
      let buttonAction = Character.actions[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn');
      button.id = `btn${i+1}`;
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
      let buttonName = Character.actions[i].name;
      let buttonAction = Character.actions[i].perform;

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
Character.update();