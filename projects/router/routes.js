FlowRouter.route("/projects", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "viewProjects"});
  }
});

FlowRouter.route("/projects/add", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "addProject"});
  }
});

// Add route to return a single JSON object containing the specified project.
JsonRoutes.add("get", "/projects/:projectId", function (req, res, next) {
  var projectId = req.params.projectId; // The project id, in MongoDB
  var singleProject = Projects.findOne(projectId) // Sends the result to client

  JsonRoutes.sendResult(res, 200, singleProject);
});

// Returns JSON array containing all projects in Projects collection.
JsonRoutes.add("get", "/projects", function (req, res, next) {
  var allProjects = Projects.find().fetch(); // Finds all projects and returns array

  JsonRoutes.sendResult(res, 200, allProjects); // Sends the result to client
});
