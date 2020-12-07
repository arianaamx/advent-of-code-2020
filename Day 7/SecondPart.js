const axios = require("axios");

// 5463 is too low

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/7/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  res = res.split("\n");

  // Make a Map() out of the input
  let resMap = new Map();
  for (var i = 0; i < res.length; i++) {
    res[i] = res[i].split(" bags contain ");
    resMap.set(res[i][0], res[i][1]);
  }

  // Find how many bags does it contains
  function mapChildrenBags(children) {
    let bags = children.split(" ");
    let sum = 0;
    bags.forEach((element) => {
      if (!isNaN(element)) {
        sum += parseInt(element);
      }
      if (isNaN(element) && !element.includes("bag")) {
      }
    });
    console.log(sum);
  }

  mapChildrenBags(resMap.get("shiny gold"));
}

makeRequest();
