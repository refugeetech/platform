FlowRouter.route("/about", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {about: "about"});
  }
})
