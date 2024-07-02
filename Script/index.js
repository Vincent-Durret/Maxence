// VARIABLE

let gameBoard = document.querySelector(".gr");
let player = document.querySelector(".player");
let tower = document.querySelector(".tower");
let playerPosY = 0;
let playerPosX = 0;
let velocity = 0;
let gravity = 0.5;
let movingLeft = false;
let movingRight = false;
let isJumping = false;
let step = 5;
let npcFacingDirection = "right";

let facingDirection = "right";
player.style.position = "absolute";

let npc = document.querySelector(".npc");
let npcPosY = 0;
let npcPosX = 500;
let npcVelocity = 0;
let npcMovingDirection = 0; // 0: immobile, -1: gauche, 1: droite
let npcStep = 2; // Vitesse de déplacement plus faible que le joueur

npc.style.position = "absolute";

// Appliquer la gravité au NPC
function applyGravityToNPC() {
  npcVelocity += gravity;
  npcPosY += npcVelocity;

  if (npcPosY > window.innerHeight - npc.offsetHeight) {
    npcPosY = window.innerHeight - npc.offsetHeight;
    npcVelocity = 0;
  }

  npc.style.top = `${npcPosY}px`;
}

// Mettre à jour la position du NPC
function updateNPCPosition() {
  npcPosX += npcMovingDirection * npcStep;
  if (npcPosX < 0) npcPosX = 0;
  if (npcPosX > window.innerWidth - npc.offsetWidth)
    npcPosX = window.innerWidth - npc.offsetWidth;
  npc.style.left = `${npcPosX}px`;
}

// Changer la direction du NPC aléatoirement
function changeNPCDirection() {
  let directions = [-1, 0, 1];
  let randomIndex = Math.floor(Math.random() * directions.length);
  npcMovingDirection = directions[randomIndex];
  console.log(`Direction choisie: ${npcMovingDirection}`); // Débogage
}

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

function updateNPCBehavior() {
  const distanceToPlayer = playerPosX - npcPosX;
  const detectionRange = 200; // Distance à laquelle le NPC commence à réagir
  const aggressiveSpeed = 3; // Vitesse accrue lorsque le NPC fonce

  if (Math.abs(distanceToPlayer) < detectionRange) {
    // Le joueur est à portée, le NPC fonce vers le joueur
    npcMovingDirection = distanceToPlayer > 0 ? 1 : -1; // Détermine la direction
    npcStep = aggressiveSpeed; // Augmente la vitesse
  } else {
    // Le joueur est loin, le NPC reprend son comportement normal
    npcStep = 2; // Vitesse normale
  }
}

// COLISION
function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let npcRect = npc.getBoundingClientRect();
  let gameBoardRect = gameBoard.getBoundingClientRect();
  let towerRect = tower.getBoundingClientRect();

  let tolerance = 1;

  // Gestion des collisions pour le joueur
  if (
    playerRect.right - tolerance > gameBoardRect.left &&
    playerRect.left + tolerance < gameBoardRect.right &&
    playerRect.bottom - tolerance > gameBoardRect.top &&
    playerRect.top + tolerance < gameBoardRect.bottom
  ) {
    handlePlayerCollision(gameBoardRect);
  } else if (
    playerRect.right - tolerance > towerRect.left &&
    playerRect.left + tolerance < towerRect.right &&
    playerRect.bottom - tolerance > towerRect.top &&
    playerRect.top + tolerance < towerRect.bottom
  ) {
    handlePlayerCollision(towerRect);
  }

  // Gestion des collisions pour le NPC
  if (
    npcRect.right - tolerance > gameBoardRect.left &&
    npcRect.left + tolerance < gameBoardRect.right &&
    npcRect.bottom - tolerance > gameBoardRect.top &&
    npcRect.top + tolerance < gameBoardRect.bottom
  ) {
    handleNPCCollision(gameBoardRect);
  } else if (
    npcRect.right - tolerance > towerRect.left &&
    npcRect.left + tolerance < towerRect.right &&
    npcRect.bottom - tolerance > towerRect.top &&
    npcRect.top + tolerance < towerRect.bottom
  ) {
    handleNPCCollision(towerRect);
  }
}

