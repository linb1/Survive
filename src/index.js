import Player from '/src/player.js';
import InputHandler from '/src/input.js';
document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    const GAME_WIDTH = 840;
    const GAME_HEIGHT = 560;
    
    let player = new Player(GAME_WIDTH, GAME_HEIGHT)

    new InputHandler(player);
    let lastTime = 0;
    function gameLoop(timestamp){
        let deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
        player.update(deltaTime);
        player.draw(ctx);
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});