Template.addProject.created = function () {
  // Get reference to template instance
  let instance = this;

  // Subscribe to all tags, for tag auto-complete field
  instance.subscribe("allTags");
};

Template.addProject.rendered = function() {
  // Get reference to template instance
  let instance = this;

  instance.autorun(function () {
    if (instance.subscriptionsReady()) {
      // Get all existing tags
      let tagOptions = Tags.find().fetch();
  
      $('#tags').selectize({
          delimiter: ',',
          persist: false,
          valueField: '_id',
          labelField: 'name',
          searchField: 'name',
          highlight: true,
          maxOptions: 5,
          options: tagOptions,
          create:true,
          onItemAdd(value){
            if(!Tags.findOne({_id:value})){
              Tags.insert({"name":value});
            }
          }
      });
    }

});
}

Template.addProject.helpers({
  existingTags: function () {
    // Get all existing tags
    let tags = Tags.find().fetch();

    return tags;
  }
});