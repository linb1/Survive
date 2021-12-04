export default class Enemy {
    constructor(position, velocity) {
        this.position = position;
        this.radius = 20;
        this.color = "red";
        this.velocity = velocity;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}