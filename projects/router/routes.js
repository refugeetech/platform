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

JsonRoutes.add("get", "/projects/:projectId", function (req, res, next) {
  var projectId = req.params.projectId;

  JsonRoutes.sendResult(res, 200, Projects.findOne(projectId));
});

JsonRoutes.add("get", "/projects", function (req, res, next) {

  JsonRoutes.sendResult(res, 200, Projects.find().fetch());
});
