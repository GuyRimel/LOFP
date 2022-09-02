let Game = {
  config: {},

  weather: ["sunny", 'cloudy', 'rainy', 'snowy', 'monsoon'],

  time: {
    seasonsList: ["spring", "summer", "fall", "winter"],
    season:"spring",
    day: 0,
    daysPerSeason: 10,
    year: 1660,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,
    snoozes: 0,
    
    dayStart: function dayStart() {
      let weather = document.querySelector(".weather");
      weather.innerText = Game.weather[Math.floor(Math.random()*5)];
      Game.time.day++;
      Game.time.setDate();
      document.querySelector(".view-container").style.backgroundColor =
      "skyblue";
      Game.time.snoozes = 0;
      Game.time.minute = 0;
      Game.time.changeTime(0);
      Game.say("Goodmorning!", 20);
      
      Character.isAsleep = false;
    },

    dayEnd: function dayEnd() {
      Character.isAsleep = true;
      document.querySelector(".view-container").style.backgroundColor =
        "darkblue";
        (Game.time.snoozes < 3) ? Game.ask(1) : Game.ask(2);
    },

    convertTime: function convertTime(time) {
      let hour = Game.time.wakeHour + Math.floor(time / 60);
      let minute = time % 60;
      let suffix;
      (hour > 11 && hour < 24) ? suffix = "pm" : suffix = "am";
      if(hour > 12) { hour -= 12; }
      if (minute < 10) { minute = "0" + minute; }

      let timeString = `${hour}:${minute} ${suffix}`;

      return timeString;
    },

    setDate: function setDate() {
      let date = document.querySelector(".date");
      let season = Game.time.season;
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

  say: function say(text, rate) {
    let feedbackElement = document.querySelector('.feedback');
    Game.shush();

    let interval = setInterval(sayLetter, rate);
    let i = 0;
    Character.isBusy = true;

    function sayLetter() {
      if (text.charAt(i) === " ") {
        let spaceChar = "\xa0";
        feedbackElement.innerText += spaceChar;
        i++;
      } else {
        feedbackElement.innerText += text.charAt(i);
        i++;
      }
      if (i >= text.length) {
        clearInterval(interval);
        Character.isBusy = false;
      }
    }
  },

  // here is where the Game.currentQuestion is set
  ask: function ask(questionNumber){
    if (!Number.isInteger(questionNumber)) { return }
    Game.currentQuestion = questionNumber;

    let questionObj = Game.questions[questionNumber];
    Game.shush();
    Game.say(questionObj.question);
    
    let choicesElement = document.querySelector('.choices');
    let choices = document.querySelectorAll('.choice');
    setTimeout( () => choicesElement.classList.remove('hide'), 500);
    
    choices.forEach( (choice, i) => {
      choice.innerText = questionObj.choices[i];
    });
  },

  shush: (speaker) => {
    document.querySelector('.choices').classList.add('hide');
    document.querySelector('.feedback').innerText = '';
    document.querySelector('.dialog').innerText = '';
  },

  // 
  currentQuestion: null,
  questions: [
    { // question 0, tied to "Action.look()"
      question: 'Look for what?',
      choices: ['supplies', 'answers', 'a FIGHT!'],
      responses: [
        () => {
          Game.shush();
          setTimeout( () => Game.say('searching for supplies...'), 500);
          Character.say('hmm... lets seeee...');
      },
        () => {
          Game.shush();
          setTimeout( () => Game.say('... its not...'), 2500);
          Character.say('perhaps the answer is within this coconut...');
        },
        () => {
          setTimeout( () => Game.say('a fight!'), 500);
          Character.say('LETS FIGHT, FOOL!');
        } 
      ]
    },{ // question 1, tied to "Game.time.dayEnd()"
      question: "You're asleep... wakey wakey?",
      choices: ['lets get up!', '... zzz', 'keep dreaming'],
      responses: [
        () => { Game.time.dayStart(); },
        () => { Actions.snooze(); },
        () => { Actions.dream(); }
      ]
    }, { // question 2, tied to Game.time.dayEnd() && Game.time.snoozes > 3
      question: "... okay GET UP!!!",
      choices: ['lets get up!', '*yawn', '...'],
      responses: [
        () => { Game.time.dayStart(); },
        () => { Game.time.dayStart(); },
        () => { Game.time.dayStart(); }
      ]
    }
  ],
  
  update: () => {
    Game.time.changeTime(0);
  }
}
