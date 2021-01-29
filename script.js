//Create constatnts that are essential to the game
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');

//Create the jumping indicar variable and the dino position variable
let isJumping = false;
var position = 0;
var scoreCounter = 0;
//For debug purposes
//console.log(dino);

//Function that handles the dino jump, checking its state
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            //For debug purposes
            //console.group("Pressionou a tecla espaço");
            jump();
        }
    }
}

//Function which is responsible for the dino jump
function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            //Subindo
            clearInterval(upInterval);
            //Descendo
            let downInterval = setInterval(() => {
                dino.style.bottom = position + 'px';
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    scoreCounter++;
                    score.innerHTML = scoreCounter;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

//Function which is responsible for generating the cacatus (recursive) and game state
function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo </h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);