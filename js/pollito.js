class Pollito {
    constructor(){
        this.x = 100;
        this.y = 200;
        this.w = 35;
        this.h = 25;
        this.gravityAcc = 1.981;
        this.jumpAcc = 40;
        // this.power = false;

        // 1. añadir el pollito al DOM

        this.node = document.createElement("img");
        this.node.src = "../images/flappy.png";
        gameBoxNode.appendChild(this.node);

        // 2. ajustar sus dimensiones y posiciones

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        this.node.style.position = "absolute";
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }

    gravity() {
        this.y += this.gravityAcc;
        this.node.style.top = `${this.y}px`;

        if(this.y >= gameBoxNode.offsetHeight - this.h) gameOver();
    }

    jump() {
        this.y -= this.jumpAcc;
        this.node.style.top = `${this.y}px`;
    }

}