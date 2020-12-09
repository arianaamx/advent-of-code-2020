const axios = require("axios");

// 19 is not correct
// 21 is not correct
// 9 is not correct
// 7 is not correct
// 70639851

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
  res = res.data.trim();

  res = res.split("\n");

  res = res.map((element) => (element = parseInt(element)));

  let twoSum = (arr, sum) => {
    let sume = [];
    let hasSum = false;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (sum === arr[i] + arr[j]) {
          hasSum = true;
          sume.push([arr[i], arr[j]]);
        }
      }
    }
    return hasSum;
  };

  let position = 0;
  for (var i = 25; i < res.length; i++) {
    let newArray = res.slice(position, i);
    console.log(newArray);
    if (!twoSum(newArray, res[i])) {
      console.log("This number doesn't have sum: ", res[i]);
      break;
    }
    position += 1;
  }
}

makeRequest();
