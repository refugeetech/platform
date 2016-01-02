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

JsonRoutes.add("get", "/projects/:id", function (req, res, next) {
  var id = req.params.id;

  JsonRoutes.sendResult(res, 200, Projects.findOne(id));
});

JsonRoutes.add("get", "/projects", function (req, res, next) {

  JsonRoutes.sendResult(res, 200, Projects.find().fetch());
});
