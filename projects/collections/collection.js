Projects = new Mongo.Collection('projects');

ProjectMedia = new FS.Collection("projectMedia", {
  stores: [new FS.Store.GridFS("projectMediaStore")]
});

ProjectMedia.allow({
  download: function () {
    return true;
  },
  fetch: null
});
