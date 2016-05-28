Template.projectProfile.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
  project: function () {
    return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
  },
});

Template.projectProfile.onCreated(function(){
  const self = this;
  self.autorun(function() {
    const projectId = FlowRouter.getParam('projectId');
    self.subscribe('singleProject', projectId);
    self.subscribe('projectMedia');
  });
});
