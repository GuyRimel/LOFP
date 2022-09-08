let Actions = (function() {
  // genGame generates the 8 buttons from this array - ORDER MATTERS
  let btnArray = [
    // i 0, 1, 2, 3 are the left buttons
    { name: 'eat', perform: eat },
    { name: 'explore', perform: explore },
    { name: 'drink', perform: drink },
    { name: 'look', perform: look },

    // i 4, 5, 6, 7 are the right buttons
    { name: 'equip', perform: showEquip },
    { name: 'gear', perform: gear },
    { name: 'items', perform: inventory },
    { name: 'journal', perform: journal },

    { name: 'SP', perform: skillMove },
    { name: 'ATK', perform: attackMove }
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
    let amounts = [2, 1];
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
    Character.changeStat('stamina', 2);
    Game.converse(
      '*gulp *gulp - hah!',
      'you drink a cool refreshment...',
      300
    );
  }
  
  function explore() {
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }
    
    let stats = ['stamina', 'skill', 'power']
    let amounts = [-2, 2, -2];
    Character.changeStats(stats, amounts);
    
    Game.time.changeTime(500);
    if(Character.isAsleep) { return }

    Game.converse(
      'hmm... carry the three... then, express the derivative, and carry the seven...',
      'you are thinking...',
      1500
      );
  }
  
  function look() {
    Character.checkup();
    if(Game.isConversing || !Character.isAble()) { return }
    Game.ask(0);
  }
  
  function showEquip() {
    document.querySelector('.utility-container').classList.remove('hide');
    document.querySelector('.equipment-container').classList.remove('hide');
    document.querySelector('.journal-container').classList.add('hide');
    document.querySelector('.inventory-container').classList.add('hide');
    document.querySelector('.stats-container').classList.add('hide');
  }
  
  function inventory() {
    document.querySelector('.utility-container').classList.remove('hide');
    document.querySelector('.inventory-container').classList.remove('hide');
    document.querySelector('.equipment-container').classList.add('hide');
    document.querySelector('.journal-container').classList.add('hide');
    document.querySelector('.stats-container').classList.add('hide');
  }
  
  function gear() {
    
  }
  
  function journal() {
    document.querySelector('.utility-container').classList.remove('hide');
    document.querySelector('.journal-container').classList.remove('hide');
    document.querySelector('.equipment-container').classList.add('hide');
    document.querySelector('.inventory-container').classList.add('hide');
    document.querySelector('.stats-container').classList.add('hide');
  }

  function showStats() {
    document.querySelector('.utility-container').classList.remove('hide');
    document.querySelector('.stats-container').classList.remove('hide');
    document.querySelector('.equipment-container').classList.add('hide');
    document.querySelector('.journal-container').classList.add('hide');
    document.querySelector('.inventory-container').classList.add('hide');
  }

  function closeUtility() {
    document.querySelector('.utility-container').classList.add('hide');
  }

  function skillMove() {
    console.log('skillMove')
  }

  function attackMove() {
    console.log('attackMove')
  }

  function wake() {
    Game.time.dayStart()
    let snoozeModifier = Character.snoozes * Character.snoozeDuration;
    Game.time.changeTime(snoozeModifier);
    Character.changeStats(['health', 'stamina'], [3, 3]);
    Character.isAsleep = false;
    Character.snoozes = 0;

    Game.converse(
      '*ssttreeetch... *sips coffee* ...',
      "Goodmorning!",
      500);
  }
  
  // snooze and dream are available if Character.isAsleep = true
  function snooze() {
    if(Character.snoozes === 0) {
      Game.time.dayStart(); }
    Character.snoozes ++;
    Character.changeStats(['health', 'stamina'], [2, 2]);
    Game.time.changeTime(Character.snoozeDuration);
    Game.say('you snooze...');
    setTimeout( Character.checkup, 1000);
  }
  
  function dream() {
    if(Character.snoozes === 0) {
      Game.time.dayStart(); }
    Character.snoozes ++;
    Character.changeStats(['luck', 'stamina'], [2, 2]);
    Game.time.changeTime(Character.snoozeDuration);
    Game.say('you keep dreaming...');
    setTimeout( Character.checkup, 1000);
  }

  return {
    btnArray: btnArray,
    wake: wake,
    snooze: snooze,
    dream: dream,
    showStats: showStats,
    closeUtility: closeUtility
  }

})();
