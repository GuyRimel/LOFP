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

  say: function say(text, rate) {
    let
      dialogElement = document.querySelector('.dialog'),
      charImg = document.querySelector('.character-img'),
      iterate = setInterval(sayChar, rate),
      i = 0,
      spaceChar = "\xa0";

      Game.shush('.dialog');
      charImg.setAttribute('src', 'img/char.talking.gif');
    
    function sayChar() {
      Character.isBusy = true;
      let char = (text.charAt(i) === " ") ? spaceChar : text.charAt(i);
      dialogElement.innerText += char;
      i++;
      
      if (i >= text.length) {
        clearInterval(iterate);
        Character.isBusy = false;
        charImg.setAttribute('src', 'img/char.gif');
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
      2000
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

    
  }
};