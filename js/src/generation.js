
// genGame is composed of generating each html container contents
let genGame = (function genGame() {
  // the left container is for Stats
  
  function genNameContainer() {
    let container = document.querySelector('.name-container');
    let name = document.createElement('div');

    name.innerText = Character.name;

    container.appendChild(name);
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

  // the right container is toggled to show the tools, journal, inventory
  function genRightContainer() {
    let container = document.querySelector('.right-container');
    let journalContainer = document.createElement('div');
    let inventoryContainer = document.createElement('div');
    let toolsContainer = document.createElement('div');
    
    for(i=0; i<20; i++){
      let inventoryElement = document.createElement('div');
      let inventoryImg = document.createElement('img');
      let inventoryName = document.createElement('div');
      let inventoryAmt = document.createElement('span');

      inventoryElement.classList.add('invItem', `inv${i}`);
      inventoryElement.addEventListener( 'click', (e) => {
        console.log(e.target)
      });

      inventoryImg.src = `..\\..\\img\\inv.gif`;
      inventoryName.innerText = `inv${i}`;
      inventoryAmt.innerText = 12;
      inventoryElement.appendChild(inventoryImg);
      inventoryElement.appendChild(inventoryName);
      inventoryElement.appendChild(inventoryAmt);
      inventoryContainer.appendChild(inventoryElement);
      console.log(`inv${i} created`);
    }

    journalContainer.classList.add('journal-container', 'hide');
    journalContainer.innerText = 'this is the journal';
    inventoryContainer.classList.add('inventory-container');
    toolsContainer.classList.add('tools-container', 'hide');
    toolsContainer.innerText = 'this is the tools container';

    container.appendChild(journalContainer);
    container.appendChild(inventoryContainer);
    container.appendChild(toolsContainer);
  }

  // left btn container is usually "eat" "nap" "think" "rage"
  // right btn container is "tool", "inv", "look", "journal"
  function genBtnContainers() {
    let leftBtnContainer = document.querySelector('.left-btn-container');
    let rightBtnContainer = document.querySelector('.right-btn-container');
    let container = leftBtnContainer;

    function genBtns(container) {
      let button = document.createElement('button');
      let buttonName = Actions.btnArray[i].name;
      // buttonAction is set to a string from the current index of Actions.btnArray
      let buttonAction = Actions.btnArray[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn');
      button.id = `btn${i+1}`;
      // now, the buttonAction string becomes the name of a function in the button's eventListener
      button.addEventListener('click', (event) => buttonAction() );
      container.appendChild(button);
    }

    // the left 
    for(i = 0; i < 8; i++) {
      if(i > 3) { container = rightBtnContainer }
      genBtns(container);
    }
  }

  // also displays interactive feedback 
  function genDialogContainer() {
    let container = document.querySelector('.dialog-container')
    let feedback = document.createElement('div');
    let dialog = document.createElement('div');
    let choicesContainer = document.createElement('div');
    
    feedback.classList.add('feedback');
    dialog.classList.add('dialog');
    choicesContainer.classList.add('choices');
    container.appendChild(feedback);
    container.appendChild(dialog);
    container.appendChild(choicesContainer);
    
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

  /* the view container is the big middle screen, here is where things will appear after an action is performed.
  for example, after performing "fish" a fish image would pop up and the dialog would describe the result of the fish action */
  function genViewContainer() {

  }
  
  genNameContainer();
  genHeaderContainer();
  genLeftContainer();
  genFunctionBtnContainer();
  genRightContainer();
  genBtnContainers();
  genDialogContainer();
  genViewContainer();
  Game.time.dayStart();
})();

Character.update();
Game.update();