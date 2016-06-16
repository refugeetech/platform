  ProjectsApiV01 = new Restivus({
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
  ProjectsApiV01.addCollection(Projects, {
    excludedEndpoints: ['put','delete']
  });
  
  ProjectsApiV01.addRoute('projects/ratings', {
    get: function () {
      return _.map(Projects.find().fetch(),(p,i)=> {return ExtendProjectWithRatings(p);});
    }
  });
  
  ProjectsApiV01.addRoute('projects/:id/ratings', {
    get: function () {
      return ExtendProjectWithRatings(Projects.findOne({_id:this.urlParams.id}));
    }
  });
  
  ExtendProjectWithRatings = (project) => {
    return _.extend(project,{upvotes: Ratings.find({rated:{collection:"projects", id:project._id},rating:"UP"}).fetch().length});
  }
  
  
 


