window.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");
  const playerDisplay = document.querySelector(".display-player");
  const resetBtn = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");
  const bavk = document.querySelector(".background");

  let currentPlayer = "X";
  let gameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  let board = ["", "", "", "", "", "", "", "", ""];
  let wining = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  tiles.forEach(function (element, index) {
    element.addEventListener("click", () => userAction(element, index));
  });

  function userAction(element, index) {
    if (valid(element) && gameActive) {
      element.innerText = currentPlayer;
      element.classList.add(`player${currentPlayer}`);

      updateBoard(index);
      resultValidation();
      changePlayer();
    }
  }

  function updateBoard(index) {
    board[index] = currentPlayer;
    console.log(board);
  }

  function changePlayer() {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }
  function resultValidation() {
    let round = false;
    for (let i = 0; i < 7; i++) {
      let temp = wining[i];
      let a = board[temp[0]];
      let b = board[temp[1]];
      let c = board[temp[2]];

      if (a == "" || b == "" || c == "") {
        continue;
      } else if (a === b && b === c) {
        round = true;
        break;
      }
    }
    if (round) {
      announce(currentPlayer == "X" ? PLAYERX_WON : PLAYERO_WON);
      gameActive = false;
    }
    if (!board.includes("")) {
      announce(TIE);
    }
  }
  function announce(type) {
    announcer.classList.remove("hide");

    switch (type) {
      case PLAYERX_WON:
        announcer.innerHTML = `PLayer <span class="playerX">X</span> won `;
        changeBackgroundColor();
        break;
      case PLAYERO_WON:
        announcer.innerHTML = `PLayer <span class="playerO">O</span> won `;
        changeBackgroundColor();
        break;

      case TIE:
        announcer.innerHTML = ` <span > Match TIE </span> `;
        changeBackgroundColor();

        break;
    }
  }

  function valid(element) {
    if (element.innerText == "X" || element.innerText == "O") {
      return false;
    } else {
      return true;
    }
  }
  function changeBackgroundColor() {
    let flg = true;
    let time = 100;
    setInterval(() => {
      if (flg) {
        announcer.classList.add(`background${currentPlayer}Annoumce`);
        flg = false;
      } else {
        announcer.classList.remove(`background${currentPlayer}Annoumce`);
        flg = true;
      }
    }, time);
  }
  resetBtn.addEventListener("click", resetBoard);
  function resetBoard() {
    if (currentPlayer === "O") {
      changePlayer();
    }

    tiles.forEach((element) => {
      element.innerText = "";
      element.classList.remove("playerX");
      element.classList.remove("playerO");
    });
    announcer.innerHTML = "";
    announcer.classList.add("hide");

    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
  }
});
