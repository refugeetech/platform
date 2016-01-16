Template.projectProfile.helpers({
    'getProject': function(){
      console.log("projectProfile");
      //console.log(project);
        return Projects.findOne();
    },
    getProject2: function () {
      return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
    }
});

Template.projectProfile.onCreated(function(){
  var self = this;
  self.autorun(function() {
    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('singleProject', projectId);  
  });
});
