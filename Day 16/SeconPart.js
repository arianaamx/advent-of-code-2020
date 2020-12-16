const axios = require("axios");

// 10452688630537 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/16/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);

  //   res.data = `class: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19\n\nnyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9`;

  const [
    rulesString,
    myTicketString,
    nearbyTicketString,
  ] = res.data.trim().split("\n\n");

  const rules = rulesString.split("\n").map((rule) => {
    const line = rule.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    return [
      line[1],
      [parseInt(line[2]), parseInt(line[3])],
      [parseInt(line[4]), parseInt(line[5])],
    ];
  });

  const myTicket = myTicketString
    .split("\n")[1]
    .split(",")
    .map((element) => {
      return parseInt(element);
    });

  const nearbyTickets = nearbyTicketString
    .split("\n")
    .slice(1)
    .map((element) =>
      element.split(",").map((elementIner) => parseInt(elementIner))
    );

  let possibleRules = rules.map((inner) => inner.slice());
  possibleRules.forEach((element, index) => {
    for (var i = 0; i < possibleRules.length; i++) {
      element.push(i);
    }
  });

  function deleteAllInstances(arr, num) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length === 4) continue;
      if (arr[i].includes(num)) {
        const index = arr[i].indexOf(num);
        if (index > -1) {
          arr[i].splice(index, 1);
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

  let validRules = [];
  dance: for (var i = 0; i < nearbyTickets.length; i++) {
    for (var j = 0; j < nearbyTickets[0].length; j++) {
      // check if the column already has rule
      if (hasRule(validRules, j)) {
        continue;
      }

      for (var k = 0; k < possibleRules.length; k++) {
        if (possibleRules[k].length === 4) {
          if (!validRules.includes(possibleRules[k])) {
            validRules.push(possibleRules[k]);
          }
          possibleRules = deleteAllInstances(
            possibleRules,
            possibleRules[k][3]
          );

          // if the rule is for the exact column break
          if (possibleRules[k][3] === j) break;

          //you don't need to check this rule
          continue;
        }

        let checkIsValid = nearbyTickets[i][j];
        if (possibleRules[k].includes(j)) {
          let lowerRange = possibleRules[k][1];
          let higherRange = possibleRules[k][2];
          if (
            !(
              (checkIsValid >= lowerRange[0] &&
                checkIsValid <= lowerRange[1]) ||
              (checkIsValid >= higherRange[0] && checkIsValid <= higherRange[1])
            )
          ) {
            const index = possibleRules[k].indexOf(j);
            if (index > -1) {
              possibleRules[k].splice(index, 1);
            }
          }
        }
      }
      for (var m = 0; m < possibleRules.length; m++) {
        if (possibleRules[m].length === 4) {
          if (!validRules.includes(possibleRules[m]))
            validRules.push(possibleRules[m]);
          possibleRules = deleteAllInstances(
            possibleRules,
            possibleRules[m][3]
          );
        }
      }
    }

    let allArr = 0;
    for (m = 0; m < possibleRules.length; m++) {
      if (possibleRules[m].length === 4) {
        if (!validRules.includes(possibleRules[k])) {
          validRules.push(possibleRules[k]);
        }
        possibleRules = deleteAllInstances(possibleRules, possibleRules[m][3]);
        allArr += 1;
      }
    }
    // console.log(allArr, "Possible Rules: ", possibleRules);
    if (allArr === possibleRules.length) break dance;
  }
  console.log(possibleRules);
  console.log("Valid rules: ", validRules);
}

makeRequest();
