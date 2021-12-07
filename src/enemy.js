export default class Enemy {
    constructor(position, velocity) {
        this.position = position;
        this.imgSize = 64;
        this.width = 54;
        this.height = 54;
        this.radius = 20;
        this.color = "red";
        this.velocity = velocity;
        this.skeleton = this.loadImage("skeleton.png")
    }

    loadImage(fileName) {
        let img = new Image();
        img.src = `src/images/${fileName}`;
        return img;
    }

    draw(ctx) {
        ctx.drawImage(
            this.skeleton,
            10,
            10,
            54,
            54,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}