let Character = {
  name: "Francis",
  xpTilLevelup: 1000,
  isDead: false,
  isAsleep: false,
  isExhausted: false,
  isBusy: false,
  snoozes: 0,
  snoozeDuration: 30,
  
  stats: {
    level: 1,
    xp: 0,
    health: 10,
    stamina: 10,
    skill: 10,
    power: 10,
    agility: 10
  },
  
  statMaximums: {
      levelMax: 20,
      xpMax: 10,
      healthMax: 10,
      staminaMax: 10,
      skillMax: 10,
      powerMax: 10,
      agilityMax: 10,
  },

  resources: {
    food: 0,
    water: 0,
    fiber: 0,
    wood: 0,
    stone: 0,
    gold: 0
  },

  inventory: [
    { apples: 3 },
    { oranges: 5 }
  ],

  isAble: () => {
    if(
      Character.isDead ||
      Character.isAsleep ||
      Character.isBusy ||
      Character.isExhausted ||
      Game.isConversing
    ){ return false }
    else{ return true }
  },

  checkup() {
    if(Character.isDead || Character.stats.health <= 0) { 
      return Character.death();
    } if(Character.isExhausted || Character.stats.stamina <= 0) { 
      return Character.exhausted();
    } if(Character.isAsleep && Character.snoozes === 0) {
      return Game.ask(1);
    } else if(Character.isAsleep && Character.snoozes < 3) {
      return Game.ask(2);
    } else if(Character.isAsleep && Character.snoozes >= 3){
      return Game.ask(3);
    }
  },

  // this is meant to take corresponding ARRAYS
  changeStats: (stats, amounts) => {
    stats.forEach( (stat, i) => {
      let amount = amounts[i];
      Character.changeStat(stat, amount);
    })
  },
  
  changeStat: (stat, amount) => {
    if(!Character.isAble) return;
    Character.isBusy = true;
    Character.stats[stat] += amount;
    let statValue = Character.stats[stat];
    let statMax = Character.statMaximums[`${stat}Max`];

    if(statValue < 0) {
      statValue = 0;
      Character.stats[stat] = 0;
    } else if(statValue > statMax) {
      statValue = statMax;
      Character.stats[stat] = statMax;
    }
        
    let
    percentFull = statValue / statMax * 100,
    statBar = document.querySelector(`.${stat}-bar`),
    statSpan = statBar.previousElementSibling,
    statSpreadList = [ 'health', 'stamina', 'xp'],
    statSpread;

    statSpan.innerText = statValue;
    statBar.style.width = `${percentFull}%`;
        
    if(statSpreadList.includes(stat)) {
      statSpread = document.querySelector(`.stats-spread .${stat}-bar`);
      statSpread.style.width = `${percentFull}%`;
    }
    
    Character.isBusy = false;
    Character.checkup();
  },

  say: function say(text, rate, emotion) {
    let
      dialogElement = document.querySelector('.dialog'),
      mouth = document.querySelector('.character-mouth'),
      eyeballs = document.querySelector('.character-eyeballs'),
      eyes = document.querySelector('.character-eyes'),
      brows = document.querySelector('.character-brows'),
      iterate = setInterval(sayChar, rate),
      i = 0,
      ii = 0,
      spaceChar = "\xa0";

    function normalEyes() {
      eyes.setAttribute('src', 'img/character/eyes0.png');
    }

    function excited() {
      mouth.setAttribute('src', 'img/character/mouth7.png');
      eyes.setAttribute('src', 'img/character/eyes3.png');
    }

    function exhausted() {
      mouth.setAttribute('src', 'img/character/mouth5.png');
      eyeballs.setAttribute('src', 'img/character/eyeballs1.png');
      eyes.setAttribute('src', 'img/character/eyes1.png');
    }

    function emote() {
      switch(emotion) {
        case "excited":
          excited();
          setTimeout(normalEyes, 600);
          break;
        case 'exhausted':
          exhausted();
          break;
      }
    }

    Game.shush('.dialog');
    emote();
    
    function sayChar() {
      Character.isBusy = true;
      let char = (text.charAt(i) === " ") ? spaceChar : text.charAt(i);
      dialogElement.innerText += char;
      if(i%2 == 0) {
        mouth.setAttribute('src', `img/character/mouth${ii%4}.png`);
        if(ii%4 === 0) emote();
        ii++
      }
      i++;
      
      if (i >= text.length) {
        clearInterval(iterate);
        Character.isBusy = false;
        if(emotion) {
          emote();
        } else {
          setTimeout(Character.face.reset, 300);
        }
      }
    }
  },

  answerQuestion: (i) => {
    if(Game.isConversing) return;
    Game.questions[Game.currentQuestion].responses[i]();
    let choiceContainer = document.querySelector('.choices');
    choiceContainer.classList.add('hide');
  },
  
  exhausted: () => {
    Character.isExhausted = true;
    Game.converse(
      '*huff *huff... UUUGHH...',
      'You are exhausted! Eat or drink!',
      2000,
      'exhausted'
    )
  },
  
  death: () => {
    Character.isDead = true;
    Game.shush();
    document.querySelector('.sky-front').style.backgroundColor = 'darkred';
    Game.say(`YOU DIED.............`, 60);
  },
  
  update: () => {
    let statNameArray = Object.keys(Character.stats);
    for(i=0; i < statNameArray.length; i++) {
      Character.changeStat(statNameArray[i], 0);
    }
    Character.checkup();

    Character.face.reset();



  },

  face: {
    reset: () => {
    document.querySelector('.character-body').setAttribute('src', 'img/character/body0.png');
    document.querySelector('.character-head').setAttribute('src', 'img/character/head1.png');
    document.querySelector('.character-mouth').setAttribute('src', 'img/character/mouth0.png');
    document.querySelector('.character-eyeballs').setAttribute('src', 'img/character/blank.png');
    document.querySelector('.character-eyes').setAttribute('src', 'img/character/eyes0.png');
    document.querySelector('.character-brows').setAttribute('src', 'img/character/blank.png');
    },

    strain: () => {
      
    }
  }
};