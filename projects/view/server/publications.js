if (Meteor.isServer) {
  // This code only runs on the server

    Meteor.publish("singleProject", function (projectId) {
          return Projects.find({ _id: projectId });
    });

    Meteor.publish("projectProfile", function (projectId) {
            console.log(Projects.find().fetch());
          return Projects.find({ _id:  new Meteor.Collection.ObjectID(projectId)});
    });
}
