FlowRouter.route("/", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {landing: "landing"} );
  }
})
