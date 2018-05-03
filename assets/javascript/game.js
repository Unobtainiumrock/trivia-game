
$(document).ready(function () {


  let questions = [];
  let currentRound = 0;
  let numberCorrect = 0;
  let numberIncorrect = 0;
  let numberUnanswered = 0;
  
// Track the coordinates of the mouse when hovering a question
// Couldn't get CSS animation to fully work. var() portion won't link with
// the setProperty values
  $('.answer-hover').mousemove((e) => {

    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${ x }px`);
    e.target.style.setProperty('--y', `${ y }px`);
    // console.log(x,y);
    // console.log(e.target.style.cssText);
  })



  startGame();

  console.log(questions[0].question,'******');

  /**
   * Starts the game by generating random questions, starting the timer,
   * populating the DOM with the questions and answers
   */
  function startGame() {
    createQuestions(5);
    console.log(questions);    

    populateAnswerChoices(currentRound);
    populateQuestion(currentRound);
  }

  /**
   * @param  {number} questionAmount
   * takes in a number and creates that amount of randomly generated
   * questions objects to be pushed to the questions array
   */
  function createQuestions(questionAmount) {
    
    for(let i = 0; i < questionAmount; i++) {
      // Create question Object
      let qA = {};
      // Create random math question
      qA.question = `${randomizer(1,30)} + ${randomizer(1,30)}`;
      // Create answers array
      qA.answers = [];
      // Add at least one correct answer, in this case, we eval the randomly generated question
      qA.answers.push(eval(qA.question));
      
      // Add 3 dummy answers
      for(let i = 0; i < 3; i++) {
        let wrongAnswer = randomizer(1,30);
        // Makes sure we don't have correct answer duplicates
        if(wrongAnswer === qA.answers[0]) {
          wrongAnswer = randomizer(35,50);
        }
        qA.answers.push(wrongAnswer);
      }
      // shuffle the answers array, so that the first choice isn't always the correct answer
        qA.answers = shuffle(qA.answers);
      // Push randomly generated question object to questions array
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
   * Shuffles array in place.
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
     * This function iterates the answer class and populates each of their fields with
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

    function populateQuestion(currentRound) {
      $('#question').text(questions[currentRound].question);
    }

})
