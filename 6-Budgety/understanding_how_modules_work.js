var budgetController = (function () {
  // set a variable to x that is not accessible outsie
  //this closure, except to the method, publicTest
  //even after the IIFE statement has executed
  var x = 23;

  // place a function in a variable that is not
  // accessible outside this closure, except to
  // the method publicTest, even after the IIFE
  // statement has executed. The add function
  // just returns the sum of two numbers
  var add = function (a) {
    return x + a;
  }
  // returns a method that has access to both the x
  // variable and the add function in the closure
  // of the IIFE accessed by utilizing
  // budgetController.publicTest(5)
  return {
    publicTest: function (b) {
      // returns the results to the Z variable in the appController
      // module when it is called
      return add(b);
    }
  }

})();

// UI Module which controls and updates the User Interface
var UIController = (function () {
  // some code later
})();


// Controller Module controls the entire application. By passing
// in the budgetController and UIController app, well let this
// module know that the other two exist. By naming the inside
// passed modules budgetCtrl, and UICtrl we allow the outside
// modules to change names if need be and only need to change The
// outside passed functions to match the changed module names
var appController = (function (budgetCtrl, UICtrl) {
  // stores the return of the publicTest method in the budgetController
  // module which is the return of the add function in the closure
  // z is not accessible anywhere outside the appController module except
  // through the method anotherPublic called like so
  // appController.anotherPublic();
  var z = budgetCtrl.publicTest(5);


  return {
    anotherPublic: function () {
      console.log(z);
    }
  }
})(budgetController, UIController);
