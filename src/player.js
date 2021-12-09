import Projectile from "./projectile";
// import CollisionHandler from './collisionHandler';
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
        this.velocity = { x:0, y:0 };
        this.maxSpeed = 2;
        this.direction = "faceDown";
        this.witch = this.loadImage("witch.png")
        this.score = 0;
        this.health = 2;
        this.invincible = false;
        this.color = "green"; //for testing
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
            case "faceRight":
                return { x: 15, y: 0 };
            case "faceUp":
                return { x: 0, y: -15 };
            case "faceDown":
                return { x: 0, y: 15 };
            case "faceLeftUp":
                return { x: -15, y: -15 };
            case "faceLeftDown":
                return { x: -15, y: 15};
            case "faceRightUp":
                return { x: 15, y: -15 };
            case "faceRightDown":
                return { x: 15, y: 15 };
        }
    }

    shoot() {
        let x = this.position.x + (this.width/2); // get snapshot of player position (passing in this.position makes bullet follow player)
        let y = this.position.y + (this.height/2);

        let velocity = this.getProjectileVelocity();
        let projectile = new Projectile({x ,y}, velocity);
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
            this.width,
            this.height
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
    }
}