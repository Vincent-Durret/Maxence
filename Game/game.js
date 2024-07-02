function gameLoop() {
  applyGravity();
  applyGravityToNPC();
  checkCollision();

  updatePlayerPosition();
  updateNPCPosition();
  updateNPCBehavior();
  jump();
  requestAnimationFrame(gameLoop);
}
// LANCEMENT DU JEU AU CHARGEMENT DE LA PAGE
gameLoop();
