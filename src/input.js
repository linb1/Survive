export default class InputHandler{
    constructor(player) {
        document.addEventListener('keydown', (event) =>{
            switch (event.key){
                case "ArrowRight":
                    player.moveRight();
                    break;
                case "ArrowUp":
                    player.moveUp();
                    break;
                case "ArrowDown":
                    player.moveDown();
                    break;
                case "ArrowLeft":
                    player.moveLeft();
                    break;
                case " ":
                    alert("shoot");
                    break;
            }
        });
    }
}