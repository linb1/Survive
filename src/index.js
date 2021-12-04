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

});