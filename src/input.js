import Game from './game';
export default class InputHandler{
    constructor(game) {
        // moves game.player when key down
        this.inputs = {};
        document.addEventListener('keydown', (event) =>{
            if (!this.inputs[event.key]){
                this.inputs[event.key] = false;
            }

            //log inputs
            switch (event.key){
                case " ":
                    this.inputs[event.key] = true;
                    break;
                case "ArrowLeft":
                    this.inputs[event.key] = true;
                    break;
                case "ArrowRight":
                    this.inputs[event.key] = true;
                    break;
                case "ArrowUp":
                    this.inputs[event.key] = true;
                    break;
                case "ArrowDown":
                    this.inputs[event.key] = true;
                    break;
            }
            let keys = Object.keys(this.inputs).filter(pressed => this.inputs[pressed]) 
            console.log(keys)
            if (keys.includes("ArrowLeft") && keys.includes("ArrowUp")) {
                game.player.moveDiagonalLeftUp();

            } else if (keys.includes("ArrowLeft") && keys.includes("ArrowDown")) {
                game.player.moveDiagonalLeftDown();

            } else if (keys.includes("ArrowRight") && keys.includes("ArrowUp")) {
                game.player.moveDiagonalRightUp();

            } else if (keys.includes("ArrowRight") && keys.includes("ArrowDown")) {
                game.player.moveDiagonalRightDown();

            } else if (keys.includes("ArrowLeft")){
                game.player.moveLeft();

            } else if (keys.includes("ArrowRight")){
                game.player.moveRight();

            } else if (keys.includes("ArrowUp")) {
                game.player.moveUp();

            } else if (keys.includes("ArrowDown")) {
                game.player.moveDown();

            } 
            if (keys.includes(" ")) {
                game.player.shoot();
            }
        });
        // stops player when key up
        // if statements - only stops player if they are moving in that current direction to prevent stuttering
        // press down left -> press down right -> let go of left: stops player for a split second
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.inputs[event.key] = false;
                    if(game.player.speedX < 0){
                        game.player.stopX();
                    }
                    break;
                case "ArrowRight":
                    this.inputs[event.key] = false;
                    if (game.player.speedX > 0) {
                        game.player.stopX();
                    }
                    break;
                case "ArrowUp":
                    this.inputs[event.key] = false;
                    if(game.player.speedY < 0){
                        game.player.stopY();
                    }
                    break;
                case "ArrowDown":
                    this.inputs[event.key] = false;
                    if(game.player.speedY > 0){
                        game.player.stopY();
                    }
                    break;
                case " ":
                    this.inputs[event.key] = false;
                    break;
            }
        });
    }
}