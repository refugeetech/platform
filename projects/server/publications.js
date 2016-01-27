Meteor.publish("singleProject", function (projectId) {
  // Return a cursor with a single project
  // using the projectId as an argument
  return Projects.find({ _id: projectId });
});
