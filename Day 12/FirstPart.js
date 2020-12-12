const axios = require("axios");

// 3869 is not the answer
// 1556 is not the answer

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

  //   res = [
  //     ["F", 10],
  //     ["N", 3],
  //     ["F", 7],
  //     ["R", 90 + 360],
  //     ["F", 11],
  //   ];

  let shipFacing = "E";
  let coordinates = [
    ["E", 0],
    ["S", 0],
    ["W", 0],
    ["N", 0],
  ];
  for (var i = 0; i < res.length; i++) {
    if (res[i][0] === "E" || (res[i][0] === "F" && shipFacing === "E")) {
      if (coordinates[0][1] > 0) {
        coordinates[0][1] += res[i][1];
        continue;
      }
      let newCoords = coordinates[2][1] - res[i][1];
      if (newCoords >= 0) {
        coordinates[2][1] = newCoords;
      } else {
        coordinates[2][1] = 0;
        coordinates[0][1] = -newCoords;
      }
    }
    if (res[i][0] === "W" || (res[i][0] === "F" && shipFacing === "W")) {
      if (coordinates[2][1] > 0) {
        coordinates[2][1] += res[i][1];
        continue;
      }
      let newCoords = coordinates[0][1] - res[i][1];
      if (newCoords >= 0) {
        coordinates[0][1] = newCoords;
      } else {
        coordinates[0][1] = 0;
        coordinates[2][1] = -newCoords;
      }
    }
    if (res[i][0] === "N" || (res[i][0] === "F" && shipFacing === "N")) {
      if (coordinates[3][1] > 0) {
        coordinates[3][1] += res[i][1];
        continue;
      }
      let newCoords = coordinates[1][1] - res[i][1];
      if (newCoords >= 0) {
        coordinates[1][1] = newCoords;
      } else {
        coordinates[1][1] = 0;
        coordinates[3][1] = -newCoords;
      }
    }
    if (res[i][0] === "S" || (res[i][0] === "F" && shipFacing === "S")) {
      if (coordinates[1][1] > 0) {
        coordinates[1][1] += res[i][1];
        continue;
      }
      let newCoords = coordinates[3][1] - res[i][1];
      if (newCoords >= 0) {
        coordinates[3][1] = newCoords;
      } else {
        coordinates[3][1] = 0;
        coordinates[1][1] = -newCoords;
      }
    }
    if (res[i][0] === "R") {
      if (res[i][1] === 90) {
        if (shipFacing === "E") shipFacing = "S";
        else if (shipFacing === "S") shipFacing = "W";
        else if (shipFacing === "W") shipFacing = "N";
        else shipFacing = "E";
      } else if (res[i][1] === 180) {
        if (shipFacing === "E") shipFacing = "W";
        else if (shipFacing === "S") shipFacing = "N";
        else if (shipFacing === "W") shipFacing = "E";
        else shipFacing = "S";
      } else if (res[i][i] === 270) {
        if (shipFacing === "E") shipFacing = "N";
        else if (shipFacing === "S") shipFacing = "E";
        else if (shipFacing === "W") shipFacing = "S";
        else shipFacing = "W";
      }
    }
    if (res[i][0] === "L") {
      if (res[i][1] === 90) {
        if (shipFacing === "E") shipFacing = "N";
        else if (shipFacing === "S") shipFacing = "E";
        else if (shipFacing === "W") shipFacing = "S";
        else shipFacing = "W";
      } else if (res[i][1] === 180) {
        if (shipFacing === "E") shipFacing = "W";
        else if (shipFacing === "S") shipFacing = "N";
        else if (shipFacing === "W") shipFacing = "E";
        else shipFacing = "S";
      } else if (res[i][i] === 270) {
        if (shipFacing === "E") shipFacing = "S";
        else if (shipFacing === "S") shipFacing = "W";
        else if (shipFacing === "W") shipFacing = "N";
        else shipFacing = "E";
      }
    }
  }

  console.log(coordinates);

  console.log(
    "Apsolutni zbroj: ",
    coordinates[0][1] +
      coordinates[1][1] +
      coordinates[2][1] +
      coordinates[3][1]
  );
}

makeRequest();
