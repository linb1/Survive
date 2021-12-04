import { _ } from 'core-js';
import Game from './game';
import GameView from './game_view';
document.addEventListener("DOMContentLoaded", function () {
    // grabs canvas element from html
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    const GAME_WIDTH = 840;
    const GAME_HEIGHT = 560;

    let game = new Game(GAME_WIDTH, GAME_HEIGHT);
    let gameview = new GameView(ctx, game);

    gameview.start(); // animates/renders the game
    // let lastTime = 0; // when game created, starts at 0
    // function gameLoop(timestamp){
    //     let deltaTime = timestamp - lastTime; // deltatime - how much time has pass since last update
    //     lastTime = timestamp; // set lasttime to current time
    //     ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT); //clear canvas to update rendered objects
    //     game.update(deltaTime);
    //     game.draw(ctx);
    //     requestAnimationFrame(gameLoop);// passes timestamp to gameLoop
    // }

    // gameLoop();
});