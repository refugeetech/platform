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
          onItemAdd: function (tag) {
            // Check to see if tag exists in Tags collection
            var existingTag = Tags.findOne({"name": tag});

            // placeholder for new tag ID
            let tagId;

            // If tag doesn't exist
            if (!existingTag ) {
              // Add the tag to the Tags collection
              tagId = Tags.insert({"name": tag});

              // TODO: figure out how to limit duplicate tags
              // e.g. 'Beans' and 'beans'
              // unless this is not an issue
            };

            // Return a tag object containing tag ID
            return {value: tagId, text: tag};
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
