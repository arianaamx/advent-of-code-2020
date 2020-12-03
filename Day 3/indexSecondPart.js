const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/3/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  // Splited res into array
  res = res.split("\n");

  //Splitter each string into array
  //   res.forEach((element) => {
  //     console.log(element[4]);
  //   });

  function slopes(right, down, res) {
    let x = 0;
    let y = 0;

    let counterOfTrees = 0;
    let length = res.length;
    let lengthOfItemInArray = res[0].length;
    console.log(length);
    console.log(lengthOfItemInArray);
    for (var i = 1; i < length; i++) {
      x = x + right;
      y = y + down;

      console.log(y, x);
      if (x > lengthOfItemInArray - 1) {
        x = x - lengthOfItemInArray;
      }

      if (y > length) return counterOfTrees;

      if (res[y][x] === "#") {
        counterOfTrees = counterOfTrees + 1;
      }
    }
    // console.log(res);

    // console.log(lengthOfItemInArray);
    console.log("Jedan slope je dugačak: " + length);

    console.log("Zabio sam se u: " + counterOfTrees);
    return counterOfTrees;
  }

  let count =
    slopes(3, 1, res) *
    slopes(1, 1, res) *
    slopes(5, 1, res) *
    slopes(7, 1, res) *
    slopes(1, 2, res);
  console.log("Zabio se: " + count);
}

makeRequest();
