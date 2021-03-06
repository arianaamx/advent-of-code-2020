const axios = require("axios");

// 685 is too high
// 540 is too high
// 538 is too high
// Your number is 539

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

  function findSeat(seat) {
    //ovo mozemo staviti i u listu column i listu row? Sto se dobi time?
    let columnStart = 0;
    let columnEnd = 7;
    let rowsStart = 0;
    let rowsEnd = 127;

    for (var i = 0; i < seat.length; i++) {
      if (seat[i] === "F") {
        rowsEnd = Math.floor((rowsEnd + rowsStart) / 2);
      }
      if (seat[i] === "B") {
        rowsStart = Math.ceil((rowsEnd + rowsStart) / 2);
      }
      if (seat[i] === "L") {
        columnEnd = Math.floor((columnStart + columnEnd) / 2);
      }
      if (seat[i] === "R") {
        columnStart = Math.ceil((columnStart + columnEnd) / 2);
      }
    }

    return { row: rowsStart, column: columnStart };
  }

  function findSeatOptimized(seat) {
    let seatRow = seat.substring(0, 7);
    let seatColumn = seat.substring(7, 10);

    seatRow = seatRow.replace(/F/g, "0").replace(/B/g, "1");
    seatColumn = seatColumn.replace(/L/g, "0").replace(/R/g, "1");

    return { row: parseInt(seatRow, 2), column: parseInt(seatColumn, 2) };
  }

  function missingNumber(array) {
    for (var i = 1; i < array.length; i++) {
      if (array[i] !== array[i - 1] + 1) {
        return array[i] - 1;
      }
    }
  }

  let highestSeatID = 0;
  let seatIDs = [];
  for (var i = 0; i < res.length; i++) {
    let { row, column } = findSeatOptimized(res[i]);
    let seatID = row * 8 + column;
    seatIDs.push(seatID);
    if (seatID > highestSeatID) {
      highestSeatID = seatID;
    }
  }

  console.log(
    "Your ID is: " +
      missingNumber(
        seatIDs.sort(function (seatIDs, b) {
          return seatIDs - b;
        })
      )
  );

  console.log("Highest Seat ID: " + highestSeatID);
}

makeRequest();
