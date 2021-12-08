export default class Enemy {
    constructor(position, prevPosition) {
        this.position = position;
        this.prevPosition = prevPosition;
        this.imgSize = 64;
        this.width = 50;
        this.height = 48;
        this.radius = 20;
        this.color = "red";
        this.velocity = {x:0, y:0};
        this.maxSpeed = 2;
        this.skeleton = this.loadImage("skeleton.png")
        this.collision = {
            sideLR: false,
            sideTB: false
        }
    }

    moveLeft(){
        this.velocity.x -= this.maxSpeed;
    }

    moveRight() {
        this.velocity.x += this.maxSpeed;
    }

    moveUp() {
        this.velocity.y -= this.maxSpeed;
    }

    moveDown() {
        this.velocity.y += this.maxSpeed;
    }

    loadImage(fileName) {
        let img = new Image();
        img.src = `src/images/${fileName}`;
        return img;
    }

    draw(ctx) {
        ctx.drawImage(
            this.skeleton,
            0,
            0,
            50,
            48,
            this.position.x,
            this.position.y,
            this.width*1.5,
            this.height*1.5
        )
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();
    }

    update(deltaTime) {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}