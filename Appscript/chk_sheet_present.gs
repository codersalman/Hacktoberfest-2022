function initialize() {

   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var mysheet = "abonzer";
   
   if (ss.getSheetByName(mysheet ) == null){
       ss.insertSheet('abonzer');
       var sheet = ss.getActiveSheet();
   
       sheet.deleteRows(200, 800);
       sheet.deleteColumns(11, 15);
   
    }
}
