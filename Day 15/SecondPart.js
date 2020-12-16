data = "1,3,2";

data = data.trim().split(",");

let saidNumbers = new Map();
for (var i = 0; i < data.length; i++) {
  saidNumbers.set(parseInt(data[i]), i);
}
console.log(saidNumbers);
let nextNumber = 0;
for (var i = data.length; i < 2020; i++) {
  // If last number hasn't been spoken yet
  if (!saidNumbers.has(nextNumber)) {
    saidNumbers.set(nextNumber, i);
    nextNumber = 0;
  }
  // If last number has been said
  else {
    let temp = nextNumber;
    nextNumber = i - saidNumbers.get(nextNumber);
    saidNumbers.set(temp, i);
  }
}

console.log(data, "\n2020th number: " + nextNumber);
