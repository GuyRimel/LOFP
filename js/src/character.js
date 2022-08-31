
let Character = {
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
    health: 10,
    stamina: 50,
    accuracy: 50,
    power: 50,
    luck: 50
  },
  
  changeStat: (stat, amount) => {
    Character.stats[stat] += amount;
    let statValue = Character.stats[stat];
    if(statValue > 100) {
      Character.stats[stat] = 100;
      statValue = 100;
    }
    if(statValue < 0) {
      Character.stats[stat] = 0;
      statValue = 0
    }

    let statBar = document.querySelector(`.${stat}-bar`);
    let statSpan = statBar.previousElementSibling;
    statSpan.innerText = statValue;
    statBar.style.width = `${statValue}%`;
    
    if(Character.stats.health <= 0) { return Character.death(); }
    if(Character.stats.stamina <= 0) { return Character.exhausted(); }
  },
  
  death: function() {
    Character.isDead = false;
    document.querySelector('.view-container').style.backgroundColor = 'darkred';
    Game.dialog.say(`YOU DIED.............`, 60);
  },
  
  exhausted: function() {
    Character.isExhausted = true;
    Game.dialog.say(`You are exhausted! Eat or sleep!`, 20, 1);
  },
  
  update: () => {
    let statNameArray = Object.keys(Character.stats);
    for(i=0; i < statNameArray.length; i++) {
      Character.changeStat(statNameArray[i], 0);
    }
  }
};
