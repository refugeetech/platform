Projects = new Mongo.Collection('projects');

//Add search index with easy search
ProjectsIndex  = new EasySearch.Index({
    collection: Projects,
    fields: ['name','tags'],
    engine: new EasySearch.Minimongo()
  });

ProjectMedia = new FS.Collection("projectMedia", {
  stores: [new FS.Store.GridFS("projectMediaStore")]
});

ProjectMedia.allow({
  download: function () {
    return true;
  },
  fetch: null
});
