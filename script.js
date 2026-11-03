const emojis = ["🐶", "🐱", "🐸", "🐶", "🐱", "🐸"];
const tabuleiro = document.getElementById("tabuleiro");
const contadorTentativas = document.getElementById("tentativas");
const mensagem = document.getElementById("mensagem");
const visorPontuacao = document.getElementById("pontuacao");
const visorTempo = document.getElementById("tempo");
const visorRecorde = document.getElementById("recorde");

let jogoEncerrado = false;
let pontuacao = 0;
let tempoRestante = 60;
let recorde = Number(localStorage.getItem("recordeMemoria")) || 0;

visorRecorde.textContent = recorde;

let paresEncontrados = 0;
let totalTentativas = 0;
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false


function iniciarRodada() {
  tabuleiro.innerHTML = "";
  paresEncontrados = 0;
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  mensagem.textContent = "";
  
  
  
  
  
emojis.sort(() => Math.random() - 0.5);
emojis.forEach(function (emoji) {
  const carta = document.createElement("button");
  carta.textContent = "❓";
  carta.dataset.emoji = emoji;

carta.addEventListener("click", function () {
  if (jogoEncerrado) return;
  if (bloqueado) return;
  if (carta === primeiraCarta) return;

  carta.textContent = carta.dataset.emoji;

  if (primeiraCarta === null) {
    primeiraCarta = carta;
  } 
  
  else {
    segundaCarta = carta;
    bloqueado = true;
 totalTentativas++;
 contadorTentativas.textContent = totalTentativas;
 
    if (primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji) {
      primeiraCarta.disabled = true;
      segundaCarta.disabled = true; 
      primeiraCarta.classList.add("encontrada");
      segundaCarta.classList.add("encontrada");
      paresEncontrados++;
      pontuacao++;
      visorPontuacao.textContent = pontuacao;
      
      if (pontuacao > recorde) {
      recorde = pontuacao;
      visorRecorde.textContent = recorde;
      localStorage.setItem("recordeMemoria", recorde);
      mensagem.textContent = "🏆 Novo Recorde";
      }

if (paresEncontrados === emojis.length / 2) {
  mensagem.textContent = "Rodada concluída! Próxima rodada...";
  setTimeout(function () {
    if (!jogoEncerrado) {
      iniciarRodada();
    }
  }, 1500);
}
      primeiraCarta = null;
      segundaCarta = null;
      bloqueado = false;
    } else {
      setTimeout(function () {
        primeiraCarta.textContent = "❓";
        segundaCarta.textContent = "❓";
        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;
      }, 1000);
    }
  }
  }
);
 tabuleiro.appendChild(carta);
 });
 }
 iniciarRodada(); 
 
visorTempo.textContent = tempoRestante;

const cronometro = setInterval(function () {
 tempoRestante--;
 visorTempo.textContent = tempoRestante;
 
 if (tempoRestante === 0) {
 clearInterval(cronometro);
 jogoEncerrado = true;
 bloqueado = true;
 mensagem.textContent = `⏱️ Tempo esgotado!! Você fez ${pontuacao} pontos`;
  }
 },1000);
 const botaoReiniciar = document.getElementById("reiniciar");

botaoReiniciar.addEventListener("click", function () {
  location.reload();
});
