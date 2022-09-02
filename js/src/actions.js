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

  // with these actions order matters
  // first, cure status ailments (if applicable)
  // then, short circuit if the game is conversing or 
  function eat() {
    Character.isExhausted = false;
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }

    Game.time.changeTime(30);
    let stats = ['health', 'stamina'];
    let amounts = [8, 2];
    Character.changeStats(stats, amounts);
    Game.converse(
      'munch, munch - *BURP',
      'you snack on food...',
      300
    );
  }
  
  function drink() {
    Character.isExhausted = false;
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }

    Game.time.changeTime(30);
    Character.changeStat('stamina', 10);
    Game.converse(
      '*gulp *gulp - hah!',
      'you drink a cool refreshment...',
      300
    );
  }
  
  function think() {
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }
    
    let stats = ['stamina', 'skill', 'power']
    let amounts = [-2, 5, -5];
    Character.changeStats(stats, amounts);
    
    Game.time.changeTime(500);
    if(Character.isAsleep) { return }

    Game.converse(
      'hmm... carry the three... then, express the derivative..',
      'you are thinking...',
      1500
      );
  }
  
  function look() {
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }
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
  
  // snooze and dream are available if Character.isAsleep = true
  function snooze() {
    Character.snoozes ++;
    Character.changeStat('health', 3);
    Game.time.changeTime(30);
    setTimeout( Character.checkup, 1000);
  }
  
  function dream() {
    Character.snoozes ++;
    Character.changeStat('luck', 3);
    Game.time.changeTime(30);
    setTimeout( Character.checkup, 1000);
  }

  return {
    btnArray: btnArray,
    snooze: snooze,
    dream: dream
  }

})();
