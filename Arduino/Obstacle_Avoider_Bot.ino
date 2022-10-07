/* FUNCTIONING:
 *This is the code for a simple obstacle avoider bot which finds its own path without colliding with other objects.
 **********This code should be run on NodeMCU 12E Module*********** */

/*WORKING:
/* 1.Initially the bot moves forward till the obstacle is at a distance greater than 12 cm.
 * 2.If obstacle distance comes less than 10 cm then bot stops and servo turns right and measures distance in right.
 * 3.The servo returns to its original position.
 * 3.If distance in right is greater than 12 cm then bot makes a right turn.
 * 4.If distance in right is less than 12 cm then bot makes a left turn.
 * 5.HAVE FUN.............
*/
#include<Servo.h>
Servo myservo;

 /* define L298N or L293D motor control pins */
int leftMotorForward = 5;          /* (D1) -> IN1  */
int leftMotorBackward = 4;           /* (D2 ->IN2   */
int rightMotorBackward = 16;          /* (D0) -> IN3   */
int rightMotorForward = 2;         /* (D4) -> IN4  */

/*ultrasonic sensor pin connection*/
#define echo 13
#define trig 15

int duration;
int cm;


void setup() {
  myservo.attach(0);                /*(D3) -> servopin */
  pinMode(leftMotorForward,OUTPUT);
  pinMode(leftMotorBackward,OUTPUT);
  pinMode(rightMotorForward,OUTPUT);   
  pinMode(rightMotorBackward,OUTPUT);
  pinMode(echo,INPUT);
  pinMode(trig,OUTPUT);
  Serial.begin(115200);
  myservo.write(90); 
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////  ---------------   MAIN CODE   ------------------ ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void loop() {


   check();
   while(cm<=10||cm<0)                      /*If forward distance is less than 10 cm or reading is incorrect then stop for 50 miliseconds and check right distance.*/
   {               
     stop();                                
     delay(50);
     myservo.write(0);                      /*U.S sensor faces right side.*/
     delay(300);
     check();

     myservo.write(90);                     /*U.S sensor is back to position ,i.e faces front.*/
     delay(300);
    
     if(cm>12)                              /*If right distance is greater than 12 cm than turn right.*/
     { 
          sharpright();
          delay(400);
          check();
     }
     else                                   /*If right distance is not greater than 12 cm it turns left.*/
     {
       
          sharpleft();
          delay(400);
          check();
     }
   }
   check();                                 /*If forward distance is greater than 12 cm means bot goes forward.*/
   
   while(cm>10)   
   { 
     myservo.write(90);                     /*U.S sensor is at original position ,i.e faces front.*/
     delay(100);
     forward();
     check();
   }
   
}
void check()                                /*This function measures the distance of obstacle from the U.S sensor*/
{
   digitalWrite(trig,LOW);
   delayMicroseconds(2);
   digitalWrite(trig,HIGH);
   delayMicroseconds(10);
   digitalWrite(trig,LOW);
   duration=pulseIn(echo,HIGH);             /*Calculates after how much time we are getting the response*/
   cm=(duration*0.034)/2;                   /*speed of sound=340m/s i.e,0.034cm/microsec.*/
   Serial.print("Distance=");
   Serial.println(cm);
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////  ---------------   MOTOR FUNCTIONS  ------------------ ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/********************************************* FORWARD *****************************************************/
void forward()   
{
  digitalWrite(leftMotorForward,HIGH);
  digitalWrite(rightMotorForward,HIGH);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorBackward,LOW);
  Serial.print("Forward//////////");         /*To distinguish between motion of bot and distance in front on Serial Monitor.*/
}

/********************************************* TURN SHARPLEFT *****************************************************/
void sharpleft()   
{
  digitalWrite(rightMotorForward,HIGH);
  digitalWrite(leftMotorBackward,HIGH);
  digitalWrite(rightMotorBackward,LOW);
  digitalWrite(leftMotorForward,LOW);
  Serial.print("Left//////////");
}

/********************************************* TURN SHARPRIGHT *****************************************************/
void sharpright()   
{
  digitalWrite(leftMotorForward,HIGH);
  digitalWrite(rightMotorBackward,HIGH);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(leftMotorBackward,LOW);
  Serial.print("Right///////////");
}
/********************************************* STOP *****************************************************/
void stop()   
{
  digitalWrite(leftMotorForward,LOW);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(rightMotorBackward,LOW);
}
