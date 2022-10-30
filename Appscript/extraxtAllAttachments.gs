export const saveGmailtoGoogleDrive = () => {
  const folderId = 'Google_Drive_Folder_Id';
  const searchQuery = 'has:attachments';
  const threads = GmailApp.search(searchQuery, 0, 10);
  threads.forEach((thread) => {
    const messages = thread.getMessages();
    messages.forEach((message) => {
      const attachments = message.getAttachments({
        includeInlineImages: false,
        includeAttachments: true,
      });
      attachments.forEach((attachment) => {
        Drive.Files.insert(
          {
            title: attachment.getName(),
            mimeType: attachment.getContentType(),
            parents: [{ id: folderId }],
          },
          attachment.copyBlob()
        );
      });
    });
  });
};
