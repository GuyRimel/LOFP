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
    if(
      Character.isDead ||
      Character.isAsleep ||
      Character.isBusy) { return }
    Game.time.changeTime(30);
    Character.changeStat('stamina', 2);
    Character.changeStat('health', 8);
    Game.dialog.say('munch, munch - *BURP');
  }
  
  function nap() {
    if(Character.isAsleep) { return sleep(); }
    Game.time.changeTime(30);
    Character.isExhausted = false;
    Character.changeStat('stamina', 10);
    Game.dialog.say('zzz...', 60);
  }
  
  function sleep() {
    document.querySelector('#btn2').innerText = "nap";
    Character.isAsleep = false;
    Game.time.dayStart();
  }
  
  function think() {
    if(!Character.isAble()) { return }
    Character.isExhausted = false;
    Character.changeStat('stamina', -1);
    Character.changeStat('accuracy', 5);
    Character.changeStat('power', -5);
  }
  
  function rage() {
    if(!Character.isAble()) { return }
    Character.changeStat('stamina', -3);
    Character.changeStat('accuracy', -5);
    Character.changeStat('power', 5);
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
