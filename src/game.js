import Player from '/src/player.js';
import Projectile from './projectile';
import Enemy from './enemy';


export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.player = new Player(this)
        this.projectiles = [];
        this.enemies = [];
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    spawnEnemiesTop() {
        setInterval(() => {
            let max = (this.gameWidth/2) + 75;
            let min = (this.gameWidth / 2) - 75;
            let spawnX = Math.random() * (max-min) + min;
            let spawnY = 0;
            this.enemies.push(new Enemy({ x: spawnX, y: spawnY }, { x: 1, y: 1 }))
        }, 1000);
    }

    spawnEnemiesBottom(){
        setInterval(() => {
            let max = (this.gameWidth / 2) + 75;
            let min = (this.gameWidth / 2) - 75;
            let spawnX = Math.random() * (max - min) + min;
            let spawnY = this.gameHeight;
            this.enemies.push(new Enemy({ x: spawnX, y: spawnY }, {x:-1, y:-1}))
        }, 1000);
    }

    spawnEnemies(){
        this.spawnEnemiesTop();
        this.spawnEnemiesBottom();
    }
    gameObjects() {
        return [].concat(this.player, this.projectiles, this.enemies)
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