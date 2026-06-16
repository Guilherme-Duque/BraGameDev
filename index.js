function enviarFormulario(event){

    event.preventDefault();

    alert(
        "Inscrição enviada com sucesso!"
    );

}

/* =========================
    SPACE INVADERS
========================= */ 

const imgJogador = new Image();
imgJogador.src = "img/Jogador.png"; 

const imgInimigo = new Image();
imgInimigo.src = "img/Inimigo.png";

const imgTiro = new Image();
imgTiro.src = "img/Tiro.png";



const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

const startBtn =
document.getElementById("startGame");

let gameRunning = false;

let score = 0;
let lives = 3;

const player = {

    x: 420,
    y: 430,
    width: 60,
    height: 40,
    speed: 7

};

let bullets = [];
let enemies = [];

const keys = {

    left:false,
    right:false

};

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft")
        keys.left=true;

    if(e.key==="ArrowRight")
        keys.right=true;

});

document.addEventListener("keyup",(e)=>{

    if(e.key==="ArrowLeft")
        keys.left=false;

    if(e.key==="ArrowRight")
        keys.right=false;

});

function createEnemy(){
    if(!gameRunning) return; // Segurança caso o intervalo rode após game over

    enemies.push({

        x: Math.random() * (canvas.width - 40),
        y: -50,
        width: 40,
        height: 40,
        speed: 1.5 + Math.random()*2

    });

}

function shoot(){
    if(!gameRunning) return; // Segurança caso o intervalo rode após game over

    bullets.push({

        x: player.x + player.width/2 - 3,
        y: player.y,
        width: 6,
        height: 15

    });

}

function drawPlayer(){

    ctx.drawImage(imgJogador, player.x, player.y, player.width, player.height);

}

function drawEnemies(){

    enemies.forEach(enemy => {
        ctx.drawImage(imgInimigo, enemy.x, enemy.y, enemy.width, enemy.height);
    });

}

function drawBullets(){

    bullets.forEach(bullet => {
        ctx.drawImage(imgTiro, bullet.x, bullet.y, bullet.width, bullet.height);
    });

}

function update(){

    if(!gameRunning)
        return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if(keys.left)
        player.x -= player.speed;

    if(keys.right)
        player.x += player.speed;

    player.x =
    Math.max(
        0,
        Math.min(
            canvas.width-player.width,
            player.x
        )
    );

    // Movimentação das balas de trás para frente para evitar bugs com o splice
    for (let index = bullets.length - 1; index >= 0; index--) {
        let bullet = bullets[index];
        bullet.y -= 10;

        if(bullet.y < 0) {
            bullets.splice(index, 1);
        }
    }

    // Movimentação e colisão de inimigos de trás para frente para evitar bugs com o splice
    for (let eIndex = enemies.length - 1; eIndex >= 0; eIndex--) {
        let enemy = enemies[eIndex];
        enemy.y += enemy.speed;

        if(enemy.y > canvas.height){
            enemies.splice(eIndex, 1);
            lives--;

            if(lives <= 0){
                gameRunning = false;
                clearInterval(enemyInterval); // Limpa os geradores imediatamente no game over
                clearInterval(shootInterval);
            }
            continue; // Pula para o próximo loop já que este inimigo foi removido
        }

        for (let bIndex = bullets.length - 1; bIndex >= 0; bIndex--) {
            let bullet = bullets[bIndex];

            if(
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                break; // Para o loop interno da bala já que colidiu
            }
        }
    }

    drawPlayer();
    drawEnemies();
    drawBullets();

    ctx.fillStyle="white";
    ctx.font="24px Arial";

    ctx.fillText(
        "Pontos: " + score,
        20,
        35
    );

    ctx.fillText(
        "Vidas: " + lives,
        20,
        70
    );

    if(!gameRunning){

        ctx.fillStyle="red";
        ctx.font="50px Arial";

        ctx.fillText(
            "GAME OVER",
            300,
            250
        );

        startBtn.style.display="block";

        return;

    }

    requestAnimationFrame(update);

}

let enemyInterval;
let shootInterval;

startBtn.addEventListener("click",()=>{

    score = 0;
    lives = 3;

    bullets = [];
    enemies = [];

    player.x = 420;

    // Se o jogo já estiver rodando, impede de duplicar o requestAnimationFrame
    if (gameRunning) return; 

    gameRunning = true;

    startBtn.style.display="none";

    clearInterval(enemyInterval);
    clearInterval(shootInterval);

    enemyInterval =
    setInterval(createEnemy,800);

    shootInterval =
    setInterval(shoot,250);

    update();

});

ctx.fillStyle="white";
ctx.font="36px Arial";

ctx.fillText(
    "Clique em INICIAR JOGO",
    240,
    250
);