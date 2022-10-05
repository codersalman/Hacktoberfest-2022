                                 //bsef19m012 - iqra sarwar

//store the dice roll value
let diceRollResults = 0;
//store start pos for tokens 30 for blue 4 for green etc
let Pos = [30,30,30,30,43,43,43,43,4,4,4,4,17,17,17,17];
//store the distance from house, decremented on each transition
let PosTraversed = [56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56];
//store the status is the dice is free or still in prison
let DicesStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
//store the status if dice is reached home of in house
let OutStatus = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
//store images of different values of dice
let DiceValues = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
//store all the tokens
let Dices = [document.getElementById("bdice1"), document.getElementById("bdice2"), document.getElementById("bdice3"),document.getElementById("bdice4"), document.getElementById("rdice1"), document.getElementById("rdice2"), document.getElementById("rdice3"),document.getElementById("rdice4"), document.getElementById("gdice1"),document.getElementById("gdice2"),document.getElementById("gdice3"),document.getElementById("gdice4"), document.getElementById("ydice1"),document.getElementById("ydice2"),document.getElementById("ydice3"),document.getElementById("ydice4")];
//store the position of dice in home
let InHome = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let DiceBoxes = [];
for (let index = 0; index < 16; index++)
   DiceBoxes[index] = "box" + index;
