Template.addProject.created = function () {
  // Get reference to template instance
  let instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
};

Template.addProject.rendered = function() {
  // Get reference to template instance
  let instance = this;

  instance.autorun(function () {
    if (instance.subscriptionsReady()) {
      // Get all existing tags
      let tagOptions = Tags.find().fetch();

      // This function definition may not be necessary, so commenting out
      // var tagCallback = function (tagObject) {
      //   console.log("inside callback", tagObject);
      //   return tagObject;
      // };

      $('#tags').selectize({
          delimiter: ',',
          persist: false,
          valueField: '_id',
          labelField: 'name',
          searchField: 'name',
          create: true,
          highlight: true,
          maxOptions: 5,
          options: tagOptions,
          create: function (tagValue, tagCallback) {
            // Add the tag to the Tags collection
            let tagId = Tags.insert({"name": tagValue});

            // Construct a tag object with text/value
            let tagObject = {
              value: tagId,
              text: tagValue
            };

            // The tags object works here
            console.log(tagObject);

            // However, I am uncertain how to get the tag callback to work
            // so that the newly created tag will be added to the Selectize widget
            tagCallback(tagObject);
          }
      });
    }
  });
};

Template.addProject.helpers({
  existingTags: function () {
    // Get all existing tags
    let tags = Tags.find().fetch();

    return tags;
  }
});
