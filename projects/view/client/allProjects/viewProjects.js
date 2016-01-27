Template.viewProjects.created = function () {
  // Get reference to template instance
  let instance = this;

  // Subscribe to all projects
  instance.subscribe("allProjects");
};

Template.viewProjects.helpers({
  "projects": function () {
    // Get all projects
    var projects = Projects.find().fetch();

    return projects;
  }
});
