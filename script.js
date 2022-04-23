const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const aperteTab = document.querySelector('.aperteTab')

function start(image){
    dino.style.background = `url(imagens/${image}.png)`;
}

function eventaction(event){
    if(!jump.start){
        jump.start = true;
        createCactus();
        aperteTab.innerText = "";
    }

    if(jump.gameOver){
        document.location.reload();
        jump.start = false;
    }
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
                    jump.position -= 25;
                    dino.style.bottom = jump.position + 'px';
                }
            }, 30)
        } else {
            jump.position += 25;
            dino.style.bottom = jump.position + 'px'; 
        } 
    }, 20)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    let randomImage = Math.random() * 10; 

    function selectImage(valor){
        if(valor > 9){
            cactus.style.background = `url(imagens/${selectImage.arr[1]}.png)`;
        } else
        if(valor > 7){
            cactus.style.background = `url(imagens/${selectImage.arr[2]}.png)`;
        }
    }
    selectImage.arr = ["cactus", "marge_simpson", "bart_pelado"]

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);
    selectImage(randomImage);

    //movimento do cactu
    let leftInterval = setInterval(()=>{
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && (jump.position < 60 || jump.position == undefined) ){
            //game over
            jump.gameOver = true;
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game_over">fim de jogo</h1>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    //recursividade ( massa! )
    if (!jump.gameOver) setTimeout(createCactus, randomTime);
}

//eventos
document.addEventListener('keyup', eventaction);