import Player from '/src/player.js';
import Projectile from './projectile';


export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.player = new Player(this)
        this.projectiles = [];
    }

    addProjectile() {
        this.projectiles.push(new Projectile(this.player.position))
    }

    gameObjects() {
        return [].concat(this.player, this.projectiles)
    }

    update(deltaTime){
        this.gameObjects().forEach((object) => {
            object.update(deltaTime)
        })
    }

    draw(ctx){
        this.gameObjects().forEach((object) => {
            object.draw(ctx)
        })
    }
}