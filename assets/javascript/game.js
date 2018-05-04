
$(document).ready(function () {

  // Game data
  let questions = [];
  let currentRound = 0;
  let numberCorrect = 0;
  let numberIncorrect = 0;
  let numberUnanswered = 0;

  // Start my game
  // Hides score until end of round
  startGame();



// EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS EVENT HANDLERS
// =============================================================================

// Track the coordinates of the mouse when hovering a question
// Couldn't get CSS animation to fully work. var() portion in the style.css won't link with
// the setProperty values here. Sti
  // $('.answer-hover').mousemove((e) => {

  //   const x = e.pageX - e.target.offsetLeft;
  //   const y = e.pageY - e.target.offsetTop;
  //   e.target.style.setProperty('--x', `${ x }px`);
  //   e.target.style.setProperty('--y', `${ y }px`);
  //   // console.log(x,y);
  //   // console.log(e.target.style.cssText);
  // })

  // Evaluate the user's choice on click
  $('.answer-hover').on('click',(e) => {
    let answerValue = eval(e.currentTarget.children[0].innerHTML);
    let questionValue = eval($('#question').text());

    evaluateAnswer(answerValue,questionValue,e);

  })

  // Resets the game
  $('#reset-button').click(() => {
    resetGame();
  })


  // FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS
  // =================================================================================

  /**
   * Starts the game by generating random questions, starting the timer,
   * populating the DOM with the questions and answers
   */
  function startGame() {
    createQuestions(5);
    console.log(questions); 
    
    $('#game-over').toggle();

    populateAnswerChoices(currentRound);
    populateQuestion(currentRound);
    stopwatch.start();
  }
  /**
   */
  function endGame() {
    // When game ends, hide game and display user results
    $('#countdown-info').toggle();
    $('#hidden-answer').css('display','none');
    // $('#game').css('display','none');
    $('#game').toggle();
    $('#reset-button').css('display','block');
    $('#game-over').toggle();
    $('#game-over').text(`Correct: ${numberCorrect} Incorrect: ${numberIncorrect} Unanswered: ${numberUnanswered}`);
    stopwatch.stop();
  }

  function resetGame() {
    $('#countdown-info').toggle();
    $('#game').css('display','block');
    $('#reset-button').css('display','none');
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
   * @param  {number} answerValue is the value of the answer clicked
   * @param  {number} questionValue is the value of evaluating the question's expression
   */
  window.evaluateAnswer = function(answerValue,questionValue,event) {

    $('#countdown-info').toggle();
    toggleAnswer();
    toggleHidden();

    if(answerValue == null) {
      console.log('running');
      let result = 'unanswered';
      $('#question').text(`Times up! The answer was: ${questionValue}`);
      setTimeout(nextRound.bind(null,result),2200);
    }

    if(answerValue === questionValue) {
      let result = 'win';
      $('#question').text('Winner winner chicken dinner!');
      setTimeout(nextRound.bind(null,result),2200);
    }

    if(answerValue !== null && answerValue !== questionValue ) {
      let result = 'lose';
      $('#question').text(`Nope!! The answer was: ${questionValue}`);
      setTimeout(nextRound.bind(null,result),2000);
    } 
  }

  /**
   * Toggles between the questions display and revealing the hidden answer
   */
  function toggleAnswer() {
    $('.answer-hover').toggle();
    $('#title').toggle();
  }
  /**
   * Toggles the hidden result image. For some reason toggle wasn't working on this one.
   * Might fix later
   */
  function toggleHidden() {
    if($('#hidden-answer').css('display') !== 'inline') {
      $('#hidden-answer').css('display','inline');
    } else {
      $('#hidden-answer').css('display','none'); 
    }
  }

  function nextRound(result) {
    console.log(result);
    $('#countdown-info').toggle();
    if(result === 'unanswered') {
      numberUnanswered++;
    }

    if(result === 'win') {
      numberCorrect++;
    }

    if(result === 'lose') {
      numberIncorrect++;
    }

    currentRound++;

    if(currentRound < 5) {
    populateAnswerChoices(currentRound);
    populateQuestion(currentRound);
    toggleAnswer();
    toggleHidden();
    stopwatch.reset();
    stopwatch.start();
    console.log(`Round: ${currentRound}`)
    console.log(`Wins: ${numberCorrect}`)
    console.log(`Losses: ${numberIncorrect}`)
    console.log(`Unanswered: ${numberUnanswered}`)
    } else {
      endGame();
    }

  }

  /**
   * @param  {number} questionAmount
   * takes in a number and creates that amount of randomly generated
   * questions objects, and pushes them to the questions array
   */
  function createQuestions(questionAmount) {
    var operands = ['+','-','*','/'];
    
    for(let i = 0; i < questionAmount; i++) {
      // Create question Object
      let qA = {};
      // Create random math question
      qA.question = `${randomizer(1,30)} ${operands[randomizer(1,3)]} ${randomizer(1,30)}`;
      // Create answers array
      qA.answers = [];
      // Add at least one correct answer, in this case, we eval the randomly generated question
      qA.answers.push(eval(qA.question));
      
      // Add 3 dummy answers
      for(let i = 0; i < 3; i++) {
        let wrongAnswer = randomizer(1,900);
        // Makes sure we don't have correct answer duplicates
        if(wrongAnswer === qA.answers[0]) {
          wrongAnswer = randomizer(35,50);
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
   * @param  {number} lowerBound the lower end of range for random generation
   * @param  {number} upperBound the upper end of range for random generation
   * @returns {number} A randomy generated number based on the range provided
   */
  function randomizer(lowerBound,upperBound) {
    return Math.floor(Math.random() * upperBound + lowerBound);
  }


  /**
   * Shuffles array in place. This is used to shuffle our answers array,
   * in order to prevent the first choice from always being the 
   * the correct option
   * @param {Array} arr items An array containing the items.
   * @returns 
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
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
     * @param  {number} currentRound is the current question round
     */
    function populateAnswerChoices(currentRound) {

      // Iterate 4 times because there are 4 answers to choose from
      for(let i = 0; i < 4; i++) {
        // This is where we change which element with a class of 'answer' is targeted by using 'i'
        let ans = $('.answer')[i];
        // This is where we change which question from the questions array (for the current round)
        // we are targeting to the corresponding 
        $(ans).text(questions[currentRound].answers[i]);
      }
    }
    /**
     * Uses the current round to determine which question from our questions array will
     * populate the corresponding location in the DOM
     * @param  {number} currentRound is the current round
     */
    function populateQuestion(currentRound) {
      $('#question').text(questions[currentRound].question);
    }

})
