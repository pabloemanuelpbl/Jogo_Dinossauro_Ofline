const dino = document.querySelector('.dino');
const background = document.querySelector('.background');


function eventaction(event){
    if(event.keyCode === 32){
        console.log('pressionou')
        if(!jump.isJump){
            jump()
        }
    }
}

//pulo
//jump possue jump.isJump, jump.position 
function jump(){ 
    jump.isJump = true;
    jump.position = 0;

    let upInterval = setInterval(()=>{
        if(jump.position>=170){
            clearInterval(upInterval)
            let dowInterval = setInterval(()=>{
                if(jump.position <= 0 ){
                    clearInterval(dowInterval)
                    jump.isJump = false
                } else {
                    jump.position -= 20;
                    dino.style.bottom = jump.position + 'px';
                }
            }, 30)
        } else {
            jump.position += 20;
            dino.style.bottom = jump.position + 'px'; 
        } 
    }, 30)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    //movimento do cactu
    let leftInterval = setInterval(()=>{
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && (jump.position < 60 || jump.position == undefined) ){
            //game over
            console.log(jump.position)
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game_over">fim de jogo</h1>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    //recursividade ( massa! )
    setTimeout(createCactus, randomTime);
}

createCactus()
//eventos
document.addEventListener('keyup', eventaction);