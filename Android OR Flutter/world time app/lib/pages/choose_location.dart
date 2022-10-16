import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:world_time/services/worldtime.dart';
import 'loding.dart';
import 'package:world_time/pages/home.dart';
class chooselocation extends StatefulWidget {


  
  const chooselocation({ Key? key }) : super(key: key);

  @override
  State<chooselocation> createState() => _chooselocationState();
}

class _chooselocationState extends State<chooselocation> {

  List<worldtime> locations = [
    worldtime( 'Algeria','alg.png','Africa/Algiers'),
    worldtime('London','uk.png','Europe/London'),
    worldtime( 'Athens','greece.png','Europe/Berlin'),
    worldtime( 'Cairo','egypt.png','Africa/Cairo'),
    worldtime( 'Nairobi','kenya.png','Africa/Nairobi'),
    worldtime( 'Chicago','usa.png','America/Chicago'),
    worldtime( 'New York','usa.png','America/New_York'),
    worldtime( 'Seoul','south_korea.png','Asia/Seoul'),
    worldtime( 'Jakarta','indonesia.png','Asia/Jakarta'),
    
    

  ];

 
  void setupworldtime(worldtime p1) async
  {
    
    await p1.gettime();
   // print(p1.time.substring(0,19));
                 //  Navigator.pushReplacementNamed(context,'/home',arguments: { "location":p1.location ,'time':p1.time, "flag":p1.flag, } );  
  // Navigator.pushReplacement(
  //   context,
  //   MaterialPageRoute(builder: (context)=>home(
  //     data:999,time:p1.time,location:p1.location,flag:p1.flag,iss:p1.isday
  //   )),
  //   );  



    Navigator.pop(
    context, {"location":p1.location,"time":p1.time,"isday":p1.isday}
    
    ); 
  }






  @override
  Widget build(BuildContext context) {
        print('build function ran');

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 1,horizontal: 4),
      child: Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          backgroundColor: Colors.blue[900],
          title: Text('choose a location'),
          centerTitle: true,
          elevation: 0,
        ),
        body: ListView.builder(
           itemCount: locations.length,
           itemBuilder: (context,index){
             return Card(
               child: ListTile(
                 onTap: (){setupworldtime(locations[index]);
                   
                 
                   

                 },
                 title: Text(locations[index].location),
                 leading: CircleAvatar(
                   backgroundImage:AssetImage("assets/${locations[index].flag}"),
                    ),


               ),
             );

           }
           )
      ),
    );
  }
}