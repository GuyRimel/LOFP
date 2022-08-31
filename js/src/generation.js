
// genGame is composed of generating each html container contents
function genGame() {
  // the left container is for Stats
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
      statContainer.classList.add('stat-container');
      statBarElement.classList.add('stat-bar');
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

  // the right container is toggled to show the journal or inventory
  function genRightContainer() {
    let container = document.querySelector('.right-container');
    let journalContainer = document.createElement('div');
    let inventoryContainer = document.createElement('div');

    journalContainer.classList.add('journal-container');
    journalContainer.innerText = 'this is the journal';
    inventoryContainer.classList.add('inventory-container', 'hide');
    inventoryContainer.innerText = 'this is the inventory';

    container.appendChild(journalContainer);
    container.appendChild(inventoryContainer);
  }

  // left btn container is static "eat" "nap" "think" "rage"
  function genLeftBtnContainer() {
    let container = document.querySelector('.left-btn-container');
    
    for(i = 0; i < 4; i++) {
      let button = document.createElement('button');
      let buttonName = Actions.btnArray[i].name;
      let buttonAction = Actions.btnArray[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn');
      button.id = `btn${i+1}`;
      button.addEventListener('click', (event) => buttonAction() );
      container.appendChild(button);
    }
  }

  // also displays interactive feedback 
  function genDialogContainer() {
    let container = document.querySelector('.dialog-container')
    let feedback = document.createElement('div');
    let dialog = document.createElement('div');

    feedback.classList.add('feedback')
    dialog.classList.add('dialog')
    container.appendChild(feedback);
    container.appendChild(dialog);
  }

  // the right btn container is "tool" "journal" "look" "inventory"
  // "tool" is contextual to the current equipped tool
  // "look" asks "Look for what?" "a fight!", "supplies...", "answers..."
  function genRightBtnContainer() {
    let container = document.querySelector('.right-btn-container');
    
    for(i = 4; i < 8; i++) {
      let button = document.createElement('button');
      let buttonName = Actions.btnArray[i].name;
      let buttonAction = Actions.btnArray[i].perform;

      button.innerText = buttonName;
      button.classList.add('gamepad-btn')
      button.addEventListener('click', (event) => buttonAction() );
      container.appendChild(button);
    }
  }

  /* the view container is the big middle screen, here is where things will appear after an action is performed.
  for example, after performing "fish" a fish image would pop up and the dialog would describe the result of the fish action */
  function genViewContainer() {

  }

  genLeftContainer();
  genHeaderContainer();
  genFunctionBtnContainer();
  genRightContainer();
  genLeftBtnContainer();
  genDialogContainer();
  genRightBtnContainer();
  genViewContainer();
  Game.time.dayStart();
}

genGame();
Character.update();
Game.update();