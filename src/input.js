import Game from './game';
export default class InputHandler{
    constructor(game) {
        // moves game.player when key down
        document.addEventListener('keydown', (event) =>{
            console.log(event.key)
            switch (event.key){
                case "ArrowLeft":
                    game.player.moveLeft();
                    break;
                case "ArrowRight":
                    game.player.moveRight();
                    break;
                case "ArrowUp":
                    game.player.moveUp();
                    break;
                case "ArrowDown":
                    game.player.moveDown();
                    break;
                case " ":
                    game.player.shoot();
                    break;
            }
        });
        // stops player when key up
        // if statements - only stops player if they are moving in that current direction to prevent stuttering
        // press down left -> press down right -> let go of left: stops player for a split second
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    if(game.player.speedX < 0){
                        game.player.stopX();
                    }
                    break;
                case "ArrowRight":
                    if (game.player.speedX > 0) {
                        game.player.stopX();
                    }
                    break;
                case "ArrowUp":
                    if(game.player.speedY < 0){
                        game.player.stopY();
                    }
                    break;
                case "ArrowDown":
                    if(game.player.speedY > 0){
                        game.player.stopY();
                    }
                    break;
                // case " ":
                //     alert("shoot");
                //     break;
            }
        });
    }
}