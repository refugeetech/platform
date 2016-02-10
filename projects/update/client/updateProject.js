Template.updateProject.rendered = function() {
  // Get reference to template instance
  let instance = this;

  instance.autorun(function () {
    // Make sure tags subscription is ready
    if (instance.subscriptionsReady()) {
      // Get all existing tags
      let tagOptions = Tags.find().fetch();

      $('#tags').selectize({
        delimiter: ',',
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        highlight: true,
        maxOptions: 5,
        options: tagOptions,
        create:true,
        onItemAdd(value){
          // Insert tag into Tags collection if it doesn't exist
          if(!Tags.findOne({"name":value})){
            Tags.insert({"name":value});
          }
        }
      });
    }
  });
};

Template.updateProject.helpers({
    //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.updateProject.onCreated callback
    getProject: function () {
      return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
    },
  existingTags: function () {
    // Get all existing tags
    let tags = Tags.find().fetch();

    return tags;
  }
});

Template.updateProject.onCreated(function(){
  var self = this;

  // Get reference to template instance
  let instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
  
  self.autorun(function() {
    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('singleProject', projectId);
  });
});