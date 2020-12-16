function checkIsRuleValid(arrRules, number) {
  let lowerRange = arrRules[1];
  let higherRange = arrRules[2];
  if ((number >= lowerRange[0] && number <= lowerRange[1]) || (number >= higherRange[0] && number <= higherRange[1])) {
    return true;
  }
  return false;
}

function cleanNearbyTickets(tickets, rules) {
  let cleanTickets = [];
  for (var i = 0; i < tickets.length; i++) {
    cleanTickets.push(tickets[i]);
    for (var j = 0; j < tickets[i].length; j++) {
      let found = false;
      for (var k = 0; k < rules.length; k++) {
        if (checkIsRuleValid(rules[k], tickets[i][j])) {
          found = true;
          break;
        }
      }
      if (!found) cleanTickets.pop();
    }
  }
  return cleanTickets;
}

const [rulesString, myTicketString, nearbyTicketString] = require("fs")
  .readFileSync("input.txt", "utf8")
  .trim()
  .split("\n\n");

const rules = rulesString.split("\n").map((rule) => {
  const line = rule.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
  return [line[1], [parseInt(line[2]), parseInt(line[3])], [parseInt(line[4]), parseInt(line[5])]];
});

const myTicket = myTicketString
  .split("\n")[1]
  .split(",")
  .map((element) => {
    return parseInt(element);
  });

let nearbyTickets = nearbyTicketString
  .split("\n")
  .slice(1)
  .map((element) => element.split(",").map((elementIner) => parseInt(elementIner)));

nearbyTickets = cleanNearbyTickets(nearbyTickets, rules);

let numberSet = new Set();
for (var i = 0; i < myTicket.length; i++) {
  numberSet.add(i);
}

let possibleRules = rules.map((inner) => inner.slice());
possibleRules.forEach((element) => {
  element.push(new Set(numberSet));
});

function deleteAllInstances(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][3].size === 1) continue;
    if (arr[i][3].has(num)) {
      arr[i][3].delete(num);
      if (arr[i][3].size === 1) {
        deleteAllInstances(arr, arr[i][3].values().next().value);
      }
    }
  }
  return arr;
}

function hasRule(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][3] === num && arr[i].length === 4) return true;
  }
  return false;
}

for (var ticket = 0; ticket < nearbyTickets.length; ticket++) {
  for (var field = 0; field < nearbyTickets[0].length; field++) {
    let number = nearbyTickets[ticket][field];
    for (var index = 0; index < possibleRules.length; index++) {
      if (!checkIsRuleValid(possibleRules[index], number)) {
        possibleRules[index][3].delete(field);
        if (possibleRules[index][3].size === 1) {
          deleteAllInstances(possibleRules, possibleRules[index][3].values().next().value);
        }
      }
    }
  }
}

let prod = 1;
for (var rule = 0; rule < possibleRules.length; rule++) {
  if (possibleRules[rule][0].includes("departure")) {
    prod *= myTicket[possibleRules[rule][3].values().next().value];
  }
}
console.log("Product of my Ticket: ", prod);
