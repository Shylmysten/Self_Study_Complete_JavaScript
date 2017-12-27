var num = 5463;
num = (Math.round(num * 100) / 100).toFixed(2);
var numSplit = num.split('.');
var int = numSplit[0];
var dec = numSplit[1];
var newArray = Array.from(int);
int = newArray.reverse();
console.log(int);

function changenumber() {
    for (var i = 0; i < newArray.length-1; i++) {
        if (newArray.length === 4) {
            int.splice(3,0,',');
            int = newArray.reverse();
          debugger
            
            int = int.join('');
            numSplit[0] = int;
            num = numSplit.join('.');
            return num;
        } else if (i === 3 ) {
            debugger
            console.log(int[i - 1] + ' and ' + int[i]);
            var removed = int.splice(i, 0, ',');
            console.log(int);
            i++;
        } else {
            if (int[i - 3] === ',') {
            debugger
            console.log(int[i - 1] + ' and ' + int[i]);
            removed = int.splice(i + 1, 0, ',');      
            console.log(int);
            } 
        }
        
    }
    newArray = int;
    int = newArray.reverse();
    int = int.join('');
    numSplit[0] = int;
    num = numSplit.join('.');
    return num;
}
changenumber();