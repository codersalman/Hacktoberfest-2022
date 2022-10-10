 /* FUNCTIONING:
 /*This is the code for a simplest line follower which follows a black line on white surface using two IR sensors using NodeMCU 12E Module Microcontroller. */
 /*Adjust the threshold of the IR sensors for good working using the potentiometer on the module.*/

 
 /* define L298N or L293D motor control pins */
int leftMotorForward = 5;                           /* (D1) -> IN1 */
int leftMotorBackward =  4;                           /* (D2) ->IN2  */
int rightMotorBackward = 16;                           /* (D0) -> IN3 */
int rightMotorForward = 2;                          /* (D4) -> IN4 */


 /* define IR pins */
#define lir 14                                /*left infrared pin->D5*/
#define rir 12                                /*right infrared pin->D6*/

int right_IR_reading;                                /*Initialize as integer variables.*/
int left_IR_reading;                                 /*white surface gives reading as 0 & black surface gives reading as 1.*/

void setup() {
  
// initialize motor control pins as output //
  pinMode(leftMotorForward, OUTPUT);
  pinMode(leftMotorBackward, OUTPUT);
  pinMode(rightMotorForward, OUTPUT);   
  pinMode(rightMotorBackward, OUTPUT);

// initialize ir pins as input //
  pinMode(lir,INPUT);
  pinMode(rir,INPUT);
  
  Serial.begin(115200);
  }



  
void check()
{ 
  right_IR_reading=digitalRead(rir);
  left_IR_reading=digitalRead(lir);
  Serial.print("left_IR_reading=");
  Serial.println(left_IR_reading);
  Serial.print("right_IR_reading=");
  Serial.println(right_IR_reading);
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
   Serial.print("Forward//////");
}

/********************************************* TURN SHARPLEFT *****************************************************/
void left()   
{
  digitalWrite(rightMotorForward,HIGH);
  digitalWrite(leftMotorBackward,HIGH);
  digitalWrite(rightMotorBackward,LOW);
  digitalWrite(leftMotorForward,LOW);
  Serial.print("Left//////");
}

/********************************************* TURN SHARPRIGHT *****************************************************/
void right()   
{
  digitalWrite(leftMotorForward,HIGH);
  digitalWrite(rightMotorBackward,HIGH);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(leftMotorBackward,LOW);
  Serial.print("Right//////");
}
/********************************************* STOP *****************************************************/
void stop()   
{
  digitalWrite(leftMotorForward,LOW);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(rightMotorBackward,LOW);
  Serial.print("Stop//////");
}




void loop() {
  
  check();
  while(left_IR_reading==0 && right_IR_reading==0)    /*both IR is on white surface.*/
  {
    forward();
    check();
  }
  
  while(left_IR_reading==1 && right_IR_reading==0)    /*left IR is on black line while right IR is on white surface.*/
  { 
    check();
    while(left_IR_reading==1 && right_IR_reading==0)                       /*Move left till black IR comes on white surface.*/
    {
      left();
      check();
    }
  }
  
  while(left_IR_reading==0 && right_IR_reading==1)    /*right IR is on black line while left IR is on white surface.*/
  {
    check();
    while(right_IR_reading==1 &&  left_IR_reading==0 )                      /*Move right till black IR comes on black surface.*/
    {
      right();
      check();
    }
  }
  
  while(left_IR_reading==1 && right_IR_reading==1)    /*both IR is on black line.*/
  {
    stop();
    check();   
  }
  

}
