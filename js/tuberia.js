class Tuberia {
  constructor(y, position) {
    this.x = gameBoxNode.offsetWidth;
    this.y = y;
    this.w = 40;
    this.h = 200;
    this.speed = 3;

    // 1. añadir tuberia al DOM
    
    this.node = document.createElement("img");
    gameBoxNode.appendChild(this.node);
    
    // 2. custom position
    if(position === "top") {
        this.node.src = "../images/obstacle_top.png";
    }
    else {
        this.node.src = "../images/obstacle_bottom.png";
    }

    // 3. ajustar sus dimensiones y posiciones
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }


  movement(){
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }

}
