FlowRouter.route("/blog", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "blog" });
    }
});

FlowRouter.route("/blog/manage", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "manageArticles" });
    }
});

FlowRouter.route("/article/add", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "addArticle" });
    }
});

FlowRouter.route("/article/:title", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "article" });
    }
});

FlowRouter.route("/article/:title/update", {
    action: function(params) {
        BlazeLayout.render("mainLayout", { main: "updateArticle" });
    }
});