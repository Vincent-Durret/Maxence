class Player {
  constructor() {
    this.player = document.querySelector(".player");
    this.playerRect = player.getBoundingClientRect();
    this.playerPosY = 0;
    this.playerPosX = 0;
    this.velocity = 0;
    this.gravity = 0.5;
    this.movingLeft = false;
    this.movingRight = false;
    this.isJumping = false;
    this.step = 5;
    this.facingDirection = "right";
  }

  applyGravity() {
    this.velocity += this.gravity;
    this.playerPosY += this.velocity;

    if (this.playerPosY > window.innerHeight - this.player.offsetHeight) {
      this.playerPosY = window.innerHeight - this.player.offsetHeight;
      this.velocity = 0;
    }

    this.player.style.top = `${this.playerPosY}px`;
  }
  jump() {
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

  updatePlayerPosition() {
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

  move() {
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
  }
}
export default Player;
