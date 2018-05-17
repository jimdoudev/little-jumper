// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.y = y;
        this.x = Math.floor(Math.random() * 500 + 200);
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){
        this.x = -50;
        this.x += this.speed * dt;
    }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.y = 405;
        this.x = 200;
    }

    update(dt) {
        //collision detection
        allEnemies.forEach(enemy => {
            let dx = this.x - enemy.x;
            let dy = this.y - enemy.y;
            if (dx < 70 && dx > -70 && dy < 10 && dy > -10) {
                this.x = 200;
                this.y = 405;
            }
        })
        //stepping on water
        if(this.y === -20) {
            setTimeout(() => {
                this.x = 200;
                this.y = 405;
            }, 100);
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys) {
        if(allowedKeys === 'left' && this.x > 0) {
            this.x -= 100;
        } else if(allowedKeys === 'down' && this.y < 405) {
            this.y += 85;
        } else if(allowedKeys === 'right' && this.x < 400) {
            this.x += 100;
        } else if(allowedKeys === 'up' && this.y > 0) {
            this.y -= 85;
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy(60, 150),
    new Enemy(145, 100),
    new Enemy(230, 200)
];

let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
