import 'package:world_time/pages/home.dart';
import 'package:world_time/services/worldtime.dart';
import 'package:flutter/material.dart';
import 'package:world_time/pages/home.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class loding extends StatefulWidget {
  const loding({ Key? key }) : super(key: key);

  @override
  State<loding> createState() => _lodingState();
}

class _lodingState extends State<loding> {
String time="";
  void setupworldtime() async
  {
    
    worldtime p1 =new  worldtime( "Alger", "Algiers.png","Africa/Algiers");
   await p1.gettime();
   // print(p1.time.substring(0,19));
                 //  Navigator.pushReplacementNamed(context,'/home',arguments: { "location":p1.location ,'time':p1.time, "flag":p1.flag, } );  
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context)=>home(
      data:999,time:p1.time,location:p1.location,flag:p1.flag,iss:p1.isday
    )),
    );  

                            

  }
  
  

  @override
  void initState() {
    super.initState();
    setupworldtime();
  }




  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: Center(
        child: SpinKitFadingCircle(
          color: Colors.black38,
          size: 100,

          ),
      ),
     
    );
  }
}