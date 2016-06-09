/*
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: '/Users/tomi/Documents/Uploads/tmp',
    uploadDir: '/Users/tomi/Documents/Uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      return formData.contentType;
    },
    finished: function(fileInfo, formFields) {
      // perform a disk operation
    },
    cacheTime: 100,
    mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
    }
  });
});
*/