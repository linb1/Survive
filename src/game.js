import Player from '/src/player.js';
import Enemy from './enemy';
import Map from './map';
import CollisionHandler from './collisionHandler';
import Projectile from './projectile';


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
                let projectileCenterX = projectile.position.x + (projectile.width/2);
                let projectileCenterY = projectile.position.y + (projectile.height/2);
                let enemyCenterX = enemy.position.x + (enemy.width / 2);
                let enemyCenterY = enemy.position.y + (enemy.height / 2);
                let distance = Math.hypot(projectileCenterX - enemyCenterX, projectileCenterY - enemyCenterY);
                if ((distance - (enemy.width/2) - (projectile.width/2) < 0.2) ||
                    (distance - (enemy.width / 2) - (projectile.width / 2) < 0.2))
                {
                    this.enemies.splice(enemyIndex, 1);
                    projectile.delete = true;
                    this.removeProjectiles();
                }
                
            })
        })
    }

    removeProjectiles(){
        this.projectiles = this.projectiles.filter(projectile => !projectile.delete)
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

    checkForCollision(object){
        //getting x and y to use for each corner of player object
        let leftColumn = Math.floor(object.position.x / this.map.tileSize);
        let bottomRow = Math.floor((object.position.y + object.height)/ this.map.tileSize);
        let topRow = Math.floor(object.position.y / this.map.tileSize);
        let rightColumn = Math.floor((object.position.x + object.width) / this.map.tileSize);

        //check bottom-left corner
        if (this.map.collisionMap[bottomRow][leftColumn] != 0){
            this.collision(this.map.collisionMap[bottomRow][leftColumn], object, bottomRow, leftColumn);
        }
        //check top-left corner
        if (this.map.collisionMap[topRow][leftColumn] != 0) {
            this.collision(this.map.collisionMap[topRow][leftColumn], object, topRow, leftColumn);
        }
        //check bottom-right corner
        if (this.map.collisionMap[bottomRow][rightColumn] != 0) {
            this.collision(this.map.collisionMap[bottomRow][rightColumn], object, bottomRow, rightColumn);
        }
        //check top-right corner
        if (this.map.collisionMap[topRow][rightColumn] != 0) {
            this.collision(this.map.collisionMap[topRow][rightColumn], object, topRow, rightColumn);
        }

    }

    // 1 = ceiling (bottom collision)
    // 2 = left wall (right-side collision)
    // 3 = right wall (left-side collision)
    // 4 = floor (top collision)
    // 5 = block (all-sides collision)
    // 6 = left-top collision
    // 7 = right-top collision
    // 8 = left-bottom collision
    // 9 = right-bottom collision
    collision(value, object, tile_row, tile_column) {
        console.log("call")
        switch (value) {
            case 1:
                console.log("1")
                this.bottomCollision(object, tile_row);
                break;
            case 2:
                console.log("2")
                this.rightCollision(object, tile_column);
                break;
            case 3:
                console.log("3")
                this.leftCollision(object, tile_column);
                break;
            case 4:
                console.log("4")
                this.topCollision(object, tile_row);
                break;
            case 5:
                console.log("5")
                if (this.topCollision(object, tile_row)) {return;}
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                this.rightCollision(object,tile_column)
                break;
            case 6:
                console.log("6")
                if (this.topCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                break;
            case 7:
                console.log("7")
                if (this.topCollision(object, tile_row)) { return; }
                if (this.rightCollision(object, tile_column)) { return; }
                break;
            case 8:
                console.log("8")
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                break;
            case 9:
                console.log("9")
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.rightCollision(object, tile_column)) { return; }
                break;
        }
    }

    leftCollision(object, tile_left){
        // console.log(tile_left);
        // if object moving right (cant hit left side unless coming from right)
        if (object instanceof Projectile) {
            console.log("delete")
            console.log("collided with left of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let rightOfobject = object.position.x + object.width;
            let prevRightOfobject = object.prevPosition.x + object.width;
            if ((object.position.x - object.prevPosition.x) > 0) {
                let left = tile_left * this.map.tileSize;
    
                //checks if object is entering collision boundary
                if (rightOfobject > left && prevRightOfobject <= left) {
                    object.speedX = 0;
                    object.prevPosition.x = object.position.x = left - object.width - 0.01;
                    console.log("collided with left of tile");
                    return true
                }
            }
            return false
        }
    }
    
    rightCollision(object, tile_right){
        // console.log(tile_right);
        if (object instanceof Projectile) {
            console.log("delete")
            console.log("collided with right of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let leftOfobject = object.position.x;
            let prevLeftOfobject = object.prevPosition.x;
            if ((object.position.x - object.prevPosition.x) < 0) {
                let right = (tile_right + 1) * this.map.tileSize; //right side of tile = left side of next tile
    
                //checks if object is entering collision boundary
                if (leftOfobject < right && prevLeftOfobject >= right) {
                    object.speedX = 0;
                    object.prevPosition.x = object.position.x = right;
                    console.log("collided with right of tile");
                    return true
                }
            }
            return false
        }
    }
    
    topCollision(object, tile_top){
        if (object instanceof Projectile) {
            console.log("delete")
            console.log("collided with top of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let bottomOfobject = object.position.y + object.height;
            let prevBottomOfobject = object.prevPosition.y + object.height;
            if ((object.position.y - object.prevPosition.y) > 0) {
                let top = tile_top * this.map.tileSize;
                
                if (bottomOfobject > top && prevBottomOfobject <= top) {
                    object.speedY = 0;
                    object.prevPosition.y = object.position.y = top - object.height - 0.01;
                    // debugger;
                    console.log("collided with top of tile");
                    return true
                }
            }
            return false

        }
    }
    
    bottomCollision(object, tile_bottom){
        // console.log(tile_bottom);
        if (object instanceof Projectile) {
            console.log("delete")
            console.log("collided with bottom of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let topOfobject = object.position.y;
            let prevTopOfobject = object.prevPosition.y;
            if ((object.position.y - object.prevPosition.y) < 0) {
                let bottom = (tile_bottom + 1) * this.map.tileSize;
                if (topOfobject < bottom && prevTopOfobject >= bottom) {
                    object.speedY = 0;
                    object.prevPosition.y = object.position.y = bottom;
                    console.log("collided with bottom of tile");
                    return true
                }
            }
            return false

        }
    }

    update(deltaTime){
        // this.player.update(deltaTime);
        this.gameObjects().forEach((object) => {
            object.update(deltaTime)
            this.removeEnemy();
            // this.removeProjectiles();
            // console.log(object)
            // console.log(object instanceof Player)
            if (object instanceof Player) {
                this.checkForCollision(object);
            }
            if (object instanceof Projectile) {
                this.checkForCollision(object);
            }

        })
        this.borderCollision(this.player);
        // console.log(this.player.speedX)
        // console.log(this.player.speedY)
    }

    draw(ctx){
        this.map.draw(ctx);
        this.gameObjects().forEach((object) => {
            object.draw(ctx)
        })
    }
}