function getInboxEmailsList() {  

 var threads = GmailApp.getInboxThreads();
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
 var data = sheet.getDataRange().getValues();   

  var column = 1;
  var row = 1; 
  var EmailList = [];
  var lastrow = sheet.getLastRow();    

  for (var x = 0; x < lastrow; x++) {
      EmailList.push(data[x][column-1]);
   }       

  for (var i = lastrow; i < threads.length; i++) {
     var messages = threads[i].getMessages();
     var senderEmail = messages[0].getFrom();  
     var searchResult = EmailList.indexOf(senderEmail);
      if(searchResult == -1){
         SpreadsheetApp.getActiveSheet().getRange(row,column).setValue(senderEmail);
         EmailList.push(senderEmail);
         row++;
      }
   }

 }
