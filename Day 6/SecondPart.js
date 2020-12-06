const axios = require("axios");

// 908 is too low
// 3394

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/6/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  res = res.split("\n");

  function countSameAnswers(answer) {
    let yeses = {};
    for (var i = 0; i < answer.length; i++) {
      let lista = answer[i].split("");
      lista.forEach((element) => {
        if (!(element in yeses)) {
          yeses[element] = 1;
        } else {
          yeses[element] = yeses[element] + 1;
        }
      });
    }

    let sum = 0;
    for (var key in yeses) {
      if (yeses[key] === answer.length) {
        sum = sum + 1;
      }
    }

    return sum;
  }

  let sum = 0;
  for (var i = 0; i < res.length; i++) {
    let newRes = [];
    for (var j = i; j < res.length; j++) {
      i = j;
      if (res[j] === "") {
        break;
      }
      newRes.push(res[j]);
    }
    console.log(newRes);

    sum = sum + countSameAnswers(newRes);
  }

  console.log(sum);
}

makeRequest();
