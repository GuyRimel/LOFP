
let Character = {
  isAlive: true,
  isAsleep: false,
  isBusy: false,
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
    let statBar = document.querySelector(`.${stat}-bar`);
    let statSpan = statBar.previousElementSibling;
    statSpan.innerText = statValue;
    
    statBar.style.width = `${statValue}%`;
    if(statValue < 0) {
      statBar.style.width = '0%';
    }if(statValue > 100) {
      statBar.style.width = '100%';
    }
    
    if(Character.stats.health <= 0) {
      Character.death();
    };
  },
  
  death: function() {
    this.isAlive = false;
    document.querySelector('.view-container').style.backgroundColor = 'darkred';
    Game.dialog.sayDialog(`YOU DIED.............`, 60);
  },
  
  update: () => {
    let statNameArray = Object.keys(Character.stats);
    for(i=0; i < statNameArray.length; i++) {
      Character.changeStat(statNameArray[i], 0);
    }
  }
};
