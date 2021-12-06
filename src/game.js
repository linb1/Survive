import Player from '/src/player.js';
import Enemy from './enemy';
import Map from './map';
import CollisionHandler from './collisionHandler';


export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.map = new Map();
        this.player = new Player(this);
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

    removeEnemy(){
        this.enemies.forEach((enemy, enemyIndex) => {
            this.projectiles.forEach((projectile, projectileIndex) => {
                let distance = Math.hypot(projectile.position.x - enemy.position.x, projectile.position.y - enemy.position.y);
                if (distance - enemy.radius - projectile.radius < 0.5){
                    this.enemies.splice(enemyIndex, 1);
                    this.projectiles.splice(projectileIndex, 1);
                }
                
            })
        })
    }

    gameObjects() {
        return [].concat(this.player, this.projectiles, this.enemies)
    }

    borderCollision(player) {
        if ((player.position.x) < 0) {
            player.speedX = 0;
            player.position.x = 0;
        }
        if ((player.position.x + player.width) > this.gameWidth) {
            player.speedX = 0;
            player.position.x = this.gameWidth - player.width - 0.01; //detection issues when right/bottom sides are directly on the edge? breaks tile collision code if player happens to get through
        }
        if ((player.position.y) < 0) {
            player.speedY = 0;
            player.position.y = 0;
        }
        if ((player.position.y + player.height) > this.gameHeight) {
            player.speedY = 0;
            player.position.y = this.gameHeight - player.height - 0.01; //detection issues when right/bottom sides are directly on the edge? breaks tile collision code if player happens to get through
        }
    }

    checkForCollision(player){
        //getting x and y to use for each corner of player object
        let leftColumn = Math.floor(player.position.x / this.map.tileSize);
        let bottomRow = Math.floor((player.position.y + player.height)/ this.map.tileSize);
        let topRow = Math.floor(player.position.y / this.map.tileSize);
        let rightColumn = Math.floor((player.position.x + player.width) / this.map.tileSize);
        // console.log('bottom')
        // console.log(bottomRow)
        // console.log('right')
        // console.log(rightColumn)
        //check bottom-left corner
        this.collision(this.map.collisionMap[bottomRow][leftColumn], player, bottomRow, leftColumn);
        //check top-left corner
        this.collision(this.map.collisionMap[topRow][leftColumn], player, topRow, leftColumn);
        //check bottom-right corner
        this.collision(this.map.collisionMap[bottomRow][rightColumn], player, bottomRow, rightColumn);
        //check top-right corner
        this.collision(this.map.collisionMap[topRow][rightColumn], player, topRow, rightColumn);

    }

    collision(value, player, tile_row, tile_column) {
        // console.log(value)
        switch (value) {
            case 1:
                this.bottomCollision(player, tile_row);
                break;
            case 2:
                this.rightCollision(player, tile_column);
                break;
            case 3:
                this.leftCollision(player, tile_column);
                break;
            case 4:
                this.topCollision(player, tile_row);
                break;
            case 5:
                if (this.topCollision(player, tile_row)) {return}
                if (this.bottomCollision(player, tile_row)) { return }
                if (this.leftCollision(player, tile_column)) { return }
                this.rightCollision(player,tile_column)
                break;
        }
    }

    leftCollision(player, tile_left){

        // console.log(tile_left);
        // if object moving right (cant hit left side unless coming from right)
        let rightOfPlayer = player.position.x + player.width;
        let prevRightOfPlayer = player.prevPosition.x + player.width;
        if ((player.position.x - player.prevPosition.x) > 0) {
            let left = tile_left * this.map.tileSize;

            //checks if object is entering collision boundary
            if (rightOfPlayer > left && prevRightOfPlayer <= left) {
                player.speedX = 0;
                player.prevPosition.x = player.position.x = left - player.width;
                return true
            }
        }
        return false
    }
    
    rightCollision(player, tile_right){
        // console.log(tile_right);
        let leftOfPlayer = player.position.x;
        let prevLeftOfPlayer = player.prevPosition.x;
        if ((player.position.x - player.prevPosition.x) < 0) {
            let right = (tile_right + 1) * this.map.tileSize; //right side of tile = left side of next tile

            //checks if object is entering collision boundary
            if (leftOfPlayer < right && prevLeftOfPlayer >= right) {
                player.speedX = 0;
                player.prevPosition.x = player.position.x = right;
                return true
            }
        }
        return false
    }
    
    topCollision(player, tile_top){
        // console.log(tile_top);
        let bottomOfPlayer = player.position.y + player.height;
        let prevBottomOfPlayer = player.prevPosition.y + player.height;
        if ((player.position.y - player.prevPosition.y) > 0) {
            let top = tile_top * this.map.tileSize;

            if (bottomOfPlayer > top && prevBottomOfPlayer <= top) {
                player.speedY = 0;
                player.prevPosition.y = player.position.y = top - player.height;
                return true
            }
        }
        return false
    }
    
    bottomCollision(player, tile_bottom){
        // console.log(tile_bottom);
        let topOfPlayer = player.position.y;
        let prevTopOfPlayer = player.prevPosition.y;
        if ((player.position.y - player.prevPosition.y) < 0) {
            let bottom = (tile_bottom + 1) * this.map.tileSize;

            if (topOfPlayer < bottom && prevTopOfPlayer >= bottom) {
                player.speedY = 0;
                player.prevPosition.y = player.position.y = bottom;
                return true
            }
        }
        return false
    }

    update(deltaTime){
        this.gameObjects().forEach((object) => {
            object.update(deltaTime)
            this.removeEnemy();
        })
        this.borderCollision(this.player);
        this.checkForCollision(this.player);
    }

    draw(ctx){
        this.map.draw(ctx);
        this.gameObjects().forEach((object) => {
            object.draw(ctx)
        })
    }
}