const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPausebtn = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciaOuPausarBtn = document.querySelector('#start-pause span')
const iniciarOuPausarBtnIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

titulo.addEventListener('click', () => {
    alterarContexto('app__title')
})

function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.<strong class="app__title-strong">`
            break;
        default:
            break;
    }
}

const contagemRegressiva = ()=> {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPausebtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciaOuPausarBtn.textContent = "Pausar";
    iniciarOuPausarBtnIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId);
    iniciaOuPausarBtn.textContent = "Começar";
    iniciarOuPausarBtnIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();








/*const temporizadorFoco = 1500;
const temporizadorCurto = 300;
const temporizadorLongo = 900;*/