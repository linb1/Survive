import Game from './game';
export default class InputHandler{
    constructor(game) {
        // moves game.player when key down
        this.inputs = {
            "ArrowLeft": {pressed: false, timeStamp: null},
            "ArrowRight": {pressed: false, timeStamp: null},
            "ArrowUp": {pressed: false, timeStamp: null},
            "ArrowDown": {pressed: false, timeStamp: null},
        };
        document.addEventListener('keydown', (event) =>{
            if (!this.inputs[event.key]){
                this.inputs[event.key] = {pressed: false, timeStamp: event.timeStamp};
            }
            // console.log("inputs")
            //log inputs
            switch (event.key){
                case " ":
                    this.inputs[event.key].pressed = true;
                    this.inputs[event.key].timeStamp = event.timeStamp;
                    break;
                case "ArrowLeft":
                    this.inputs[event.key].pressed = true;
                    this.inputs[event.key].timeStamp = event.timeStamp;
                    break;
                case "ArrowRight":
                    this.inputs[event.key].pressed = true;
                    this.inputs[event.key].timeStamp = event.timeStamp;
                    break;
                case "ArrowUp":
                    this.inputs[event.key].pressed = true;
                    this.inputs[event.key].timeStamp = event.timeStamp;
                    break;
                case "ArrowDown":
                    this.inputs[event.key].pressed = true;
                    this.inputs[event.key].timeStamp = event.timeStamp;
                    break;
            }
            // console.log(this.inputs)

            let keys = Object.keys(this.inputs).filter(key => this.inputs[key].pressed)
            console.log(keys)
            
            if (keys.includes("ArrowLeft") && keys.includes("ArrowUp")) {
                game.player.moveLeft();
                game.player.moveUp();
                game.player.moveDiagonalLeftUp();

            } else if (keys.includes("ArrowLeft") && keys.includes("ArrowDown")) {
                game.player.moveLeft();
                game.player.moveDown();
                game.player.moveDiagonalLeftDown();
            } else if (keys.includes("ArrowRight") && keys.includes("ArrowUp")) {
                game.player.moveRight();
                game.player.moveUp();
                game.player.moveDiagonalRightUp();
            } else if (keys.includes("ArrowRight") && keys.includes("ArrowDown")) {
                game.player.moveRight();
                game.player.moveDown();
                game.player.moveDiagonalRightDown();
                
            } else if (keys.includes("ArrowLeft") && keys.includes("ArrowLeft")) { // check time of imput to determine direction
                if (this.inputs["ArrowLeft"].timeStamp > this.inputs["ArrowRight"].timeStamp){
                    game.player.moveLeft();
                } else if (this.inputs["ArrowLeft"].timeStamp < this.inputs["ArrowRight"].timeStamp){
                    game.player.moveRight();
                }

            } else if (keys.includes("ArrowLeft")){
                game.player.moveLeft();

            } else if (keys.includes("ArrowRight")){
                game.player.moveRight();

            } else if (keys.includes("ArrowUp") && keys.includes("ArrowUp")) { // check time of imput to determine direction
                if (this.inputs["ArrowUp"].timeStamp > this.inputs["ArrowDown"].timeStamp) {
                    game.player.moveUp();
                } else if (this.inputs["ArrowUp"].timeStamp < this.inputs["ArrowDown"].timeStamp) {
                    game.player.moveDown();
                }
            }
            else if (keys.includes("ArrowUp")) {
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
                    this.inputs[event.key].pressed = false;
                    if(game.player.velocity.x < 0){
                        game.player.stopX();
                    }
                    break;
                case "ArrowRight":
                    this.inputs[event.key].pressed = false;
                    if (game.player.velocity.x > 0) {
                        game.player.stopX();
                    }
                    break;
                case "ArrowUp":
                    this.inputs[event.key].pressed = false;
                    if(game.player.velocity.y < 0){
                        game.player.stopY();
                    }
                    break;
                case "ArrowDown":
                    this.inputs[event.key].pressed = false;
                    if(game.player.velocity.y > 0){
                        game.player.stopY();
                    }
                    break;
                case " ":
                    this.inputs[event.key].pressed = false;
                    break;
            }
        });
    }
}