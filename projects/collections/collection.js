Projects = new Mongo.Collection('projects');

//Add search index with easy search
ProjectsIndex  = new EasySearch.Index({
    collection: Projects,
    fields: ['name','tags','postalAdress'],
    engine: new EasySearch.Minimongo()
  });