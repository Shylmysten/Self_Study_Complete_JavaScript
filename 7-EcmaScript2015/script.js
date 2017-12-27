/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
// setsup a superclass
class TownParksAndStreets {
  constructor(name, yearBuilt) {
    this.name = name;
    this.yearBuilt = yearBuilt;
  }
}

// setups up a subclass
class Park extends TownParksAndStreets {
  constructor(name, yearBuilt, numTrees, area) {
    super(name, yearBuilt);
    this.numTrees = numTrees;
    this.area = area; // km2
  }
  // sets up a method within the subclass Park
  treeDensity() {
    const density = this.numTrees / this.area;
    console.log(`${this.name} has a tree density of ${density} trees per square km.`)
  }
}

// setsup a subclass
class Street extends TownParksAndStreets {

  constructor(name, yearBuilt, length, size = 3) {
    super(name, yearBuilt);
    this.length = length;
    this.size = size;
  }
  // sets up a method within streets athat is a Map of street sizes
  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');
    console.log(`${this.name}, build in ${this.yearBuilt}, is a ${classification.get(this.size)} street.`);
  }
}

// Constructs the parks and streets from the subclasses
const allParks = [new Park('Green Park', 1987, 50000, 44),
  new Park('National Park', 1894, 70000, 81),
  new Park('Oak Park', 1953, 20000, 23)
];

const allStreets = [new Street('Ocean Avenue', 1999, 10, 4),
  new Street('Evergreen Street', 2008, 4, 2),
  new Street('4th Street', 2015, 4),
  new Street('Sunset Boulevard', 1982, 27, 5)
];

// callback function to calculate the Total length of streets and the avg length
// of each street.
function calc(arr) {
  // reduces an array to a single value by summing (accumulating) all the
  // elements in the array
  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
  // return the total length of streets (sum) and the avg length (sum / arr.length)
  return [sum, sum / arr.length];

}
// reportParks(allParks);
function reportParks(p) {

  console.log('-----PARKS REPORT-----');

  // Density p is allParks in the function call below reportParks(allParks);
  p.forEach(el => el.treeDensity());

  // Average age //

  // loops through all the ages using the map Method to calculate the age
  // and stores it in an array, ages
  const ages = p.map(el => new Date().getFullYear() - el.yearBuilt);
  // sets up a deconstructor for the Total age(sum) and Average age(sum / arr.length)
  // returned by the calc function, which passes in the array, ages
  const [totalAge, avgAge] = calc(ages);
  // print how many parks objects are in the allParks array and the avgAge
  console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

  // Which park has more than 1000 trees //

  // returns an array from the allParks array consisting of just the number of
  // and finds the park that has more than 1000 trees.
  const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
  console.log(`${p[i].name} has more than 1000 trees.`);

}

//reportStreets(allStreets);
function reportStreets(s) {

  console.log('-----STREETS REPORT-----');

  //Total and average length of the town's streets
  const [totalLength, avgLength] = calc(s.map(el => el.length));
  console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);

  // CLassify sizes s is allStreets in the function call below reportStreets(allStreets);
  s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);