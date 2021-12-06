import Projectile from "./projectile";

export default class Player {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = 15;
        this.height = 30;
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
        this.maxSpeed = 7;
        this.direction = "faceDown";
    }
    //move player
    moveLeft() {
        this.direction = "faceLeft";
        this.speedX = -this.maxSpeed;
    }
    moveRight() {
        this.direction = "faceRight";
        this.speedX = this.maxSpeed;
    }
    moveUp() {
        this.direction = "faceUp";
        this.speedY = -this.maxSpeed;
    }
    moveDown() {
        this.direction = "faceDown";
        this.speedY = this.maxSpeed;
    }
    moveDiagonalLeftUp(){
        this.direction = "faceLeftUp"
        this.speedX = -this.maxSpeed;
        this.speedY = -this.maxSpeed;
    }
    moveDiagonalLeftDown() {
        this.direction = "faceLeftDown"
        this.speedX = -this.maxSpeed;
        this.speedY = this.maxSpeed;
    }
    moveDiagonalRightUp() {
        this.direction = "faceRightUp"
        this.speedX = this.maxSpeed;
        this.speedY = -this.maxSpeed;
    }
    moveDiagonalRightDown() {
        this.direction = "faceRightDown"
        this.speedX = this.maxSpeed;
        this.speedY = this.maxSpeed;
    }
    //stop player
    stopX() {
        this.speedX = 0;
    }
    stopY() {
        this.speedY = 0;
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
        let x = this.position.x; // get snapshot of player position (passing in this.position makes bullet follow player)
        let y = this.position.y;
        let velocity = this.getProjectileVelocity();
        let projectile = new Projectile({x ,y}, velocity);
        this.game.addProjectile(projectile);
    }
    //draw go to a different class later
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(deltaTime){ // deltatime - how much time has pass since last update
        if(!deltaTime) return; //if no deltatime, just return
        //set prev position to current position
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;

        //update current position
        this.position.x += this.speedX; // moves per frame
        this.position.y += this.speedY;
        //checks if player hits edge of map
        if((this.position.x) < 0){
            this.position.x = 0;
            this.prevPosition.x = 0
        }
        if((this.position.x + this.width) > this.gameWidth){
            this.position.x = this.gameWidth - this.width;
            this.prevPosition.x = this.gameWidth - this.width;
        }
        if ((this.position.y) < 0) {
            this.position.y = 0;
            this.prevPosition.y = 0;
        }
        if ((this.position.y + this.height) > this.gameHeight) {
            this.position.y = this.gameHeight - this.height;
            this.prevPosition.y = this.gameHeight - this.height;
        }
    }
}