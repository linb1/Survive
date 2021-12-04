export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.radius = 20;
        this.position = {
            x: (gameWidth/2) - (this.radius/2),
            y: (gameHeight/2) - (this.radius/2)
        }
        this.color = "green";
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 7;
    }

    moveLeft(){
        this.speedX = -this.maxSpeed;
    }
    moveRight() {
        this.speedX = this.maxSpeed;
    }
    moveUp() {
        this.speedY = -this.maxSpeed;
    }
    moveDown() {
        this.speedY = this.maxSpeed;
    }
    //draw go to a different class later
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(deltaTime){
        if(!deltaTime) return;
        this.position.x += this.speedX;
        this.position.y += this.speedY;
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