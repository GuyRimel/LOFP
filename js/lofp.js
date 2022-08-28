let Game = {
  config: {
    
  },
  
  time: {
    season: ['spring', 'summer', 'fall', 'winter'],
    day: 1,
    daysPerSeason: 10,
    year: 1750,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,

    dayStart: function dayStart() {
      Character.isAsleep = false;
      Character.stats[1].value = 100;
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
    
    convertTime: function convertTime(time) {
      let hour = Game.time.wakeHour + Math.floor(time / 60);
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
    },
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

  update: () => {
    let time = document.querySelector('.time');
    let timeBar = document.querySelector('.time-bar');
    // set the timeBarWidth to a percentage of time remaining in the day
    let timeBarWidth = 100 - (Game.time.minute / Game.time.minutesPerDay * 100);

    time.innerText = Game.time.convertTime(Game.time.minute);
    timeBar.style.width = timeBarWidth + '%';

    if (Game.time.minute >= Game.time.minutesPerDay) {
      Game.time.dayEnd();
    }
  }
};

let Character = {
  isAlive: true,
  isAsleep: false,
  stats: [
    { name: 'health', value: 10, color: 'red' },
    { name: 'stamina', value: 50, color: 'lime' },
    { name: 'accuracy', value: 50, color: 'turquoise' },
    { name: 'power', value: 50, color: 'purple' },
    { name: 'luck', value: 50, color: 'orange' },
  ],

  changeStat: (stat, amount) => {
    let statName = Character.stats[stat].name;
    let statBar = document.querySelector(`.${statName}-bar`);
    let statNumber = statBar.previousElementSibling;

    Character.stats[stat].value += amount;
    statBar.style.width = Character.stats[stat].value + '%';
    statNumber.innerText = Character.stats[stat].value;
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

  update: function update() {
    Character.stats.forEach(stat => {
      let statBar = document.querySelector(`.${stat.name}-bar`);
      let statNumber = statBar.previousElementSibling;
      if(stat.value > 100){stat.value = 100};
      statBar.style.width = `${stat.value}%`;
      statNumber.innerText = stat.value;
    });
    if(Character.stats[0].value <= 0) {
      Character.death();
    };
  },

  death: function() {
    this.isAlive = false;
    document.querySelector('.view-container').style.backgroundColor = 'darkred';
    Game.dialog.sayDialog(`YOU DIED.............`, 60);
  }
};


let dialogContainer = document.querySelector('.dialog-container');

function eat() {
  Character.changeStat(0, 10);
  Character.changeStat(1, 5);
  Game.time.minute += 30;
  Character.update();
  Game.update();

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
  Character.changeStat(1, -1);
  Character.changeStat(2, 10);
  Character.changeStat(3, -10);
  Game.update();
}

function rage() {
  Character.changeStat(1, -3);
  Character.changeStat(2, -10);
  Character.changeStat(3, 10);
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
    let statsLength = Object.keys(Character.stats).length;

    for (i = 0; i < statsLength; i++) {
      let statContainer = document.createElement('div');
      let statBar = document.createElement('div');
      let statName = document.createElement('strong');
      let statValue = document.createElement('span');
      let stat = Character.stats[i];

      statName.innerText = stat.name;
      statValue.innerText = stat.value;
      statContainer.classList.add('statContainer');
      statBar.classList.add('stat-bar');
      statBar.classList.add(`${stat.name}-bar`);
      statBar.style.backgroundColor = stat.color;

      statContainer.appendChild(statName);
      statContainer.appendChild(statValue);
      statContainer.appendChild(statBar);
      leftContainer.appendChild(statContainer);
    }
  }

  // the header container is for time display
  function genHeaderContainer() {
    let container = document.querySelector('.header-container');
    let time = document.createElement('div');
    let timeBar = document.createElement('div');
    time.innerText = Game.time.convertTime(Game.time.minute);

    timeBar.classList.add('time-bar');
    time.classList.add('time');
    container.appendChild(time);
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
Game.update();
Character.update();