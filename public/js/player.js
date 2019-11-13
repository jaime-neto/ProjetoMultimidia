var Context = AudioContext || webkitAudioContext;
var audio = document.querySelector("#audio");
var audioContext = new Context();
var media = audioContext.createMediaElementSource(audio);

var frequencia;
var canvasContext;
var analyser2;
var bufferLength2;
var dataArray2;

//Efeitos com as músicas
window.onload = function() {
    var balanco = document.querySelector("#balanco");
    audio.addEventListener("play", () => audioContext.resume());
    var pannerNode = audioContext.createStereoPanner();
    media.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    
    balanco.oninput = function(evt) {
      pannerNode.pan.value = evt.target.value;
    }

    audio.onplay = () => {audioContext.resume();}
  
    frequencia = document.querySelector("#frequencia");
    canvasContext = frequencia.getContext("2d");
  
    analyser2 = audioContext.createAnalyser();
    analyser2.fftSize = 64;
    bufferLength2 = analyser2.frequencyBinCount;
    
    dataArray2 = new Uint8Array(bufferLength2);
    
    media.connect(analyser2);
    analyser2.connect(audioContext.destination);
    
    requestAnimationFrame(visualize);
}

//Mostrar a frequencia
function visualize() {
    canvasContext.fillStyle = "#C8C8C8";
    var width = frequencia.width;
    var height = frequencia.height;
    canvasContext.fillRect(0, 0, width, height);
    
    analyser2.getByteFrequencyData(dataArray2);
    var x = 0;
    var barWidth = width / bufferLength2;
    
    for (var i = 0; i < bufferLength2; i++) {
      var v = dataArray2[i]/255;
      var y = v * (height/1.2);
      canvasContext.fillStyle='rgb(' + (y+100) + ',50,50)';
      canvasContext.fillRect(x, height - y, barWidth, y);
      x += barWidth + 1;
    }
    requestAnimationFrame(visualize);
}

/*Funções responsáveis por executar todas as musicas*/
function play(musica){
    audio.play();
    nomeMusica = document.querySelector("#nomeMusica");
    nomeMusica.innerHTML="Você está ouvindo: " + musica;
}

function musica1(){
    audio.src="musicas/1_estilo_cachorro.mp3";
    play("Estilo cachorro");
    
}

function musica2(){
    audio.src="musicas/2_formula_magica_da_paz.mp3";
    play("Formula mágica da paz");  
}

function musica3(){
    audio.src="musicas/3_vida_loka_part_1.mp3";
    play("Vida loka Pt. 1");  
}

function musica4(){
    audio.src="musicas/4_vida_loka_parte_2.mp3";
    play("Vida loka Pt. 2");  
}

function musica5(){
    audio.src="musicas/5_negro_drama.mp3";
    play("Negro drama");  
}

/*Onda das musicas*/
var canvas = document.querySelector("#onda");
var audio = document.querySelector("#audio");
var analyser = audioContext.createAnalyser();
media.connect(analyser);
media.connect(audioContext.destination);

analyser.fftSize = 1024;
var bufferLength = analyser.fftSize;
var dataArray = new Uint8Array(bufferLength);

var w = canvas.width;
var h = canvas.height;
var sliceWidth = w * 1.0 / bufferLength;
canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, w, h);
canvasCtx.fillStyle = 'rgb(200, 200, 200)';
canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    
function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillRect(0, 0, w, h);
    canvasCtx.beginPath();

    var x = 0;
    
    for(var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * h/2;
        if(i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
};
draw();







