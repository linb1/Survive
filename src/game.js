import Player from '/src/player.js';
import Enemy from './enemy';
import Map from './map';
import Projectile from './projectile';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.map = new Map();
        this.player = new Player(this);
        this.projectiles = [];
        this.enemies = [];
        this.gameState = GAMESTATE.MENU;
        this.difficulty = 1;
        this.enemyID = 0;
        this.highScore = 0;
    }

    start() {
        if (this.gameState !== GAMESTATE.MENU) return;
        this.gameState = GAMESTATE.RUNNING;
        this.spawnEnemies();
    }

    reset() {
        this.gameState = GAMESTATE.RUNNING;
        this.player = new Player(this);
        this.projectiles = [];
        this.enemies = [];
        this.difficulty = 1;
        // this.spawnEnemies();
    }

    togglePause() {
        if (this.gameState === GAMESTATE.PAUSED) {
            this.gameState = GAMESTATE.RUNNING;
        } else {
            this.gameState = GAMESTATE.PAUSED;
        }
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    spawnEnemiesTop() {
        setInterval(() => {
            if (this.gameState === GAMESTATE.PAUSED) return;
            if (this.gameState === GAMESTATE.GAMEOVER) return;
            let max = (this.gameWidth/2) + 75;
            let min = (this.gameWidth / 2) - 75;
            for(let i = 0; i < 1; i++){
                let spawnX = Math.random() * (max-min) + min;
                let spawnY = 0;
                let spawnPosition = { x: spawnX, y: spawnY }
                // console.log(this.enemyID)
                this.enemies.push(new Enemy(spawnPosition, { x: 0, y: 0 }, this.difficulty, this.enemyID))
                this.enemyID++;
            }
        }, 1500);
    }

    spawnEnemiesBottom(){
        setInterval(() => {
            if (this.gameState === GAMESTATE.PAUSED) return;
            if (this.gameState === GAMESTATE.GAMEOVER) return;
            let max = (this.gameWidth / 2) + 75;
            let min = (this.gameWidth / 2) - 75;
            for (let i = 0; i < 1; i++) {
                let spawnX = Math.random() * (max - min) + min;
                let spawnY = this.gameHeight;
                let spawnPosition = { x: spawnX, y: spawnY }
                // console.log(this.enemyID)
                this.enemies.push(new Enemy(spawnPosition, { x: 0, y: 0 }, this.difficulty, this.enemyID))
                this.enemyID++;
            }
        }, 1500);
    }

    spawnEnemies(){
        this.spawnEnemiesTop();
        this.spawnEnemiesBottom();
    }

    setToVunerable(){
        // debugger;
        this.player.invincible = false;
    }

    debounce(func, timeout){
        console.log("debounce")
        let timer;
        console.log(timer)
        return (...args) => {
            console.log("working??")
            if(!timer){
                console.log("SET FALSE")
                func.apply(this, args)
            }
            clearTimeout(timer);
            timer = setTimeout(()=> {timer = undefined;}, timeout);
        };

    }

    followPlayer(enemy){
        let distanceX = this.player.position.x - enemy.position.x;
        let distanceY = this.player.position.y - enemy.position.y;
        let magnitude = Math.hypot(distanceX, distanceY);
        let vectorX = distanceX/magnitude;
        let vectorY = distanceY / magnitude;
        enemy.velocity.x = vectorX * enemy.maxSpeed;
        enemy.velocity.y = vectorY * enemy.maxSpeed;
        //check for collision
        if ((magnitude - (enemy.width / 2) - (this.player.width / 2) < 0.2) ||
            (magnitude - (enemy.width / 2) - (this.player.width / 2) < 0.2)) {
            enemy.velocity.x = 0;
            enemy.velocity.y = 0;
            if (this.player.health > 0){
                // x--;
                //set interval - 5sec => this.player.invinciable = true
                if (!this.player.invincible){
                    this.player.health--;
                    this.player.invincible = true;
                    console.log(this.player.invincible)
                    console.log(this.player.health)
                    setTimeout(this.setToVunerable.bind(this), 2000);
                }
                
            }
        }

    }

    removeEnemy(){
        this.enemies.forEach((enemy, enemyIndex) => {
            this.projectiles.forEach((projectile) => {
                let projectileCenterX = projectile.position.x + (projectile.width/2);
                let projectileCenterY = projectile.position.y + (projectile.height/2);
                let enemyCenterX = enemy.position.x + (enemy.width / 2);
                let enemyCenterY = enemy.position.y + (enemy.height / 2);
                let distance = Math.hypot(projectileCenterX - enemyCenterX, projectileCenterY - enemyCenterY);
                if ((distance - (enemy.width/2) - (projectile.width/2) < 0.2) ||
                    (distance - (enemy.width / 2) - (projectile.width / 2) < 0.2))
                {
                    enemy.health--;
                    if(enemy.health === 0){
                        enemy.delete = true;
                        this.defeatEnemy();
                        this.player.score++;
                        this.setHighScore();
                        this.increaseDifficulty();
                    }
                    projectile.delete = true;
                    this.removeProjectiles();
                    console.log(this.player.score)
                }
                
            })
        })
    }

    defeatEnemy(){
        this.enemies = this.enemies.filter(enemy => !enemy.delete)
    }
    removeProjectiles(){
        this.projectiles = this.projectiles.filter(projectile => !projectile.delete)
    }

    increaseDifficulty(){ // goal: increase health after x amount of kills
        if ((this.player.score % 10 == 0) && (this.player.score !== 0)){
            this.difficulty += 1;
        }
    }

    setHighScore(){
        if (this.player.score > this.highScore){
            this.highScore = this.player.score;
        }
    }

    gameObjects() {
        return [].concat(this.player, this.projectiles, this.enemies)
    }

    enemyCollision(enemy){
        this.enemies.forEach(other => {
            if (enemy.id !== other.id){
                if ((enemy.position.x) < (other.position.x + other.width)) {
                    enemy.position.x = (other.position.x + other.width);
                }
                if ((enemy.position.x + enemy.width) > (other.position.x)) {
                    enemy.velocity.x = 0;
                    enemy.position.x = (other.position.x - enemy.width);
                }
                if ((enemy.position.y) < (other.position.y + other.height)) {
                    enemy.velocity.y = 0;
                    enemy.position.y = (other.position.y + other.height);
                }
                if ((enemy.position.y + enemy.height) > (other.position.y + other.height)) {
                    enemy.velocity.y = 0;
                    enemy.position.y = (other.position.y - enemy.height);
                }
            }
        })
    }

    borderCollision(object) {
        if (object instanceof Projectile) {
            if ((object.position.x) < 0) {
                object.position.x = 0.01;
                object.delete = true;
                this.removeProjectiles()
            }
            if ((object.position.x + object.width + 0.01) > this.gameWidth) {
                object.position.x = this.gameWidth - object.width - 0.01;
                object.delete = true;
                this.removeProjectiles()
            }
            if ((object.position.y) < 0) {
                object.position.y = 0.01;
                object.delete = true;
                this.removeProjectiles()
            }
            if ((object.position.y + object.height + 0.01) > this.gameHeight) {
                object.position.y = this.gameHeight - object.height - 0.01;
                object.delete = true;
                this.removeProjectiles()
            }
        } else {
            if ((object.position.x) < 0) {
                object.velocity.x = 0;
                object.position.x = 0.01;
            }
            if ((object.position.x + object.width + 0.01) > this.gameWidth) {
                object.velocity.x = 0;
                object.position.x = this.gameWidth - object.width - 0.01; //detection issues when right/bottom sides are directly on the edge? breaks tile collision code if object happens to get through
            }
            if ((object.position.y) < 0) {
                object.velocity.y = 0;
                object.position.y = 0.01;
            }
            if ((object.position.y + object.height + 0.01) > this.gameHeight) { 
                object.velocity.y = 0;
                object.position.y = this.gameHeight - object.height - 0.01; //detection issues when right/bottom sides are directly on the edge? breaks tile collision code if player happens to get through
            }
        }
    }

    checkForCollision(object){
        //getting x and y to use for each corner of player object
        let leftColumn = Math.floor(object.position.x / this.map.tileSize);
        let bottomRow = Math.floor((object.position.y + object.height)/ this.map.tileSize);
        let topRow = Math.floor(object.position.y / this.map.tileSize);
        let rightColumn = Math.floor((object.position.x + object.width) / this.map.tileSize);

        // if ((this.map.collisionMap[topRow][rightColumn] === 0) &&
        //     (this.map.collisionMap[bottomRow][rightColumn] === 0) &&
        //     (this.map.collisionMap[topRow][leftColumn] === 0) &&
        //     (this.map.collisionMap[bottomRow][leftColumn] === 0)){
        //         if (object instanceof Enemy){
        //             this.followPlayer;
        //         }
        // }

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
        // console.log("call")
        switch (value) {
            case 1:
                // console.log("1")
                this.bottomCollision(object, tile_row);
                break;
            case 2:
                // console.log("2")
                this.rightCollision(object, tile_column);
                break;
            case 3:
                // console.log("3")
                this.leftCollision(object, tile_column);
                break;
            case 4:
                // console.log("4")
                this.topCollision(object, tile_row);
                break;
            case 5:
                // console.log("5")
                if (this.topCollision(object, tile_row)) {return;}
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                this.rightCollision(object,tile_column)
                break;
            case 6:
                // console.log("6")
                if (this.topCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                break;
            case 7:
                // console.log("7")
                if (this.topCollision(object, tile_row)) { return; }
                if (this.rightCollision(object, tile_column)) { return; }
                break;
            case 8:
                // console.log("8")
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.leftCollision(object, tile_column)) { return; }
                break;
            case 9:
                // console.log("9")
                if (this.bottomCollision(object, tile_row)) { return; }
                if (this.rightCollision(object, tile_column)) { return; }
                break;
        }
    }

    leftCollision(object, tile_left){
        // console.log(tile_left);
        // if object moving right (cant hit left side unless coming from right)
        if (object instanceof Projectile) {
            // console.log("delete")
            // console.log("collided with left of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let rightOfobject = object.position.x + object.width;
            let prevRightOfobject = object.prevPosition.x + object.width;
            if ((object.position.x - object.prevPosition.x) > 0) {
                let left = tile_left * this.map.tileSize;
    
                //checks if object is entering collision boundary
                if (rightOfobject > left && prevRightOfobject <= left) {
                    // object.velocity.x = 0;
                    if (object instanceof Enemy){
                        // console.log("left collision")
                        // object.collision.sideLR = true;
                    }
                    object.prevPosition.x = object.position.x = left - object.width - 0.01;
                    // console.log("collided with left of tile");
                    return true
                }
            }
            if (object instanceof Enemy) {
                // console.log("no left collision")
                // object.collision.sideLR = false;
            }
            return false
        }
    }
    
    rightCollision(object, tile_right){
        // console.log(tile_right);
        if (object instanceof Projectile) {
            // console.log("delete")
            // console.log("collided with right of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let leftOfobject = object.position.x;
            let prevLeftOfobject = object.prevPosition.x;
            if ((object.position.x - object.prevPosition.x) < 0) {
                let right = (tile_right + 1) * this.map.tileSize; //right side of tile = left side of next tile
    
                //checks if object is entering collision boundary
                if (leftOfobject < right && prevLeftOfobject >= right) {
                    // object.velocity.x = 0;
                    if (object instanceof Enemy) {
                        // console.log("right collision")
                        // object.collision.sideLR = true;
                    }
                    object.prevPosition.x = object.position.x = right;
                    // console.log("collided with right of tile");
                    return true
                }
            }
            if (object instanceof Enemy) {
                // console.log("no right collision")
                // object.collision.sideLR = false;
            }
            return false
        }
    }
    
    topCollision(object, tile_top){
        if (object instanceof Projectile) {
            // console.log("delete")
            // console.log("collided with top of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let bottomOfobject = object.position.y + object.height;
            let prevBottomOfobject = object.prevPosition.y + object.height;
            if ((object.position.y - object.prevPosition.y) > 0) {
                let top = tile_top * this.map.tileSize;
                
                if (bottomOfobject > top && prevBottomOfobject <= top) {
                    // object.velocity.y = 0;
                    if (object instanceof Enemy) {
                        // console.log("top collision")
                        // object.collision.sideTB = true;
                    }
                    object.prevPosition.y = object.position.y = top - object.height - 0.01;
                    // debugger;
                    // console.log("collided with top of tile");
                    return true
                }
            }
            if (object instanceof Enemy) {
                // console.log("no top collision")
                // object.collision.sideTB = false;
            }
            return false

        }
    }
    
    bottomCollision(object, tile_bottom){
        // console.log(tile_bottom);
        if (object instanceof Projectile) {
            // console.log("delete")
            // console.log("collided with bottom of tile");
            object.delete = true;
            this.removeProjectiles()
        } else {
            let topOfobject = object.position.y;
            let prevTopOfobject = object.prevPosition.y;
            if ((object.position.y - object.prevPosition.y) < 0) {
                let bottom = (tile_bottom + 1) * this.map.tileSize;
                if (topOfobject < bottom && prevTopOfobject >= bottom) {
                    // object.velocity.y = 0;
                    if (object instanceof Enemy) {
                        // console.log("bottom collision")
                        // object.collision.sideTB = true;
                    }
                    object.prevPosition.y = object.position.y = bottom;
                    // console.log("collided with bottom of tile");
                    return true
                }
            }
            if (object instanceof Enemy) {
                // console.log("no bottom collision")
                // object.collision.sideTB = false;
            }
            return false

        }
    }

    update(deltaTime){
        // this.player.update(deltaTime);

        if(this.player.health === 0) {
            this.gameState = GAMESTATE.GAMEOVER;
            this.projectiles = [];
            this.enemies = [];
        }

        if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.MENU) return;
        // this.increaseDifficulty();
        // console.log("difficult")
        // console.log(this.difficulty)
        this.gameObjects().forEach((object) => {
            object.update(deltaTime)
            this.removeEnemy();
            // this.removeProjectiles();
            // console.log(object)
            // console.log(object instanceof Player)
            if (object instanceof Player) {
                this.borderCollision(object);
                this.checkForCollision(object);
            }
            if (object instanceof Projectile) {
                this.borderCollision(object);
                this.checkForCollision(object);
            }
            if (object instanceof Enemy) {
                this.followPlayer(object);
                if (object.position.y > 2 && object.position.y < (this.gameHeight - 2)){
                    // this.moveWhenCollided(object);
                    // this.enemyCollision(object);
                    this.borderCollision(object);
                    this.checkForCollision(object);
                }
            }

        })
        // console.log(this.player.velocity.x)
        // console.log(this.player.velocity.y)
    }

    draw(ctx){
        this.map.draw(ctx);
        this.gameObjects().forEach((object) => {
            object.draw(ctx)
        })

        if(this.gameState === GAMESTATE.PAUSED){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }

        if (this.gameState === GAMESTATE.RUNNING) {
            // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            // ctx.fillStyle = "rgba(0,0,0,0.5)"
            // ctx.fill();

            ctx.font = "24px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(`Score: ${this.player.score}`, 100, 25);
            ctx.fillText(`Health: ${this.player.health}`, this.gameWidth - 100, 25);
            ctx.fillText(`Difficulty: ${this.difficulty}`, 100, this.gameHeight - 5);
            ctx.fillText(`High Score: ${this.highScore}`, this.gameWidth - 100, this.gameHeight - 5);
        }

        if (this.gameState === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER To Start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("Press ENTER to Play Again", this.gameWidth / 2, (this.gameHeight/2)+50);
        }
    }
}





