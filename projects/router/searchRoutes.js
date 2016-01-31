FlowRouter.route("/projects", {
  action: function (params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "viewProjects"});
  }
});

FlowRouter.route("/projects/add", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "addProject"});
  }
});
