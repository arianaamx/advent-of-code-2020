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

  function parseChildren(children) {
    if (children === "no other bags.") {
      return new Map();
    }
    let childrenMap = new Map();
    let bags = children
      .replace(/ bags./g, "")
      .replace(/ bag./g, "")
      .replace(/bags, /g, "")
      .replace(/bag, /g, "")
      .split(" ");

    for (var i = 0; i < bags.length; i = i + 3) {
      childrenMap.set(bags[i + 1] + " " + bags[i + 2], parseInt(bags[i]));
    }

    return childrenMap;
  }

  // Make a Map() out of the input
  let resMap = new Map();
  for (var i = 0; i < res.length; i++) {
    res[i] = res[i].split(" bags contain ");
    resMap.set(res[i][0], parseChildren(res[i][1].trim()));
  }

  // Find how many bags does it contains
  function mapChildrenBags(children) {
    let suma = 0;
    resMap.get(children).forEach((values, keys) => {
      suma += mapChildrenBags(keys) * values + values;
    });

    return suma;
  }

  console.log(mapChildrenBags("shiny gold"));
}

makeRequest();
