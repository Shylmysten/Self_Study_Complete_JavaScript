/*----------------------------------------------------------------*/
/** Data module updates and manipulates the data out of sight of **/
/** the user                                                     **/
/*----------------------------------------------------------------*/

var dataModule = (function() {

  // Function constructors to DEFINE an expense or income item for input data
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  // add a METHOD to the Expense prototype to calculate the percentages
  // of each of the this.values in the Expense objects
  Expense.prototype.calcPercentage = function(totalIncome) {
    // make sure the total Income is greater than 0, because you cant divide
    // anything by 0
    if (totalIncome > 0) {
      // calculate the percentage of income for each exp item
      this.percentage = Math.round((this.value / totalIncome) * 100);
      // if there is no income then there is no percentage
    } else {
      this.percentage = -1;
    }
  };

  // adds a METHOD to the Expense prototype to return the percentages
  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };



  // setup up a function to calculate the Totals for both the inc and exp arrays
  // in allItems object, then store them in their corresponding fields in the
  // Totals object
  var calculateTotal = function(type) {
    var sum = 0;

    // loop through the array keeping track of the current element (cur)
    // and assign sum = sum + cur.value (this.value of the current object
    // in the income (inc) or expense (exp) arrays in allItems)
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    // set the total[type] (inc) or (exp) to the value stored in the sum variable
    data.totals[type] = sum;
  };

  // sets up a data structure to store the input data into. allItems will be
  // stored as either an expense (exp) or income (inc), the Totals will be
  // stored as a sum of each type, either income or expense. Budget data
  // is the Income - expenses. And percentages are quotient of 1/(1/(exp/inc))
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  // Returns Methods that allows the data to remian private, but also to be
  // manipulated/updated and/or then passed back to other modules
  return {

    // Establishes a method by which the input data in the appController module
    // can be passed into the dataModule, manipulated, stored in the DataModule
    // and then the results returned are to the appController Module.
    addItem: function(type, descr, val) {

      // declare the variable newItem for the newly created object and new ID
      // to be stored later
      var newItem, ID;


      // Checks to see if the array is empty, which the operation below would
      // result in an undefined error
      if (data.allItems[type].length > 0) {

        // Assigns an ID to all items, whether they are an income or an
        // expense that is greater than the last ID in the array in case
        // we have deleted some items. [1 2 4 6 8] the next ID
        // that is created would be 9 in this case. The missing sequence
        // would be items we have deleted.
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

        // if the array is empty,
      } else {

        //  then the first element in the array should always be 0
        ID = 0;
      }

      // if the Object (type, description, value) is of type Expense (exp)
      if (type === 'exp') {

        // call the Expense constructor to create a new Expense Object giving
        // it an ID, along with its value and description
        newItem = new Expense(ID, descr, val);

        // if the Object (type, description, value) is of type Income (inc)
      } else if (type === 'inc') {

        // call the Income constructor to create a new Income Object giving
        // it an ID, along with its value and description
        newItem = new Income(ID, descr, val);
      }

      // Store the new Object (ID, decription, value) according to its type
      // as an Expense (exp)or as Income (inc), in the corresponding array
      // of the main data Object above
      data.allItems[type].push(newItem);

      // Once the data from the input has been manipulated, return the newItem
      // so that it is accessible to the other two modules.
      // the return here is sent back the the appController Module in step 2
      // of the ctrlAddItem function.
      return newItem;

    },

    // Establishes a method by which the list item in the UI module
    // can be passed into the dataModule, and deleted from the data structure
    // in the DataModule and then the results returned are to the
    // appController Module.
    deleteItem: function(type, id) {

      // declare two variables to be used later
      var ids, index;

      // iterate over the array using the callback function to keep track
      // of both the current element and the index of that element, by Using
      // dot notation it allows us to pull the ID out of the object in the
      // current element
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      // assignes the variable, index, to the index in the ids array of the
      // value that was passed in through the variable id
      index = ids.indexOf(id);

      // if the ids array is empty it will return a -1, so if it isn't empty
      if (index !== -1) {

        // delete ONE item starting at value stored in the index variable
        data.allItems[type].splice(index, 1);
      };

    },

    // Establishes a Method to access the data in the dataModule, perform
    // Calculations, and then update the results in the dataModule
    calculateBudget: function() {

      // Calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;


      // make sure we have an income, you can't divide something into 0
      // or you will get a value of infinity from Javascript
      if (data.totals.inc > 0) {
        // Calculate the percentage of income that we spent
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {

        // make the percentage non-existent
        data.percentage = -1;
      }


    },

    // Establishes a Method through which other Modules can access the data
    // stored within the DataModule
    calculatePercentages: function() {
      // loop through each item in the exp array of the allItems Object
      // and keep track of the current element (cur) so that we can use the
      // dot notation method to perform the calcPercentage function on each
      // item in the array.
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    // Establishes a METHOD through which other Modules can access the data
    // in the DataModule
    getPercentages: function() {
      // declare the variable allPerc loop through each item of the exp
      // array in the allItems object, then calculate the percentage of exp
      // to income and store it in the allPerc as an array
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      // return the allPerc array into the PUBLIC after all calculations
      // have completed
      return allPerc;
    },

    // Establishes a Method through which the other modules can access the data
    // stored within the DataModule
    getBudget: function() {
      // Make Public this data by returning outside the DataModule IIFE
      return {
        // make public the budget total
        budget: data.budget,
        // make public the total income
        totalInc: data.totals.inc,
        // make public the total expenses
        totalExp: data.totals.exp,
        // make public the percentage of expenses to income
        percentage: data.percentage
      };
    },
    // this method is used to view ALL the data in the dataModule for debugging
    // purposes in the console.
    testing: function() {
      console.log(data);
    }

  };
})();




/*-----------------------------------------------------------------*/
/** UI Module which controls and updates the User Interface which **/
/** the user can see                                              **/
/*-----------------------------------------------------------------*/

var UIModule = (function() {

  // setUp an object with CSS classes in case a CSS class is changed it can be
  // easily updated in one place rather than all throughout the code.
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    deletebtn: `.item__delete--btn`,
    container: `.container`,
    expensesPercLabel: `.item__percentage`,
    currentDate: '.budget__title--month'
  };

  // the function passes a list/nodelist (fields) and a callback function,
  // which is defined below as the nodeListForEach function,
  var nodeListForEach = function(list, callback) {

    // for each iteration, call our callback function, incrementing the
    // current element (list[i]) and the index (i) of the element in the
    // NodeList
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };


  // Establishes a METHOD to be called in the appController that formats
  // the numbers so that Income shows a + before it and and Expense show a
  // - bofre it. Also, the number should show 2 decimal points and a comma
  // seperating the thousands
  var formatNumber = function(num, type) {

    // This function is called after a comma has been inserted into the correct
    // location, it passes the new int array into it and array numbSplit
    // which holds the int of the original number and the decimal of that number
    // stored as two elements in the array
    var reverseString = function(arr, numSplit) {
      // declares variables we will use in this function
      var int, numSplit, type;
      // takes the passed in int array and reverses it a second time so that
      // int = ['0','0','0',',','1'] is now int = ['1',',','0','0','0']
      int = arr.reverse();
      // takes all the elements of the int array and parses it back into one
      // long string. i.e. int = int = ['1',',','0','0','0'] is now made
      // int = ['1,000']
      int = int.join('');
      // assigns the newly formated number back to the first element of the
      // numSplit array
      numSplit[0] = int;
      // takes the two elements from the numSplit array, numSplit[0] which is
      // the int part of the number, and numSplit[1] which is the decimal part
      // of the number, and rejoins them into one string replacing the decimal
      // point then assigns the num variable to the newly created string.
      // i.e. numSplit = ['1,000', '00'] is now numSplit = ['1,000.00'] and
      // passed into num
      num = numSplit.join('.');
      // exit the function returning the results to the function that called it
      return num;
    }

    // declares a list of variables to be used within the function
    var type, numSplit, int, dec, newArray, num;
    // take the num variable passed in and gets the absolute Value of that
    // number in case we are formating a total budget Item for the UI,
    // which is stored as a negative number
    num = Math.abs(num);
    // takes the 'num' variable passed into the function and rounds it up to
    // the nearest 100th decimal place and fixes the number to have to decimal
    // places, then reassigns that number to the num variable
    num = (Math.round(num * 100) / 100).toFixed(2);
    // take the number and splits it into two number at the decimal point
    // then stores it as an array of two elements in the numSplit variable
    numSplit = num.split('.');
    // assigns the variable 'int' (the integer part of the number)
    // to the first element of the numSplit array
    int = numSplit[0];
    // assigns the variable dec (the decimal part of the number) to the second
    // element in the numSplit array which is the decimal portion of num
    dec = numSplit[1];
    // creates an array of elements out of the number stored in the int variable
    // i.e. if int = 1000, newArray will be ['1','0','0','0']
    newArray = Array.from(int);
    // reverse the order of the elements in the array, newArray and reassigns
    // it to the int variable, i.e. if new array = ['1','0','0','0']
    // int will now be ['0','0','0','1']
    int = newArray.reverse();

    // loop throough the elements of the int array.
    for (var i = 0; i < int.length - 1; i++) {
      // if the REVERSED number stored in the 'int' array is in the
      // thousands (4 numbers long)
      if (int.length === 4) {
        // because the number is REVERSED, 1000 would now be 0001, we need to
        // SPLICE in a comma at the 3rd element. the 0 states the number of
        // elements we are removing, in this case, NONE, we just want to insert
        // the comma after the 3rd element
        int.splice(3, 0, ',');
        // now that comma has been inserted, we need to do some other operations
        // found in the reverseString function before it is ready to be returned
        // and updated in the UI
        reverseString(newArray, numSplit);
        // now that the number has been formated, check the type using the
        // ternary operator, if its an expense (exp) place a '-' symbol in front
        // of the newly formated number, if its not, it has to be 'inc' so place
        // and '+' symbol in front of the newly formated number. Then return
        // the reformated string to Method that called it
        return (type === 'exp' ? '-' : '+') + num;


        // since the number is larger than 4, it might have several commas
        // this condition just address the first comma to be placed. So
        // in the third iteration
      } else if (i === 3) {
        // because the number is REVERSED, 1000 would now be 0001, we need to
        // SPLICE in a comma at the 3rd element, and we can do that because
        // i=== 3. the 0 states the number of elements we are removing,
        // in this case, NONE, we just want to insert the comma after the
        // 3rd element
        int.splice(i, 0, ',');
        // since we spliced in a comma, the array.length has now increased by
        // one, so we need to increment i to skip over the new comma (','),
        // element that we spliced in, then we can continue looping through
        // the rest of the elements to see if we need to add more commas
        i++;

        // if the array.length is greater than 4, we know that the number we are
        // formating is larger than 1,000, and if we have arrived here, then we
        // have already added our first comma in the number
      } else {
        // so we just need to continue looping through the elements, only now
        // with each iteration, we'll check to see if there is a comma
        // three elements behind our current element (int[i-3] to know where
        // to place the next comma until we reach the end of our array.
        if (int[i - 3] === ',') {
          // if there is a comma three elements behind, then we need to place
          // a comma after the current element, so if 'i' is the current
          // element int[i] then int[i+1] would splice the comma (',') after
          // the current element. the 0 states the number of elements we are
          // removing, in this case, NONE, we just want to insert the comma
          // after the current element. Then continue looping
          int.splice(i + 1, 0, ',');
        }
      }

    }
    // arriving here we have finished looping a number that was larger than 9,999
    // so our larger number is now formated with commas, but we still need to
    // do some other operations found in the reverseString function before it
    // is ready to be returned and updated in the UI
    reverseString(int, numSplit);
    // now that the number has been formated, check the type using the
    // ternary operator, if its an expense (exp) place a '-' symbol in front
    // of the newly formated number, if its not, it has to be 'inc' so place
    // and '+' symbol in front of the newly formated number. Then return
    // the reformated string to Method that called it
    return (type === 'exp' ? '-' : '+') + num;

    /* only works to $999,999
        var numSplit, int, dec, type;
        // sets the number with two decimal places
        num = num.toFixed(2);
        // splits the number at the decimal point into an array of two elements
        numSplit = num.split('.');
        // assign the first part of the array to the int variable for integer
        int = numSplit[0];
        // assign the second part of the array to the dec variable for decimal places
        dec = numSplit[1];
        // if the integer is greater than three numbers we need to add a decimal place
        if (int.length > 3) {
          // At the 3rd position in string place a COMMA(,) then add the rest
          // of the string behind it.
          int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        */
  };

  // Allows the UIModule to return methods to the Public Scope
  return {
    // establishes the method getInput to get the user input from the DOM
    getInput: function() {
      // the method will return the user input as a PUBLIC object for other
      // modules to use, with three items: {type (exp or inc), description, value}
      return {
        // get the type of input, either inc (income) or exp (expence)
        type: document.querySelector(DOMstrings.inputType).value,
        // get the item description from the input field
        description: document.querySelector(DOMstrings.inputDescription).value,
        // get the item value from the input field
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };

    },

    // sets up a method by which a dataObject (ID, description, value) can
    // be manipulated by it's type (inc or exp)
    addListItem: function(obj, type) {

      // setup the variables used to store the html and div classes in
      var html, newHtml, element;

      // 1. Create an HTML DOM string with placeholder text to be manipulated
      // later

      // if the object's type is income (inc)
      if (type === 'inc') {

        // sets the element to the DIV container with class .income__list,
        // which is where new income will be displayed in a list in the DOM
        element = DOMstrings.incomeContainer;

        // if the data type is INCOME then use this as the HTML string
        html = `<div class="item clearfix" id="inc-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;

        // if the object's type is expenses (exp)
      } else if (type === 'exp') {

        // sets the element to the DIV container with class .expenses__list,
        // which is where new expenses will be displayed in a list in the DOM
        element = DOMstrings.expensesContainer;

        // if the data type is EXPENSE then use this as the HTML string
        html = `<div class="item clearfix" id="exp-%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }

      // 2. Replace the placeholder text with some text

      // stores the entire HTML string selected in the condition above
      // into the newHTML variable, replacing the %ID% string.
      newHtml = html.replace('%ID%', obj.id);


      // When we replaced the ID string above, we placed the ENTIRE
      // HTML string, WITH THAT REPLACEMENT, into the new HTML STRING,
      // so any subsequent changes/replacements should be made to the new
      // string now stored in the newHtml variable
      newHtml = newHtml.replace('%DESCRIPTION%', obj.description);
      newHtml = newHtml.replace('%VALUE%', formatNumber(obj.value, type));


      // 3. Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    // sets up a method by which a dataObject (ID, description, value) can
    // be deleted from the dataStructure by it's type (inc or exp) and ID
    deleteListItem: function(selectorID) {

      // select the element by its selector id and assign it to
      // the variable el
      var el = document.getElementById(selectorID);

      // remove the the child of the parentNode of el
      el.parentNode.removeChild(el);
    },


    // Establishes a Method to clearn the input fields after the button is
    // pushed of return is entered
    clearFields: function() {

      // sets up a variable to store the Nodelist returned by querySelectorAll below, and then the resulting array that the Nodelist is formated into
      var fields, fieldsArr;

      // selects the input fields in the Nodelist and returns a string list
      fields = document.querySelectorAll(DOMstrings.inputDescription + `, ` +
        DOMstrings.inputValue);

      // By using the slice Method in the Array prototype, we massage/manipulate
      // a STRING list into being stored as an array
      fieldsArr = Array.prototype.slice.call(fields);

      // Loop over the fieldArr  we will pass the currentElement, the Index
      // of that element, and the array
      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      // resets the focus/cursor to the description field to be waiting for
      // the users next item input
      fieldsArr[0].focus();
    },

    // Establishes a METHOD which allows us to pass the budget data between
    // modules and manipulates the UI which is called in the appController module
    displayBudget: function(obj) {
      var type;
      obj.budget >= 0 ? type = 'inc' : type = 'exp';
      // Updates the Total budget__value field in the DOM at the top of the page
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);

      // Updates the budget__expenses total in the DOM at the top of the Page
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, `inc`);

      // Updates the budget__income total in the DOM at the top of the page
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, `exp`);

      // Checks to make sure the percentage is not less than 0 (-1) as we set it
      if (obj.percentage > 0) {

        // Updates the percentage of income for the budget__expenses total
        // field at the top of the page in the UI
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + `%`;

      } else {
        // show --- as a placeholder when there is no percentage to show in the UI
        document.querySelector(DOMstrings.percentageLabel).textContent = `---`;
      }


    },

    // Establishes a METHOD which allows us to pass the budget data between
    // modules and manipulates the UI which is called in the appController module
    displayPercentages: function(percentages) {


      // sets up an array of elements that is pulls from the NodeList of
      // elements that only have the item__percentage class
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      // defines the callback function passed into the functon above passes the
      // current element and the index of that element in the NodeList.
      nodeListForEach(fields, function(current, index) {
        // if the nodeList is not empty
        if (percentages[index] > 0) {
          // replace the textContent with the calculated percentage and
          // add a % sign to show in the UI so at the first element, show the
          // first calculated percentage, at the second element, show the second
          // calculated percentate, etc.
          current.textContent = percentages[index] + `%`;
          // if the nodelist is empty
        } else {
          // use --- as a placeholder and to show in the UI
          current.textContent = `---`;
        }
      });

    },

    // creates a method to be called at the app initialization
    currentDate: function() {
      // get the current year and store it in the variable 'year'
      var year = new Date().getFullYear();
      // get the current month and store it in long form and store it in the variable, 'month'
      // (i.e. short form for the 12th month would be DEC. long is spelled out)
      var month = new Date().toLocaleString("en-us", {
        month: "long"
      });
      // select the element in the DOM by it's class, to place the new Date into
      // and update the UI with the new date.
      document.querySelector(`.budget__title--month`).textContent = month + ` ` + year;
    },

    // establishes a METHOD that selects elements in the DOM to be manipulated
    // when the input selector is changed, or the current focus is in a
    // particular field.
    changeType: function() {

      // selects the DOM elements by their Classes to be manipulated and creates a
      // NodeList of each of those elements, assigning them to the fields variable
      var fields = document.querySelectorAll(
        DOMstrings.inputType + `,` +
        DOMstrings.inputDescription + `,` +
        DOMstrings.inputValue);

      // creates call back funtion to be called by the nodelistForEach function
      // at decalared at the beginning of the UIModule, it accepts the NodeList
      // 'fields' as an argument a function to keep track of the current element
      // to toggles the red-focus CSS class on or off depending on whether the
      // eventListener was triggered by a change event.
      nodeListForEach(fields, function(cur) {
        cur.classList.toggle('red-focus');
      });

      // Selects the input button in the DOM and toggles the red CSS class on
      // or off depending on whether the eventListener was triggered by a
      // change event.
      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },

    // Establishes a method to pass the DOMstrings between modules (PUBLIC) so
    // they can be used outside the UIModule IIFE
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();



/*------------------------------------------------------------------*/
/** Global app Controler module controls the entire application.   **/
/** By passing in the dataModule and UIModule, well let this       **/
/** module know that the other two exist. By naming the inside     **/
/** passed modules dataMdl, and UIMdl we allow the outside         **/
/** modules to change names if need be and only need to change The **/
/** outside passed functions to match the changed module names     **/
/*------------------------------------------------------------------*/

var appController = (function(dataMdl, UIMdl) {

  // set up event listeners
  var setupEvenListeners = function() {

    // passes the DOMstrings object to allow the appController access to use them
    var DOM = UIMdl.getDOMstrings();

    // attach event listener to the add item button in the UI (checkmark)
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // attach even listener to the enter key
    document.addEventListener('keypress', function(e) {

      // add data only if they enter key was pressed
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

    // attach an event listener to the delete item button for each row in the
    // expenses and income items list
    document.querySelector(DOM.container).addEventListener('click',
      ctrlDeleteItem);

    // attaches an event listener to the input selector (exp/inc) and input fields
    // and calls the changeType METHOD in the UIMODULE
    document.querySelector(DOM.inputType).addEventListener('change', UIMdl.changeType);


  }; // end setupEvenListeners function


  // Sets up a function to manipulate the data Using METHODs in the DataModule,
  // then update the UI elements to reflect those changes using METHODS from
  // the UIModule. The function is called below in the ctrlAddItem function
  var updateBudget = function() {

    // 1. Calculate the budget
    dataMdl.calculateBudget();

    // 2. Return the budget
    var budget = dataMdl.getBudget();

    // 3. Display the budget in the UI
    UIMdl.displayBudget(budget);

  }; // end updateBudget function


  var updatePercentages = function() {

    // 1. Calculate the Percentages in the DataModule
    dataMdl.calculatePercentages();

    // 2. Read the percentages stored in the DataModule and assign it to an
    // array called percentages
    var percentages = dataMdl.getPercentages();

    // 3. Update the UI with the Percentages passed back from the DataModule,
    // and then updated in the corresponding DOM elements in the UIModule
    UIMdl.displayPercentages(percentages);

  };

  // defines a callback function to do 5 tasks below when the user triggers
  // the event Listener by either clicking on the add button or entering a
  // carriage return from the UI
  var ctrlAddItem = function() {

    // define variables to pass the input and new object into
    var input, newItem;

    // 1. Get the input fieldsArr

    // calls the getInput METHOD from the UIModule to retrieve the
    // Object created from the users input: {type (exp or inc), description, value}
    input = UIMdl.getInput();

    // Make sure description is not an empty string, the value is a number
    // and the value is greater than 0 before we do anything
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {


      // 2. Add the item {type (exp or inc), description, value} to the
      // addItem METHOD in the data Module to be manipulated and updated, then
      // assign the returned object {ID, description, value} to the variable
      // newItem
      newItem = dataMdl.addItem(input.type, input.description, input.value);


      // 3. Add the item to the UI

      // Calls the addListItem in the UI module and passes the
      // newItem {ID, description, value} along with the items type (exp or inc)
      // back to the UIModule to add the item to the income or expenses list
      // in the UI
      UIMdl.addListItem(newItem, input.type);


      // 4. Clear the input fields in the UI to be ready for the next item
      // to be input into the UI fields
      UIMdl.clearFields();


      // 5. Calls the update budget function above to Calculate and
      // Update all the totals in the dataModule and then show the updates
      // in the UI
      updateBudget();

      // 6. Calls the updatePercentages function above to Calculate and
      // update all the percentages in the expenses__list row
      updatePercentages();
    }
  }; // end ctrlAddItem function



  // defines a callback function to delete an item when the event listener
  // for the delete button has been triggered in the UI
  var ctrlDeleteItem = function(event) {

    // Declare variable to be used later
    var itemID, splitID, type, ID;

    // assigns the itemID as the class of the element container for the list
    // item that the delete button was clicked on
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    // there is and itemID (should be inc-1, exp-4, etc.)
    if (itemID) {

      // split the string into an array of strings using the '-' separator as
      // the point where we will split the string into two elements and
      // assigns the array to the splitID variable
      splitID = itemID.split(`-`);

      // Assigns the first element of the array to the type variable
      // it will either be inc or exp
      type = splitID[0];

      // assigns the second element in the array to the ID variable, which is
      // the ID of the element in the data structure
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      dataMdl.deleteItem(type, ID);

      // 2. Delete the item from the UI
      UIMdl.deleteListItem(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calls the updatePercentages function above to Calculate and
      // update all the percentages in the expenses__list row
      updatePercentages();

    }


  }; // end ctrlDeleteItem function

  // returns the init METHOD to the PUBLIC scope
  return {

    // sets up a METHOD to pass into PUBLIC to initialize the application
    init: function() {
      console.log(`Application has started.`);
      UIMdl.currentDate();
      // calls the displayBudget METHOD in the UI module
      UIMdl.displayBudget({

        // sets all initial values to 0 and percentage the placeholder
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });

      // calls all EventListeners to begin listening for events
      setupEvenListeners();
    }
  };

  // passes in the returns from the METHODS of the dataModule and the UIModule
  // to the inside function callbacks function(dataMdl, UIMdl)
})(dataModule, UIModule); // end appController Module IIFE

// calls the app initialization
appController.init();