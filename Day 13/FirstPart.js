const axios = require("axios");

// 2545 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/13/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim().split("\n");

  let arrival = res[0];
  let buses = res[1].split(",");
  buses = buses.map((element) => {
    if (element !== "x") {
      return parseInt(element);
    }
    return element;
  });

  function correctBusTimestamp(bus, timestamp) {
    let correctTimestamp = bus;
    while (true) {
      if (!(correctTimestamp >= timestamp)) {
        correctTimestamp += bus;
      } else {
        return correctTimestamp;
      }
    }
  }

  let busTimestamp = new Map();
  let minValue = 999999999999999990;
  let minKey = 0;
  for (var i = 0; i < buses.length; i++) {
    if (buses[i] !== "x") {
      busTimestamp.set(buses[i], correctBusTimestamp(buses[i], arrival));
      if (correctBusTimestamp(buses[i], arrival) - arrival < minValue) {
        minValue = correctBusTimestamp(buses[i], arrival) - arrival;
        minKey = buses[i];
      }
    }
  }

  console.log(busTimestamp);
  console.log(arrival, buses);
  console.log(minKey, minValue);
  console.log(minValue * minKey);
}

makeRequest();
