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
