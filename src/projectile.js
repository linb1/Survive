export default class Projectile {
    constructor(position) {
        this.position = position;
        this.radius = 3;
        this.color = "black";
        this.velocity =  5;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}