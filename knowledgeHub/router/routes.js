FlowRouter.route("/knowledge-hub", {
  action: function (params) {
    BlazeLayout.render("mainLayout", {main: "knowledgeHub"});
  }
})
