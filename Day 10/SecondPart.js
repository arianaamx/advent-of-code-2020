const axios = require("axios");

// 162 is too low
// 163 is too low

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

  res = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
  res.sort(function (a, b) {
    return a - b;
  });

  res.unshift(0);
  res.push(res[res.length - 1] + 3);

  let different = 0;

  //   for (var i = 0; i < res.length - 1; i++) {
  //     if (res[i + 1] - res[i] === 1) {
  //       different += 1;
  //     } else if (res[i + 1] - res[i] === 2) {
  //       different += 1;
  //     } else if (res[i + 1] - res[i] === 3) {
  //       different += 1;
  //     }
  //     if (!isNaN(res[i + 2]) && res[i + 2] - res[i] === 2) {
  //       different += 1;
  //     }
  //     if (!isNaN(res[i + 3]) && res[i + 3] - res[i] === 3) {
  //       different += 1;
  //     }
  //   }

  ways = res.map((x, i) => (i == 0 ? 1 : 0));

  for (let i = 0; i < ways.length; i++) {
    for (let j = i - 3; j < i; j++) {
      // add ways using previous 3 numbers
      if (res[i] <= res[j] + 3) {
        ways[i] += ways[j];
      }
    }
  }

  console.log(ways);
  console.log("Ways to arrange adapters:", ways[ways.length - 1]);

  console.log(res);
  console.log(different);
}

makeRequest();
