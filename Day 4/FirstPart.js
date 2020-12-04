const axios = require("axios");

// 262 is too high
// 256 is true!

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/4/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  res = res.split("\n");

  // lets make array full of valid passports
  let passports = [];
  for (var i = 0; i < res.length - 2; i++) {
    let counter = 0;
    let passport = "";
    while (res[i] !== "") {
      passport = passport + " " + res[i];
      i = i + 1;
    }
    passports.push(passport);
  }

  let counterValid = 0;
  passports.forEach((element) => {
    if (
      element.includes("ecl") &&
      element.includes("iyr") &&
      element.includes("hcl") &&
      element.includes("hgt") &&
      element.includes("byr") &&
      element.includes("eyr") &&
      element.includes("pid")
    )
      counterValid = counterValid + 1;
  });

  console.log(passports);
  console.log(counterValid);
}

makeRequest();
