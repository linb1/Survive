import InputHandler from '/src/input.js';

export default class GameView{

    constructor(context, game){
        this.context = context;
        this.game = game;
    }

    start(){
        new InputHandler(this.game);
        this.lastTime = 0; // when game created, starts at 0
        requestAnimationFrame(this.animate.bind(this))
    }

    animate(timestamp){
        let deltaTime = timestamp - this.lastTime; // deltatime - how much time has pass since last update
        this.lastTime = timestamp; // set lasttime to current time
        this.context.clearRect(0, 0, this.game.gameWidth, this.game.gameHeight); //clear canvas to update rendered objects
        this.game.update(deltaTime);
        this.game.draw(this.context);
        requestAnimationFrame(this.animate.bind(this));// passes timestamp to animate, changes context from requestAnimation Frame to GameView
    }
}