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

  // Copied everything from the first part up to here
  // Split the element into an array
  res.forEach((element) => {
    element.push(element[2].split(""));
  });

  // See if there is a letter on first or second position of the password
  let valid = 0;
  res.forEach((element) => {
    let firstPosition = element[0][0] - 1;
    let secondPosition = element[0][1] - 1;
    let counter = 0;

    element[1] = element[1].substring(0, 1);
    if (element[3][firstPosition] === element[1]) counter = counter + 1;
    if (element[3][secondPosition] === element[1]) counter = counter + 1;
    if (counter === 1) {
      valid = valid + 1;
      element.push("Valid");
    }
  });

  console.log(res);
  console.log("Valid passwords: " + valid);
}

makeRequest();
