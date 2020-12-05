let a = 3;
console.log(a);
// window
//   .fetch("https://adventofcode.com/2020/day/1/input")
//   .then((data) => console.log(data));

const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/1/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  let data = res.data;
  let dataL = data.split("\n");
  //   let intLista = dataL.map(parseInt);
  let intLista = dataL.map((broj) => parseInt(broj));

  let setM = new Set();
  let rjesenje;

  intLista.forEach((broj, index) => {
    let num = 2020 - broj;
    if (setM.has(broj)) {
      console.log("Prvi broj je: ", num);
      let num2 = 2020 - num;
      console.log("Drugi broj je:", num2);
      rjesenje = num * num2;
    } else {
      setM.add(num);
    }
  });
  console.log(setM);
  console.log(rjesenje);
  //   console.log(intLista);
}

makeRequest();

// data.split;
