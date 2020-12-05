const axios = require("axios");

// 191 is too low

// 198 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/4/input",
    headers: {
      Cookie:
        "session=53616c7465645f5f70c4c40d2bb15cb07604f88ada6565b84fc9289fb91147cda22874534c8e2a38a6c3b7737042f462",
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
  console.log("First Validation: " + counterValid);

  // Split every field in passport
  for (var i = 0; i < passports.length; i++) {
    passports[i] = passports[i].trim();
    passports[i] = passports[i].split(" ");
  }

  // See if the field is valid
  let counterValidField = 0;
  let counterSecondValidation = 0;
  for (var i = 0; i < passports.length; i++) {
    counterValidField = 0;
    for (var j = 0; j < passports[i].length; j++) {
      //Check if the hgt field is valid
      if (passports[i][j].includes("hgt")) {
        let hgt = passports[i][j].split(":");

        if (hgt[1].includes("cm")) {
          hgt[1] = parseInt(hgt[1].slice(0, -2));
          if (hgt[1] > 149 && hgt[1] < 194) {
            counterValidField = counterValidField + 1;
          }
        } else if (hgt[1].includes("in")) {
          hgt[1] = parseInt(hgt[1].slice(0, -2));
          if (hgt[1] > 58 && hgt[1] < 77) {
            counterValidField = counterValidField + 1;
          }
        }
      }
      if (passports[i][j].includes("byr")) {
        let byr = passports[i][j].split(":");
        byr[1] = parseInt(byr[1]);
        if (byr[1] > 1919 && byr[1] < 2003) {
          counterValidField = counterValidField + 1;
        }
      }
      if (passports[i][j].includes("iyr")) {
        let byr = passports[i][j].split(":");
        byr[1] = parseInt(byr[1]);
        if (byr[1] > 2009 && byr[1] < 2021) {
          counterValidField = counterValidField + 1;
        }
      }
      if (passports[i][j].includes("eyr")) {
        let byr = passports[i][j].split(":");
        byr[1] = parseInt(byr[1]);
        if (byr[1] > 2019 && byr[1] < 2031) {
          counterValidField = counterValidField + 1;
        }
      }
      if (passports[i][j].includes("hcl")) {
        let hcl = passports[i][j].split(":");
        if (hcl[1][0] === "#") {
          hcl[1] = hcl[1].slice(1);
          if (hcl[1].match("^[A-Za-z0-9]+$")) {
            counterValidField = counterValidField + 1;
          }
        }
      }
      if (passports[i][j].includes("ecl")) {
        let ecl = passports[i][j].split(":");
        if (
          ecl[1] === "amb" ||
          ecl[1] === "blu" ||
          ecl[1] === "brn" ||
          ecl[1] === "gry" ||
          ecl[1] === "grn" ||
          ecl[1] === "hzl" ||
          ecl[1] === "oth"
        ) {
          counterValidField = counterValidField + 1;
        }
      }
      if (passports[i][j].includes("pid")) {
        let pid = passports[i][j].split(":");
        if (pid[1].length === 9 && pid[1].match(/^-?\d+$/)) {
          counterValidField = counterValidField + 1;
        }
      }
    }
    if (counterValidField === 7) {
      counterValidField = 0;
      counterSecondValidation = counterSecondValidation + 1;
    }
  }

  console.log(passports[0]);
  console.log(counterValidField);
  console.log("Second validation: " + counterSecondValidation);

  //   console.log(passports);
}

makeRequest();
