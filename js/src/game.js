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
    
    dayStart: function dayStart() {
      let weather = document.querySelector(".weather");
      weather.innerText = Game.weather[Math.floor(Math.random()*5)];
      Game.time.day++;
      Game.time.setDate();
      document.querySelector(".view-container").style.backgroundColor =
      "skyblue";
      Game.time.minute = 0;
      Game.time.changeTime(0);
      Game.dialog.say("Goodmorning!", 20, 1);
    },

    dayEnd: function dayEnd() {
      Character.isAsleep = true;
      document.querySelector("#btn2").innerText = "sleep";
      document.querySelector(".view-container").style.backgroundColor =
        "darkblue";
        Game.dialog.say("Goodniiiight... zzz...", 60, 1);
    },

    convertTime: function convertTime(time) {
      let hour = Game.time.wakeHour + Math.floor(time / 60);
      let minute = time % 60;
      let suffix;

      if (hour >= 12) {
        hour -= 12;
        suffix = "pm";
      } else {
        suffix = "am";
      }
      
      if (minute < 10) {
        minute = "0" + minute;
      }

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
        Game.time.dayEnd();
      }
    },
  },

  dialog: {
    say: function say(text, rate, feedback) {
      if(Character.isBusy) { return }
      let feedbackElement = document.querySelector('.feedback');
      let dialogElement = document.querySelector('.dialog');
      let speakingElement = dialogElement;
      
      feedbackElement.innerText = '';
      dialogElement.innerText = '';
      speakingElement.innerText = '';
      
      if(feedback){
        speakingElement = feedbackElement;
      };
      
      let interval = setInterval(sayLetter, rate);
      let i = 0;
      Character.isBusy = true;

      function sayLetter() {
        if (text.charAt(i) === " ") {
          let spaceChar = "\xa0";
          speakingElement.innerText += spaceChar;
          i++;
        } else {
          speakingElement.innerText += text.charAt(i);
          i++;
        }
        if (i >= text.length) {
          clearInterval(interval);
          Character.isBusy = false;
        }
      }
    },
  },

  update: () => {
    Game.time.changeTime(0);
  },
};
