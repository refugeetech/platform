if (Meteor.isServer) {
  // This code only runs on the server
  
    Meteor.publish("singleProject", function (projectId) {  
          return Projects.find({ _id: projectId });
    });
    
    Meteor.publish("projectProfile", function (projectId) {
            console.log("We are here...");
          return Projects.find().fetch()[0];
    });
}