let Game = {
  currentIslandName: "Albatross Isle",
  isConversing: false,
  weather: ["Sunny", 'Cloudy', 'Rainy', 'Snowy', 'Monsoon'],

  time: {
    seasonsList: [ "Spring", "Summer", "Fall", "Winter" ],
    season: 0,
    day: 0,
    daysPerSeason: 10,
    year: 1660,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,
    
    dayStart: function dayStart() {
      document.querySelector(".view-container").style.backgroundColor = "skyblue";
      let weather = document.querySelector(".weather");
      weather.innerText = Game.weather[Math.floor(Math.random() * 5)];
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
    
    dayEnd: function dayEnd() {
      Character.isAsleep = true;
      document.querySelector(".view-container").style.backgroundColor = "darkblue";
      Game.converse(
        '*yyyyaaaawwn...',
        '. . .',
        2500
      );
      setTimeout( () => Game.ask(1), 4000);
    },
    
    convertTime: function convertTime(time) {
      let hour = Game.time.wakeHour + Math.floor(time / 60);
      let minute = time % 60;
      let suffix;
      (hour > 11 && hour < 24) ? suffix = "pm" : suffix = "am";
      if (hour > 12) { hour -= 12; }
      if (minute < 10) { minute = "0" + minute; }

      let timeString = `${hour}:${minute} ${suffix}`;

      return timeString;
    },

    setDate: function setDate() {
      let date = document.querySelector(".date");
      let season = Game.time.season;
      season = Game.time.seasonsList[season];
      let day = Game.time.day;
      let year = Game.time.year;
      date.innerText = `${season} ${day}, ${year}`;
    },

    changeTime: function changeTime(amount) {
      Game.time.minute += amount;
      let currentMinute = Game.time.minute;
      let minutesPerDay = Game.time.minutesPerDay;

      let time = document.querySelector(".time");
      let timeBar = document.querySelector(".time-bar");

      // set the timeBarWidth to a percentage of time remaining in the day
      let timeBarWidth = 100 - (currentMinute / minutesPerDay) * 100;

      time.innerText = Game.time.convertTime(currentMinute);
      timeBar.style.width = timeBarWidth + "%";

      if (currentMinute >= minutesPerDay) {
        timeBar.style.width = '0%';
        Game.time.dayEnd();
      }
    },
  },

  say: function say(text) {
    let feedbackElement = document.querySelector('.feedback');
    Game.shush('.feedback');
    feedbackElement.innerText = text;
  },

  // here is where the Game.currentQuestion is set
  ask: function ask(questionNumber) {
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
  converse: function converse(charSays, gameSays, delay) {
    if(Game.isConversing) { return }
    Game.isConversing = true;
    
    // order of events: shush both > charSays > gameSays
    // 'delay' is when the game responds
    let charSpeakingRate = Math.floor(delay / charSays.length);
    if( charSpeakingRate < 10 ) { charSpeakingRate = 10; }
    Game.shush();
    Character.say(charSays, charSpeakingRate);
    setTimeout(() => Game.say(gameSays), delay + 400);
    Game.isConversing = false;
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

  update: () => {
    Game.time.changeTime(0);
  }
}
