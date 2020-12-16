const axios = require("axios");

// 10452688630537 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/15/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);

  res.data = "17,1,3,16,19,0 ";

  res = res.data.trim().split(",");
  console.log(res);

  let saidNumbers = new Map();
  for (var i = 0; i < res.length; i++) {
    saidNumbers.set(parseInt(res[i]), [i]);
  }

  let numberSpoken = res[res.length - 1];
  for (var i = res.length; i < 30000000; i++) {
    if (
      saidNumbers.has(numberSpoken) &&
      saidNumbers.get(numberSpoken).length > 1
    ) {
      numberSpoken =
        saidNumbers.get(numberSpoken)[1] - saidNumbers.get(numberSpoken)[0];
      if (saidNumbers.has(numberSpoken)) {
        let newArr = saidNumbers.get(numberSpoken);
        newArr.push(i);
        if (newArr.length > 2) newArr.shift();
        saidNumbers.set(numberSpoken, newArr);
      } else {
        saidNumbers.set(numberSpoken, [i]);
      }
    } else {
      if (saidNumbers.has(0)) {
        let zeros = saidNumbers.get(0);
        zeros.push(i);
        if (zeros.length > 2) zeros.shift();
        saidNumbers.set(0, zeros);
        numberSpoken = 0;
      } else {
        saidNumbers.set(0, [i]);
      }
    }
    console.log(numberSpoken);
  }

  console.log(numberSpoken);
}

makeRequest();
