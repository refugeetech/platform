  var ProjectsApiV01 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    version:'v01',
    defaultHeaders: {'Content-Type': 'application/json'}
  });  
  
  // Generates: GET on /api/v01/projects
  // /api/v01/projects/:id for the Projects collection
  Projects = Mongo.Collection.get('projects');
  if(!Projects) {
    Projects = new Mongo.Collection('projects');
  }
  
  // fixing PUT problems med simpleschema och restivus
  Patch = (collection) => {
    return function() {
      var entity;
      collection.update(this.urlParams.id, {
        $set: this.bodyParams
      });
      entity = collection.findOne(this.urlParams.id);
      return {
        status: 'success',
        data: entity
      };
    };
  };
  
  ProjectsApiV01.addCollection(Projects,
  {
    endpoints: {
      put: {
        action: Patch(Projects)
      }
    }
  });


  ProjectsApiV01.addRoute('projects/ratings', {
    get: function () {
      return {
        status: "success",
        data: _.map(Projects.find().fetch(),(p,i)=> {return ExtendProjectWithRatings(p);})
      };
    }
  });
  
  ProjectsApiV01.addRoute('projects/:id/ratings', {
    get: function () {
      return {
        status: "success",
        data: ExtendProjectWithRatings(Projects.findOne({_id:this.urlParams.id}))
      };
    }
  });
  
  ExtendProjectWithRatings = (project) => {
    return _.extend(project,{upvotes: Ratings.find({rated:{collection:"projects", id:project._id},rating:"UP"}).fetch().length});
  }


  
  
 


