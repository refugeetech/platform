FlowRouter.route("/what-we-do", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "whatWeDo"});
  }
})
