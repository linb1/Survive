export default class Enemy {
    constructor(position, prevPosition, health, enemyId) {
        this.position = position;
        this.prevPosition = prevPosition;
        this.width = 30;
        this.height = 32;
        this.imgWidth = this.width*1.1;
        this.color = "red";
        this.velocity = {x:0, y:0};
        this.maxSpeed = 1;
        this.skeleton = this.loadImage("skeleton.png")
        this.collision = {
            sideLR: false,
            sideTB: false
        }
        this.health = health;
        this.delete = false;
        this.id = enemyId;
    }

    loadImage(fileName) {
        let img = new Image();
        img.src = `src/images/${fileName}`;
        return img;
    }

    draw(ctx) {
        ctx.drawImage(
            this.skeleton,
            15,
            10,
            30,
            32,
            this.position.x,
            this.position.y,
            this.imgWidth,
            this.height*1.1
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