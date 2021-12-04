import Projectile from "./projectile";

export default class Player {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.radius = 20;
        this.position = {
            x: (game.gameWidth/2) - (this.radius/2),
            y: (game.gameHeight/2) - (this.radius/2)
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
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(deltaTime){ // deltatime - how much time has pass since last update
        if(!deltaTime) return; //if no deltatime, just return
        this.position.x += this.speedX; // moves per frame
        this.position.y += this.speedY;
        //checks if player hits edge of map
        if((this.position.x - this.radius) < 0){
            this.position.x = this.radius;
        }
        if((this.position.x + this.radius) > this.gameWidth){
            this.position.x = this.gameWidth - this.radius;
        }
        if ((this.position.y - this.radius) < 0) {
            this.position.y = this.radius;
        }
        if ((this.position.y + this.radius) > this.gameHeight) {
            this.position.y = this.gameHeight - this.radius;
        }
    }
}