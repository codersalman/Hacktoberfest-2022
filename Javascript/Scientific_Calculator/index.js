let screen1 = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let calculation = "";

for(item of buttons)
{
    item.addEventListener('click',(e)=>{
        var audio = new Audio('click.mp3');
        audio.play();
        buttonText = e.target.innerText;
        if(buttonText=='X')
        {
            buttonText='*';
            calculation+=buttonText;
            screen1.value=calculation;
        }
        else if(buttonText=='AC')
        {
            calculation="";
            screen1.value=calculation;
        }
        else if(buttonText=='=')
        {
            screen1.value=eval(calculation);
        }
        else if(buttonText=='Del')
        {
            calculation=calculation.slice(0,-1);
            screen1.value=calculation;
        }
        else if(buttonText=='sin')
        {
            var x = eval(screen1.value);
            x*=(Math.PI)/180;
            screen1.value=Math.sin(x);
            calculation=screen1.value;
        }
        else if(buttonText=='cos')
        {
            var x = eval(screen1.value);
            x*=(Math.PI)/180;
            screen1.value=Math.cos(x);
            calculation=screen1.value;
        }
        else if(buttonText=='tan')
        {
            var x = eval(screen1.value);
            x*=(Math.PI)/180;
            screen1.value=Math.tan(x);
            calculation=screen1.value;
        }
        else if(buttonText=='lnx')
        {
            var x = eval(screen1.value);
            //x*=(Math.PI)/180;
            screen1.value=Math.log(x);
            calculation=screen1.value;
        }
        else if(buttonText=='e^x')
        {
            var x = eval(screen1.value);
            //x*=(Math.PI)/180;
            screen1.value=Math.exp(x);
            calculation=screen1.value;
        }
        else
        {
            calculation+=buttonText;
            screen1.value=calculation;
        }
    })
}