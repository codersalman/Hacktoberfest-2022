function calc()
{
    var h,w,bmi;
    h = parseFloat(document.getElementById("h").value);
    w = parseFloat(document.getElementById("w").value);
    bmi=((w)/(h*h)).toFixed(2);
                if(bmi <= 18.5){
                document.getElementById("value").innerHTML ="Underweight ";
                }
                else if(bmi>= 18.5 && bmi<=24.8 ){
                    document.getElementById("value").innerHTML ="Normal weight";

                }
                else if(bmi>= 25 && bmi<=29.9 ){
                    document.getElementById("value").innerHTML ="Normal weight";

                }
                else{
                    document.getElementById("value").innerHTML = "Over weight";
                }

    console.log(bmi);
    document.getElementById("print").innerHTML = bmi;
}
