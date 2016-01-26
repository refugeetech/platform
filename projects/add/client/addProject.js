Template.addProject.onCreated = function () {
  // Get reference to template instance
  const instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
};

Template.addProject.helpers({
  existingTags: function () {
    // Get all existing tags
    let tags = Tags.find().fetch();

    return tags;
  }
});
