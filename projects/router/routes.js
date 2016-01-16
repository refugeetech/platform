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

FlowRouter.route('/projects/:projectId', {  
  subscriptions: function (params, queryParams) {
    this.register('project', Meteor.subscribe('projectProfile', params.projectId));
  },
  action: function (params) {
    BlazeLayout.render('projectProfilePage', { main: 'projectProfile' });
  },
  name: 'projectProfile'
  
});

/*FlowRouter.route("projects/:id", {
  action: function() {
    BlazeLayout.render("projectProfilePage", main:"projectProfile");
   }
   subscription: function(params, qparams) {
     this.register('project', )
   }
});*/

// Add route to return a single JSON object containing the specified project.
JsonRoutes.add("get", "/projects/:projectId/json", function (req, res, next) {
  var projectId = req.params.projectId; // The project id, in MongoDB
  var singleProject = Projects.findOne(projectId) // Finds matching project and returns object.

  JsonRoutes.sendResult(res, 200, singleProject); // Sends the result to client
});

// Returns JSON array containing all projects in Projects collection.
JsonRoutes.add("get", "/projects/json", function (req, res, next) {
  var allProjects = Projects.find().fetch(); // Finds all projects and returns array

  JsonRoutes.sendResult(res, 200, allProjects); // Sends the result to client
});
