import Player from '/src/player.js';
import InputHandler from '/src/input.js';
document.addEventListener("DOMContentLoaded", function () {
    // grabs canvas element from html
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    const GAME_WIDTH = 840;
    const GAME_HEIGHT = 560;
    //creates a player to be renders
    let player = new Player(GAME_WIDTH, GAME_HEIGHT)
    // created input handler to read keyboard inputs
    new InputHandler(player);

    //
    let lastTime = 0; // when game created, starts at 0
    function gameLoop(timestamp){
        let deltaTime = timestamp - lastTime; // deltatime - how much time has pass since last update
        lastTime = timestamp; // set lasttime to current time
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT); //clear canvas to update rendered objects
        player.update(deltaTime);
        player.draw(ctx); // render player
        requestAnimationFrame(gameLoop);// passes timestamp to gameLoop
    }

    gameLoop();
});