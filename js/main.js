class Game {
    constructor (){
        this.player = new Player(10, 30, 100, 100);
        this.obstaclesArr = []
        this.jumpingSound = document.getElementById("jumping-sound")
    }
    start (){
        this.attachEventListeners()

        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 5000);

        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance, i) => {
                obstacleInstance.move();
                this.detectCollision(obstacleInstance);
                this.removeObstacleIfOutside(obstacleInstance, i);
            });
        }, 10);
    }
    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            console.log(event.key)
            if (event.key === " ") {
                if(!this.player.isJumping)
                this.player.jump();
                this.player.isJumping = true
                this.jumpingSound.play();
               
            } 
        });
    }
    removeObstacleIfOutside(obstacleInstance, i) {
        
        const gameWidth = document.querySelector(".game").clientWidth;
        if (obstacleInstance.positionX < -100) {
            obstacleInstance.domElement.remove() ;
            this.obstaclesArr.splice(i, 1)
        }
    }
     
    detectCollision(obstacleInstance) {
        // const playerTop = this.player.positionY;
        // const playerBottom = this.player.positionY + this.player.height;
        // const obstacleLeft = obstacleInstance.positionX;
        //const obstacleRight = obstacleInstance.positionX + obstacleInstance.width;
    
        if ( this.player.x < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.x + this.player.width > obstacleInstance.positionX &&
            this.player.y < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.y + this.player.height > obstacleInstance.positionY) {
            console.log("game over");
            location.href = "./gameover.html";
        }
    }
}

class Player{
    constructor(x, y, height, width){
        this.width = width
        this.height = height
        this.y = y 
        this.x = x
        this.speedY = 0
        this.gravity = 0.05
        this.domElement = null
        this.initialY = y
        this.isJumping = false

        this.createDomElement()
    }
    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.style.backgroundImage = "url('../img/kangaroo.png')"
        this.domElement.style.backgroundPosition = "center"
        this.domElement.style.backgroundSize = "contain"
        this.domElement.style.position = "absolute"
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";
        this.domElement.style.left = this.x + "px"
        this.domElement.style.bottom = this.y + "px"

        const parentElm = document.querySelector(".game");
        parentElm.appendChild(this.domElement);
    }
    jump(){
        this.speedY = 4
        let jumpInterval = setInterval(()=> {
            this.y = this.y + this.speedY
            this.domElement.style.bottom = this.y + "px"

        },10)
        setTimeout(() => {
            clearInterval(jumpInterval)
            this.fall()
        }, 1000)
    }
    fall(){
        this.speedY = 4
        let fallInterval = setInterval(() => {

           
            this.y = this.y - this.speedY
            this.domElement.style.bottom = this.y + "px"
        }, 10)
        setTimeout(() => {
            clearInterval(fallInterval)
            this.isJumping = false
        }, 1000)
    }
    resetPosition() {
        this.y = this.initialY
        this.domElement.style.bottom = this.y + "px"
    }
    }

class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 30;
        this.positionX = 1400;
        this.positionY = 30;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute"
        this.domElement.style.backgroundImage = "url('../img/tree.png')"
        this.domElement.style.backgroundPosition = "center"
        this.domElement.style.backgroundSize = "contain"
        this.domElement.style.backgroundRepeat = "no-repeat"
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "px"
        this.domElement.style.bottom = this.positionY + "px"

        const parentElm = document.querySelector(".game");
        parentElm.appendChild(this.domElement);
    }
    move() {
        this.positionX -= 2;
        this.domElement.style.left = this.positionX + "px";

    }
}


const game = new Game();
game.start();

window.alert("The game has started!")
