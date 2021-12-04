import Player from '/src/player.js';
import InputHandler from '/src/input.js';


export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        //creates a player to be renders
        this.player = new Player(this)
        // created input handler to read keyboard inputs
        new InputHandler(this.player);
        //refactor -> place objects in array so don't have to hardcode each object
        this.gameObjects = [
            this.player
        ]
    }

    update(deltaTime){
        this.gameObjects.forEach((object) => {
            object.update(deltaTime)
        })
    }

    draw(ctx){
        this.gameObjects.forEach((object) => {
            object.draw(ctx)
        })
    }
}