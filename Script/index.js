// VARIABLE

let gameBoard = document.querySelector(".game__board");
let player = document.querySelector(".player");
let playerPosY = 0;
let playerPosX = 0;
let velocity = 0;
let gravity = 0.5;
let movingLeft = false;
let movingRight = false;
let isJumping = false;
player.style.position = "absolute";

// GRAVITER
function applyGravity() {
  velocity += gravity;
  playerPosY += velocity;

  if (playerPosY > window.innerHeight - player.offsetHeight) {
    playerPosY = window.innerHeight - player.offsetHeight;
    velocity = 0;
  }

  player.style.top = `${playerPosY}px`;
}

// COLISION
function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let boardRect = gameBoard.getBoundingClientRect();

  let tolerance = 2;

  if (
    playerRect.right - tolerance > boardRect.left &&
    playerRect.left + tolerance < boardRect.right &&
    playerRect.bottom - tolerance > boardRect.top &&
    playerRect.top + tolerance < boardRect.bottom
  ) {
    velocity = 0;
    playerPosY = boardRect.top - player.offsetHeight;
    player.style.top = `${playerPosY}px`;
    isJumping = false;
  }
}

// GESTION DU SAUT DU JOUEUR
function jump() {
  if (isJumping) {
    velocity += gravity;
    playerPosY += velocity;

    if (playerPosY > window.innerHeight - player.offsetHeight) {
      playerPosY = window.innerHeight - player.offsetHeight;
      velocity = 0;
      isJumping = false;
    }
  }

  player.style.top = `${playerPosY}px`;
}
// MISE A JOUR DE LA POSTION DU JOUEUR
function updatePlayerPosition() {
  const step = 5;
  if (movingLeft) {
    playerPosX -= step;
    if (playerPosX < 0) playerPosX = 0;
  }
  if (movingRight) {
    playerPosX += step;
    if (playerPosX > window.innerWidth - player.offsetWidth)
      playerPosX = window.innerWidth - player.offsetWidth;
  }
  player.style.left = `${playerPosX}px`;
}

// GESTION DES TOUCHE DE DEPLACEMENT ET DE SAUT
document.addEventListener("keydown", function (event) {
  if ((event.key === "Space" || event.key === "ArrowUp") && !isJumping) {
    isJumping = true;
    velocity = -10;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    movingLeft = true;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    movingRight = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    movingLeft = false;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    movingRight = false;
  }
});

// GESTION DU LOOP DU JEU

function gameLoop() {
  applyGravity();
  checkCollision();
  updatePlayerPosition();
  jump();
  requestAnimationFrame(gameLoop);
}
// LANCEMENT DU JEU AU CHARGEMENT DE LA PAGE
gameLoop();
