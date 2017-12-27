// sets up a generic function
function interviewQuestion(job) {
  function (name) {
    if (job === 'designer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if (job === 'teacher') {
      console.log('What subject did you teach, ' + name + '?');
    } else {
        console.log('Hello ' + name + ', what do you do?')
    }
  }
}
/* sets the function call to a variable, since teacher is passed into the
 job variable it returns the anyonymous function in the condition to be
 executed next  */
var teacherQuestion = interviewQuestion('teacher');
/* Example: This line of code above returns

interviewQuestion('teacher');
ƒ (name) {
      console.log('What subject did you teach, ' + name + '?');
    }

So to execute the code in anyonymous function it can be written two ways */
teacherQuestion('John'); /* Since teacherQuestion select the anonymous
function in the interviewQuestion, John will be  passed to the name variable
within it */
interviewQuestion('teacher')('John'); /* which passes teacher to the job
variable,and selects the scope for 'John' to be passed into the anonymous
function */
interviewQuestion()('John'); /* selects the Scope (the last else condition)
for John to be passed into, since the job condition has not been met */
