
$(document).ready(function () {

  let questions = [];



// Track the coordinates of the mouse when hovering a question
// Couldn't get CSS animation to fully work. var() portion won't link with
// the setProperty values
  $('.answer-hover').mousemove((e) => {

    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${ x }px`);
    e.target.style.setProperty('--y', `${ y }px`);
    // console.log(x,y);
    console.log(e.target.style.cssText);
  })


  createQuestions(5);
  console.log(questions);



  /**
   * @param  {number} questionAmount
   */
  function createQuestions(questionAmount) {
    
    for(let i = 0; i < questionAmount; i++) {
      // Create question Object
      let qA = {};
      // Create random math question
      qA.question = `${randomizer(1,30)} + ${randomizer(1,30)}`;
      // Create answers array
      qA.answer = [];
      // Add at least one correct answer
      qA.answer.push(eval(qA.question));
      
      // Add 3 dummy answers
      for(let i = 0; i < 3; i++) {
        let wrongAnswer = randomizer(1,30);
        // Makes sure we don't have correct answer duplicates
        if(wrongAnswer === qA.answer[0]) {
          wrongAnswer = randomizer(35,50);
        }
        qA.answer.push(wrongAnswer);
      }
      // shuffle the answers array, so that the first choice isn't always the correct answer

      // Push randomly generate question object to questions array
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
   * Shuffles array in place. ES6 version
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


})
