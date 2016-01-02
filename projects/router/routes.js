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

// Return a single JSON object containing the specified project.
JsonRoutes.add("get", "/projects/:projectId", function (req, res, next) {
  var projectId = req.params.projectId;

  JsonRoutes.sendResult(res, 200, Projects.findOne(projectId));
});

// Returns JSON array containing all projects in Projects collection.
JsonRoutes.add("get", "/projects", function (req, res, next) {
    var allProjects = Projects.find().fetch();
  JsonRoutes.sendResult(res, 200, allProjects);
});
