
export default class InputHandler{
    constructor(player) {
        // moves player when key down
        document.addEventListener('keydown', (event) =>{
            switch (event.key){
                case "ArrowLeft":
                    player.moveLeft();
                    break;
                case "ArrowRight":
                    player.moveRight();
                    break;
                case "ArrowUp":
                    player.moveUp();
                    break;
                case "ArrowDown":
                    player.moveDown();
                    break;
                case " ":
                    player.shoot();
                    // alert("hi");
                    // let projectile = new Projectile(player.position)
                    // projectile.draw()
                    break;
            }
        });
        // stops player when key up
        // if statements - only stops player if they are moving in that current direction to prevent stuttering
        // press down left -> press down right -> let go of left: stops player for a split second
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    if(player.speedX < 0){
                        player.stopX();
                    }
                    break;
                case "ArrowRight":
                    if (player.speedX > 0) {
                        player.stopX();
                    }
                    break;
                case "ArrowUp":
                    if(player.speedY < 0){
                        player.stopY();
                    }
                    break;
                case "ArrowDown":
                    if(player.speedY > 0){
                        player.stopY();
                    }
                    break;
                case " ":
                    alert("shoot");
                    break;
            }
        });
    }
}