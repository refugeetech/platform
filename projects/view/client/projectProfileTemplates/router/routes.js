FlowRouter.route("/project-profile-html-template", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "projectProfileHTMLTemplateRefactored"});
  }
})
