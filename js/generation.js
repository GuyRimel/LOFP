
// genGame is composed of generating each html container contents
let genGame = (function genGame() {
  
  (function genNameContainer() {
    let container = document.querySelector('.name-container');
    let islandName = document.createElement('div');
    
    container.appendChild(islandName);

    islandName.innerText = Game.currentIslandName;
    islandName.classList.add('islandName');
    islandName.addEventListener('click', (e) => {
      console.log(e.target);
    });
  })();
  
  // the header container is for time display
  (function genHeaderContainer() {
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
  })();

  (function genFunctionBtnContainer() {
    let container = document.querySelector('.function-btn-container');
    let menuBtn = document.createElement('div');

    menuBtn.innerText = 'Menu';
    menuBtn.addEventListener('click', () => {
      document.querySelector('.menu-screen').classList.remove('hide');
      document.querySelector('.game-screen').classList.add('hide');
    })

    container.appendChild(menuBtn);
  })();

  // the right container is toggled to show the equipment, journal, inventory
  (function genUtilityContainer() {
    let container = document.querySelector('.utility-container');
    let containerCloseBtn = document.createElement('div');

    container.appendChild(containerCloseBtn);
    
    containerCloseBtn.classList.add('close-btn');
    containerCloseBtn.innerText = 'Close';
    containerCloseBtn.addEventListener('click', () => Actions.closeUtility());
    
    
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
  
        inventoryImg.src = `img/inv.gif`;
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
        equipmentImg.src = `img/inv.gif`;
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
    
    (function genstatsContainers() {
      let
      statsContainer = document.createElement('div'),
      statsList = Object.keys(Character.stats),
      statsSpread = document.querySelector('.stats-spread'),
      spreadList = [ 'health', 'stamina', 'xp' ];
      
      for (i = 0; i < statsList.length; i++) {
        let
          statContainer = document.createElement('div'),
          statBarElement = document.createElement('div'),
          statNameElement = document.createElement('strong'),
          statValueElement = document.createElement('span');
          statName = statsList[i];
        
        statContainer.appendChild(statNameElement);
        statContainer.appendChild(statValueElement);
        statContainer.appendChild(statBarElement);
        statsContainer.appendChild(statContainer);
        
        statContainer.classList.add('bar-container');
        statBarElement.classList.add(`${statName}-bar`, 'bar');

        statNameElement.innerText = statName;
        statValueElement.innerText = Character.stats[statName];
      }
  
      for(i = 0; i < spreadList.length; i++) {
        let spread = document.createElement('div');
        statsSpread.appendChild(spread);
        spread.classList.add(`${spreadList[i]}-bar`, 'bar');
      }

      container.appendChild(statsContainer);

      statsContainer.classList.add('stats-container');
    })();
    
    (function genResources() {
      let
      resourceSpread = document.querySelector('.resources-spread'),
      resourceList = Object.keys(Character.resources);      
      
      for (i = 0; i < 6; i++) {
        let
          resourceContainer = document.createElement('div'),
          resourceNameElement = document.createElement('strong'),
          resourceImgElement = document.createElement('img'),
          resourceAmtElement = document.createElement('span'),
          resourceName = resourceList[i];
        
        resourceSpread.appendChild(resourceContainer);
        resourceContainer.appendChild(resourceImgElement);
        resourceContainer.appendChild(resourceNameElement);
        resourceContainer.appendChild(resourceAmtElement);
        
        resourceImgElement.src = `img/${resourceName}.gif`;
        // resourceImgElement.style.height = '45px';
        resourceAmtElement.classList.add(`${resourceName}-hud`);

        resourceNameElement.innerText = resourceName + '\xa0';
        resourceAmtElement.innerText = Character.resources[resourceName];
      }
    })();
  })();

  // left btn container is usually "eat" "nap" "think" "rage"
  // right btn container is "tool", "inv", "look", "journal"
  (function genBtnContainers() {
    let leftBtnContainer = document.querySelector('.left-btn-container');
    let middleBtnContainer = document.querySelector('.middle-btn-container');
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
      button.addEventListener('click', (e) => { 
        buttonAction();
      });

      container.appendChild(button);
    }

    for(i = 0; i < 10; i++) {
      if(i > 3) { container = rightBtnContainer }
      if(i > 7) { container = middleBtnContainer }
      genBtns(container, i);
    }
  })();

  // also displays interactive feedback 
  (function genCharacterContainer() {
    let container = document.querySelector('.character-container')
    let charBody = document.createElement('img');
    let charHead = document.createElement('img');
    let charMouth = document.createElement('img');
    let charEyeBalls = document.createElement('img');
    let charEyes = document.createElement('img');
    let charBrows = document.createElement('img');
    
    container.appendChild(charBody);
    container.appendChild(charHead);
    container.appendChild(charMouth);
    container.appendChild(charEyeBalls);
    container.appendChild(charEyes);
    container.appendChild(charBrows);

    charBody.classList.add('character-img', 'charcter-body');
    charImg.addEventListener( 'click', () => Actions.showStats());
  })();

  // also displays interactive feedback 
  (function genDialogContainer() {
    let container = document.querySelector('.dialog-container')
    let feedback = document.createElement('div');
    let dialog = document.createElement('div');
    
    feedback.classList.add('feedback');
    dialog.classList.add('dialog');
    container.appendChild(feedback);
    container.appendChild(dialog);
  })();

  /* the view container is the big middle screen, here is where things will appear after an action is performed.
  for example, after performing "fish" a fish image would pop up and the dialog would describe the result of the fish action */
  (function genViewContainer() {
    let
      container = document.querySelector('.view-container'),
      skyMid = document.createElement('div'),
      skyFront = document.createElement('div'),
      choicesContainer = document.createElement('div');

    container.appendChild(skyMid);
    container.appendChild(skyFront);
    container.appendChild(choicesContainer);
    container.classList.add('sky-back');
    skyMid.classList.add('sky-mid');
    skyFront.classList.add('sky-front');
    choicesContainer.classList.add('choices');

    for(i=0; i<3; i++) {
      let choiceElement = document.createElement('span');
      choiceElement.classList.add('choice', 'hide');
      choiceElement.setAttribute("data-choice-number", i);
      choiceElement.addEventListener('click', (e) => {
        let choiceNumber = e.target.getAttribute("data-choice-number");
        Character.answerQuestion(choiceNumber);
      });
      choicesContainer.appendChild(choiceElement);
    }
  })();

  (function genMenuContainer() {
    let container = document.querySelector('.menu-screen');
    
    container.innerHTML =
    `
    <h1>MENUUUU</h1>
    <h2>Data</h2>
    <section>
    <div>
    <button class="save-btn">Save</button>
    <button class="load-btn">Load</button>
    </div>
    </section>
    <h2>Tutorial</h2>
    <section>
    <h3>Eating</h3>
    <em>(Health + 5)</em>
    <p>To eat something, put it in your mouth. Chew it. yuuuummmm..</p>
    <p>That's called "eating", you frik'n moron.</p>
    <br>
    <h3>Drinking</h3>
    <em>(Stamina + 5)</em>
    <p>To drink something, first ensure that it is a liquid. Create suction with your mouth in the shape of an "O". Be sure not to try and breathe the liquid into your lung cavities.</p>
    <p>Modern Lungologists call this "drowning", thumbs-for-brains</p>
    </section>
    `;
    
    let saveBtn = document.querySelector('.save-btn');
    let loadBtn = document.querySelector('.load-btn');

    saveBtn.addEventListener('click', Game.save);
    loadBtn.addEventListener('click', Game.load);

    let containerCloseBtn = document.createElement('div');
    container.appendChild(containerCloseBtn);
    
    containerCloseBtn.classList.add('close-btn');
    containerCloseBtn.innerText = 'Close';
    containerCloseBtn.addEventListener('click', () => {
      document.querySelector('.game-screen').classList.remove('hide');
      container.classList.add('hide');
    });
  })();

// end of genGame IIFE
})();

Game.load();
