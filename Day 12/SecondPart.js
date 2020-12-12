const axios = require("axios");

// 3335 is too low
// 31975 too high
// 29895 is the right answer

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/12/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim().split("\n");

  for (var i = 0; i < res.length; i++) {
    let coordination = res[i].substring(0, 1);
    let coordinationNumber = res[i].substring(1, res[i].length);
    let coordinates = [coordination, parseInt(coordinationNumber)];
    res[i] = coordinates;
  }

  // 1.koordin WEST-EAST, 2.koord NORTH-SOUTH
  let waypoint = [10, 1];
  let boatPosition = [0, 0];

  console.log(res);
  for (var i = 0; i < res.length; i++) {
    if (res[i][0] === "N") {
      waypoint[1] += res[i][1];
    } else if (res[i][0] === "S") {
      waypoint[1] -= res[i][1];
    } else if (res[i][0] === "E") {
      waypoint[0] += res[i][1];
    } else if (res[i][0] === "W") {
      waypoint[0] -= res[i][1];
    } else if (res[i][0] === "F") {
      boatPosition[0] += res[i][1] * waypoint[0];
      boatPosition[1] += res[i][1] * waypoint[1];
    } else if (res[i][0] === "R") {
      for (var j = 0; j < res[i][1] / 90; j++) {
        waypoint = [waypoint[1], -waypoint[0]];
      }
    } else if (res[i][0] === "L") {
      for (var j = 0; j < res[i][1] / 90; j++) {
        waypoint = [-waypoint[1], waypoint[0]];
      }
    }
  }

  console.log(
    "Apsolutna suma: ",
    Math.abs(boatPosition[0]) + Math.abs(boatPosition[1])
  );
}

makeRequest();