//stroe the palyer response if he/she want to finish the game after losing or quit when 3 players win.
let continueStatus = false;
//generate the random number for dice roll
function DiceRoll()
{
   GameEnded();
   diceRollResults = Math.floor((Math.random() * 6)+1);
   document.getElementById("RollBox").setAttribute("src", DiceValues[diceRollResults]);
   //disable dice roll
   document.getElementsByClassName("DiceRoller")[0].onclick = false;
   startGame();
}
function startGame()
{
   //get index of dices based on text indicating playe number
   let i = getIndex(document.getElementById("rollText").innerText);
   let next = true;
   //for all 4 dices of the color whos turn is this
   for (let index = i; index < i+4; index++)
   {
      if(DicesStatus[index]==false && diceRollResults == 6)
      {
         //if 6 comes and any token is in prison register it for free
         Dices[index].onclick = freeDice;
         //disable next player turn
         next = false;
      }
      else if(DicesStatus[index]==true && OutStatus[index]==false)
      {
         //if any token is free and still not reached home register it for transition
         Dices[index].onclick = transitDice;
         //if transition is possible then disable next player turn
         if(transitionPossible(diceRollResults,index) == true)
            next = false;
      }
      else
      {
         //if not any one of above cases occurs disbale on click for that token
         Dices[index].onclick = false;
      }
   }
   if(next == true)
   {
      //if its not possible for this player to make any move enable dice roll and next player turn
      document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
      document.getElementById("rollText").innerText=changeText(document.getElementById("rollText").innerText);
   }

}
function freeDice()
{
   let dice = event.target;
   //get id of token clicked
   let id = getId(event.target.id);
   //append clicked token to start particular position
   let startPos = document.getElementById(id);
   startPos.append(dice);
   //enable dice roll
   document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
   //diable any furture token clicks before next dice roll
   for (let index = 0; index < Dices.length; index++) {
      if(dice == Dices[index])
      {
         DicesStatus[index]=true;
      }
      Dices[index].onclick = false;
   }
}
function transitDice()
{
   let thisDiceIndex = 0;
   let home = 0;
   //get the index of token clicked
   for (let index = 0; index < Dices.length; index++) {
      if(event.target == Dices[index])
      {
         thisDiceIndex = index;
      }
   }
   let transitionValue = diceRollResults;
   let trasnPossible = false;
   //this if executes if the token has reached the colored path going its home
   if(InHome[thisDiceIndex] != 0)
   {
      //increment position
      InHome[thisDiceIndex] += transitionValue;
      if(InHome[thisDiceIndex] <= 6)
      {
         //determine color based on index
         let id = "";
         if(thisDiceIndex < 4) id ="u";
         else if(thisDiceIndex > 3 && thisDiceIndex < 8) id ="r";
         else if(thisDiceIndex > 7 && thisDiceIndex < 12) id ="g";
         else id = "y";
         //append token cllicked to new position
         document.getElementById(id+InHome[thisDiceIndex]).append(event.target);
         trasnPossible = true;
         //decrement the number of boxes left that are to be traversed to rach home
         PosTraversed[thisDiceIndex]-=transitionValue;
      }
      else
      {
         //if transition not possible dec the value of pos incremented before
         InHome[thisDiceIndex] -= transitionValue;
      }
      if(InHome[thisDiceIndex] == 6)
      {
         //if reached home set it out of game
        OutStatus[thisDiceIndex] = true;
      }
   }
   else
   {
      //if it is not at colorful path going home
      //check if it can go?
      let CanGoHome = CanGoToHome(thisDiceIndex,Pos[thisDiceIndex]);
      //adjust new position
      Pos[thisDiceIndex]+=transitionValue;
      PosTraversed[thisDiceIndex]-=transitionValue;
      if(Pos[thisDiceIndex]>52)
      Pos[thisDiceIndex] = (Pos[thisDiceIndex]%53)+1;
      //if can go home get that home loc
      if(CanGoHome)
         home = specifyHome(thisDiceIndex,Pos[thisDiceIndex]);
      //if loc is non zero
      if(home != 0)
      {
         //get position at colorful path
         let appLoc = GoHome(home, Pos[thisDiceIndex],thisDiceIndex);
         //append token there
         document.getElementById(appLoc).append(event.target);
      }
      else
      {
         //kill dice kills the opposite color dice if they exist at new pos of the token but keeps same color tokens
         killDice(Pos[thisDiceIndex], thisDiceIndex);
         //appened to new loc
         document.getElementById("b" + Pos[thisDiceIndex]).append(event.target);
      }
      trasnPossible = true;
   }
   //if trans is occured
   if(trasnPossible == true)
   {
      //disable furture dice clicks
      for (let index = 0; index < Dices.length; index++)
         Dices[index].onclick = false;
         //enable dice roll
      document.getElementsByClassName("DiceRoller")[0].onclick = DiceRoll;
      //if 6 has occured keeps this player turn dont give to next one
      if(transitionValue < 6)
      document.getElementById("rollText").innerText=changeText(document.getElementById("rollText").innerText);
   }
}
//helping function
function GoHome(DiceToGo, newPosition, thisDiceIndex)
{
   //get position in colorful path goning home
   let inHomePos = newPosition - DiceToGo;
   let GoId = "";
   if(DiceToGo == 28) GoId ="u";
   else if(DiceToGo == 41) GoId ="r";
   else if(DiceToGo == 2) GoId ="g";
   else GoId = "y";
   if(inHomePos > 6)
      return;
   else
   {
      InHome[thisDiceIndex] = inHomePos;
      return (GoId + inHomePos);
   }
}
//return the start pos id based on color of dice using ids od clicked token
function getId(e)
{
   if(e == "bdice1" || e == "bdice2" || e == "bdice3" || e == "bdice4") return "b30";
   else if(e == "rdice1" || e == "rdice2" || e == "rdice3" || e == "rdice4") return "b43";
   else if(e == "gdice1" || e == "gdice2" || e == "gdice3" || e == "gdice4") return "b4";
   else if(e == "ydice1" || e == "ydice2" || e == "ydice3" || e == "ydice4") return "b17";
}
//return the index for the dices of the player whoes turn comes i.e return 0 for blue 4 for red etc.
function getIndex(player)
{
   if(player == "Player 1 Blue Turn") return 0;
   else if(player == "Player 2 Red Turn") return 4;
   else if(player == "Player 3 Green Turn")  return 8;
   else return 12;
}
//set new player text
function changeText(player)
{
   if(player == "Player 1 Blue Turn") return "Player 2 Red Turn";
   else if(player == "Player 2 Red Turn") return "Player 3 Green Turn";
   else if(player == "Player 3 Green Turn")  return "Player 4 Yellow Turn";
   else return "Player 1 Blue Turn";
}
//tell if dice should go home or not
function CanGoToHome(diceIndex, newPosIndex)
{
   //if token can eneter colorful path after inc in the current position by dice value, return true
   if(diceIndex < 4 && newPosIndex >= 2 && newPosIndex <= 28) return true;
   else if( diceIndex > 3 && diceIndex < 8 && newPosIndex >= 15 && newPosIndex <= 41) return true;
   else if(diceIndex > 7 && diceIndex < 12)
   {
      if(newPosIndex >= 28 && newPosIndex <= 52) return true;
      if(newPosIndex == 1 || newPosIndex == 2) return true;
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      if(newPosIndex >= 41 && newPosIndex <=52) return true;
      if(newPosIndex >= 1 && newPosIndex <=15) return true;
   }
   return false;
}
function specifyHome(diceIndex, newPosIndex)
{
   //number of div that is the entring position to the home
   if(diceIndex < 4 && newPosIndex >= 29 && newPosIndex <= 52) return 28;
   else if( diceIndex > 3 && diceIndex < 8 && newPosIndex >= 42 && newPosIndex <= 52) return 41;
   else if(diceIndex > 7 && diceIndex < 12)
   {
      if(newPosIndex >= 3 && newPosIndex < 28) return 2;
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      if(newPosIndex >= 16 && newPosIndex < 41) return 15;
   }
   return 0;
}
//kill the dice
function killDice(DiceLoc,thisDiceIndex)
{
   //if dice next loc is a stop dont kill and return
   if(DiceLoc == 51 || DiceLoc == 4 || DiceLoc == 43 || DiceLoc == 38 || DiceLoc == 12 || DiceLoc == 17 || DiceLoc == 25 || DiceLoc == 30)
      return;
   else
   {
      //get new postion to be
      let x = document.getElementById("b"+DiceLoc);
      //if it have childs i.e. tokens
      if(x.childNodes.length > 0)
      {
         let y = x.childNodes;
         let backToStore = [];
         let Back = [];
         let childs = y.length;
         let copy = [];
         //copy that chils and their ids beacuse they will disapear when removed
         for (let index = 0; index < childs; index++)
         {
               backToStore[index]=y[index];
               Back[index] = document.getElementById(y[index].id);
               copy[index] = y[index];
         }
         for (let index = 0; index < childs; index++)
         {
            //for each token present at new position check if its color is same or different
            if(sameColorDices(copy[index].id,Dices[thisDiceIndex].id))
            {
               //if same color remove form collection to be killed and dont remove
               backToStore[index]="";
               Back[index]="";
            }
            else
               x.removeChild(backToStore[index]); //else remove
         }
         for (let index = 0; index < Dices.length; index++)
         {
            for(let j = 0; j < Back.length; j++)
            {
               //compare tokens to be removed with all tokens to get index
               if(Back[j] == Dices[index])
               {
                  //for that index get tokenbox and append this token back to the box in prison
                  document.getElementById(DiceBoxes[index]).append(backToStore[j]);
                  let posStr = getId(Back[j].id);
                  posStr = posStr.substring(1);
                  posStr = parseInt(posStr);
                  console.log(Pos[index]);
                  Pos[index] = posStr;
                  //set distance from house back to 56
                  PosTraversed[index]=56;
                  //set free status false
                  DicesStatus[index] = false;
               }
            }
         }

      }
   }
}
//tell if dices are same color or diffrenet
function sameColorDices(c1,c2)
{
   c1 = c1.substring(0,1);
   c2 = c2.substring(0,1);
   console.log(c1);
   console.log(c2);
   if(c1==c2)
   return true;
   return false;
}
//tell if transition is possible or not based ont the distance from house. if distance from house is equal or greater then the dice roll value set transition possiblity true.
function transitionPossible(value,diceIndex)
{
   let possible = false;
   if(diceIndex < 4 )
   {
      for(let i =0;i<4;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if( diceIndex > 3 && diceIndex < 8 )
   {
      for(let i =4;i<8;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if(diceIndex > 7 && diceIndex < 12)
   {
      for(let i =8;i<12;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   else if(diceIndex > 11 && diceIndex < 16 )
   {
      for(let i =12;i<16;i++)
      {
         if(PosTraversed[i] >= value)
         {
            if(DicesStatus[i]==true)
               possible = true;
         }
      }
   }
   return possible;
}
//reload if game ended
function GameEnded()
{
   let end = true;
   for (let index = 0; index < Dices.length; index++)
   {
     if(PosTraversed[index]>0)
     {
         end = false;
     }
   }
   if(end == true)
   {
      alert("Game Ended!");
      location.reload();
   }
}
//replaced this function later
// function GameEnded()
// {
//    if(continueStatus == false)
//    {
//       let ingame1 = false, ingame2 = false, ingame3 = false, ingame4 = false;
//       for (let index = 0; index < 16; index+=4)
//       {
//          for (let j = index; j < index+4; j++)
//          {
//             if(PosTraversed[index] > 0)
//             {
//                if(index == 0) ingame1 = true;
//                if(index == 4) ingame2 = true;
//                if(index == 8) ingame3 = true;
//                if(index == 12) ingame4 = true;
//             }
//          }
//       }
//       let ans = "y";
//       if(ingame1 == false && ingame2 == false && ingame3 == false && ingame4 == true)
//          ans = prompt("Alas Player 4 you left lost! Do you want to continue alone?", "y");
//       if(ingame1 == false && ingame2 == false && ingame3 == true && ingame4 == false)
//          ans = prompt("Alas Player 3 you left lost! Do you want to continue alone?", "y");
//       if(ingame1 == false && ingame2 == true && ingame3 == false && ingame4 == true)
//          ans = prompt("Alas Player 2 you left lost! Do you want to continue alone?", "y");
//       if(ingame1 == true && ingame2 == false && ingame3 == false && ingame4 == true)
//          ans = prompt("Alas Player 1 you left lost! Do you want to continue alone?", "y");
//       if(ans != null)
//       {
//          if(ans == "y")
//          {
//             continueStatus = true;
//          }
//          else
//          {
//             location.reload();
//          }
//       }
//    }
// }
// GameEnded();
