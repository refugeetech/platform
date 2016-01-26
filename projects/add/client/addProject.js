Template.addProject.onCreated = function () {
  // Get reference to template instance
  const instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
};
