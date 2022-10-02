//Simple piano using piezo and 7 push buttons(one each for a note) with arduino uno
//Defining the frequency of each note
#define KEY_A 234
#define KEY_B 247
#define KEY_C 262
#define KEY_D 294
#define KEY_E 330
#define KEY_F 349
#define KEY_G 392

const int a_pin=2; //Note A - Push button connected to pin2
const int b_pin=3; //Note B - Push button connected to pin2
const int c_pin=4; //Note C - Push button connected to pin2
const int d_pin=5; //Note D - Push button connected to pin2
const int e_pin=6; //Note E - Push button connected to pin2
const int f_pin=7; //Note F - Push button connected to pin2
const int g_pin=8; //Note G - Push button connected to pin2
const int piezo=9; //Connecting piezo buzzer to pin9
const int led=LED_BUILTIN; //Blinking LED for every active state of push button

const boolean buttonsAreActiveLow=true;

void setup(){
  pinMode(a_pin,INPUT_PULLUP);
  pinMode(b_pin,INPUT_PULLUP);
  pinMode(c_pin,INPUT_PULLUP);
  pinMode(d_pin,INPUT_PULLUP);
  pinMode(e_pin,INPUT_PULLUP);
  pinMode(f_pin,INPUT_PULLUP);
  pinMode(g_pin,INPUT_PULLUP);
  pinMode(piezo,OUTPUT);
  pinMode(led,OUTPUT);
}
void loop(){
  if(isButtonPressed(a_pin))
    tone(piezo,KEY_A);
  else if(isButtonPressed(b_pin))
    tone(piezo,KEY_B);
  else if(isButtonPressed(c_pin))
    tone(piezo,KEY_C);
  else if(isButtonPressed(d_pin))
    tone(piezo,KEY_D);
  else if(isButtonPressed(e_pin))
    tone(piezo,KEY_E);
  else if(isButtonPressed(f_pin))
    tone(piezo,KEY_F);
  else if(isButtonPressed(g_pin))
    tone(piezo,KEY_G);
  else{
    noTone(piezo);
    digitalWrite(led,LOW);  
  }
}
boolean isButtonPressed(int btnPin){
  int btnVal=digitalRead(btnPin);
  if(buttonsAreActiveLow&&btnVal==LOW){
    digitalWrite(led,HIGH);
    return true;
  }
  else if(!buttonsAreActiveLow&&btnVal==HIGH){
    digitalWrite(led,HIGH);
    return true;
  }
  return false;
}
