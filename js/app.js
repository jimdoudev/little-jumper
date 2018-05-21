//Declare globals
let levelcounter = 1;

// Create Enemy class
class Enemy {
    constructor(y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.y = y;
        this.x = Math.floor(Math.random() * 500 + 200);
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -50;
            this.x += this.speed * dt;
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Create Player class
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.y = 405;
        this.x = 200;
        this.life = 5;
    }

    update(dt) {
        //collision detection and changes to remaining lives
        const modal2 = document.getElementById('modal2');
        const lives = document.getElementById('lives');
        const results = document.getElementById("results");
        allEnemies.forEach(enemy => {
            let dx = this.x - enemy.x;
            let dy = this.y - enemy.y;
            if (dx < 70 && dx > -70 && dy < 10 && dy > -10) {
                this.x = 200;
                this.y = 405;
                this.life -= 1;
                lives.innerHTML = `<span>Lives: ${this.life}</span>`;
                results.innerHTML = `<span>Lives Left: ${this.life}</span>`;
                if (this.life < 1) {
                    modal2.style.display = 'block';
                }
            }
        });

        //Stepping on water and clearing a level
        const level = document.getElementById('level');
        if (this.y === -20) {
            this.x = 200;
            this.y = 405;
            allEnemies.forEach(enemy => {
                enemy.speed += 50;
            });
            levelcounter += 1;
            level.innerHTML = `<span>Level ${levelcounter}/5</span>`;
        }

        //Winning the game
        const modal1 = document.getElementById('modal1');
        if (levelcounter > 5) {
            modal1.style.display = "block";
            level.innerHTML = `<span>Level 5/5</span>`;
        }

        //Changing player
        const cat = document.querySelector('.cat');
        const boy = document.querySelector('.boy');
        const horn = document.querySelector('.horn');
        const pink = document.querySelector('.pink');
        const princess = document.querySelector('.princess');

        boy.addEventListener('click', () => {
            this.sprite = "images/char-boy.png";
        });
        cat.addEventListener('click', () => {
            this.sprite = "images/char-cat-girl.png";
        });
        horn.addEventListener('click', () => {
            this.sprite = "images/char-horn-girl.png";
        });
        pink.addEventListener('click', () => {
            this.sprite = "images/char-pink-girl.png";
        });
        princess.addEventListener('click', () => {
            this.sprite = "images/char-princess-girl.png";
        });
    }

    //Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Implement movement limitations
    handleInput(allowedKeys) {
        if (allowedKeys === 'left' && this.x > 0) {
            this.x -= 100;
        } else if (allowedKeys === 'down' && this.y < 405) {
            this.y += 85;
        } else if (allowedKeys === 'right' && this.x < 400) {
            this.x += 100;
        } else if (allowedKeys === 'up' && this.y > 0) {
            this.y -= 85;
        }
    }
}

// Instantiate your objects.
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