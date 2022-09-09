
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
    luck: 10
  },
  
  statMaximums: {
      levelMax: 20,
      xpMax: 10,
      healthMax: 10,
      staminaMax: 10,
      skillMax: 10,
      skillMax: 10,
      powerMax: 10,
      luckMax: 10,
    },

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
    if(Character.isDead) { return Character.death(); }
    if(Character.isExhausted) { return Character.exhausted(); }
    if(Character.isAsleep) {
      if(Character.snoozes === 0) { return Game.ask(1); }
      if(Character.snoozes < 3) { return Game.ask(2); }
      else{ return Game.ask(3); }
    }
  },

  // this is meant to take corresponding ARRAYS
  changeStats: (stats, amounts) => {
    let statSpreadList = [ 'health', 'stamina', 'xp']
    stats.forEach( (stat, amount) => {
      Character.stats[stat] += amounts[amount];

      let statValue = Character.stats[stat];
      let statMax = Character.statMaximums[`${stat}Max`];
      let statBar = document.querySelector(`.${stat}-bar`);
      let statSpread;
      
      let statSpan = statBar.previousElementSibling;
      
      if(statValue > statMax) {
        Character.stats[stat] = statMax;
        statValue = statMax;
      }
      if(statValue < 0) {
        Character.stats[stat] = 0;
        statValue = 0
      }
      
      let percentFull = statValue / statMax * 100;
      statSpan.innerText = statValue;
      statBar.style.width = `${percentFull}%`;
      
      if(statSpreadList.includes(stat)) {
        statSpread = document.querySelector(`.stats-spread .${stat}-bar`);
        statSpread.style.width = `${percentFull}%`;
      }
    
    (Character.stats.health <= 0) ?
      Character.isDead = true : Character.isDead = false;
    (Character.stats.stamina <= 0) ?
      Character.isExhausted = true : Character.isExhausted = false;
    })
  },
  
  changeStat: (stat, amount) => {
    Character.changeStats([stat], [amount]);
  },

  say: function say(text, rate) {
    let
      dialogElement = document.querySelector('.dialog'),
      charImg = document.querySelector('.character-img'),
      iterate = setInterval(sayChar, rate),
      i = 0,
      spaceChar = "\xa0";

      Game.shush('.dialog');
      charImg.setAttribute('src', './../../img/char.talking.gif');
    
    function sayChar() {
      Character.isBusy = true;
      let char = (text.charAt(i) === " ") ? spaceChar : text.charAt(i);
      dialogElement.innerText += char;
      i++;
      
      if (i >= text.length) {
        clearInterval(iterate);
        Character.isBusy = false;
        charImg.setAttribute('src', './../../img/char.gif');
      }
    }
  },

  answerQuestion: (i) => {
    Game.questions[Game.currentQuestion].responses[i]();
    let choiceContainer = document.querySelector('.choices');
    choiceContainer.classList.add('hide');
  },
  
  exhausted: function() {
    Game.converse(
      '*huff *huff... UUUGHH...',
      'You are exhausted! Eat or drink!',
      2000
    )
  },
  
  death: function() {
    Character.isDead = false;
    document.querySelector('.view-container').style.backgroundColor = 'darkred';
    Game.say(`YOU DIED.............`, 60);
  },
  
  update: () => {
    let statNameArray = Object.keys(Character.stats);
    for(i=0; i < statNameArray.length; i++) {
      Character.changeStat(statNameArray[i], 0);
    }
  }
};