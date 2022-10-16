import 'package:flutter/material.dart';
import 'package:world_time/pages/loding.dart';
import 'package:world_time/services/worldtime.dart';


class home extends StatefulWidget {

  final int? data;
  final String? location; 
  final String? time; 
  final String? flag;
  final  bool? iss;
  
  

  

  const home({ 
    @required this.data,
    @required this.time,
    @required this.flag,
    @required this.location,
    @required this.iss,

    Key? key ,
  
  
   }) : super(key: key);
  @override
  State<home> createState() => _homeState();
}

class _homeState extends State<home> {
Map data={};
  
  @override
  Widget build(BuildContext context) {
   
   
if(data.isEmpty==true){
   data={"time":widget.time,"location":widget.location,"isday":widget.iss};
  
}


  

 
 String dayornight;


 if(data["isday"]==true) dayornight="assets/day.png";
 else dayornight="assets/night.png";



    return Scaffold(
      body: Container(
        
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("$dayornight"),
            fit: BoxFit.cover
          ),

        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(0, 120, 0, 0),
          
          child: SafeArea(
            
            child: Column(
              children:<Widget> [
                Center(
                  child: RaisedButton.icon(
                    onPressed: () async{
                    dynamic  result= await Navigator.pushNamed(context, '/location');
                    setState(() {
                       data["time"]=result["time"];
                       data["location"]=result["location"];
                       data["isday"]=result["isday"];
                      print(9999);
                     print(data["time"]);
                      
                    });
                    }, 
                    
                    icon:Icon( Icons.edit_location,color: Colors.grey,), 
                    color: Color.fromARGB(137, 11, 70, 146),
                    
                         
                          
                    label: Text(
                      'change location',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.grey,
                      ),
                      
                     
                      ),

                    ),
                ),
               // SizedBox(height: 50,),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Center(
                      child: Text(
                        data["location"],
                        
                        style: TextStyle(
                          color: Color.fromARGB(255, 255, 255, 255),
                          letterSpacing: 1,
                          fontSize: 25,
                         // fontWeight: FontWeight.bold,
                          
                          ),
                        ),
                    ),
                               //   SizedBox(width: 10,),
      
                  
                  ],
                ),
                Text(
                      //'${widget.time}',
                      data["time"],
                      style: TextStyle(
                        color: Color.fromARGB(255, 255, 255, 255),
                        letterSpacing: 1,
                        fontSize: 50,
                        fontWeight: FontWeight.bold,
                        ),
                      ),
                SizedBox(height: 200,),
              ]
              ),
          ),
        ),
      ),
      appBar:  AppBar(
          backgroundColor: Colors.blue[900],
          title: Text('HOME'),
          centerTitle: true,
          elevation: 0,
        ),
      
    );
  }
}