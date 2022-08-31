let Actions = (function() {
  let dialogContainer = document.querySelector('.dialog-container');
  let btnArray = [
    { name: 'eat', perform: eat },
    { name: 'nap', perform: nap },
    { name: 'think', perform: think },
    { name: 'rage', perform: rage },

    { name: 'tool', perform: selectTool },
    { name: 'inv.', perform: inventory },
    { name: 'look', perform: look },
    { name: 'journal', perform: journal },

    { name: 'sleep', perform: sleep },
  ];

  function eat() {
    console.log('eating');
    if(!Character.isAlive || Character.isBusy || Character.isAsleep) {return}
    Game.time.changeTime(30);
    Character.changeStat('health', 10);
    Character.changeStat('stamina', 5);
    Game.dialog.say('munch, munch - *BURP');
  }
  
  function nap() {
    if(Character.isAsleep){
      return sleep();
    }else if(Character.isAlive && !Character.isBusy){
      Game.time.changeTime(30);
      Game.dialog.say('zzz...', 60);
    }
  }

  function sleep() {
    if(!Character.isAlive || Character.isBusy) {return}
    Character.isAsleep = false;
    Game.time.dayStart();
    document.querySelector('#btn2').innerText = "nap";
  }
  
  function think() {
    if(!Character.isAlive || Character.isBusy || Character.isAsleep) {return}
      Character.changeStat('stamina', -1);
      Character.changeStat('accuracy', 10);
      Character.changeStat('power', -10);
  }
  
  function rage() {
    if(!Character.isAlive || Character.isBusy || Character.isAsleep) {return}
      Character.changeStat('stamina', -3);
      Character.changeStat('accuracy', -10);
      Character.changeStat('power', 10);
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

  return {
    btnArray: btnArray,
  }

})();