function handlePlayerCollision(collisionRect) {
  let playerRect = player.getBoundingClientRect();
  let verticalCollision = playerRect.bottom - collisionRect.top;
  let horizontalCollisionLeft = collisionRect.right - playerRect.left;
  let horizontalCollisionRight = playerRect.right - collisionRect.left;

  if (
    verticalCollision < horizontalCollisionLeft &&
    verticalCollision < horizontalCollisionRight
  ) {
    // Collision verticale
    velocity = 0;
    playerPosY = collisionRect.top - player.offsetHeight;
    isJumping = false;
  } else {
    // Collision latérale
    if (facingDirection === "right") {
      playerPosX = collisionRect.left - player.offsetWidth;
    } else if (facingDirection === "left") {
      playerPosX = collisionRect.right;
    }
  }

  player.style.top = `${playerPosY}px`;
  player.style.left = `${playerPosX}px`;
}

function handleNPCCollision(collisionRect) {
  let npcRect = npc.getBoundingClientRect();
  let verticalCollision = npcRect.bottom - collisionRect.top;
  let horizontalCollisionLeft = collisionRect.right - npcRect.left;
  let horizontalCollisionRight = npcRect.right - collisionRect.left;

  if (
    verticalCollision < horizontalCollisionLeft &&
    verticalCollision < horizontalCollisionRight
  ) {
    // Collision verticale
    npcVelocity = 0;
    npcPosY = collisionRect.top - npc.offsetHeight;
    npcIsJumping = false;
  } else {
    // Collision latérale
    if (npcFacingDirection === "right") {
      npcPosX = collisionRect.left - npc.offsetWidth;
    } else if (npcFacingDirection === "left") {
      npcPosX = collisionRect.right;
    }
  }

  npc.style.top = `${npcPosY}px`;
  npc.style.left = `${npcPosX}px`;
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

function updatePlayerPosition() {
  const step = 5;
  if (movingLeft) {
    playerPosX -= step;
    facingDirection = "left"; // Mise à jour de la direction
    if (playerPosX < 0) playerPosX = 0;
  }
  if (movingRight) {
    playerPosX += step;
    facingDirection = "right"; // Mise à jour de la direction
    if (playerPosX > window.innerWidth - player.offsetWidth) {
      playerPosX = window.innerWidth - player.offsetWidth;
    }
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

let npcStartPosX = 500; // Position de départ
let maxDistance = 300; // Distance maximale de déplacement
let npcAutoMoveDirection = 1; // 1 pour droite, -1 pour gauche

// Fonction pour gérer le déplacement automatique du NPC
function autoMoveNPC() {
  // Calculer la distance parcourue depuis la position de départ
  let distanceFromStart = Math.abs(npcPosX - npcStartPosX);

  // Changer la direction si la distance maximale est atteinte
  if (distanceFromStart >= maxDistance) {
    npcAutoMoveDirection *= -1; // Change la direction
    npcStartPosX = npcPosX; // Réinitialiser la position de départ
  }

  // Mettre à jour la position du NPC
  npcPosX += npcAutoMoveDirection * npcStep;
  // Assurer que le NPC reste dans les limites de l'écran
  if (npcPosX < 0) npcPosX = 0;
  if (npcPosX > window.innerWidth - npc.offsetWidth)
    npcPosX = window.innerWidth - npc.offsetWidth;
}
// GESTION DU LOOP DU JEU

function gameLoop() {
  applyGravity();
  applyGravityToNPC();
  updatePlayerPosition();
  updateNPCPosition();
  autoMoveNPC();
  updateNPCBehavior();
  checkCollision();

  jump();
  requestAnimationFrame(gameLoop);
}
// LANCEMENT DU JEU AU CHARGEMENT DE LA PAGE
gameLoop();
