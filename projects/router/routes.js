FlowRouter.route("/projects", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "addProject"});
  }
})
