/* FUNCTIONING:
 *This is the code for smart bot controlled wirelessly using wifi */
/*Microcontroller that should be used is NodeMcu 12E*/
/*The app through which bot can be controlled using wifi is "ESP8266 Wifi Robot Car" */
/*Link for app: "https://play.google.com/store/apps/details?id=com.bluino.esp8266wifirobotcar&hl=en_IN&gl=US"  */

/*SETUP:
 * 1.Go to playstore and install ESP8266 Wifi Robot Car.
 * 2.connect your mobile to the network hosted by Nodemcu.
 * 3.Go to settings of the application and enter the ip address.
 * 4.set the commands in the application.
 * HAVE FUN.............
 */
 
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// SSID parameters
const char *ssid = "Hasan";                      /*Set as your team name.*/
const char *password = "Hasan12345";                  /*set password.*/

IPAddress ip(192, 168, 4, 1);               /* IP Address-Enter the same ip in the app.*/
IPAddress netmask(255, 255, 255, 0);      
const int port = 80; // Port
ESP8266WebServer server (port);


/* define L298N or L293D motor control pins */
int leftMotorForward = D0;                 /* (D1) -> IN1  */
int leftMotorBackward = D1;                  /* (D2) ->IN2   */
int rightMotorBackward = D2;                 /* (D0) -> IN3   */
int rightMotorForward = D3;                /* (D4) -> IN4  */




void setup() {
  
  Serial.begin(115200);                     
 
  pinMode(14, OUTPUT);                      /* D5->LED pin*/

   // Setup AP
  WiFi.mode(WIFI_AP); 
  WiFi.softAPConfig(ip, ip, netmask);
  WiFi.softAP(ssid, password);

  
  // Declaration of motors
  pinMode(leftMotorForward, OUTPUT);
  pinMode(rightMotorForward, OUTPUT); 
  pinMode(leftMotorBackward, OUTPUT);  
  pinMode(rightMotorBackward, OUTPUT);


  // Start Server
  server.on("/", HTTP_GET, handleRoot);
  server.begin();
  
}



void loop() {

  server.handleClient();

}


void handleRoot() {
  if (server.hasArg("State")) {
    String value = server.arg("State");
    Serial.println("Value = " + value);
    server.send(200, "text / plain", "Request received");
    
    if (value.equals("F")) {
      forward();
      server.send(200, "text / plain", "Forward");
    }
    else  if (value.equals("B")) {
      backward();
      server.send(200, "text / plain", "Backward");
    }
    else  if (value.equals("L")) {
      left();
      server.send(200, "text / plain", "Turn Left");
    }
    else  if (value.equals("R")) {
     right();
      server.send(200, "text / plain", "Turn Right");
    }
    else  if (value.equals("S")) {
      stop();
      server.send(200, "text / plain", "Stop");
    }
     else  if (value.equals("ON")) {
      ON();
      server.send(200, "text / plain", "ON");
    }
     else  if (value.equals("OFF")) {
      OFF();
      server.send(200, "text / plain", "OFF");
    }
  }
}



/*************** FORWARD *******************/
void forward(void)   
{
  digitalWrite(leftMotorForward,HIGH);
  digitalWrite(rightMotorForward,HIGH);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorBackward,LOW);
}

/*************** BACKWARD *******************/
void backward()   
{
  digitalWrite(leftMotorBackward,HIGH);
  digitalWrite(rightMotorBackward,HIGH);
  digitalWrite(leftMotorForward,LOW);
  digitalWrite(rightMotorForward,LOW);
}

/*************** TURN LEFT *******************/
void left()   
{
  digitalWrite(rightMotorForward,HIGH);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorBackward,LOW);
  digitalWrite(leftMotorForward,LOW);
}



/*************** TURN RIGHT *******************/
void right()   
{
  digitalWrite(leftMotorForward,HIGH);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(rightMotorBackward,LOW);
}


/*************** STOP *******************/
void stop()   
{
  digitalWrite(leftMotorForward,LOW);
  digitalWrite(leftMotorBackward,LOW);
  digitalWrite(rightMotorForward,LOW);
  digitalWrite(rightMotorBackward,LOW);
}
/*************** ON *******************/
void ON()   
{
  digitalWrite(14,HIGH);
}
/*************** OFF *******************/
void OFF()   
{
  digitalWrite(14,LOW);
}
