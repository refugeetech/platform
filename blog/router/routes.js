FlowRouter.route("/blog", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "blog" });
    }
})