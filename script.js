const btnAppend = document.querySelector("#append");
const containerCard = document.querySelector(".containerCronometros");
btnAppend.addEventListener("click", criarCard);
const timers = [{id:0, tempo:0, ativo: false}];
containerCard.addEventListener("click", (event)=>{
    if(event.target.tagName === 'BUTTON' || event.target.classList.contains("btnMover")){
        const cardsHtml = Array.from(document.querySelectorAll(".card"));
        const cardEvent = event.target.closest(".card");
        const indexCard = cardsHtml.indexOf(cardEvent);
        if(event.target.tagName === 'BUTTON'){
            if(event.target.classList.contains("btnExcluir")){
                timers.splice(indexCard,1);
                cardEvent.remove();
            }
            else if(event.target.classList.contains("btnIniciar")){
                timers[indexCard].ativo = true;
            }else if(event.target.classList.contains("btnPausar")){
                timers[indexCard].ativo = false;
            }else if(event.target.classList.contains("btnZerar")){ 
                timers[indexCard].ativo = false;
                timers[indexCard].tempo = 0;
                cardEvent.querySelector("h1.contador").textContent = "00:00:00";
            }
        }else if(event.target.classList.contains("btnMover")) {
            if(event.target.classList.contains("moverEsquerda")){
                timers.splice(indexCard-1,0,timers.splice(indexCard,1)[0])
                containerCard.insertBefore(cardEvent,cardsHtml[indexCard-1])
            }else{
                timers.splice(indexCard+1,0,timers.splice(indexCard,1)[0])
                containerCard.insertBefore(cardEvent,cardsHtml[indexCard+2])
            }
            modificarCardsPonta();
        }
    }
    
})
function modificarCardsPonta(){
    const cardsHtml = document.querySelectorAll(".card");
    if(cardsHtml.length == 1){
        cardsHtml[0].querySelector(".moverEsquerda").remove();
        cardsHtml[cardsHtml.length - 1].querySelector(".moverDireita").remove();
    }
    else if(cardsHtml.length>=2){
        if(cardsHtml[0].querySelector(".moverDireita")===null){
            const btnMoverDireita = document.createElement("a");
            btnMoverDireita.classList.add("btnMover","moverDireita");
            cardsHtml[0].appendChild(btnMoverDireita);
        }
        if(cardsHtml[0].querySelector(".moverEsquerda")!==null){
            cardsHtml[0].querySelector(".moverEsquerda").remove();
        }
        if(cardsHtml[cardsHtml.length - 1].querySelector(".moverEsquerda")===null){
            const btnMoverEsquerda = document.createElement("a");
            btnMoverEsquerda.classList.add("btnMover","moverEsquerda");
            cardsHtml[cardsHtml.length - 1].appendChild(btnMoverEsquerda);
        }
        if(cardsHtml[cardsHtml.length - 1].querySelector(".moverDireita")!==null){
            cardsHtml[cardsHtml.length - 1].querySelector(".moverDireita").remove();
        }
        if(cardsHtml.length>2){
            if(cardsHtml[1].querySelector(".moverDireita")===null){
            const btnMoverDireita = document.createElement("a");
            btnMoverDireita.classList.add("btnMover","moverDireita");
            cardsHtml[1].appendChild(btnMoverDireita);
            }
            if(cardsHtml[1].querySelector(".moverEsquerda")===null){
            const btnMoverEsquerda = document.createElement("a");
            btnMoverEsquerda.classList.add("btnMover","moverEsquerda");
            cardsHtml[1].appendChild(btnMoverEsquerda);
            }
            if(cardsHtml[cardsHtml.length - 2].querySelector(".moverDireita")===null){
            const btnMoverDireita = document.createElement("a");
            btnMoverDireita.classList.add("btnMover","moverDireita");
            cardsHtml[cardsHtml.length - 2].appendChild(btnMoverDireita);
            }
            if(cardsHtml[cardsHtml.length - 2].querySelector(".moverEsquerda")===null){
            const btnMoverEsquerda = document.createElement("a");
            btnMoverEsquerda.classList.add("btnMover","moverEsquerda");
            cardsHtml[cardsHtml.length - 2].appendChild(btnMoverEsquerda);
            }
        }
    }

}
function criarCard(){
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    const divSair = document.createElement("div");
    divSair.classList.add("containerExcluir");
    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btnExcluir");
    divSair.appendChild(btnExcluir);
    const divContainerContador = document.createElement("div");
    divContainerContador.classList.add("containerContador");
    const h1Contador = document.createElement("h1");
    h1Contador.classList.add("contador");
    h1Contador.textContent = "00:00:00";
    divContainerContador.appendChild(h1Contador);
    const divContainerBotoes = document.createElement("div");
    divContainerBotoes.classList.add("containerBotoes");
    const botaoIniciar = document.createElement("button");
    botaoIniciar.classList.add("btnIniciar");
    botaoIniciar.textContent = "Iniciar";
    const botaoPausar = document.createElement("button");
    botaoPausar.classList.add("btnPausar");
    botaoPausar.textContent = "Pausar";
    const botaoZerar = document.createElement("button");
    botaoZerar.classList.add("btnZerar");
    botaoZerar.textContent = "Zerar";
    divContainerBotoes.appendChild(botaoIniciar);
    divContainerBotoes.appendChild(botaoPausar);
    divContainerBotoes.appendChild(botaoZerar);
    divCard.appendChild(divSair);
    const btnMoverDireita = document.createElement("a");
    btnMoverDireita.classList.add("btnMover","moverDireita");
    const btnMoverEsquerda = document.createElement("a");
    btnMoverEsquerda.classList.add("btnMover","moverEsquerda");
    divCard.appendChild(btnMoverDireita);
    divCard.appendChild(btnMoverEsquerda);
    divCard.appendChild(divContainerContador);
    divCard.appendChild(divContainerBotoes);
    containerCard.appendChild(divCard);
    timers.push({id:timers.length, tempo:0, ativo: false});
    modificarCardsPonta();
};
function relogio(){
    timers.forEach(timer => {
        const cardsHtml = document.querySelectorAll(".card");
        if (timer.ativo) {
            timer.tempo++;
            cardsHtml[timers.indexOf(timer)].querySelector("h1.contador").textContent = converterSegundos(timer.tempo);
        }
    });
};
function converterSegundos(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
}

if(timers.length > 0) {
setInterval(relogio,1000);
}