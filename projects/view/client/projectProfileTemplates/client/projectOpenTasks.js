

Template.projectOpenTasks.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
  project: function () {
    return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
  },
  spitMeAnURL: function (list, type) { 
    return _.findWhere(list, { type: type }).url; 
  },
});