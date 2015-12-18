Template.viewProjects.helpers({
  "projects": function () {
    // Get all projects
    var projects = Projects.find();

    return projects;
  }
});
