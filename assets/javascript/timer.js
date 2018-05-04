
  //  Variable that will hold our setInterval that runs the stopwatch
  let intervalId;

  // prevents the clock from being sped up unnecessarily
  let clockRunning = false;

  //  Our stopwatch object.
  let stopwatch = {

    time: 20,
    
    reset: function() {

      stopwatch.time = 20;

      $('#timer').html('00:30');
    },

    start: function() {

      if (!clockRunning) {
        clockRunning = true;
        intervalId = setInterval(stopwatch.count,1000);
      }

    },

    stop: function() {
      clockRunning = false;
      clearInterval(intervalId);

    },

    count: function() {

      stopwatch.time--;

      let convertedTime = stopwatch.timeConverter(stopwatch.time);
      $('#timer').html(convertedTime);

      if($('#timer').html() === '00:00') {
        console.log('Muthafucka!');
        stopwatch.stop();
        let questionValue = eval($('#question').text());
        evaluateAnswer(null,questionValue);
      }
    },

    timeConverter: function(t) {

      let minutes = Math.floor(t / 60);
      let seconds = t - (minutes * 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes === 0) {
        minutes = "00";
      }

      else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return minutes + ":" + seconds;
    }
  };

