// All possible computer moves in a function

let getComputerMove = () => {
  let computerMove = Math.random();
  if (computerMove >= 0 && computerMove < 1 / 3) {
    console.log("Computer picked Rock");
    return "Rock";
  } else if (computerMove > 1 / 3 && computerMove <= 2 / 3) {
    console.log("Computer picked Paper");
    return "Paper";
  } else if (computerMove > 2 / 3 && computerMove <= 1) {
    console.log("Computer picked Scissors");
    return "Scissors";
  }
};

// All possible player moves in a function

let getPlayerMove = (playerMove) => {
  if (playerMove === "Rock") {
    console.log("You picked Rock");
    return "Rock";
  } else if (playerMove === "Paper") {
    console.log("You picked Paper");
    return "Paper";
  } else if (playerMove === "Scissors") {
    console.log("You picked Scissors");
    return "Scissors";
  }
};

// Update Wins, Losses, Draws

// Get store data out of localStorage. It has to be declared BEFORE const score
const storedScore = JSON.parse(localStorage.getItem("store"));

// Const score has to be declared before the result function!

// Const score has to contain the data of storedScore as well

const score = storedScore || {
  wins: 0,
  losses: 0,
  draws: 0,
};

// DOM for Score Update

function updateScore(outcome, playerMove, computerMove) {
  if (!outcome) {
    document.querySelector(
      ".score-update"
    ).innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
  } else {
    document.querySelector(".score-update").innerText = `
    
  ${outcome}
  
  You picked ${playerMove}. Computer picked ${computerMove}

  Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}
  
  
  `;
  }
}

// All possible results in a function

let result = (playerMove, computerMove, isAutoPlay) => {
  let outcome;
  if (playerMove === computerMove) {
    outcome = "It's a draw.";
  } else if (
    (playerMove === "Rock" && computerMove === "Scissors") ||
    (playerMove === "Paper" && computerMove === "Rock") ||
    (playerMove === "Scissors" && computerMove === "Paper")
  ) {
    outcome = "You win!";
  } else {
    outcome = "You lose!";
  }

  console.log(outcome);

  // If-Statement of Wins, Losses and Draws has to be in the result function as we refer to the outcome variable

  if (outcome === "It's a draw.") {
    score.draws++;
  } else if (outcome === "You win!") {
    score.wins++;
  } else if (outcome === "You lose!") {
    score.losses++;
  }

  // If-Statement for display alert only if it is NOT triggered by the Auto Play button
  if (!isAutoPlay) {
    alert(
      `You picked ${playerMove}. Computer picked ${computerMove}. ${outcome}
  Wins: ${score.wins} Losses: ${score.losses} Draws: ${score.draws}`
    );
  }

  // Run function for updating score on page
  updateScore(outcome, playerMove, computerMove);

  // Storing all score updates + converting JS into JSON

  localStorage.setItem("store", JSON.stringify(score));
  console.log(localStorage);
};

// Add variable with setIntervalID
let intervalID;

// Add function for auto playing every 1000 miliseconds
function startAutoPlaying() {
  intervalID = setInterval(() => {
    let computerMove = getComputerMove();
    let playerMove = getComputerMove();
    updateScore();
    result(playerMove, computerMove, true);
  }, 1000);
}

// Add function to stop auto playing
function stopAutoPlaying() {
  clearInterval(intervalID);
}

// EventListeners for Rock, Paper and Scissors Buttons with computerMove, playerMove and result

document.querySelector(".btn-rock").addEventListener("click", () => {
  let computerMove = getComputerMove();
  let playerMove = "Rock";
  getPlayerMove(playerMove);
  result(playerMove, computerMove);
});

document.querySelector(".btn-paper").addEventListener("click", () => {
  let computerMove = getComputerMove();
  let playerMove = "Paper";
  getPlayerMove(playerMove);
  result(playerMove, computerMove);
});

document.querySelector(".btn-scissors").addEventListener("click", () => {
  let computerMove = getComputerMove();
  let playerMove = "Scissors";
  getPlayerMove(playerMove);
  result(playerMove, computerMove);
});

// EventListener for Reset Button
document.querySelector(".btn-reset").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.draws = 0;

  // Run function for resetting score when clicking Reset Button

  updateScore();
});

// EventListener for Auto Play Button
document.querySelector(".btn-auto-play").addEventListener("click", () => {
  let autoPlayButton = document.querySelector(".btn-auto-play");

  // Create an if-statement for changing the button text from auto play to stop auto play and vice versa.

  if (autoPlayButton.innerText === "Auto Play") {
    startAutoPlaying();
    autoPlayButton.innerText = "Stop Auto Play";
    console.log("Auto Play is active");
  } else {
    stopAutoPlaying();
    autoPlayButton.innerText = "Auto Play";
    console.log("Auto Play is inactive");
  }
});
