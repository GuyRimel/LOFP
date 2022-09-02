let Actions = (function() {
  // genGame generates the 8 buttons from this array - ORDER MATTERS
  let btnArray = [
    // i 0, 1, 2, 3 are the left buttons
    { name: 'think', perform: think },
    { name: 'look', perform: look },
    { name: 'eat', perform: eat },
    { name: 'drink', perform: drink },

    // i 4, 5, 6, 7 are the right buttons
    { name: 'use', perform: use },
    { name: 'tools', perform: selectTool },
    { name: 'inv.', perform: inventory },
    { name: 'journal', perform: journal }
  ];

  // With these actions order matters - say feedback and dialog THEN "isBusy" = true
  // otherwise isBusy = true will kill the say function

  function eat() {
    if(
      Character.isDead ||
      Character.isAsleep ||
      Character.isBusy) { return }
    Character.say('munch, munch - *BURP', 20);
    Game.time.changeTime(30);
    let stats = ['health', 'stamina'];
    let amounts = [8, 2];
    Character.changeStats(stats, amounts);
  }
  
  function drink() {
    if(
      Character.isDead ||
      Character.isAsleep ||
      Character.isBusy) { return }
    Game.time.changeTime(30);
    Character.changeStat('stamina', 10);
    Character.say('*gulp *gulp - hah!', 20);
  }
  
  function think() {
    if(!Character.isAble()) { return }
    let stats = ['stamina', 'skill', 'power']
    let amounts = [-20, 5, -5];
    Character.changeStats(stats, amounts);
    Game.time.changeTime(100);
  }
  
  function look() {
    if(!Character.isAble()) { return }
    Game.ask(0);
  }
  
  function selectTool() {
    document.querySelector('.journal-container').classList.add('hide');
    document.querySelector('.inventory-container').classList.add('hide');
    document.querySelector('.tools-container').classList.remove('hide');
  }
  
  function inventory() {
    document.querySelector('.journal-container').classList.add('hide');
    document.querySelector('.tools-container').classList.add('hide');
    document.querySelector('.inventory-container').classList.remove('hide');
  }
  
  function use() {
    
  }
  
  function journal() {
    document.querySelector('.inventory-container').classList.add('hide');
    document.querySelector('.tools-container').classList.add('hide');
    document.querySelector('.journal-container').classList.remove('hide');
  }
  
  function snooze() {
    Game.time.snoozes ++;
    setTimeout( () => { Game.time.changeTime(30) }, 2000);
    Character.say('zzzz. . . . .', 100);
  }
  
  function dream() {
    if(Character.isExhausted) { return }
    setTimeout( () => { Game.time.changeTime(30) }, 2000);
    Character.changeStat('luck', 3);
    Character.say('hmmm.. mMMMmm!!!', 100);
  }

  return {
    btnArray: btnArray,
    snooze: snooze,
    dream: dream
  }

})();
