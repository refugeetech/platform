//The single singleProject publication return a cursors with a single project using the projectId as an argument
Meteor.publish("singleProject", function (projectId) {
      return Projects.find({ _id: projectId });
});
