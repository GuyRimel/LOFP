let Game = {
  config: {},

  time: {
    season: ["spring", "summer", "fall", "winter"],
    day: 1,
    daysPerSeason: 10,
    year: 1750,
    minute: 480,
    minutesPerDay: 960, // 16 Hours
    wakeHour: 6,
    sleepHour: 22,

    dayStart: function dayStart() {
      document.querySelector(".view-container").style.backgroundColor =
        "skyblue";
      Game.time.day++;
      Game.time.minute = 0;
      Game.time.changeTime(0);
      Game.dialog.say("Goodmorning!", 20, 1);
    },

    dayEnd: function dayEnd() {
      console.log('day Ended');
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

    changeTime: function changeTime(amount) {
      Game.time.minute += amount;
      let currentMinute = Game.time.minute;
      let minutesPerDay = Game.time.minutesPerDay;

      if (currentMinute >= minutesPerDay) {
        Game.time.dayEnd;
      }

      let time = document.querySelector(".time");
      let timeBar = document.querySelector(".time-bar");

      // set the timeBarWidth to a percentage of time remaining in the day
      let timeBarWidth = 100 - (currentMinute / minutesPerDay) * 100;

      time.innerText = Game.time.convertTime(currentMinute);
      timeBar.style.width = timeBarWidth + "%";

      if (Game.time.minute >= Game.time.minutesPerDay) {
        Game.time.dayEnd();
      }
    },
  },

  dialog: {
    say: function say(text, rate, feedback) {
      if(Character.isBusy || !Character.isAlive){return};

      let feedbackElement = document.querySelector('.feedback');
      let dialogElement = document.querySelector('.dialog');
      let speakingElement = dialogElement;

      feedbackElement.innerText = '';
      dialogElement.innerText = '';
      speakingElement.innerText = '';

      if(feedback){
        speakingElement = feedbackElement;
      };


      if (Character.isAlive && !Character.isBusy) {
        let interval = setInterval(sayLetter, rate);
        let i = 0;

        function sayLetter() {
          if (text.charAt(i) === " ") {
            let spaceChar = "\xa0";
            speakingElement.innerText += spaceChar;
            i++;
            Character.isBusy = true;
          } else {
            speakingElement.innerText += text.charAt(i);
            i++;
            Character.isBusy = true;
          }
          if (i >= text.length) {
            clearInterval(interval);
            Character.isBusy = false;
          }
        }
      }
    },
  },

  update: () => {
    Game.time.changeTime(0);
  },
};
