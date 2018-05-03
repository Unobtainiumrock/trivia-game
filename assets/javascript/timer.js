
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

//  Our stopwatch object.
var stopwatch = {

  time: 30,
  
  reset: function() {

    stopwatch.time = 0;

    //  TODO: Change the "timer" div to "00:00."
    $('#timer').html('00:00');
  },

  start: function() {

    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      clockRunning = true;
      intervalId = setInterval(stopwatch.count,1000);
    }

  },

  stop: function() {
    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clockRunning = false;
    clearInterval(intervalId);

  },

  count: function() {

    //  TODO: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.
    var convertedTime = stopwatch.timeConverter(stopwatch.time);
    //  TODO: Use the variable you just created to show the converted time in the "timer" div.
    $('#timer').html(convertedTime);

    // Stop counting when the time hits 00:00
    if($('#timer').html() === '00:00') {
      console.log('Muthafucka!');
      stopwatch.stop();
    }
  },

  //  THIS FUNCTION IS DONE FOR US!
  //  We do not need to touch it.

  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

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
