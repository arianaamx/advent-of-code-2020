// let a = 3;
// console.log(a);
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

  intLista.sort(function (a, b) {
    return a - b;
  });
  intLista.pop();
  console.log(intLista);
  // let setM = new Set();
  // let rjesenje;

  for (var i = 0; i < intLista.length; i++) {
    let j = i + 1;
    let k = intLista.length - 1;
    while (j < k) {
      if (intLista[i] + intLista[j] + intLista[k] < 2020) {
        j = j + 1;
      } else if (intLista[i] + intLista[j] + intLista[k] > 2020) {
        k = k - 1;
      } else {
        console.log(i, j, k, intLista[i], intLista[j], intLista[k]);
        console.log(intLista[i] * intLista[j] * intLista[k]);
        return;
      }
    }
  }
  // console.log(setM);
  // console.log(rjesenje);
  //   console.log(intLista);
}

makeRequest();
