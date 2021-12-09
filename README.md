# Survive!

[Survive!](https://linb1.github.io/Survive/) is a 2D arcade game.

![gameplay](https://user-images.githubusercontent.com/68402088/145424298-fcc162e1-85ff-42f0-af3e-1ea40920e217.gif)

Stuck in a room with no where else to go, defend against waves of enemies 
for as long as you can! The longer you live, the stronger your enemies get, so don't
let them catch you!

## Functionality and MVPs

In Survive!, players will:
- Move their character with the left, right, up, and down arrow keys
- Shoot with spacebar to damage enemies
- Lose once their character runs out of health
- Be able to pause the game at any time

The enemies will:
- Follow the player until they are destroyed
- Gain more health and damage as the game goes on
- Continue to spawn until the game is over

In addition, this project will include:
- Instructions describing the background and rules of the game
- A production README

## Wireframes
<img width="1026" alt="Screen Shot 2021-12-02 at 5 40 17 PM" src="https://user-images.githubusercontent.com/68402088/144514738-dad393bd-e807-4a6e-bd12-205050c9b401.png">

- Nav links includes links to this project's Github repo and my LinkedIn
- Controls will include the controls in order to play the game (i.e arrow keys to move)
- Instructions will include background and rules for the game
- Scoreboard will have the player's highest score per session
- the Options will give the user the ability to mute the game sounds or pause the game
- the center will contain the game screen, where users can see their score, health, and wave number.

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

## Implementation Timeline
- Friday: Creating base for the game, setting up game architecture, creating window layout, overall getting things to render onto the screen and getting comfortable with technologies
- Saturday: Creating classes for board and player, making sure they render on the screen
- Sunday: Creating projectiles, map, enemies, and implementing collision detection for player/enemies
- Monday: Create game logic, implement enemy AI to follow player
- Tuesday: Finish up on user control, anything game related, and working on styling, such as adding animation and sprites
- Wednesday: Finish styling the game, adding nav links, and any bonus features if possible


## Bonus Features
- Background music
- Additional game features: upgrading weapons, unique enemies
- Different levels/waves as game goes on
