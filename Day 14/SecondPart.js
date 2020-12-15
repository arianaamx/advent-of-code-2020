const axios = require("axios");

// 10452688630537 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/14/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim().split("\n");
  res = res.map((element) => {
    const line = element.match(/mem\[([0-9]*)\]/);
    if (line) {
      const value = parseInt(element.split(" = ")[1]);
      return { memAddrs: parseInt(line[1]), value };
    } else return { mask: element.split(" = ")[1] };
  });

  let currentMask = null;
  const mem = new Map();
  res.forEach((element) => {
    if (element.mask) {
      currentMask = element.mask;
    } else {
      let value = element.memAddrs.toString(2).padStart(36, 0).split("");
      value = value
        .map((bit, index) => {
          if (currentMask[index] === "1") return 1;
          else if (currentMask[index] === "X") return "X";
          else return bit;
        })
        .join("");
      const floaters = value.split("X");
      let addresses = floaters.reduce((acc, floater) => {
        if (acc.length == 0) return [floater];
        const ones = [...acc].map((x) => x + "0" + floater);
        const zeroes = [...acc].map((x) => x + "1" + floater);
        console.log(ones, zeroes);
        return [...ones, ...zeroes];
      }, []);
      addresses.forEach((addr) => mem.set(parseInt(addr, 2), element.value));
    }
  });
  suma = [...mem.values()].reduce((a, b) => a + b, 0);

  //   console.log(res);
  console.log("Suma: :", suma);
}

makeRequest();
