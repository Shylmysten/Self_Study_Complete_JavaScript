var name, age, height, heightInCentimeters;
var luckyNumber = [];
/* Winner is the highest of
heightInCentimeters + fiveTimesAge
*/


function friend(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.heightInCentimeters = function () {
        var feet = parseInt(this.height.split('.')[0]);
        var inches = parseInt(this.height.split('.')[1]);
        return (((feet * 12) + inches) * 2.54);
    };
    this.luckyNumber = function () {
        return ((parseInt(this.age) * 5) + (this.heightInCentimeters()));
    }
}

// friend 1
//getName();
//getAge(getHeight);
//getHeight();
name = prompt(`What is the Name of freind #1?`);
age = prompt(`What is the age of friend #1?`);
height = prompt(`What is the heigh in feet and inches of freind #1? (for example: 6.2 is 6 foot 2 inches)`);
var firstFriend = new friend(name, age, height);
//friends.push(firstFriend.name);
luckyNumber.push(firstFriend.luckyNumber());
var ff = firstFriend.luckyNumber();
// friend 2
//getName(getAge);
//getAge(getHeight);
//getHeight();
name = prompt(`What is the Name of freind #2?`);
age = prompt(`What is the age of friend #2?`);
height = prompt(`What is the heigh in feet and inches of freind #2? (for example: 6.2 is 6 foot 2 inches)`);
var secondFriend = new friend(name, age, height);
//friends.push(secondFriend.name);
luckyNumber.push(secondFriend.luckyNumber());
var sf = secondFriend.luckyNumber();
// freind 3
//getName(getAge);
//getAge(getHeight);
//getHeight();
name = prompt(`What is the Name of freind #3?`);
age = prompt(`What is the age of friend #3?`);
height = prompt(`What is the heigh in feet and inches of freind #3? (for example: 6.2 is 6 foot 2 inches)`);
var thirdFriend = new friend(name, age, height);
var tf = thirdFriend.luckyNumber();
//friends.push(thirdFriend.name);
luckyNumber.push(thirdFriend.luckyNumber());

function findTheWinner() {
 // determine a tie between who
 if (ff == sf && sf == tf) {
   // 3 way tie
   console.log(`It's a three way tie! ${firstFriend.name}, ${secondFriend.name}, and ${thirdFriend.name} all had the same number of ${firstFriend.luckyNumber()}.`);
   return;
 } else if (ff == sf) {
   // 2 way tie ff / sf
   console.log(`It's a tie between ${firstFriend.name} and ${secondFriend.name} with ${firstFriend.luckyNumber()}!`);
 } else if (sf == tf) {
   // 2 way tie sf / tf
   console.log(`It's a tie between ${secondFriend.name} and ${thirdFriend.name} with ${secondFriend.luckyNumber()}!`);
 } else if (ff == tf) {
   // 2 way tie ff / tf
   console.log(`It's a tie between ${firstFriend.name} and ${thirdFriend.name} with ${firstFriend.luckyNumber()}!`);
 } else { // determine a winner
      if (ff > sf && ff > tf) {
        // ff wins
        console.log(`${firstFriend.name} has the winning number of ${firstFriend.luckyNumber()}!`);
      } else if (sf > ff && sf > tf) {
        // sf wins
        console.log(`${secondFriend.name} has the winning number of ${secondFriend.luckyNumber()}!`);
      } else {
        // tf wins
        console.log(`${thirdFriend.name} has the winning number of ${thirdFriend.luckyNumber()}!`);
      }
 }
}
findTheWinner();

/*
function getName(callback) {
    name = prompt(`What is the Name of freind #1?`, `Your name here`);
    if (isNaN(name)) {
        console.log("You have entered : " + name);
        debugger
        callback(getHeight);
    } {
        console.log("You have entered a number...Please try again.");
        //  name = prompt("Enter your name : ", "Your name here");
        name = prompt(`What is the Name of freind #1?`, `Your name here`);
    }
}

function getAge(callback) {
    age = prompt(`What is the age of friend #1?`, `Enter your age here.`);
    debugger
    if (isNaN(age)) {
        console.log("You have entered a something other than a number...Please try again.");
        age = prompt(`What is the age of friend #1?`, `Enter your age here.`);
    } {
        console.log("You have entered : " + age);
        debugger
        callback();
    }
}

function getHeight() {
    height = prompt(`What is the height in feet and inches of freind #1?`, `for example: 6.2 is 6 foot 2 inches)`);
    if (isNaN(height)) {
        console.log("You have entered a something other than a number...Please try again.");
        //height = prompt("Enter your AGE : ", "How old are you?");
        height = prompt(`What is the height in feet and inches of freind #1?`, `for example: 6.2 is 6 foot 2 inches)`);
    } {
        console.log("You have entered : " + height);
    }
}
*/

/*
function findTheWinner() {
    // which is the highest number?
    var winningNumber = Math.max(...luckyNumbers);

    // So which friend won?
    switch (luckyNumbers.indexOf(winningNumber)) {
        case 0:
            console.log(`${firstFriend.name} has the winning number of ${winningNumber}!`);
            break;
        case 1:
            console.log(`${secondFriend.name} has the winning number of ${winningNumber}!`);
            break;
        case 2:
            console.log(`${thirdFriend.name} has the winning number of ${winningNumber}!`);
            break;
        default:
            console.log(`Somethings not right here!`);
    }
}
findTheWinner();*/
