/*************************************************************************/
/*                        Coding Challenge 5                             */
/*************************************************************************/
// build a function constructor called Question to describe a question. It
// should include the question, a set of multiple choice answers, and the
// correct answer

( function() {
  // question construcer that defines the what a question object is
  var Question = function( question, answerObj, correctAnswer ) {
    this.question = question;
    this.answerObj = answerObj;
    this.correctAnswer = correctAnswer;
  };

  /** Questions Data module **/
  var questions = [
    `When did the Liberty Bell get its name?`,
    `Which of the following items was owned by the fewest U.S. homes in 1990?`,
    `Which of these characters turned 40 years old in 1990?`,
    `Who is third behind Hank Aaron and Babe Ruth in major league career home runs?`,
    `Who holds the record for the most victories in a row on the professional golf tour?`,
    `Herodotus is known as the father of what?`
  ];

  // Multiple choice answers for each question. Each object element in the
  // answers array corresponds to the element position of the Questions
  // in the questions array above
  var answers = [ {
      1: `When it was made, in 1701`,
      2: `When it rang on July 4, 1776`,
      3: `In the 19th century, when it became a symbol of the abolition of slavery`,
      4: `None of the above`
    },
    {
      1: `home computer`,
      2: `compact disk player`,
      3: `cordless phone`,
      4: `dishwasher`
    },
    {
      1: `Charlie Brown`,
      2: `Bugs Bunny`,
      3: `Mickey Mouse`,
      4: `Fred Flintstone`
    },
    {
      1: `Reggie Jackson`,
      2: `Harmon Killebrew`,
      3: `Willie Mays`,
      4: `Frank Robinson`
    },
    {
      1: `Jack Nicklaus`,
      2: `Arnold Palmer`,
      3: `Byron Nelson`,
      4: `Ben Hogan`
    },
    {
      1: `History`,
      2: `Medicine`,
      3: `Theatre`,
      4: `Music`
    }
  ];

  // the correct answers for each questions in the questions array in order
  // each element in the correctAnswers array corresponds to the positions
  // of each question element in the questions array.
  var correctAnswers = [ 3, 2, 1, 3, 3, 1 ];
  /** End of questions Data Module **/

  // Sets up an array where the questions are stored after they are constructed
  // with questions, answers and the correct answers
  var qArray = [];

  // Sets up and index number to loop through the elements of qArray
  var idx = 0,
    // Sets a variable to store the score
    score = 0;

  // Starts the game
  init();

  // Build questions array
  function buildQuestionsArray() {
    // builds the questions from 3 arrays, questions, multiple choice answers and the corrects answer.
    for ( var i = 0; i < questions.length; i++ ) {

      // Constructor for each new question
      var Qi = new Question( questions[ i ], answers[ i ], correctAnswers[ i ] );

      // stores the newly constructed questions into an array to be called later
      qArray.push( Qi );
    }

    // Shuffles all the questions in the qArray after they have been assembled
    var m = qArray.length,
      t, i;
    debugger

    // While there remain elements to shuffle…
    while ( m ) {

      // Pick a remaining element…
      i = Math.floor( Math.random() * m-- );

      // And swap it with the current element.
      t = qArray[ m ];
      qArray[ m ] = qArray[ i ];
      qArray[ i ] = t;
    }
    // Prints the next set of questions and answers
    nextQuestion();
  }

  // Calls the next question and prints it to the console, then waits for the
  // user to answer.
  function nextQuestion() {

    // Checks for the last question in the constructed questions array.
    if ( idx > qArray.length - 1 ) {
      // if it is the last question, return the idx to the first element
      idx = 0;
      // empty the array of questions.
      qArray = [];
      // build a new set of questions
      buildQuestionsArray();
    } else {
      // if the its not the last question, then print the next question to
      // the console.
      console.log( qArray[ idx ].question );
      // loops through the answer element of the question object in the qArray
      // and prints them in order to the screen with a number for the user to
      // select
      var printAnswers = Object.keys( qArray[ idx ].answerObj ).forEach( function( key ) {
        console.log( key + `. ` + qArray[ idx ].answerObj[ key ] );
      } );
      // sets a prompt for the user to answer and stores their answer in a variable
      var userAnswers = prompt( `Please select the correct answer (just type the number / type exit to quit).` );
      // checks to see if the user has opted to exit/end the game
      if ( userAnswers === 'exit' ) {
        // if the user chose to exit, end the game
        return;
        // otherwise check the users answer for the correct answer to the given
        // question
      } else if ( userAnswers == qArray[ idx ].correctAnswer ) {
        // if the answer is correct, add 1 to their score
        score++;
        // tell the user their answer is correct and show their score
        console.log( `Corrent Answer!\nYour current score is: ` + score + `.` );
        // seperate the old question from the new question about to be asked
        console.log( `-----------------------------------------------------` );
        // increment the index of the array to select the next question
        idx++;
        // move to the next question in the qArray
        nextQuestion();

      } else { // if the user answer if wrong, tell them and show their score
        console.log( `Wrong Answer. Try again :)\nYour current score is: ` + score + `.` );
        // seperate the old question from the new question about to be asked
        console.log( `-----------------------------------------------------` );
        // increment the index of the array to select the next question
        idx++;
        // move to the next question in the qArray
        nextQuestion();
      }
    }
  }


  // a function to start the game
  function init() {
    // set the index of qArray to the first question in the array.
    idx = 0;
    // reset the score to 0
    scores = 0;
    // build a new set of randomly sorted questions for the user to answer
    buildQuestionsArray();
  }
} )();