const axios = require("axios");

// 5463 is too low
// 35487 correct

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/8/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  res = res.split("\n");

  function parseInput(res) {
    for (var i = 0; i < res.length; i++) {
      res[i] = res[i].split(" ");
      res[i][1] = parseInt(res[i][1]);
    }
    return res;
  }

  function isLoop(res) {
    let positions = new Set();
    let position = 0;
    let sum = 0;
    let loop = true;

    while (true) {
      if (res[position][0] === "acc") {
        sum += res[position][1];
        position += 1;
      } else if (res[position][0] === "jmp") {
        position += res[position][1];
      } else {
        position += 1;
      }
      if (positions.has(position)) {
        break;
      }
      positions.add(position);
      if (position >= res.length) {
        loop = false;
        break;
      }
    }
    return { sum, loop };
  }

  function findError(res) {
    for (var i = 0; i < res.length; i++) {
      let changedRes = res.map((inner) => inner.slice());

      if (res[i][0] === "jmp") {
        changedRes[i][0] = "nop";
      } else if (res[i][0] === "nop") {
        changedRes[i][0] = "jmp";
      }
      let { sum, loop } = isLoop(changedRes);
      if (loop === false) {
        return sum;
      }
    }
  }

  res = parseInput(res);
  let sum = findError(res);
  console.log(sum);
}

makeRequest();
