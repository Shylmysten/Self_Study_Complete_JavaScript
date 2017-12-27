var john = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log(`Good ` + timeOfDay + `, Ladies and Gentlemen! I'm `
       + this.name + `, I'm a ` + this.job + ` and I'm ` + this.age +
        `years old.`);
    } else if (style = 'friendly') {
      console.log(`Hey! What's up? I'm ` + this.name + `I'm a ` + this.job +
    ` and I'm ` + this.age + `years old. Have a nice ` +timeOfDay + `.`);
    }
  }
};
var emily = { name: 'Emily', age: 35, job: 'designer' };

john.presentation('formal', 'morning');

// examply of METHOD BORROWING using the call method
// we call the method in the object john and set 'this' to object emily
john.presentation.call(emily, 'friendly', 'afternoon');

// example of the apply method, but this wont work in this case because
// our function does not take an array as an argument. Again, emily is the
// object we are setting 'this' to
john.presentation.apply(emily, ['friendly', 'afternoon']);

// An example of the bind method. Bind is useful when you don't know all of
// the arguments you'll need upfront. first variable is always what 'this'
// is set to
var johnFriendly = john.presentation.bind('john', 'friendly');
johnFriendly('morning');
johnFriendly('evening');

/***********************************************************************/
/* Another example of using bind is to pass a function with a preset   */
/* argument.                                                           */
/***********************************************************************/
var years = [1990, 1965, 1937, 2005, 1998, 1970];

// Function take two arguments, an array and a
// callback function

function arrayCalc(arr, fn) {
  var arrRes =[];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

// Callback Functions
function calculateAge(el) {
  return (new Date().getFullYear() - el)
}

function isAdult(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

// Passes a copy of the isAdult function with a preset limit of 20. 'this'
// binds it to isAdult and presets the first argument to 20. This allows
// you to pass the isAdult function into line 48 using two arguments,
// where only one is accepted fn = isAdult, limit is preset to 20, while
// the second argument is passed in as el = arr[i]
var adultJapan = arrayCalc(ages, isAdult.bind(this, 20));
