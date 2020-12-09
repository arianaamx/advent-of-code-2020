const axios = require("axios");

// 8249240 is correct

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/9/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data
    .trim()
    .split("\n")
    .map((element) => (element = parseInt(element)));

  let invalidNumber = 70639851;
  let positionOfInvalidNumber = 561;

  let newRes = res.slice(0, positionOfInvalidNumber + 1);

  let sumArray = [];
  let sum = 0;
  for (var i = 0; i < newRes.length; i++) {
    while (true) {
      sum = sumArray.reduce((pv, cv) => pv + cv, 0);
      if (sum > invalidNumber) {
        sumArray.shift();
      } else {
        break;
      }
    }

    if (sum === invalidNumber) {
      let max = Math.max(...sumArray);
      let min = Math.min(...sumArray);
      console.log("SUMA", max + min);
      break;
    }
    sumArray.push(newRes[i]);
  }
}

makeRequest();
