//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO

let gameTimer = null;
let tuberiasTimer = null;
let pollito = null;
let tuberiasArr = []; 
let spawnTuberiaTime = 1200;


//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {

    // 1. cambiar pantallas
    splashScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    // 2.añadir todos los elementos iniciales del juego
    pollito = new Pollito();
    // tuberia = new Tuberia();

    // 3. iniciar intervalo del juego
    gameTimer = setInterval(()=>{
        gameLoop();
    }, Math.round(1000/60));

    // 4. iniciar otros intervalos extra
    
    //Add tuberia cada 1sec
    tuberiasTimer = setInterval(()=>{

        addTuberia();
    } , spawnTuberiaTime);

}

//60 fps, game logic
function gameLoop() {

    //Aplicamos gravedad al pollito
    pollito.gravity();

    //Iniciar el movimiento de todas las tuberias
    tuberiasArr.forEach((tuberia) => {tuberia.movement()});

    checkTuberiaLeft();

    checkCollisionTuberia();
}

//Añadir tuberia
function addTuberia() {
    //random entre [0 y valor]
    let posY = Math.floor(Math.random() * - 100);
    //tuberia top
    tuberiasArr.push(new Tuberia(posY, "top"));
    //tuberia bottom
    //setTimeout( ,500);
    tuberiasArr.push(new Tuberia(posY + 300, "bottom"));
}

//Comprobar si la tuberia salió del gamebox
function checkTuberiaLeft() {
    if(tuberiasArr.length > 0 && tuberiasArr[0].x + tuberiasArr[0].w <=0) {
        //eliminar tuberia del dom
        tuberiasArr[0].node.remove();
        tuberiasArr.shift();
    }
}

function checkCollisionTuberia() {
    tuberiasArr.forEach((tuberia)=>{
        if (pollito.x < tuberia.x + tuberia.w &&
            pollito.x + pollito.w > tuberia.x &&
            pollito.y < tuberia.y + tuberia.h &&
            pollito.y + pollito.h > tuberia.y
        ) {
            pollito.node.remove();
            gameOver();
        }
    });
}

function gameOver() {
    // 1. stop intervals
    clearInterval(gameTimer);
    clearInterval(tuberiasTimer);

    // 3. clean game
    setTimeout(()=>{    
        pollito = null;
        tuberiasArr = []; 
    
        // 2. remove game box nodes
        gameBoxNode.innerHTML = "";
    } , 2000);

    // 3. cambiar pantallas
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
}

//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);
window.addEventListener("keydown",(event)=>{
    if(event.key === "w") {
        pollito.jump();
    }
});



