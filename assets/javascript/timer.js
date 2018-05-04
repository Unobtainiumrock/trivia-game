'use strict';

var intervalId = void 0;
var clockRunning = false;
var stopwatch = {
  time: 20,
  reset: function reset() {
    stopwatch.time = 20;
    $('#timer').html('00:30');
  },

  start: function start() {

    if (!clockRunning) {
      clockRunning = true;
      intervalId = setInterval(stopwatch.count, 1000);
    }
  },

  stop: function stop() {
    clockRunning = false;
    clearInterval(intervalId);
  },

  count: function count() {

    stopwatch.time--;

    var convertedTime = stopwatch.timeConverter(stopwatch.time);
    $('#timer').html(convertedTime);

    if ($('#timer').html() === '00:00') {
      console.log('Muthafucka!');
      stopwatch.stop();
      var questionValue = eval($('#question').text());
      evaluateAnswer(null, questionValue);
    }
  },

  timeConverter: function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};