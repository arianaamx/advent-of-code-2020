const axios = require("axios");

// 262 is too high
// 256 is true!

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/5/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim();

  res = res.split("\n");

  function decodingRow(seat) {
    let rowsStart = 0;
    let rowsEnd = 127;
    for (var i = 0; i < 7; i++) {
      if (seat[i] === "F") {
        rowsEnd = Math.floor((rowsEnd + rowsStart) / 2);
      }
      if (seat[i] === "B") {
        rowsStart = Math.ceil((rowsEnd + rowsStart) / 2);
      }
    }
    return rowsStart;
  }

  function decodingColumn(seat) {
    let columnStart = 0;
    let columnEnd = 7;

    for (var i = 7; i < seat.length; i++) {
      if (seat[i] === "L") {
        columnEnd = Math.floor((columnStart + columnEnd) / 2);
      }
      if (seat[i] === "R") {
        columnStart = Math.ceil((columnStart + columnEnd) / 2);
      }
    }
    return columnStart;
  }

  let highestSeatID = 0;
  for (var i = 0; i < res.length; i++) {
    let seatID = decodingRow(res[i]) * 8 + decodingColumn(res[i]);
    if (seatID > highestSeatID) {
      highestSeatID = seatID;
    }
  }

  console.log("Highest Seat ID: " + highestSeatID);
}

makeRequest();
