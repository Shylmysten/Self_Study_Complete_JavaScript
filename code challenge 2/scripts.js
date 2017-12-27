// create an array filled with birthyears
birthYear = [1970, 1945, 1971, 1901, 1933];

function printFullAge(birthYear) {
    // create an empty array and fill it with the ages of each person.
    ages = [];
    var isAdult = [];
    for (var i = 0; i < birthYear.length; i++) {
        var age = (new Date()).getFullYear() - birthYear[i]
        ages.push(age);
    }
    for (var i = 0; i < ages.length; i++) {
        if (ages[i] >= 18) {
            console.log(`Person#${i+1} is an adult of ${ages[i]} years old.`);
            isAdult.push("True");
        } else {
            console.log(`Person#${i+1} is a minor of ${ages[i]} years old.`);
            isAdult.push("False");
        }
    }
    return isAdult;
}
var full_1 = printFullAge(birthYear);
var full_2 = printFullAge([1910, 1955, 2007, 2011, 2001]);
