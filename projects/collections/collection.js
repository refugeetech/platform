Projects = new Mongo.Collection('projects');

//Add search index with easy search
ProjectsIndex  = new EasySearch.Index({
    collection: Projects,
    fields: ['name','tags'],
    engine: new EasySearch.Minimongo({
      selector: function (searchObject, options, aggregation) {
        // Set selector to Default
        let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

        // Reactively gets the queryparams to sort the /projects page
        let category = FlowRouter.getQueryParam("cat");
        let location = FlowRouter.getQueryParam("loc");

        // If there is a category querayparam, add it to the selector
        if(category != undefined && category.length > 0){
          selector.problemCategories = category;
        };

        // If there is a location queryparam, add it to the selector
        if(location != undefined && location.length > 0){
        _.extend(selector, {"postalAddress.country": location});
        };

        return selector;
      }
  })
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
