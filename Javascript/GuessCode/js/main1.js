// Fonction qui génère des nombres aléatoires
function randfunc(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
}
let updateDb = (t = "", v = "", e = "", s = "") => {
  let cg = JSON.parse(localStorage.codeguess);

  if (t) cg.t++;
  if (v) cg.v++;
  if (e) cg.e++;
  if (s) cg.s++;

  localStorage.setItem("codeguess", JSON.stringify(cg));

  $(".t").html(cg.t);
  $(".v").html(cg.v);
  $(".e").html(cg.e);
  $(".s").html(cg.s);
};
//Principale
$(function () {
  function newGame() {
    let tab = [],
      ind = Array(15).fill("");
    let m = 0,
      n = 0,
      o = 0,
      error = 0,
      nombre = 0,
      p = 0,
      items = "";
    // Choix du nombre
    for (let i = 0; i < 3; i++) {
      do {
        n = randfunc(0, 9);
      } while (tab.includes(n));
      tab[i] = n;
    }
    nombre = tab.join("");
    // 1 - Un chiffre correct et bien placé
    o = randfunc(0, 2);
    ind[o] = tab[o];
    for (let i = 0; i < 3; i++) {
      if (i != o) {
        do {
          n = randfunc(0, 9);
          error = 0;
          for (let j = 0; j < 3; j++) {
            if (tab[j] === n || ind[j] === n) error = 1;
          }
        } while (error);
        ind[i] = n;
      }
    }
    // 2 - Un chiffre est correct et mal placé
    do {
      n = randfunc(0, 2);
      error = 0;
      if (n != 0) {
        ind[n + 3] = tab[0];
      } else error = 1;
    } while (error);
    for (let i = 3; i < 6; i++) {
      if (i != n + 3) {
        do {
          m = randfunc(0, 9);
          error = 0;
          for (let j = 0; j < 3; j++) {
            if (tab[j] === m || ind[j + 3] === m) error = 1;
          }
        } while (error);
        ind[i] = m;
      }
    }
    //3 -Les deux chiffres correct et mal placé
    do {
      n = randfunc(0, 2);
      m = randfunc(0, 2);
      error = 0;
      if (m != n && m != 1) {
        ind[n + 6] = tab[m];
        ind[m + 6] = tab[1];
      } else error = 1;
    } while (error);
    do {
      // Choix du troisieme nombre hors des valeurs vraies
      o = randfunc(0, 9);
      error = 0;
      for (let j = 0; j < 3; j++) {
        if (tab[j] === o) error = 1;
      }
    } while (error);
    do {
      p = randfunc(0, 2);
      error = 0;
      if (p === m || p === n) error = 1;
    } while (error);
    ind[p + 6] = o;
    //4 -Les chiffres qui sont pas dans le tableau
    for (let i = 0; i < 3; i++) {
      do {
        n = randfunc(0, 9);
        error = 0;
        for (let j = 0; j < 3; j++) {
          if (tab[j] === n || ind[j + 9] === n) error = 1;
        }
      } while (error);
      ind[i + 9] = n;
    }
    // 5- Un chiffre est correct et mal placé
    do {
      n = randfunc(0, 2);
      m = randfunc(0, 2);
      error = 0;
      if (n != m) {
        ind[n + 12] = tab[m];
      } else error = 1;
    } while (error);
    for (let i = 12; i < 15; i++) {
      if (i != n + 12) {
        do {
          m = randfunc(0, 9);
          error = 0;
          for (let j = 0; j < 3; j++) {
            if (tab[j] === m || ind[j + 12] === m) error = 1;
          }
        } while (error);
        ind[i] = m;
      }
    }
    //Remplissage
    for (let i = 0; i < 15; i++) {
      items = ".cell" + i;
      $(items).html(ind[i]);
    }
    return nombre;
  }
  let nombre = newGame();
  //Vérification des résultats
  let handler = (nombre) => {
    if ($("#form").val()) {
      if (nombre == $("#form").val()) {
        updateDb(1, 1);
        alert(`Well done, the code is good ${nombre} !`);
        nombre = newGame();
        $("#form").val("");
      } else {
        alert("Wrong Code !");
        if (confirm("Get the result ?")) {
          updateDb(1, "", "", 1);
          alert(`The code is ${nombre} !`);
        } else updateDb(1, "", 1);
        nombre = newGame();
        $("#form").val("");
      }
    } else {
      alert("Enter code !");
    }
    return nombre;
  };

  $(".submit").bind("click", function () {
    nombre = handler(nombre);
  });
  $("#form").keydown(function (e) {
    if (e.which == 13) {
      nombre = handler(nombre);
    }
  });
});
//@Auteur: KAKPO Yaovi Roméo
