const axios = require("axios");

async function makeRequest() {
  const config = {
    method: "get",
    url: "https://adventofcode.com/2020/day/11/input",
    headers: {
      Cookie:
        "_ga=GA1.2.609869550.1606597228; session=53616c7465645f5f63514525ec0ca369628697393717ede015e6807e3d38f267e28b2dd447653f07ae169ac5bf6b8d15; _gid=GA1.2.1356660941.1606830201; _gat=1",
    },
    withCredentials: true,
  };

  let res = await axios(config);
  res = res.data.trim().split("\n");

  //   res = [
  //     "#.##.##.##",
  //     "#######.##",
  //     "#.#.#..#..",
  //     "####.##.##",
  //     "#.##.##.##",
  //     "#.#####.##",
  //     "..#.#.....",
  //     "##########",
  //     "#.######.#",
  //     "#.#####.##",
  //   ];

  // res = [
  //   "L.LL.LL.LL",
  //   "LLLLLLL.LL",
  //   "L.L.L..L..",
  //   "LLLL.LL.LL",
  //   "L.LL.LL.LL",
  //   "L.LLLLL.LL",
  //   "..L.L.....",
  //   "LLLLLLLLLL",
  //   "L.LLLLLL.L",
  //   "L.LLLLL.LL",
  // ];
  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  function howManyOccupiedSeatsAround(res, i, j, level) {
    let firstSeats = [".", ".", ".", ".", ".", ".", ".", "."];

    for (var level = 1; level < res.length; level++) {
      let newFirstSeats = [
        -level + i >= 0 && -level + j >= 0 ? res[-level + i][-level + j] : ".",
        -level + i >= 0 ? res[-level + i][j] : ".",
        -level + i >= 0 && level + j < res[0].length
          ? res[-level + i][level + j]
          : ".",
        -level + j >= 0 ? res[i][-level + j] : ".",
        level + j < res[0].length ? res[i][level + j] : ".",
        level + i < res.length && -level + j >= 0
          ? res[level + i][-level + j]
          : ".",
        level + i < res.length ? res[level + i][j] : ".",
        level + i < res.length && level + j < res[0].length
          ? res[level + i][level + j]
          : ".",
      ];

      for (var ii = 0; ii < firstSeats.length; ii++) {
        if (firstSeats[ii] === ".") {
          firstSeats[ii] = newFirstSeats[ii];
        }
      }
    }

    let countOccupiedSeatsaround = 0;
    for (var iii = 0; iii < firstSeats.length; iii++) {
      if (firstSeats[iii] === "#") {
        countOccupiedSeatsaround += 1;
      }
    }
    return countOccupiedSeatsaround;
  }

  function occupySeat(res) {
    let newRes = res.map((inner) => inner.slice());
    let countOccupiedSeats = 0;
    for (var i = 0; i < res.length; i++) {
      for (var j = 0; j < res[i].length; j++) {
        if (res[i][j] === "L") {
          let count = howManyOccupiedSeatsAround(res, i, j);
          if (count === 0) {
            newRes[i] = setCharAt(newRes[i], j, "#");
            countOccupiedSeats += 1;
          }
        }
        if (res[i][j] === "#") {
          let count = howManyOccupiedSeatsAround(res, i, j);
          countOccupiedSeats += 1;
          if (count >= 5) {
            newRes[i] = setCharAt(newRes[i], j, "L");
            countOccupiedSeats -= 1;
          }
        }
      }
    }
    return [newRes, countOccupiedSeats];
  }

  let room = occupySeat(res);
  // console.log(room[0], room[1]);
  let oldRoom = room[0];

  while (true) {
    let newRoom = occupySeat(oldRoom);
    // console.log(newRoom[0], newRoom[1]);
    let stringOldRoom = oldRoom.toString();
    let stringNewRoom = newRoom[0].toString();
    if (stringOldRoom === stringNewRoom) {
      console.log("Broj zauzetih mjesta: ", newRoom[1]);
      break;
    }
    oldRoom = newRoom[0];
  }
}

makeRequest();
