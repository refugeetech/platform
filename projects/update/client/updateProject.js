Template.updateProject.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.updateProject.onCreated callback
  project: function () {
    return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
  }
});

Template.updateProject.onCreated(function(){
  // Get reference to template instance
  const instance = this;

  instance.autorun(function() {
    //subscribe to singleProject with the projectId from the route parameter
    let projectId = FlowRouter.getParam('projectId');
    instance.subscribe('singleProject', projectId);
  });

});
