const axios = require("axios");

// 1386 is too low
// 1792 is too low
// 1856 is too low

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/10/input",
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

  res.sort(function (a, b) {
    return a - b;
  });

  res.unshift(0);
  res.push(res[res.length - 1] + 3);

  let oneSum = 0;
  let threeSum = 0;

  for (var i = 0; i < res.length - 1; i++) {
    console.log(res[i + 1] - res[i]);
    if (res[i + 1] - res[i] === 1) {
      oneSum += 1;
    } else if (res[i + 1] - res[i] === 3) {
      threeSum += 1;
    }
  }

  let multiplies = oneSum * threeSum;

  console.log(res);
  console.log(multiplies);
}

makeRequest();
