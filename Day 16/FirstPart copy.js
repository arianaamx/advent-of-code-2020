const axios = require("axios");

async function makeRequest(day) {
  const config = {
    method: "get",
    url: `https://adventofcode.com/2020/day/${day}/input`,
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);

  return res.data;
}

let a = makeRequest(16);

a.then(function (b) {
  console.log(b);
});
