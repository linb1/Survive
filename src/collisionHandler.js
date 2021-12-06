
export default class CollisionHandler{
    // object position
    constructor(map, gameObject){
        this.map = map;
        this.gameObject = gameObject;
        this.collisionMap = this.map.collisionMap;
        this.leftOfObject = this.gameObject.position.x;
        this.rightOfObject = this.gameObject.position.x + this.gameObject.width;
        this.topOfObject = this.gameObject.position.y;
        this.bottomOfObject = this.gameObject.position.y + this.gameObject.height;

        this.oldLeftOfObject = this.gameObject.prevPosition.x;
        this.oldRightOfObject = this.gameObject.prevPosition.x + this.gameObject.width;
        this.oldTopOfObject = this.gameObject.prevPosition.y;
        this.oldBottomOfObject = this.gameObject.prevPosition.y + this.gameObject.height;
    }

    
    collision(value, gameObject, row, column) {
        switch(value){
            case 1:
                return this.bottomCollision(gameObject, row);
                break;
            case 2:
                return this.rightCollision(gameObject, column);
                break;
            case 3:
                return this.leftCollision(gameObject, column);
                break;
            case 4:
                return this.topCollision(gameObject, row);
                break;
            case 5:
                
                break;
        }
    }

    bottomCollision(gameObject, row){
            if ((gameObject.position.y - gameObject.prevPosition.y) < 0) {
                let bottom = (row + 1) * this.map.tileSize;

                if (this.topOfObject < bottom && this.oldTopOfObject >= bottom) {
                    gameObject.speedY = 0;
                    gameObject.prevPosition.y = gameObject.position.y = bottom;
                }
            }
    }

    rightCollision(gameObject, column) {
            // if object moving left (cant hit right side unless coming from left)
            if ((gameObject.position.x - gameObject.prevPosition.x) < 0) {
                let right = (column+1) * this.map.tileSize; //right side of tile = left side of next tile

                //checks if object is entering collision boundary
                if (this.leftOfObject < right && this.oldLeftOfObject >= right) {
                    gameObject.speedX = 0;
                    gameObject.prevPosition.x = gameObject.position.x = right;
                    return true
                }
            }
        return false
    }

    leftCollision(gameObject, column) {
            // if object moving right (cant hit left side unless coming from right)
            if((gameObject.position.x - gameObject.prevPosition.x) > 0){
                let left = column*this.map.tileSize;

                //checks if object is entering collision boundary
                if(this.rightOfObject > left && this.oldRightOfObject <= left){
                    gameObject.speedX = 0;
                    gameObject.prevPosition.x = gameObject.position.x = left - gameObject.width;
                    return true
                }
            }
        return false
    }

    topCollision(gameObject, row) {
            if ((gameObject.position.y - gameObject.prevPosition.y) > 0) {
                let top = row * this.map.tileSize;

                if (this.bottomOfObject > top && this.oldBottomOfObject <= top) {
                    gameObject.speedY = 0;
                    gameObject.prevPosition.y = gameObject.position.y = top - gameObject.height;
                    return true
                }
            }
        return false
    }

    checkForCollision(){ 
        // check corners of object to see which tile had collision with object
        let leftColumn = Math.floor(this.leftOfObject/this.map.tileSize);
        let bottomRow = Math.floor(this.bottomOfObject/this.map.tileSize);
        let topRow = Math.floor(this.topOfObject/this.map.tileSize);
        let rightColumn = Math.floor(this.rightOfObject/this.map.tileSize);
        // debugger;

        if((this.gameObject.position.x - this.gameObject.prevPosition.x) < 0) { //test collision of left side of object if moving left
            //checking bottom left corner
            let value_of_tile_bottom = this.collisionMap[bottomRow][leftColumn];
            if(value_of_tile_bottom != 0) {
                this.collision(value_of_tile_bottom, this.gameObject, bottomRow, leftColumn);
            }
            //checking top left corner
            let value_of_tile_top = this.collisionMap[topRow][leftColumn];
            if (value_of_tile_top != 0) {
                this.collision(value_of_tile_top, this.gameObject, topRow, leftColumn);
            }

        } else if ((this.gameObject.position.x - this.gameObject.prevPosition.x) > 0) { //test collision of right side of object if moving right
            //checking bottom right corner
            let value_of_tile_bottom = this.collisionMap[bottomRow][rightColumn];
            if (value_of_tile_bottom != 0) {
                this.collision(value_of_tile_bottom, this.gameObject, bottomRow, rightColumn);
            }
            //checking top right corner
            let value_of_tile_top = this.collisionMap[topRow][rightColumn];
            if (value_of_tile_top != 0) {
                this.collision(value_of_tile_top, this.gameObject, topRow, rightColumn);
            }

        } else if ((this.gameObject.position.y - this.gameObject.prevPosition.y) < 0) { //test collision of top side of object if moving up
            //checking top left corner
            let value_of_tile_left = this.collisionMap[topRow][leftColumn];
            if (value_of_tile_left != 0) {
                this.collision(value_of_tile_left, this.gameObject, topRow, leftColumn);
            }
            //checking top right corner
            let value_of_tile_right = this.collisionMap[topRow][rightColumn];
            if (value_of_tile_right != 0) {
                this.collision(value_of_tile_right, this.gameObject, topRow, rightColumn);
            }

        } else if ((this.gameObject.position.y - this.gameObject.prevPosition.y) > 0) { //test collision of bottom side of object if moving down
            //checking top left corner
            let value_of_tile_left = this.collisionMap[bottomRow][leftColumn];
            if (value_of_tile_left != 0) {
                this.collision(value_of_tile_left, this.gameObject, bottomRow, leftColumn);
            }
            //checking top right corner
            let value_of_tile_right = this.collisionMap[bottomRow][rightColumn];
            if (value_of_tile_right != 0) {
                this.collision(value_of_tile_right, this.gameObject, bottomRow, rightColumn);
            }
        }
    }

}