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

  res = res.data.trim().split("\n");

  let i = 0;
  let validNumbers = new Set();
  while (res[i] != "") {
    let line = res[i].split(": ");
    let numbers = line[1].split(" or ");

    let firstRange = numbers[0].split("-");
    let secondRange = numbers[1].split("-");
    firstRange = firstRange.map((element) => {
      return parseInt(element);
    });
    secondRange = secondRange.map((element) => {
      return parseInt(element);
    });

    let startFirstRange = firstRange[0];
    let endFirstRange = firstRange[1];
    let startSecondRange = secondRange[0];
    let endSecondRange = secondRange[1];

    for (var k = startFirstRange; k <= endFirstRange; k++) {
      validNumbers.add(k);
    }

    for (var j = startSecondRange; j <= endSecondRange; j++) {
      validNumbers.add(j);
    }
    // console.log(validNumbers);
    // console.log(firstRange, secondRange);
    i += 1;
  }

  let startingTickets = 0;
  for (var m = 0; m < res.length; m++) {
    if (res[m] === "nearby tickets:") {
      startingTickets = m;
      break;
    }
  }

  let suma = 0;
  for (var s = startingTickets + 1; s < res.length; s++) {
    let ticket = res[s];
    ticket = ticket.split(",");
    ticket = ticket.map((element) => {
      return parseInt(element);
    });
    ticket.forEach((element) => {
      if (!validNumbers.has(element)) suma += element;
    });
    // console.log(ticket);
  }

  console.log("SUMA: ", suma);
}

makeRequest();
