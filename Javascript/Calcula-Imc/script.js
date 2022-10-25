var peso = document.getElementById("peso");
var altura = document.getElementById("altura");
var botao = document.getElementById("calcular");
var div = document.getElementById("div");

botao.onclick = function() {
    fetch(`https://projetoBack.elidacris0.repl.co/calculo?peso=${peso.value}&altura=${altura.value}`)

    .then(function(res) {
      return res.json()
    })
      
    .then(function(myJson) {
      div.innerText = myJson.resultado
    })
 
}
