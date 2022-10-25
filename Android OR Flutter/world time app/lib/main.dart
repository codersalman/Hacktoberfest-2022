import 'package:flutter/material.dart';

import 'package:world_time/pages/home.dart';
import 'pages/choose_location.dart';
import 'pages/loding.dart';



void main() {
  runApp( MaterialApp(
    initialRoute: '/',
    routes: {
      '/':(context){ return loding();},
      '/home':(context) => home(),
      '/location':(context) => chooselocation(),
    },
    
    

    



  ));
}
