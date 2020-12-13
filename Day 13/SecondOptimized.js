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

  const [firstBus, ...buses] = res.data
    .split("\n")[1]
    .split(",")
    .map((n, i) => [parseInt(n, 10), i])
    .filter(([n]) => !Number.isNaN(n));

  function correctBusTimestamp(t, razlika, bus) {
    if ((t + razlika) % bus === 0) return true;
    return false;
  }

  let multiplier = firstBus[0];
  let i = 0;
  console.log(buses);
  buses.forEach(([bus, busIndex]) => {
    while (true) {
      if ((i + busIndex) % bus === 0) {
        multiplier *= bus;
        break;
      }
      i += multiplier;
    }
  });

  console.log(i);
}

makeRequest();
