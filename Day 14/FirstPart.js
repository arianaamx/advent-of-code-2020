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

  const parseMask = (mask) =>
    [...mask].reverse().map((digit, index) => {
      if (digit === "X") return [index, "X"];
      return [index, parseInt(digit)];
    });

  let res = await axios(config);
  res = res.data.trim().split("\n");
  res = res.map((element) => {
    const line = element.match(/mem\[([0-9]*)\]/);
    if (line) {
      const value = parseInt(element.split(" = ")[1]);
      return { memAddrs: parseInt(line[1]), value };
    } else return { mask: parseMask(element.split(" = ")[1]) };
  });

  let currentMask = null;
  const mem = [];

  res.forEach((element) => {
    if (element.mask) {
      currentMask = element.mask;
    } else {
      let value = element.value;
      currentMask
        .filter(([, d]) => d != "X")
        .forEach((digit) => {
          const [position, expected] = digit;
          const valueBinary = value.toString(2);
          const checkDigit = Number(
            valueBinary[valueBinary.length - 1 - position]
          );
          if (checkDigit !== expected) {
            if (expected === 1) {
              value += 2 ** position;
            } else {
              if (value >= 2 ** position) value -= 2 ** position;
            }
          }
        });
      mem[element.memAddrs] = value;
    }
  });
  suma = mem.reduce((a, b) => a + b, 0);

  console.log(res);
  console.log("Suma: :", suma);
}

makeRequest();