// moveWhenCollided(enemy){
//     let distanceX = this.player.position.x - enemy.position.x;
//     let distanceY = this.player.position.y - enemy.position.y;
//     let currentMagnitude = Math.hypot(distanceX, distanceY);
//     console.log(enemy.collision.sideLR)
//     console.log(enemy.collision.sideTB)
//     if (enemy.collision.sideLR || enemy.collision.sideTB) {
//         if (enemy.collision.sideLR) {
//             console.log("hello")
//             if (distanceY < 0) {
//                 let nextDistanceY = this.player.position.y - enemy.position.y - enemy.maxSpeed;
//                 let nextMagnitude = Math.hypot(distanceX, nextDistanceY);
//                 if (nextMagnitude < currentMagnitude) {
//                     enemy.velocity.y = -enemy.maxSpeed;
//                 } else {
//                     this.followPlayer(enemy);
//                     return;
//                 }
//             }

//             if (distanceY > 0) {
//                 let nextDistanceY = this.player.position.y - enemy.position.y + enemy.maxSpeed;
//                 let nextMagnitude = Math.hypot(distanceX, nextDistanceY);
//                 if (nextMagnitude < currentMagnitude) {
//                     enemy.velocity.y = enemy.maxSpeed;
//                 } else {
//                     this.followPlayer(enemy);
//                     return;
//                 }
//             }
//         }

//         if (enemy.collision.sideTB) {
//             if (distanceX < 0) {
//                 let nextDistanceX = this.player.position.x - enemy.position.x - enemy.maxSpeed;
//                 let nextMagnitude = Math.hypot(nextDistanceX, distanceY);
//                 if (nextMagnitude < currentMagnitude) {
//                     enemy.velocity.x = -enemy.maxSpeed;
//                 } else {
//                     this.followPlayer(enemy);
//                     return;
//                 }
//             }

//             if (distanceX > 0) {
//                 let nextDistanceX = this.player.position.x - enemy.position.x + enemy.maxSpeed;
//                 let nextMagnitude = Math.hypot(nextDistanceX, distanceY);
//                 if (nextMagnitude < currentMagnitude) {
//                     enemy.velocity.x = enemy.maxSpeed;
//                 } else {
//                     this.followPlayer(enemy);
//                     return;
//                 }
//             }
//         }
//     } else {
//         this.followPlayer(enemy);
//     }
// }