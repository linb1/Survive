import Projectile from "./projectile";
import CollisionHandler from './collisionHandler';
export default class Player {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 32;
        this.height = 48;
        this.position = {
            x: (game.gameWidth/2) - (this.width/2),
            y: (game.gameHeight/2) - (this.height/2)
        }
        this.prevPosition = {
            x: (game.gameWidth / 2) - (this.width / 2),
            y: (game.gameHeight / 2) - (this.height / 2)
        }
        this.color = "green";
        this.speedX = 0;
        this.speedY = 0;
        this.velocity = { x:0, y:0 };
        this.maxSpeed = 5;
        this.direction = "faceDown";
        this.collisionX = false;
        this.collisionY = false;
        this.witch = this.loadImage("witch.png")
        this.health = 1;
    }

    loadImage(fileName) {
        let img = new Image();
        img.src = `src/images/${fileName}`;
        return img;
    }
    //move player
    moveLeft() {
        this.direction = "faceLeft";
        this.velocity.x = -this.maxSpeed;
    }
    moveRight() {
        this.direction = "faceRight";
        this.velocity.x = this.maxSpeed;
    }
    moveUp() {
        this.direction = "faceUp";
        this.velocity.y = -this.maxSpeed;
    }
    moveDown() {
        this.direction = "faceDown";
        this.velocity.y = this.maxSpeed;
    }
    moveDiagonalLeftUp(){
        this.direction = "faceLeftUp"
        
        // this.velocity.x = -this.maxSpeed;
        // this.velocity.y = -this.maxSpeed;
    }
    moveDiagonalLeftDown() {
        this.direction = "faceLeftDown"
        // this.velocity.x = -this.maxSpeed;
        // this.velocity.y = this.maxSpeed;
    }
    moveDiagonalRightUp() {
        this.direction = "faceRightUp"
        // this.velocity.x = this.maxSpeed;
        // this.velocity.y = -this.maxSpeed;
    }
    moveDiagonalRightDown() {
        this.direction = "faceRightDown"
        console.log("down-right")
        // this.velocity.x = this.maxSpeed;
        // this.velocity.y = this.maxSpeed;
    }
    //stop player
    stopX() {
        this.velocity.x = 0;
    }
    stopY() {
        this.velocity.y = 0;
    }

    getProjectileVelocity(){
        switch (this.direction) {
            case "faceLeft":
                return {x: -15, y: 0};
                break;
            case "faceRight":
                return { x: 15, y: 0 };
                break;
            case "faceUp":
                return { x: 0, y: -15 };
                break;
            case "faceDown":
                return { x: 0, y: 15 };
                break;
            case "faceLeftUp":
                return { x: -15, y: -15 };
                break;
            case "faceLeftDown":
                return { x: -15, y: 15};
                break;
            case "faceRightUp":
                return { x: 15, y: -15 };
                break;
            case "faceRightDown":
                return { x: 15, y: 15 };
                break;
        }
    }

    shoot() {
        let x = this.position.x; //top // get snapshot of player position (passing in this.position makes bullet follow player)
        let y = this.position.y;

        // xy == bottom
        let velocity = this.getProjectileVelocity();
        let projectile = new Projectile({x ,y}, velocity);
        // project1 = xy
        //pro 2 =x2y2
        this.game.addProjectile(projectile);
    }
    //draw go to a different class later
    draw(ctx){
        ctx.drawImage(
            this.witch,
            0,
            0,
            32,
            48,
            this.position.x,
            this.position.y,
            this.width+4,
            this.height+6
        )
        // ctx.beginPath();
        // ctx.rect(this.position.x, this.position.y, this.width, this.height);
        // ctx.fillStyle = this.color;
        // ctx.fill();
    }

    update(deltaTime){ // deltatime - how much time has pass since last update
        if(!deltaTime) return; //if no deltatime, just return
        //set prev position to current position
        // console.log("update")
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        //check collision here?
        //update current position
        if (!this.collisionX){
            this.position.x += this.velocity.x; // moves per frame
        } else {
            this.position.x += 0;
        }

        if (!this.collisionY) {
            this.position.y += this.velocity.y;
        } else {
            this.position.y += 0;
        }
        // console.log(this.velocity.x)
        // console.log(this.velocity.y)
        //checks if player hits edge of map
        // if((this.position.x) < 0){
        //     this.position.x = 0;
        //     this.prevPosition.x = 0
        // }
        // if((this.position.x + this.width) > this.gameWidth){
        //     this.position.x = this.gameWidth - this.width;
        //     this.prevPosition.x = this.gameWidth - this.width;
        // }
        // if ((this.position.y) < 0) {
        //     this.position.y = 0;
        //     this.prevPosition.y = 0;
        // }
        // if ((this.position.y + this.height) > this.gameHeight) {
        //     this.position.y = this.gameHeight - this.height;
        //     this.prevPosition.y = this.gameHeight - this.height;
        // }
    }
}