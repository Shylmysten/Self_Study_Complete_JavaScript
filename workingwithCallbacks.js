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

function isAdult(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - (.67 * el));
  } else {
      return -1;
  }
}

// store the results into a variable
var ages = arrayCalc(years, calculateAge);
var adult = arrayCalc(ages, isAdult);
var heartRate = arrayCalc(ages, maxHeartRate);
