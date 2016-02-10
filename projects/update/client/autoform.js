AutoForm.hooks({
  updateProjectForm: {
    docToForm: function(doc) {
      // Convert tags array to string
      if (_.isArray(doc.tags)) {
        doc.tags = doc.tags.join(", ");
      }
      return doc;
    },
    formToDoc: function(doc) {
      // Convert tags string to array
      if (typeof doc.tags === "string") {
        doc.tags = doc.tags.split(",");
      }
      return doc;
    },
    onSubmit: function (doc) {
      console.log(doc);
    }
  }
});
