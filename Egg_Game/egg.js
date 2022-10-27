window.onload=()=>{

    

var b=document.querySelectorAll(".btn");

var box=document.querySelector("#box");

var basket=document.querySelector("#basket");

var eggs =[];

var posEgg=[];

var posXeggs=[];

var timer=setInterval(move,5);

var timer2=setInterval(createEgg,2000)

var timer3=setInterval(moveEgg,4);

var pos=125;

var score=0;

var counter=0;

function move(){

    

   

    if(RorL==1){

        if(pos>1)

        pos--;

        

       

    }

    if(RorL==2){

        if(pos<250)

        pos++;

    }

    

    basket.style.left=pos+"px";

}

function createEgg(){

var eggdiv = document.createElement("div");

var egg = document.createElement("img");

eggdiv.className="egg";

egg.className="eggimg";

egg.src="https://images-na.ssl-images-amazon.com/images/I/31uhrs6JPgL._AC_SL1500_.jpg";

eggdiv.appendChild(egg);

var x=(Math.random()*200)+50

eggdiv.style.left=x+"px";

box.appendChild(eggdiv);

eggs.push(eggdiv);

posEgg.push(10);

posXeggs.push(x);

}

function moveEgg(){

    for(let i=0;i<eggs.length;i++){

        if(posEgg[i]!=-1){

        posEgg[i]++;

        eggs[i].style.top=posEgg[i]+"px";

        }

    }

    

    for(let i=0;i<eggs.length;i++){

        if(posEgg[i]!=-1&&posXeggs[i]!=-1){

        if(posEgg[i]==302){

            if((posXeggs[i]-pos<=40&&posXeggs[i]-pos>=0)||(pos-posXeggs[i]<=10&&pos-posXeggs[i]>=0))

           {

            score++;

           }

           box.removeChild(eggs[i]);

           posXeggs[i]=-1;

           posEgg[i]=-1;

           counter++;

           if(counter==15)

           end();

        }

    }

    }

}

function end(){

    document.body.removeChild(box);

    document.body.removeChild(b[0]);

    document.body.removeChild(b[1]);

    alert("Your score is:"+score+"/15");

    

}

}
