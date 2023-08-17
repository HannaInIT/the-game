class Game {
    constructor (){
        this.player = new Player(0, 0, 100, 100);
        this.obstaclesArr = []
    }
    start (){
        this.attachEventListeners()

        setInterval(() => {
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 5000);

        setInterval(() => {
            this.obstaclesArr.forEach((obstacleInstance) => {
                obstacleInstance.move();
                this.detectCollision(obstacleInstance);
                this.removeObstacleIfOutside(obstacleInstance);
            });
        }, 10);
    }
    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            console.log(event.key)
            if (event.key === " ") {
                this.player.jump();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
        });
    }

    removeObstacleIfOutside(obstacleInstance) {
        const gameWidth = document.querySelector(".game").clientWidth;
    
        if (obstacleInstance.positionX > gameWidth) {
            obstacleInstance.domElement.remove();
            const index = this.obstaclesArr.indexOf(obstacleInstance);
            if (index > -1) {
                this.obstaclesArr.splice(index, 1);
            }
        }
    }
     
    detectCollision(obstacleInstance) {
        const playerTop = this.player.positionY;
        const playerBottom = this.player.positionY + this.player.height;
        const obstacleLeft = obstacleInstance.positionX;
        //const obstacleRight = obstacleInstance.positionX + obstacleInstance.width;
    
        if (playerBottom > obstacleInstance.positionY && playerTop < obstacleInstance.positionY + obstacleInstance.height && obstacleInstance.positionX > 0) {
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
        this.domElement.style.left = this.x 
        this.domElement.style.bottom = this.y 

        const parentElm = document.querySelector(".game");
        parentElm.appendChild(this.domElement);
    }
    jump(){
        this.speedY = 10
        this.y = this.y + this.speedY
        this.domElement.style.bottom = this.y + "px"
    }
    fall(){
        this.speedY = this.speedY - this.gravity
        this.y = this.y + this.speedY
    }
    }

class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 30;
        this.positionX = 1400;
        this.positionY = 0;
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
        this.domElement.style.bottom = this.positionY 

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
