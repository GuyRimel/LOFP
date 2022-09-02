
let Character = {
  name: "Francis",
  level: 1,
  isDead: false,
  isAsleep: false,
  isBusy: false,
  isExhausted: false,
  isAble: () => {
    if(
      Character.isDead ||
      Character.isAsleep ||
      Character.isBusy ||
      Character.isExhausted
    ){ return false }
    else{ return true }
  },
  stats: {
    exp: 0,
    health: 10,
    stamina: 50,
    skill: 50,
    power: 50,
    luck: 50
  },
  
  // this is meant to take corresponding ARRAYS
  changeStats: (stats, amounts) => {
    stats.forEach( (stat, amount) => {
      Character.stats[stat] += amounts[amount];

      let statValue = Character.stats[stat];
      let statBar = document.querySelector(`.${stat}-bar`);
      let statSpan = statBar.previousElementSibling;

      if(statValue > 100) {
        Character.stats[stat] = 100;
        statValue = 100;
      }
      if(statValue < 0) {
        Character.stats[stat] = 0;
        statValue = 0
      }

      statSpan.innerText = statValue;
      statBar.style.width = `${statValue}%`;
    });
    
    if(Character.stats.health <= 0) { return Character.death(); }
    if(Character.stats.stamina <= 0) { return Character.exhausted(); }
    else{ Character.isExhausted = false; }
  },
  
  changeStat: (stat, amount) => {
    Character.changeStats([stat], [amount]);
  },

  say: function say(text, rate) {
    let dialogElement = document.querySelector('.dialog');
    Game.shush();
    
    let iterate = setInterval(sayChar, rate);
    let i = 0;
    let spaceChar = "\xa0";
    
    function sayChar() {
      Character.isBusy = true;
      let char = (text.charAt(i) === " ") ? spaceChar : text.charAt(i);
        dialogElement.innerText += char;
        i++;
        
      if (i >= text.length) {
        clearInterval(iterate);
        Character.isBusy = false;
      }
    }
  },

  answerQuestion: (i) => {
    Game.questions[Game.currentQuestion].responses[i]();
    let choiceContainer = document.querySelector('.choices');
    choiceContainer.classList.add('hide');
  },
  
  exhausted: function() {
    Character.isExhausted = true;
    Game.say(`You are exhausted! Eat or drink!`, 20);
    Character.say(`*huff *huff... UUUGHH...`, 50);
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