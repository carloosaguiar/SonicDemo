// ================== SETUP INICIAL ==================
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

const fpsScreen = document.getElementsByTagName('p')[0];

const spriteSonic = new Image();
spriteSonic.src = './sprites/sonic.png';

const spriteTerreno = new Image();
spriteTerreno.src = './sprites/fundo.png';

// ==================================================
//===================================================

let frames = 0;

function limpaTela(){
    ctx.clearRect(0, 0, gameScreen.largura, gameScreen.altura);
    ctx.clearRect(0, 0, -gameScreen.largura, -gameScreen.altura);
}

let gameScreen = {
    largura: canvas.clientWidth,
    altura: canvas.clientHeight
}

let sonic = {
    SpriteX: 0,
    SpriteY: 0,
    largura: 31,
    altura: 40,
    x: 10,
    y: gameScreen.altura - 40,
    gravidade: 0,
    pulo: 0,
    velocidade: 0,
    quadros: [
        {SpriteX: 12, SpriteY: 6},
        {SpriteX: 43, SpriteY: 6},
        {SpriteX: 76, SpriteY: 6},
        {SpriteX: 110, SpriteY: 6},
        {SpriteX: 144, SpriteY: 6},
        {SpriteX: 175, SpriteY: 6},
        {SpriteX: 207, SpriteY: 6},
        {SpriteX: 240, SpriteY: 6},
    ],

    atualizar(){
        //Colisão
        if(this.y >= gameScreen.altura - 40){
            this.y = gameScreen.altura - 40;

            this.quadros = [
                {SpriteX: 12, SpriteY: 6},
                {SpriteX: 43, SpriteY: 6},
                {SpriteX: 76, SpriteY: 6},
                {SpriteX: 110, SpriteY: 6},
                {SpriteX: 144, SpriteY: 6},
                {SpriteX: 175, SpriteY: 6},
                {SpriteX: 207, SpriteY: 6},
                {SpriteX: 240, SpriteY: 6},
            ];

            this.largura = 31;
            this.altura = 40;
        }

        if(this.x >= (gameScreen.largura - 31)/2){
            this.x = (gameScreen.largura - 31)/2;
        }

        //animação de pular
        window.onkeydown = (key) => {
            if(key.key === 'w'){
                this.pulo = 2;
                this.gravidade = 0;
                this.quadros = [
                    {SpriteX: 364, SpriteY: 645}
                ]

                this.largura = 26;
                this.altura = 43;
            }
        }

        //Controle de velocidade
        this.velocidade -= 0.08;
        if(this.velocidade <= 0){
            this.velocidade = 0
        }

        //Mach 1
        if(this.velocidade >= 0.5 && this.velocidade <= 1.5){

            this.quadros = [
                {SpriteX: 14, SpriteY: 119},
                {SpriteX: 50, SpriteY: 118},
                {SpriteX: 84, SpriteY: 119},
                {SpriteX: 116, SpriteY: 119},
                {SpriteX: 156, SpriteY: 118},
                {SpriteX: 189, SpriteY: 119}
            ]

            this.altura = 38;
            this.largura = 37;
        }

        //Mach 2
        if(this.velocidade >= 1.5 && this.velocidade <= 2.5){
            this.quadros = [
                {SpriteX: 0, SpriteY: 267},
                {SpriteX: 35, SpriteY: 267},
                {SpriteX: 38, SpriteY: 226},
                {SpriteX: 77, SpriteY: 268},
                {SpriteX: 121, SpriteY: 266},
                {SpriteX: 159, SpriteY: 267},
                {SpriteX: 196, SpriteY: 267},
                {SpriteX: 237, SpriteY: 267},
                {SpriteX: 280, SpriteY: 267}
            ]

            this.altura = 37;
            this.largura = 41;
        }

        //Mach 3
        if(this.velocidade >= 2.5 && this.velocidade <= 3.5){
            this.quadros = [
                {SpriteX: 16, SpriteY: 440},
                {SpriteX: 49, SpriteY: 440},
                {SpriteX: 83, SpriteY: 440},
                {SpriteX: 117, SpriteY: 440}
            ]

            this.altura = 36;
            this.largura = 32;
        }

        //Mach 4
        if(this.velocidade >= 3.5){
            this.quadros = [
                {SpriteX: 16, SpriteY: 493},
                {SpriteX: 60, SpriteY: 492},
                {SpriteX: 104, SpriteY: 493},
                {SpriteX: 148, SpriteY: 492}
            ]

            this.altura = 32;
            this.largura = 39;
        }

        if(this.velocidade <= 30){
            this.x += this.velocidade;
        }else if (this.velocidade > 30){
            this.x += 0;
        }
    },

    quadroAtual: 0,
    andarDireita(){
        const quantidadeDeFrames = 3;

        const passouQauntidadeQuadros = frames % quantidadeDeFrames === 0;
        if(passouQauntidadeQuadros){
            const incremento = 1 + this.quadroAtual;
            const baseRepeticao = this.quadros.length;

            this.quadroAtual = incremento % baseRepeticao;
        }

        frames ++;
    },

    async desenhar(){
        const {SpriteX, SpriteY} = await this.quadros[this.quadroAtual];
        /*this.SpriteX = this.quadros[this.quadroAtual].SpriteX;
        this.SpriteY = this.quadros[this.quadroAtual].SpriteY;*/

        ctx.drawImage(
            spriteSonic,
            SpriteX, SpriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura,
        )

        this.y -= this.pulo;
        this.y += this.gravidade;

        if(this.y < 200){
            this.pulo = 0;
            this.gravidade = 2;
            this.quadros = [
                {SpriteX: 393, SpriteY: 643}
            ]

            this.largura = 34;
            this.altura = 43;
        }
    }
}

function gameLoop() {
    sonic.atualizar();
    limpaTela();
    sonic.desenhar();

    requestAnimationFrame(gameLoop);
}

gameLoop();

window.onkeypress = (key) =>{

    switch(key.key){
        case 'd': sonic.x += 1.5
            sonic.andarDireita();
            sonic.velocidade += 0.2;
        break;

        case 'a': sonic.x -= 1.5;
        break;
    }
};

window.onkeyup = (key) =>{
    if(key.key === 'd'){
        sonic.quadroAtual = 0;
    }
};