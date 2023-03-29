var say = document.getElementById("say");
let move = new Audio("Sound/move.mp3");
let errorA = new Audio("Sound/error.mp3");
let startA = new Audio("Sound/start.mp3");

let turn = "0";
let isgameover = false;
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

const math = () => {
  return Math.floor(Math.random() * 9);
};

const allComplete = () => {
  let boxtext = document.querySelectorAll(".boxtext");
  let arr = [];

  boxtext = Array.from(boxtext);

  for (let i = 0; i < boxtext.length; i++) {
    //check 0 for have and 1 for empty
    if (boxtext[i].innerHTML === "") {
      arr.push(0);
    } else {
      arr.push(1);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      return true;
    }
  }
  return false;
};

const checkwin = () => {
  let boxtext = document.querySelectorAll(".boxtext");

  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      isgameover = true;
      let says = document.getElementById("say");
      says.innerText = turn + " is Won";
      says.classList.remove("d-none");

      let img = document.getElementById("celebration");
      img.classList.remove("d-none");
    }
  });
};

const putzero = () => {
  let boxtext = document.querySelectorAll(".boxtext");
  boxtext = Array.from(boxtext);
  //span element which lie inside of .box
  let num;
  let done = false; //to use for check task is completed or not
  do {
    num = math();
    if (boxtext[num].innerHTML === "") {
      boxtext[num].innerHTML = "0";
      done = true;
    }
    console.log(allComplete());
  } while (done != true && allComplete());

  checkwin();
  turn = changeTurn();

  if (isgameover != true) {
    say.innerText = "Turn for " + turn;
  }
};

const zerotimer = () => {
  setTimeout(() => {
    putzero();
  }, 1500);
};
//game logic
zerotimer();
let box = document.querySelectorAll(".box");

box = Array.from(box);

box.forEach((ele) => {
  ele.addEventListener("click", () => {
    let boxtext = ele.querySelector(".boxtext");

    if (boxtext.innerText == "") {
      boxtext.innerText = turn;

      move.play();
      checkwin();
      turn = changeTurn();

      if (isgameover != true) {
        say.innerText = "Turn for " + turn;
      }
      putzero();
    } else {
      errorA.play();
    }
  });
});

let button = document.getElementById("reset");
button.addEventListener("click", async () => {
  let says = document.getElementById("say");

  says.classList.add("d-none");

  let img = document.getElementById("celebration");
  img.classList.add("d-none");

  let boxtext = document.querySelectorAll(".boxtext");

  boxtext = Array.from(boxtext);
  boxtext.forEach((ele) => {
    ele.innerText = "";
  });
  turn = "X";
  say.innerText = "Turn for X";
  isgameover = false;
  startA.play();
  turn = changeTurn();
  zerotimer();
});
