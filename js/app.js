var playAgain = document.querySelector('.play-again');
var close = document.querySelector('.close');
var playAgainOver = document.querySelector('.play-again-over');
var closeOver = document.querySelector('.close-over');
var modal = document.querySelector('.modal');
var modalOver = document.querySelector('.modal-over');


// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * 500 + 200);
    this.y = y;
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 510){
        this.x = 0;
        this.x += this.speed * dt;
    }
    // (Handles collision with the Player)


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// Now write your own player class
// a handleInput() method.
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
        this.life = 5;
    }

    update(dt){
        // (Handles collision with the Player)
        var life = document.querySelector('.life');
        life.innerHTML = `Life x${this.life}`;

        allEnemies.forEach(enemy => {
            //var distance = getDistance(this.x, this.y,enemy.x, enemy.y);
            let playerDistance = this.getDistance(this.x, this.y,enemy.x, enemy.y);
            if(playerDistance < 40){
                this.x = 200;
                this.y = 380;
                var crashSounds = document.querySelector('.crash-sounds');
                crashSounds.innerHTML = '<audio class="crash-sound" autoplay><source src="images/crash.mp3" type="audio/mpeg"></audio>';
                if(this.life == 0){
                    this.life = 0;
                } else {
                    life.innerHTML = `Life x${this.life -=1}`;
                    if(this.life == 0){
                        this.life = 5;
                        gem.score = 0;
                        this.x = 200;
                        this.y = 380;
                        modalOver.style.display = 'block';
                        playAgainOver.addEventListener('click',() => {
                            modalOver.style.display = 'none';
                        });

                        closeOver.addEventListener('click',() => {
                            modalOver.style.display = 'none';
                        });
                        // Game over sound
                        crashSounds.innerHTML = '<audio class="crash-sound" autoplay><source src="images/over.mp3" type="audio/mpeg"></audio>';

                    }
                }
            }
        });
        // select character
        var charBoy = document.querySelector('.char-boy');
        var charCatGirl = document.querySelector('.char-cat-girl');
        var charHornGirl = document.querySelector('.char-horn-girl');
        var charPinkGirl = document.querySelector('.char-pink-girl');
        var charPrincessGirl = document.querySelector('.char-princess-girl');

        charBoy.addEventListener('click',() =>{
            this.sprite = "images/char-boy.png";
        });
        charCatGirl.addEventListener('click',() => {
            this.sprite = "images/char-cat-girl.png";

        });

        charHornGirl.addEventListener('click',() => {
            this.sprite = "images/char-horn-girl.png";
        });
        charPinkGirl.addEventListener('click',() => {
            this.sprite = "images/char-pink-girl.png";
        });
        charPrincessGirl.addEventListener('click',() => {
            this.sprite = "images/char-princess-girl.png";
        });


    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    getDistance(x1, y1, x2, y2){
        // pythagorean theorem for collisions
            var xDistance = x2 - x1;
            var yDistance = y2 - y1;
            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    handleInput(allowedKeys){

        if(allowedKeys == "left" && this.x > 0){
            this.x -= 100;
        }else if(allowedKeys == "right" && this.x < 400){
            this.x += 100;
        }else if(allowedKeys == "up" && this.y > 0){
            this.y -= 80;
        }else if(allowedKeys == "down" && this.y < 350){
            this.y += 80;
        }

    }

    mobileKeys(){

        // Arrows for mobile devices

        var mobileUp = document.querySelector('.mobile-up');
        var mobileLeft = document.querySelector('.mobile-left');
        var mobileDown = document.querySelector('.mobile-down');
        var mobileRight = document.querySelector('.mobile-right');

        mobileUp.addEventListener('click',() => {
            if(this.y > 0){
                this.y -= 80;
                playAudioBackground();
            }
        });
        mobileLeft.addEventListener('click',() => {
            if(this.x > 0){
                this.x -= 100;
            }
        });
        mobileDown.addEventListener('click',() => {
            if(this.y < 350){
                this.y += 80;
            }
        });
        mobileRight.addEventListener('click',() => {
            if(this.x < 400){
                this.x += 100;
            }
        });

    }
}


// Gem class
class Gem {
    constructor(x, y){
        this.sprite = 'images/gem-orange.png';
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt){
        //var gemDistance = getDistance(this.x, this.y, player.x, player.y);
        let gemDistance =player.getDistance(this.x, this.y, player.x, player.y);

        var score = document.querySelector('.score');
        score.innerHTML = `Score :${this.score}`;

        if(gemDistance < 60){
            const sprites = [
              'images/gem-blue.png',
              'images/gem-green.png',
              'images/gem-orange.png'
            ];

            this.sprite = sprites[Math.floor(Math.random() * sprites.length)]; // get random item from an array

            const positions = [
              {
                x: 400,
                y: 170
              },
              {
                x: 200,
                y: 200
              },
              {
                x: 120,
                y: 100
              }
            ];

            const position = positions[Math.floor(Math.random() * positions.length)]; // get random position from positions array
            this.x = position.x; // set random position x
            this.y = position.y; // set random position y
            var crashSounds = document.querySelector('.crash-sounds');
                crashSounds.innerHTML = '<audio class="crash-sound" autoplay><source src="images/gold.mp3" type="audio/mpeg"></audio>';
                score.innerHTML = `Score :${this.score +=100}`;
            }

            if(player.y == -20){

                modal.style.display = 'block';
                var winningSound = document.querySelector('.winning-sound');
                winningSound.innerHTML = '<audio class="crash-sound" autoplay><source src="images/winning.mp3" type="audio/mpeg"></audio>';
                var winMessage = document.querySelector('.win');
                winMessage.innerHTML = `<span class="win-key">You are the winner<img src="images/small-key.png" alt="with Key"></span>
                <p class="score">Your score is ${this.score}</p>
                `;
                player.x = 200;
                player.y = 380;
                player.life = 5;
                this.score = 0;

                playAgain.addEventListener('click',() => {
                    modal.style.display = 'none';
                });

                close.addEventListener('click',() => {
                    modal.style.display = 'none';
                });

            }

    }
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = [
    new Enemy(60,450),
    new Enemy(145,300),
    new Enemy(230,400)
];
// Place the player object in a variable called player

var player = new Player();

// instantiate golds
var gem = new Gem(120, 100);



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
    playAudioBackground();
});

// This is for run mobile arrows event listeners
player.mobileKeys();


// play background sound
function playAudioBackground(){
    var bgAudio = document.querySelector('.bg-audio');
    bgAudio.volume = 0.1;
    return bgAudio.play();
}
