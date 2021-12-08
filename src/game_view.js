import InputHandler from '/src/input.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}
export default class GameView{

    constructor(context, game){
        this.context = context;
        this.game = game;
        new InputHandler(this.game);
    }

    start(){
        if (this.game.gameState !== GAMESTATE.MENU) return;
        this.game.gameState = GAMESTATE.RUNNING;
        this.game.spawnEnemies();
    }
    
    startGameView(){
        requestAnimationFrame(this.animate.bind(this))
    }

    // togglePause(){
    //     if(this.gameState === GAMESTATE.PAUSED){
    //         this.gameState = GAMESTATE.RUNNING;
    //     } else {
    //         this.gameState = GAMESTATE.PAUSED;
    //     }
    // }

    animate(timestamp){
        let deltaTime = timestamp - this.lastTime; // deltatime - how much time has pass since last update
        this.lastTime = timestamp; // set lasttime to current time
        this.context.clearRect(0, 0, this.game.gameWidth, this.game.gameHeight); //clear canvas to update rendered objects
        this.game.update(deltaTime);
        this.game.draw(this.context);
        requestAnimationFrame(this.animate.bind(this));// passes timestamp to animate, changes context from requestAnimation Frame to GameView
    }
}