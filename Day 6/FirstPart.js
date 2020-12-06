const axios = require("axios");

// 498 is too low
// 6789 is too low
// 6809

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

  // O(n)
  function makeArrayWithGroupedAnswers(res) {
    let answers = [];
    let answer = "";
    for (var i = 0; i < res.length; i++) {
      if (res[i] === "") {
        answers.push(answer);
        answer = "";
        continue;
      }
      answer = answer + res[i];
    }
    answers.push(answer);

    return answers;
  }

  // O(m^2) sa listom
  // sada je O(m) sa setom
  function countUniqueChar(answer) {
    let charac = new Set();
    for (var i = 0; i < answer.length; i++) {
      if (charac.has(answer[i])) {
        continue;
      }
      charac.add(answer[i]);
    }
    return charac.size;
  }

  // O(n) + O(n)
  let answers = makeArrayWithGroupedAnswers(res);
  let sum = 0;
  for (var i = 0; i < answers.length; i++) {
    sum = sum + countUniqueChar(answers[i]);
  }

  console.log(sum);
}

makeRequest();
