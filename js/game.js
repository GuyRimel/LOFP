let Game = {
  islandNameList: ["Albatross Isle", "Bramble Island", "Corsair Cove"],
  currentIslandName: "Albatross Isle",
  isConversing: false,
  weatherList: ["Sunny", 'Cloudy', 'Rainy', 'Snowy', 'Monsoon'],
  weather: "Sunny",
  maxGroundHeight: 65,
  chanceOfWater: .50,
  maxWaterWidth: 40,
  maxTrees: 6,
  treeHardness: 3,
  
  time: {
    seasonsList: [ "Spring", "Summer", "Fall", "Winter" ],
    season: 0,
    day: 9,
    daysPerSeason: 10,
    year: 1660,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,
    
    dayStart: () => {
      let weather = document.querySelector(".weather");
      Game.weather = Game.weatherList[Game.getRandomInt(5)];
      weather.innerText = Game.weather;
      Game.time.day++;
      if(Game.time.day > 10) {
        Game.time.day = 1;
        Game.time.season++;
        if(Game.time.season > 3) {
          Game.time.season = 0;
          Game.time.year++;
        }
      }
      
      Game.time.minute = 0;
      Game.time.setDate();
      Game.time.changeTime(0);
    },
    
    dayEnd: () => {
      Character.isAsleep = true;
      Game.converse(
        '*yyyyaaaawwn...',
        '. . .',
        2500
      );
      setTimeout( () => Game.ask(1), 4000);
    },
    
    convertTime: (time) => {
      let hour = Game.time.wakeHour + Math.floor(time / 60);
      let minute = time % 60;
      let suffix;
      (hour > 11 && hour < 24) ? suffix = "pm" : suffix = "am";
      if (hour > 12) { hour -= 12; }
      if (minute < 10) { minute = "0" + minute; }
      
      let timeString = `${hour}:${minute} ${suffix}`;
      
      return timeString;
    },
    
    setDate: () => {
      let weather = document.querySelector(".weather");
      weather.innerText = Game.weather;
      let date = document.querySelector(".date");
      let season = Game.time.season;
      season = Game.time.seasonsList[season];
      let day = Game.time.day;
      let year = Game.time.year;
      date.innerText = `${season} ${day}, ${year}`;
    },
    
    changeTime: (amount) => {
      Game.time.minute += amount;
      let currentMinute = Game.time.minute;
      let minutesPerDay = Game.time.minutesPerDay;
      
      let time = document.querySelector(".time");
      let timeBar = document.querySelector(".time-bar");
      
      // set the timeBarWidth to a percentage of time remaining in the day
      let timeBarWidth = 100 - (currentMinute / minutesPerDay) * 100;
      
      time.innerText = Game.time.convertTime(currentMinute);
      timeBar.style.width = timeBarWidth + "%";

      Game.setSky();
      
      if (currentMinute >= minutesPerDay) {
        timeBar.style.width = '0%';
        Game.time.dayEnd();
      }
    },
  },

  setSky: () => {
    let skyBack = document.querySelector('.sky-back');
    let skyMid = document.querySelector('.sky-mid');
    let skyFront = document.querySelector('.sky-front');
    let minute = Game.time.minute;
    let frontAlpha;
    let midAlpha;
    
    if(minute < 240) {
      frontAlpha = minute / 240;
      midAlpha = frontAlpha * 3;
      if(midAlpha > 0.5) midAlpha = 0.5;
      // color of "morning sunlight"
      skyMid.style.backgroundImage =
        `linear-gradient(#0000 15%, hsla(45, 100%, 50%, ${midAlpha}))`;
    } else if(minute > 660){
      frontAlpha = 1 - (minute % 660 / 300);
      if(frontAlpha < 0) frontAlpha = 0;
      midAlpha = frontAlpha * 3;
      //color of "evening sunlight"
      skyMid.style.backgroundImage =
        `linear-gradient(#0000 %15, hsla(15, 100%, 50%, ${midAlpha}))`;
    } else {
      midAlpha = 0;
      frontAlpha = 1;
    }

    skyBack.style.backgroundImage =
      // full night blue: 'hsla(247, 76%, 27%, 1)';
      'linear-gradient(hsla(247, 76%, 27%, 1), hsla(247, 76%, 50%, 1))';

    skyFront.style.backgroundImage =
      // full noon blue: 'hsla(197, 71%, 73%, 1)';
      `linear-gradient(hsla(197, 71%, 73%, ${frontAlpha}), #EFEFFFCC)`;
  },
    
  say: (text) => {
    let feedbackElement = document.querySelector('.feedback');
    Game.shush('.feedback');
    feedbackElement.innerText = text;
  },

  // here is where the Game.currentQuestion is set
  ask: (questionNumber) => {
    if (!Number.isInteger(questionNumber)) { return }
    Game.currentQuestion = questionNumber;

    let questionObj = Game.questions[questionNumber];
    Game.shush();
    Game.say(questionObj.question);

    let choicesElement = document.querySelector('.choices');
    let choices = document.querySelectorAll('.choice');

    choices.forEach((choice, i) => {
      choice.innerText = questionObj.choices[i];
      choice.classList.remove('hide');
      if(!choice) { choice.classList.add('hide'); }
    });

    setTimeout(() => {
      choicesElement.classList.remove('hide');
    }, 500);
  },

  shush: (query) => {
    document.querySelector('.choices').classList.add('hide');
    if (!query) {
      document.querySelector('.feedback').innerText = '';
      document.querySelector('.dialog').innerText = '';
    } else {
      document.querySelector(query).innerText = '';
    }
  },
  
  // predefined conversational timing between the game and character
  converse: (charSays, gameSays, delay, emotion) => {
    if(!Character.isBusy && !Game.isConversing){
      Game.isConversing = true;
      // order of events: shush both > charSays > gameSays
      // 'delay' is when the game responds
      let charSpeakingRate = Math.floor(delay / charSays.length);
      if( charSpeakingRate < 10 ) { charSpeakingRate = 10; }
      Game.shush();
      Character.say(charSays, charSpeakingRate, emotion);
      setTimeout(() => Game.say(gameSays), delay + 400);
      Game.isConversing = false;
    }
  },

  // this is where the magic happens
  // first, trigger "Game.ask(#)" which sets the currentQuestion
  // the user is prompted with the question, and choices generate
  // the response is what happens depending on their choice
  currentQuestion: null,
  questions: [
    { // question 0, tied to "Action.look()"
      question: 'Look for what?',
      choices: ['a FIGHT!', 'supplies', 'the shop-bird'],
      responses: [
        () => {
          Game.converse(
            'LETS FIGHT, FOOL!',
            'fight!',
            500
          )
        },
        () => {
          Game.converse(
            'hmm... lets seeee...',
            'searching for supplies...',
            600
          )
        },
        () => {
          Game.converse(
            '*whistle* . . . . . hey, shop-bird.',
            '*squawk! gimme gold! *squaawk*',
            1200
          )
        }
      ]
    }, { // question 1, tied to Character.checkup(), Character.isAsleep = true
      question: "You're asleep... wakey wakey?",
      choices: ['lets get up!', '... zzz', 'keep dreaming'],
      responses: [
        () => { Actions.wake(); },
        () => { Actions.snooze(); },
        () => { Actions.dream(); }
      ]
    }, { // question 2, tied to Character.snoozes > 0
      question: "... is it time to wake up now?",
      choices: ['the sun is uuup!', '... z z z', 'dreeeeam'],
      responses: [
        () => { Actions.wake(); },
        () => { Actions.snooze(); },
        () => { Actions.dream(); }
      ]
    }, { // question 3, tied to Character.checkup(), Character.isAsleep = true, Character.snoozes > 3
      question: "... okay GET UP!!!",
      choices: ['lets get up!', 'fiiine...', '*grumble'],
      responses: [
        () => { Actions.wake(); },
        () => { Actions.wake(); },
        () => { Actions.wake(); }
      ]
    }
  ],
  
  generateExplorationArea: () => {
    let
    viewContainer = document.querySelector('.view-container'),
    groundHeight = 0,
    isWater = Game.maybeTrue(Game.chanceOfWater),
    waterWidth = Game.getRandomInt(Game.maxWaterWidth),
    treesInArea = Game.getRandomInt(Game.maxTrees);
    
    while(groundHeight < 40) {
      groundHeight = Game.getRandomInt(Game.maxGroundHeight);
    }
    
    viewContainer.classList.remove('home');
    Game.removeOldGens();

    (function genGround() {
      let ground = document.createElement('svg');

        viewContainer.appendChild(ground);
        ground.classList.add('ground');
        ground.style.height = groundHeight + '%';
    })();

    (function genWater() {
      if(!isWater) { return }
      let water = document.createElement('svg');

      viewContainer.appendChild(water);
      water.classList.add('water');
      water.style.width = waterWidth + '%';
      water.style.height = groundHeight + '%';
      water.addEventListener ('click', (e) => console.log(e.target));
    })();

    (function genTrees() {
      for(i=0; i < treesInArea; i++) {
        let
          tree = document.createElement('img'),
          treeBottomNumber = Game.getRandomInt(groundHeight),
          treeLeftNumber = Game.getRandomInt(100);
  
          if(isWater && treeLeftNumber < 25 ) { treeLeftNumber += waterWidth; }
          if(treeLeftNumber > 95 ) { treeLeftNumber = 95; }
          if(treeLeftNumber < 5 ) { treeLeftNumber = 5; }
          
          viewContainer.appendChild(tree);
          tree.setAttribute('data-chops', 0);
          tree.classList.add('tree');
          tree.src = 'img/tree01.gif';
          tree.style.bottom = treeBottomNumber + '%';
          tree.style.left = treeLeftNumber + '%';
          tree.addEventListener ('click', (e) => Game.chop(e));
      }
    })();
  },

  chop: (e) => {
    console.log(!Character.isAble())
    if(!Character.isAble()) return;
    let gameScreen = document.querySelector('.game-screen');
    let tree = e.target;
    let chops = parseInt(tree.dataset.chops) + 1;
    let treeAngle = chops * 7;

    function fellTree() {
      let log = document.createElement('img');
      let woodHudRect = document.querySelector('.wood-hud-pic').getBoundingClientRect();
      let i = 0;
      let interval = setInterval(falling, 20);
      function falling() {
        console.log(treeAngle);
        if(i > 90 - treeAngle) {
          tree.remove();
          clearInterval(interval);
        } else {
          tree.style.transform = `rotate(-${treeAngle + i}deg)`;
          i+=5;
        }
      };

      log.src = 'img/wood.gif';
      log.style.left = e.x + 'px';
      log.style.top = e.y + 'px';
      log.classList.add('drop');
      log.addEventListener('click', () => {
        log.style.left = woodHudRect.left + 'px';
        log.style.top = woodHudRect.top + 'px';
        log.style.width = "1em";
        setTimeout(()=> {
          log.remove();
          Character.changeResource('wood', 1);
          Character.changeStat('xp', 1)
        }, 300)
      });
      gameScreen.appendChild(log);

    }

    Game.pow(e);
    tree.style.transform = `rotate(${-treeAngle}deg)`;
    tree.dataset.chops = chops;
    if(chops == Game.treeHardness) fellTree();
    Game.time.changeTime(5);
    Character.changeStat('stamina', -1)
  },
  
  pow: (e) => {
    let gameScreen = document.querySelector('.game-screen');
    let powImg = document.createElement('img');
    function removePowImg() { powImg.remove() }

    gameScreen.appendChild(powImg);
    powImg.src = 'img/impact.svg';
    powImg.classList.add('pow');
    powImg.style.left = e.x - (powImg.offsetWidth / 2) + 'px';
    powImg.style.top = e.y - (powImg.offsetHeight / 2) + 'px';
    setTimeout(removePowImg, 150);
  },

  goHome: (isLoaded) => {
    let container = document.querySelector('.view-container');
    let ground = document.createElement('svg');
    Game.removeOldGens();
    container.classList.add('home');
    container.appendChild(ground);
    ground.classList.add('ground');
    if(isLoaded) {
      Game.converse(
        'weeeird ... it feels like the world has been... loaded, or something...',
        '- Game Loaded -',
        1200
      )
    } else {
      Game.converse(
        'aaah, time to kick back...',
        'You made it back home.',
        1000
      );
    };
  },

  removeOldGens: () => {
    let oldGens = document.querySelectorAll('.view-container svg, .view-container img');
    oldGens.forEach( (el) => el.remove() );
  },

  // takes a decimal from 0 to 1 probability of true. returns boolean
  maybeTrue(probability) {
    if(Math.random() <= probability) { return true }
    else { return false }
  },

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  },

  update: () => {
    Game.time.changeTime(0);
    Game.time.setDate();
  },

  load: () => {
    Actions.goHome('loaded');
    Character.update();
    Game.update();

    let loadedData = localStorage.getItem('LOFPData');
    if(loadedData === null) return;

    loadedData = JSON.parse(loadedData);

    Game.currentIslandName= loadedData[0];
    Game.weather= loadedData[1];
    Game.chanceOfWater= parseFloat(loadedData[2]);
    Game.maxWaterWidth= parseInt(loadedData[3]);
    Game.maxTrees= parseInt(loadedData[4]);
    Game.time.year= parseInt(loadedData[5]);
    Game.time.season= parseInt(loadedData[6]);
    Game.time.day= parseInt(loadedData[7]);
    Game.time.minute= parseInt(loadedData[8]);
    Character.name= parseInt(loadedData[9]);
    Character.xpTilLevelup= parseInt(loadedData[10]);
    Character.snoozes= parseInt(loadedData[11]);

    // setting each loaded object key to the matching Character.stats object key
    Object.keys(Character.stats).forEach ((stat) => {
      Character.stats[stat] = loadedData[12][stat];
    });
    
    // setting each loaded object key to the matching Character.statMaximums object key
    Object.keys(Character.statMaximums).forEach ((statMax) => {
      Character.statMaximums[statMax] = loadedData[13][statMax];
    });
    
    // clearing the current inventory array, and loading the inventory array from storage
    //  NOTE TO SELF: loading an array is way clearer than loading an object...
    Character.inventory.length = 0;
    loadedData[14].forEach((item) => Character.inventory.push(item));

    Character.update();
    Game.update();
  },
  
  save: () => {
    Character.update();
    Game.update();

    let LOFPData = [];
    LOFPData.push(
      Game.currentIslandName,
      Game.weather,
      Game.chanceOfWater,
      Game.maxWaterWidth,
      Game.maxTrees,
      Game.time.year,
      Game.time.season,
      Game.time.day,
      Game.time.minute,
      Character.name,
      Character.xpTilLevelup,
      Character.snoozes,
      Character.stats,
      Character.statMaximums,
      Character.inventory
    );

    localStorage.setItem('LOFPData', JSON.stringify(LOFPData));

    console.log(LOFPData);
  }
}

