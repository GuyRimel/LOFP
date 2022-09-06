
// genGame is composed of generating each html container contents
let genGame = (function genGame() {
  // the left container is for Stats
  
  function genNameContainer() {
    let container = document.querySelector('.name-container');
    let islandName = document.createElement('div');
    let name = document.createElement('div');
    
    container.appendChild(islandName);
    container.appendChild(name);

    islandName.innerText = Game.currentIslandName;
    islandName.classList.add('islandName');
    islandName.addEventListener('click', (e) => {
      console.log(e.target);
    });
    name.innerText = Character.name;
  }

  function genLeftContainer() {
    let leftContainer = document.querySelector('.left-container');
    let statsList = Object.keys(Character.stats);
    
    for (i = 0; i < statsList.length; i++) {
      let statContainer = document.createElement('div');
      let statBarElement = document.createElement('div');
      let statNameElement = document.createElement('strong');
      let statValueElement = document.createElement('span');
      let statName = statsList[i];

      statNameElement.innerText = statName;
      statValueElement.innerText = Character.stats[statName];
      statContainer.classList.add('bar-container');
      statBarElement.classList.add('bar');
      statBarElement.classList.add(`${statName}-bar`);

      statContainer.appendChild(statNameElement);
      statContainer.appendChild(statValueElement);
      statContainer.appendChild(statBarElement);
      leftContainer.appendChild(statContainer);
    }
  }

  // the header container is for time display
  function genHeaderContainer() {
    let container = document.querySelector('.header-container');
    let weatherTimeDate = document.createElement('div');
    let weather = document.createElement('span');
    let time = document.createElement('span');
    let date = document.createElement('span');
    let timeBar = document.createElement('div');
    time.innerText = Game.time.convertTime(Game.time.minute);

    weatherTimeDate.classList.add('weather-time-date');
    weather.classList.add('weather');
    time.classList.add('time');
    date.classList.add('date');
    timeBar.classList.add('time-bar');

    weatherTimeDate.appendChild(weather);
    weatherTimeDate.appendChild(time);
    weatherTimeDate.appendChild(date);
    container.appendChild(weatherTimeDate);
    container.appendChild(timeBar);
  }

  function genFunctionBtnContainer() {
    let container = document.querySelector('.function-btn-container');
    let configBtn = document.createElement('div');
    let homeBtn = document.createElement('div');
    let infoBtn = document.createElement('div');

    configBtn.innerText = 'Cfg';
    homeBtn.innerText = 'Home';
    infoBtn.innerText = '?';

    container.appendChild(configBtn);
    container.appendChild(homeBtn);
    container.appendChild(infoBtn);
  }

  // the right container is toggled to show the equipment, journal, inventory
  function genUtilityContainer() {
    let container = document.querySelector('.utility-container');

    let inventoryContainer = document.createElement('div');
    
    (function genInventory() {
      for(i=0; i<20; i++){
        let inventoryElement = document.createElement('div');
        let inventoryImg = document.createElement('img');
        let inventoryAmt = document.createElement('span');
  
        inventoryElement.classList.add('invItem', `inv${i}`);
        inventoryElement.addEventListener( 'click', (e) => {
          console.log(e.target);
        });
  
        inventoryImg.src = `..\\..\\img\\inv.gif`;
        inventoryAmt.innerText = i;
        inventoryElement.appendChild(inventoryImg);
        inventoryElement.appendChild(inventoryAmt);
        inventoryContainer.appendChild(inventoryElement);
        container.appendChild(inventoryContainer);
        inventoryContainer.classList.add('inventory-container', 'hide');
      }
    })();
    
    let equipmentContainer = document.createElement('div');

    (function genEquip() {
      for(i=0; i<5; i++){
        let equipmentElement = document.createElement('div');
        let equipmentImg = document.createElement('img');
        let lvlContainer = document.createElement('div');
        let lvlPrefix = document.createElement('span');
        let lvlNumber = document.createElement('span');
        let equipmentName = document.createElement('strong');
        let equipmentBar = document.createElement('div');

        container.appendChild(equipmentContainer);
        equipmentContainer.appendChild(equipmentElement);
        equipmentElement.appendChild(equipmentImg);
        equipmentElement.appendChild(equipmentName);
        equipmentElement.appendChild(lvlContainer);
        equipmentElement.appendChild(equipmentBar);
        lvlContainer.appendChild(lvlPrefix);
        lvlContainer.appendChild(lvlNumber);
  
        equipmentContainer.classList.add('equipment-container', 'bar-container');
        equipmentElement.classList.add('equipItem', `equip${i}`);
        equipmentElement.addEventListener( 'click', (e) => {
          console.log(e.target);
        });
        equipmentImg.src = `..\\..\\img\\inv.gif`;
        equipmentName.innerText = 'fishing-rod';
        lvlPrefix.innerText = 'Level ';
        lvlNumber.innerText = i;
        equipmentBar.classList.add('bar', `equip-bar${i}`);
      }
    })();
    
    let journalContainer = document.createElement('div');

    journalContainer.innerText = 'this is the journal', 'hide';
    journalContainer.classList.add('journal-container', 'hide');
    equipmentContainer.classList.add('equipment-container');
    
    container.appendChild(journalContainer);
    container.appendChild(equipmentContainer);
  }

  // left btn container is usually "eat" "nap" "think" "rage"
  // right btn container is "tool", "inv", "look", "journal"
  function genBtnContainers() {
    let leftBtnContainer = document.querySelector('.left-btn-container');
    let rightBtnContainer = document.querySelector('.right-btn-container');
    let container = leftBtnContainer;

    function genBtns(container, i) {
      let button = document.createElement('button');
      let buttonName = Actions.btnArray[i].name;
      // buttonAction is set to a string from the current index of Actions.btnArray
      let buttonAction = Actions.btnArray[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn');
      button.id = `btn${i}`;
      // now, the buttonAction string becomes the name of a function in the button's eventListener
      // note: #btn4, 5, 6, & 7 remain "selected" once clicked
      button.addEventListener('click', (e) => { 
        buttonAction();
        if(container !== leftBtnContainer) {
          for(i=4; i<8; i++){
            document.querySelector(`#btn${i}`).classList.remove('selected');
          }
          e.target.classList.add('selected');
        }
      });
      container.appendChild(button);
    }

    // the left 
    for(i = 0; i < 8; i++) {
      if(i > 3) { container = rightBtnContainer }
      genBtns(container, i);
    }
  }

  // also displays interactive feedback 
  function genCharacterContainer() {
    let container = document.querySelector('.character-container')
    let charImg = document.createElement('img');
    
    container.appendChild(charImg);
    charImg.classList.add('character-img');
    charImg.setAttribute('src', '..\\..\\img\\char.gif');
    charImg.addEventListener( 'click', (e) => {
      console.log(e.target);
    });
  }

  // also displays interactive feedback 
  function genDialogContainer() {
    let container = document.querySelector('.dialog-container')
    let feedback = document.createElement('div');
    let dialog = document.createElement('div');
    
    feedback.classList.add('feedback');
    dialog.classList.add('dialog');
    container.appendChild(feedback);
    container.appendChild(dialog);
  }

  /* the view container is the big middle screen, here is where things will appear after an action is performed.
  for example, after performing "fish" a fish image would pop up and the dialog would describe the result of the fish action */
  function genViewContainer() {
    let container = document.querySelector('.view-container');
    let choicesContainer = document.createElement('div');
    container.appendChild(choicesContainer);
    choicesContainer.classList.add('choices');
    for(i=0; i<3; i++) {
      let choiceElement = document.createElement('span');
      choiceElement.classList.add('choice');
      choiceElement.setAttribute("data-choice-number", i);
      choiceElement.addEventListener( 'click', (e) => {
        let choiceNumber = e.target.getAttribute("data-choice-number");
        Character.answerQuestion(choiceNumber);
      });
      choicesContainer.appendChild(choiceElement);
    }
  }
  
  genNameContainer();
  genHeaderContainer();
  genLeftContainer();
  genFunctionBtnContainer();
  genUtilityContainer();
  genBtnContainers();
  genCharacterContainer();
  genDialogContainer();
  genViewContainer();
  Game.time.dayStart();
})();

Character.update();
Game.update();