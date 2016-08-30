  var ProjectsApiV02 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version:'v02',
    defaultHeaders: {'Content-Type': 'application/json; charset=UTF-8'}
  });

  // Generates: GET on /api/v01/projects
  // /api/v01/projects/:id for the Projects collection
  Projects = Mongo.Collection.get('projects');
  if(!Projects) {
    Projects = new Mongo.Collection('projects');
  }

  ProjectsApiV02.addRoute('projects', {
    get: function () {
      return {
        status: "success",
        data: Projects.find().fetch()
      };
    }
  });

   ProjectsApiV02.addRoute('projects/:id', {
    get: function () {
      return {
        status: "success",
        data: Projects.findOne({_id:this.urlParams.id})
      };
    }
  });

  ProjectsApiV02.addRoute('projects/:id/upvote', {
   get: function () {
     Projects.update(this.urlParams.id, {
      //  $set: { voteCount: 2 },
       $inc: { "voteCount": 1 },
     });
     return {
       status: "success",
       data: Projects.findOne({_id:this.urlParams.id})
     };
   }
 });

 ProjectsApiV02.addRoute('projects/:id/downvote', {
  get: function () {
    Projects.update(this.urlParams.id, {
     //  $set: { voteCount: 2 },
      $inc: { "voteCount": -1 },
    });
    return {
      status: "success",
      data: Projects.findOne({_id:this.urlParams.id})
    };
  }
});
