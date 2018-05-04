'use strict';

$(document).ready(function () {

  // Game data
  var questions = [];
  var currentRound = 0;
  var numberCorrect = 0;
  var numberIncorrect = 0;
  var numberUnanswered = 0;
  var rounds = 5;

  // Start my game
  startGame();

  // EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS
  // =============================================================================

  // Evaluate the user's choice on click
  $('.answer-hover').on('click', function (e) {
    var answerValue = eval(e.currentTarget.children[0].innerHTML);
    var questionValue = eval($('#question').text());

    evaluateAnswer(answerValue, questionValue, e);
  });

  // Resets the game
  $('#reset-button').click(function () {
    resetGame();
  });

  // FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS
  // =================================================================================

  /**
   * Starts the game by generating random questions, starting the timer,
   * populating the DOM with the questions and answers
   */
  function startGame() {
    createQuestions(rounds);

    $('#game-over').toggle();

    populateAnswerChoices(currentRound);
    populateQuestion(currentRound);
    stopwatch.start();
  }
  /**
   * When game ends, hide game, diplay replay button, and display user results
   */
  function endGame() {
    $('#countdown-info').toggle();
    $('#hidden-answer').css('display', 'none');
    $('#game').toggle();
    $('#reset-button').css('display', 'block');
    $('#game-over').toggle();
    $('#game-over').text('Correct: ' + numberCorrect + ' Incorrect: ' + numberIncorrect + ' Unanswered: ' + numberUnanswered);
    stopwatch.stop();
  }
  /**
   * Returns entire game to inital state and then calls startGame
   */
  function resetGame() {
    $('#countdown-info').toggle();
    $('#game').css('display', 'block');
    $('#reset-button').css('display', 'none');
    $('#game-over').text('');
    toggleAnswer();
    stopwatch.reset();
    currentRound = 0;
    numberCorrect = 0;
    numberIncorrect = 0;
    numberUnanswered = 0;
    startGame();
  }

  /**
   * Evaluates the user choice against the correct answer,
   * displays the correct answer regardless of outcome,
   * calls the nextRound function after displaying the
   * correct answer.
   * @param  {number} answerValue: is the value of the answer clicked
   * @param  {number} questionValue: is the value of evaluating the question's expression
   * @param  {Object} event: is the event object from clicking on an answer. 
   */
  window.evaluateAnswer = function (answerValue, questionValue, event) {

    // Cycle to the elements to diplay after clicking an answer
    $('#countdown-info').toggle();
    toggleAnswer();
    toggleHidden();

    // the answer will be null if the user doesn't pick an answer. Check
    // the stopwatch.Count method in timer.js
    if (answerValue == null) {
      var result = 'unanswered';
      $('#question').text('Times up! The answer was: ' + questionValue);
      setTimeout(nextRound.bind(null, result), 2100);
    }

    if (answerValue === questionValue) {
      var _result = 'win';
      $('#question').text('Winner winner chicken dinner!');
      setTimeout(nextRound.bind(null, _result), 2100);
    }

    if (answerValue !== null && answerValue !== questionValue) {
      var _result2 = 'lose';
      $('#question').text('Nope!! The answer was: ' + questionValue);
      setTimeout(nextRound.bind(null, _result2), 2100);
    }
  };

  /**
   * Toggles between the question and answers displayed.
   */
  function toggleAnswer() {
    $('.answer-hover').toggle();
    $('#title').toggle();
  }
  /**
   * Toggles the hidden result image. For some reason toggle wasn't working on this one
   * --Might fix later.
   */
  function toggleHidden() {
    if ($('#hidden-answer').css('display') !== 'inline') {
      $('#hidden-answer').css('display', 'inline');
    } else {
      $('#hidden-answer').css('display', 'none');
    }
  }
  /**
   * @param  {string} result: the string passed to it from evaluateAnswer.
   */
  function nextRound(result) {
    incrementScores(result);
    $('#countdown-info').toggle();
    currentRound++;

    if (currentRound < 5) {
      populateAnswerChoices(currentRound);
      populateQuestion(currentRound);
      toggleAnswer();
      toggleHidden();
      stopwatch.reset();
      stopwatch.start();
    } else {
      endGame();
    }
  }
  /**
   * @param  {string} result: the string passed to it from next round
   * 
   * The variable pass-down for result goes the following:
   * 1)clickEvent || timer run out captures data of answer ->
   * 2)evaluateAnswer creates string representative of "choice vs answer" as result ->
   * 3)nextRound takes that result and uses it in a call to incrementScore
   * 4)incrementScore uses this data passed which was passed from two levels up.
   * 
   */
  function incrementScores(result) {
    if (result === 'unanswered') {
      numberUnanswered++;
    }
    if (result === 'win') {
      numberCorrect++;
    }
    if (result === 'lose') {
      numberIncorrect++;
    }
  }

  // THIS SECTION HAS THE RANDOMIZER FUNCTIONS FOR SETTING UP GAME DATA

  /**
   * Takes in a number and creates that amount of randomly generated
   * questions objects, and pushes them to the questions array
   * 
   * @param  {number} questionAmount: Is the number of questions --in this case its 5.
   */
  function createQuestions(questionAmount) {
    var operands = ['+', '-', '*', '/'];

    for (var i = 0; i < questionAmount; i++) {
      // Create question Object
      var qA = {};
      // Create random math question
      qA.question = randomizer(1, 30) + ' ' + operands[randomizer(1, 3)] + ' ' + randomizer(1, 30);
      // Create answers array
      qA.answers = [];
      // Add at least one correct answer, in this case, we eval the randomly generated question
      qA.answers.push(eval(qA.question));
      // Add 3 dummy answers
      for (var _i = 0; _i < 3; _i++) {
        var wrongAnswer = randomizer(1, 900);
        // Makes sure we don't have correct answer duplicates
        if (wrongAnswer === qA.answers[0]) {
          wrongAnswer = randomizer(35, 50);
        }
        qA.answers.push(wrongAnswer);
      }
      // shuffle the answers array, so that the first choice isn't always the correct answer
      qA.answers = shuffle(qA.answers);
      // Push randomly generated question object { Q: question, A: [ans,ans,ans,ans] } to questions array
      questions.push(qA);
    }
  }

  /**
   * @param  {number} lowerBound: the lower end of range for random generation
   * @param  {number} upperBound: the upper end of range for random generation
   * @returns {number}  randomly generated number based on the range provided
   */
  function randomizer(lowerBound, upperBound) {
    return Math.floor(Math.random() * upperBound + lowerBound);
  }

  /**
   * Shuffles array in place. This is used to shuffle our answers array,
   * in order to prevent the first choice from always being the 
   * the correct option.
   * @param {Array} arr: is an array containing the questions we want to shuffle
   * @returns a shuffled version of arr
   */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [arr[j], arr[i]];
      arr[i] = _ref[0];
      arr[j] = _ref[1];
    }
    return arr;
  }

  /**
   * This function iterates the 'answer' class and populates each of their fields with
   * the corresponding data from the answers array for the current round
   *     element     round   question
   *       0           0         0
   *       2           0         2
   *       3           0         3
   * 
   * @param  {number} currentRound: the current question round
   */
  function populateAnswerChoices(currentRound) {

    // Iterate 4 times because there are 4 answers to choose from
    for (var i = 0; i < 4; i++) {
      // This is where we change which element with a class of 'answer' is targeted by using 'i'
      var ans = $('.answer')[i];
      // This is where we change which question from the questions array (for the current round)
      // we are targeting to the corresponding 
      $(ans).text(questions[currentRound].answers[i]);
    }
  }

  /**
   * Uses the current round to determine which question from our questions array will
   * populate the corresponding location in the DOM
   * @param  {number} currentRound: the current round
   */
  function populateQuestion(currentRound) {
    $('#question').text(questions[currentRound].question);
  }
});