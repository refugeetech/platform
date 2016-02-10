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
    project: function () {
      return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
    }
});

Template.updateProject.onCreated(function(){
  // Get reference to template instance
  const instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
  
  instance.autorun(function() {
    //subscribe to singleProject with the projectId from the route parameter
    let projectId = FlowRouter.getParam('projectId');
    instance.subscribe('singleProject', projectId);
  });
  
});