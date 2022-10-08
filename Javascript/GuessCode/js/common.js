$(() => {
  if (!localStorage.codeguess) {
    localStorage.setItem(
      "codeguess",
      JSON.stringify({
        t: 0,
        v: 0,
        e: 0,
        s: 0,
      })
    );
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
  updateDb();
});
