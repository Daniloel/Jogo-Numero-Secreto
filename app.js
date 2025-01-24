//Criar uma variavel para o array
let listaNumerosEscolhido =[];
//Quantidade maxima de numero que podem ser escolhidos
let numeroMaximo = 10;
//varivel que chama a função para gerar numero aleatório
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;


//Função com parametro onde seleciono ou o titulo ou paragrafo 
function mudarTextoNaTela(tag , texto){
    let campo  = document.querySelector(tag);
    campo .innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate :1.2})

   //Outra opção para fala de texto
//    if ('speechSynthesis' in window) {
//     let utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = 'pt-BR'; 
//     utterance.rate = 1.2; 
//     window.speechSynthesis.speak(utterance); 
// } else {
//     console.log("Web Speech API não suportada neste navegador.");
// }
}

//Função para exibir mensagem
function exibirMesagemInicial (){

    mudarTextoNaTela("h1","Jogo do número secreto");
    mudarTextoNaTela("p","Escolha um número entre 1 e 10");
}

exibirMesagemInicial();

//Função sem parametro e sem retorno que verifica o se o chute foi correto
function verificarChute(){
    //Pegar numero que esta na tela
    let chute = document.querySelector("input").value;

    if (chute == numeroAleatorio){
      mudarTextoNaTela("h1","Acertou !");
      let textoTentativa = tentativas > 1 ? "tentativas" : "tentativa";
      let mensagem =`Voce achou o numero com ${tentativas} ${textoTentativa}!`
      mudarTextoNaTela("p",mensagem);
      //Aqui estou pegando o elemento pe id, que quero remover o atribute
      document.getElementById("reiniciar").removeAttribute("disabled");
    }else {
        if (chute > numeroAleatorio){
            mudarTextoNaTela("p", "O numero secreto é menor");
        }else {
            mudarTextoNaTela("p","O numero secreto é maior");
        }
        //Modo dev furioso
        tentativas++;
    }

    limparTentativas();
}

//Função para limpar o numero que foi escolhido
function limparTentativas(){
    let chute = document.querySelector("input");
    chute.value = " ";

}

//funçãosem parametro e com retorno que gera numero aletório
function gerarNumeroAleatorio(){
   let numeroEscolhido  = parseInt(Math.random() * numeroMaximo +1);
   let quantidadeDeElementosLista = listaNumerosEscolhido.length;

   //Limpar a lista
   if(quantidadeDeElementosLista == numeroMaximo){
    listaNumerosEscolhido=[];
   }

   if (listaNumerosEscolhido.includes(numeroEscolhido)){
       return gerarNumeroAleatorio();
    }else {
        //colocarnumero escolhido em um array
        listaNumerosEscolhido.push(numeroEscolhido);
        console.log(listaNumerosEscolhido);
        return numeroEscolhido;
    }
}


function limparJogo(){
    tentativas =1;
    numeroAleatorio = gerarNumeroAleatorio();
    limparTentativas();
    exibirMesagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true); // Pego o Id la no html

}




//Exemplos de como selecionar um item no html e mudar o seu texto 
// let titulo = document.querySelector('h1');
// titulo.innerHTML = "Jogo do número secreto";


// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = "Escolha um número entre 1 e 10"