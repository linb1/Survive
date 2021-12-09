export default class Projectile {
    constructor(position, velocity) {
        this.position = position;
        this.width = 16;
        this.height = 16;
        this.velocity =  velocity
        this.image = this.loadImage("fireball.png")
        this.delete = false;
        this.color = "black"; //for testing
    }
    loadImage(fileName) {
        let img = new Image();
        img.src = `src/images/${fileName}`;
        return img;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
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

    update(deltaTime){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}