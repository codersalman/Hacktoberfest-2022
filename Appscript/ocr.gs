function extractTextFromPDF() {
  // PDF File URL
  // You can also pull PDFs from Google Drive
  var url = 'https://img.labnol.org/files/Most-Useful-Websites.pdf';

  var blob = UrlFetchApp.fetch(url).getBlob();
  var resource = {
    title: blob.getName(),
    mimeType: blob.getContentType(),
  };

  // Enable the Advanced Drive API Service
  var file = Drive.Files.insert(resource, blob, { ocr: true, ocrLanguage: 'en' });

  // Extract Text from PDF file
  var doc = DocumentApp.openById(file.id);
  var text = doc.getBody().getText();

  return text;
}

