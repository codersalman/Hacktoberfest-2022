import 'dart:ffi';

import 'package:http/http.dart'as http;
import 'dart:convert';
import 'package:intl/intl.dart';




class worldtime {

  String location=""; //location name for the UI
  String time=""; //the time in that location
  String flag="";   //url to an asset flag icon
  String url1=""; //location url for api end point
  bool? isday ;


  worldtime(String a, String b, String c)
  {
    this.location=a;
    this.flag=b;
    this.url1=c;
    
    print("creation bien effectuee");
  }
  


  




   Future  gettime() async
  {
    try {
      
    
   final url= Uri.parse('https://worldtimeapi.org/api/timezone/$url1') ;
    final responce =await http.get(url);
    final contry = jsonDecode(responce.body);
   // final user=users[0];
    //print("name : ${user['name']}");
    //print(users);
   // print(contry);
    
    String datetime=contry["datetime"];
    String offset=contry['utc_offset'].substring(1,3);
    //offset=offset.substring(1,3);
    
    //print(datetime);
    //print(offset);
    DateTime now = DateTime.parse(datetime);
    now=now.add(Duration(hours:int.parse(offset) ));
   // print(now);

    //set the time proprety
    isday=true;
    

    isday =now.hour>6 && now.hour<20 ? true : false; 
    this.time=DateFormat.jm().format(now);


    } catch (e) {
      print('cought error: $e');
      time="could not get time data";


    }


  }




}





