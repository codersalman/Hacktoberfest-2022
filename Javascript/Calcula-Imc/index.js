const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.urlencoded({ extend: true }))
app.use(cors())

app.get("/", function(req, res) {
  res.send("ok!");
});

app.get("/calculo", function(req, res) {
  var peso = Number(req.query.peso)
  var altura = Number(req.query.altura)
  var imc = peso / Math.pow(altura, 2)

  var valorFinal = "Você está "
  if (imc < 18.5){
    valorFinal += "abaixo do peso."
  } else if (imc >= 18.6 && imc <= 24.9) {
    valorFinal += "com peso normal. Parabéns :)"
  } else if (imc >= 25.0 && imc <= 29.9) {
    valorFinal += "levemente acima do peso."
  } else if (imc >= 30.0 && imc <= 34.9) {
    valorFinal += "com obesidiade de grau I."
  } else if (imc >= 35.0 && imc <= 39.9) {
    valorFinal += "com obesidiade de grau II (severa)."
  } else {
    valorFinal += "com obesidiade de grau III (morbida)."
  }
  
  res.send({
    resultado: `Seu IMC é de ${(imc.toFixed(2))} kg/m2. \n ${valorFinal}`})

});
 
app.use(express.json())


app.listen(80, function() {
  console.log("quase lá")
})