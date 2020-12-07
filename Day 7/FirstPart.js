const axios = require("axios");

// 252 is the right answer

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

  function findBagsThatContainShinyGoldBag(res) {
    let bagsContainsShinyGold = new Set();
    for (var i = 0; i < res.length; i++) {
      if (res[i][1].includes("shiny gold")) {
        if (!bagsContainsShinyGold.has(res[i][0])) {
          bagsContainsShinyGold.add(res[i][0]);
        }
      }
    }
    return bagsContainsShinyGold;
  }

  function findBags(res, set) {
    for (var i = 0; i < res.length; i++) {
      set.forEach((element) => {
        if (res[i][1].includes(element)) {
          if (!set.has(res[i][0])) {
            set.add(res[i][0]);
          }
        }
      });
    }
    return set;
  }

  // Split bag that contains and contained bags
  for (var i = 0; i < res.length; i++) {
    res[i] = res[i].split(" bags contain ");
  }

  let bagContainsShinyGold = new Set();
  bagContainsShinyGold = findBagsThatContainShinyGoldBag(res);

  let oldBags = new Set();

  while (oldBags.size !== bagContainsShinyGold.size) {
    oldBags = new Set(bagContainsShinyGold);
    bagContainsShinyGold = findBags(res, bagContainsShinyGold);
  }

  console.log(bagContainsShinyGold.size);
}

makeRequest();
