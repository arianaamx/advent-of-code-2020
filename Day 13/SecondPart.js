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
  // '  res[1] = "17,x,13,19";
  //   res[1] = "67,7,59,61";'

  let arrival = res[0];
  let buses = res[1].split(",");
  buses = buses.map((element) => {
    if (element !== "x") {
      return parseInt(element);
    }
    return element;
  });

  function correctBusTimestamp(t, razlika, bus) {
    if ((t + razlika) % bus === 0) return true;
    return false;
  }

  let t = buses[0];

  let tTrue = 0;
  while (true) {
    for (var i = 0; i < buses.length; i++) {
      if (buses[i] !== "x") {
        let razlika = i;
        if (correctBusTimestamp(t, razlika, buses[i])) {
          tTrue = i;
        } else break;
      }
    }
    // console.log(tTrue);
    if (tTrue === buses.length - 1) break;
    tTrue = 0;
    t += buses[0];
    // console.log(t);
  }

  console.log(t);
  //   console.log(buses);
}

makeRequest();
