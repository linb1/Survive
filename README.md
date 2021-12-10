# Survive!

[Survive!](https://linb1.github.io/Survive/) is a 2D arcade game.

![gameplay](https://user-images.githubusercontent.com/68402088/145424298-fcc162e1-85ff-42f0-af3e-1ea40920e217.gif)

Stuck in a room with no where else to go, defend against waves of enemies 
for as long as you can! The longer you live, the stronger your enemies get, so don't
let them catch you!

Use the arrow keys to move, spacebar to shoot, and press "P" to pause.

## Code
```javascript
    checkForCollision(object){
        let leftColumn = Math.floor(object.position.x / this.map.tileSize);
        let bottomRow = Math.floor((object.position.y + object.height)/ this.map.tileSize);
        let topRow = Math.floor(object.position.y / this.map.tileSize);
        let rightColumn = Math.floor((object.position.x + object.width) / this.map.tileSize);

        if (this.map.collisionMap[bottomRow][leftColumn] != 0){
            this.collision(this.map.collisionMap[bottomRow][leftColumn], object, bottomRow, leftColumn);
        }
        if (this.map.collisionMap[topRow][leftColumn] != 0) {
            this.collision(this.map.collisionMap[topRow][leftColumn], object, topRow, leftColumn);
        }
        if (this.map.collisionMap[bottomRow][rightColumn] != 0) {
            this.collision(this.map.collisionMap[bottomRow][rightColumn], object, bottomRow, rightColumn);
        }
        if (this.map.collisionMap[topRow][rightColumn] != 0) {
            this.collision(this.map.collisionMap[topRow][rightColumn], object, topRow, rightColumn);
        }
    }
```
The games revolves around collision detection, which is down by taking a grid of the map and
checking every corner of each object to see if an object has collided with the terrian.

```javascript
    leftCollision(object, tile_left){
        if (object instanceof Projectile) {
            object.delete = true;
            this.removeProjectiles()
        } else {
            let rightOfobject = object.position.x + object.width;
            let prevRightOfobject = object.prevPosition.x + object.width;
            if ((object.position.x - object.prevPosition.x) > 0) {
                let left = tile_left * this.map.tileSize;
    
                if (rightOfobject > left && prevRightOfobject <= left) {
                    object.prevPosition.x = object.position.x = left - object.width - 0.01;
                    return true
                }
            }
            return false
        }
    }
```
The game checks the location of the object on the previous frame and compares it with the
location of the object at the current frame to determine from which direction the object is
entering the collision boundary before stopping the object. This is applied to all four directions.

## Technologies
- Javascript
- HTML
- CSS
- Canvas
- Webpack

## Bonus Features
- Background music
- Additional game features: upgrading weapons, unique enemies
- Different levels/waves as game goes on

## Todo's/Future
- Add any additional bonus/new game features
- Improve previous game feature (i.e smarter enemy AI, better map)
- Refactor and organize code to improve readability and reuseability
