float pressLength_milliSeconds = 0;

// Define the *minimum* length of time, in milli-seconds, that the button must be pressed for a particular option to occur
int optionOne_milliSeconds = 500;
int optionTwo_milliSeconds = 1000;  
//int three=2000;      

//Pin your button is attached to
int buttonPin = 2;

//Pin your LEDs are attached to
int ledPin_Option_1 = 13;
int ledPin_Option_2 = 12;

void setup(){

  // Initialize the pushbutton pin as an input pullup
  pinMode(buttonPin, INPUT_PULLUP);     

  //set the LEDs pins as outputs
  pinMode(ledPin_Option_1, OUTPUT); 
  pinMode(ledPin_Option_2, OUTPUT); 

  //Start serial communication
  Serial.begin(9600);                                     

}


void loop() {

  //Record *roughly* the tenths of seconds the button in being held down
  while (digitalRead(buttonPin) == LOW ){ 

    delay(100);  //if you want more resolution, lower this number 
    pressLength_milliSeconds = pressLength_milliSeconds + 100;   

  }

  //Different if-else conditions are triggered based on the length of the button press
  //Start with the longest time option first

  //Option 2 - Execute the second option if the button is held for the correct amount of time
  if (pressLength_milliSeconds >= optionTwo_milliSeconds){

    digitalWrite(ledPin_Option_2, HIGH); 
    delay(100);
    digitalWrite(ledPin_Option_2, LOW) ;
       

  } 
  else if(pressLength_milliSeconds >= optionOne_milliSeconds){

    digitalWrite(ledPin_Option_1, HIGH);
    delay(100);
    digitalWrite(ledPin_Option_1, LOW);

  }

  //every time through the loop, we need to reset the pressLength_Seconds counter
  pressLength_milliSeconds = 0;

}
