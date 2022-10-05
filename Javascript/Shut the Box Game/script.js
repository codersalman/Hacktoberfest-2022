let rollDice=document.getElementsByClassName("roll-dice");//gets the roll dice button (elements with class named roll-dice)
let submitSelection=document.getElementsByClassName("submit-selection");//gets the submit sleection button (elements with class named submit-selection)
let giveup=document.getElementsByClassName("give-up");//gets the give up button (elements with class named give-up)
submitSelection[0].disabled=true;

let rollDice1,rollDice2;//store the results of roll of both die
let sumOfAvailableCheckboxes=7; //stores the sum of remaining check boxes
let sumOfRolls=0; //sum of die rolls
let playerScore=0;
let end=false;
let arrayOfAllCheckBoxes = document.getElementsByClassName('checkBox');
let count=0;
let RemBoxes=[];

function GameOver()
{
    for(let i=0;i<arrayOfAllCheckBoxes.length;i++)
    {
        arrayOfAllCheckBoxes[i].disabled=false;
        arrayOfAllCheckBoxes[i].checked=false;
    }
    rollDice[0].disabled=false;
    submitSelection[0].disabled=true;
    playerScore=0;
    document.getElementById('dice1').innerHTML="";
    document.getElementById('dice2').innerHTML="";
}

//on clicking roll dice button, this function will roll both dice, 
//will place the value of rolls in the result section and willl store the sum of rolls 
rollDice[0].onclick = function()
{
    //result of first roll
    rollDice1=Math.ceil(Math.random()*6);//roll first dice and store the result
    document.getElementById('dice1').innerHTML=rollDice1;
    sumOfAvailableCheckboxes=45-playerScore;
    if(sumOfAvailableCheckboxes>6)
    {
         //result of second roll
         rollDice2=Math.ceil(Math.random()*6);//roll second dice and store the result
         document.getElementById('dice2').innerHTML=", "+rollDice2;
    }
    else
    {
        //set the second roll result to zero
        rollDice2=0;
        document.getElementById('dice2').innerHTML="";
    }

    sumOfRolls=rollDice1+rollDice2;
    rollDice[0].disabled=true;//disable roll dice button
    submitSelection[0].disabled=false;//enables submit button


    if(end==true)
    {
        //call game over function
    document.getElementsByClassName("gameover-message")[0].innerHTML=playerScore;
    GameOver();
    }


    count=0;
    for(let i=0;i<arrayOfAllCheckBoxes.length;i++)
    {
        if(arrayOfAllCheckBoxes[i].disabled==true)
        {
            count+=1;
        }
    }

    if(count==arrayOfAllCheckBoxes.length)
    {
           //call game over function
           document.getElementsByClassName("gameover-message")[0].innerHTML="The game has ended because you have used all your checkboxes. YOUR SCORE IS "+ playerScore;
            GameOver();
    }
}

submitSelection[0].onclick=function()
{
    let playerSum=0;
    let arrayOfUsedboxes=[];

    loop1:
    for(let i=0;i<arrayOfAllCheckBoxes.length;i++)
    {
        if(arrayOfAllCheckBoxes[i].checked==true &&arrayOfAllCheckBoxes[i].disabled==false)
        {
            playerSum+=parseInt(arrayOfAllCheckBoxes[i].value);
            arrayOfUsedboxes.push(arrayOfAllCheckBoxes[i]);
        }
        if(playerSum==sumOfRolls)
        {
            for (let i=0;i<arrayOfUsedboxes.length;i++)
            {
                arrayOfUsedboxes[i].disabled=true;
                playerScore+=parseInt(arrayOfUsedboxes[i].value);
            }
            break;
        }
        else if(i==arrayOfAllCheckBoxes.length-1)
        {
            alert("The total of the boxes you selected does not match the dice roll.Please make another selection and try again.");
            continue loop1;
        }
    }

    rollDice[0].disabled=false;
    submitSelection[0].disabled=true;


//checks if all check boxes are being used or not
count=0;
    for(let i=0;i<arrayOfAllCheckBoxes.length;i++)
    {
        if(arrayOfAllCheckBoxes[i].disabled==true)
        {
            count+=1;
        }
    }
    if(count==arrayOfAllCheckBoxes.length)
    {
         //call game over function
        document.getElementsByClassName("gameover-message")[0].innerHTML="The game has ended because you have used all your checkboxes. YOUR SCORE IS "+ playerScore;
        GameOver();
    }

}

giveup[0].onclick=function()
{
    //call game over function
    document.getElementsByClassName("gameover-message")[0].innerHTML="The game has ended because you have given-up. YOUR SCORE IS "+ playerScore;
    GameOver();
}