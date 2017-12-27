/*************************************************************************/
/*                        Coding Challenge 5                             */
/*************************************************************************/
// build a function constructor called Question to describe a question. It
// should include the question, a set of multiple choice answers, and the
// correct answer


(function () {
  var Question = function(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  };
  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + `: ` + this.answers[i]);
    }
  }

  Question.prototype.checkAnswer = function (ans, callback) {
    var sc;
     if (ans === this.correct) {
       console.log(`Correct answer!`);
       sc = callback(true);
     } else {
        console.log(`Wrong answer. Try again :)`);
        sc = callback(false);
     }
     this.displayScore(sc);
  }

  Question.prototype.displayScore = function (score) {
    console.log(`Your current score is: ` + score);
    console.log(`----------------------------------`);
  }

  var q1 = new Question(`When did the Liberty Bell get its name?`, [
    `When it was made, in 1701`,
    `When it rang on July 4, 1776`,
    `In the 19th century, when it became a symbol of the abolition of slavery`,
    `None of the above`
  ], 3);

  var q2 = new Question(`Which of the following items was owned by the fewest U.S. homes in 1990?`, [
    `home computer`,
    `compact disk player`,
    `cordless phone`,
    `dishwasher`
  ], 2);

  var q3 = new Question(`Which of these characters turned 40 years old in 1990?`, [
    `Charlie Brown`,
    `Bugs Bunny`,
    `Mickey Mouse`,
    `Fred Flintstone`
  ], 1);
var questions = [q1, q2, q3];

function score() {
  var sc = 0;
  return function (correct) {
    if (correct) {
      sc++;
    }
    return sc;
  }
}

var keepScore = score();

function nextQuestion() {

  var n = Math.floor(Math.random() * questions.length);
  questions[n].displayQuestion();
  var answer = prompt(`Please select the correct answer. (just type the number)`);

  if (answer !== `exit`) {
    questions[n].checkAnswer(parseInt(answer), keepScore);
    nextQuestion();
  }
}
nextQuestion();
}) ();
