Template.viewProjects.created = function () {
  // Get reference to template instance
  let instance = this;

  // Subscribe to all projects
  instance.subscribe("allProjects");
};
