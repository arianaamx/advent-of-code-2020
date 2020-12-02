const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/2/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  // Split the data to the list full of lists that have 1-number of letters, 2-letter, 3-password
  res = res.split("\n");
  res = res.map((item) => item.split(" "));

  // Split the first element into an array of two strings
  res.forEach((element) => {
    element[0] = element[0].split("-");
  });

  // Change them into numbers
  res.forEach((element) => {
    element[0] = element[0].map((x) => parseInt(x));
  });

  // Sum how many explicit letters are in the password
  res.forEach((element) => {
    element[1] = element[1].substring(0, 1);
    let regex = "/" + element[1] + "/g";
    const found = element[2].match(new RegExp(element[1], "g"));
    // if found ===
    // const numberOfFound =
    let numberOfFound = 0;
    if (found !== null) {
      numberOfFound = found.length;
    } else {
      numberOfFound = 0;
    }

    element.push(numberOfFound);
  });

  // Count valid passwords
  let counter = 0;
  res.forEach((element) => {
    if (element[0][0] <= element[3] && element[0][1] >= element[3]) {
      counter = counter + 1;
      element.push("Valid");
    }
  });

  console.log(res);

  console.log("Count of valid passwords: " + counter);
}

makeRequest();
