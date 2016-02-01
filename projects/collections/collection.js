Projects = new Mongo.Collection('projects');

//Add search index with easy search
ProjectsIndex  = new EasySearch.Index({
    collection: Projects,
    defaultSearchOptions: {limit:20},
    fields: ['name','tags'],
    engine: new EasySearch.Minimongo({
      selector: function (searchObject, options, aggregation) {
        // Set selector to Default
        let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

        // Reactively gets the queryparams to sort the /projects page
        let category = FlowRouter.getQueryParam("category");
        let country = FlowRouter.getQueryParam("country");

        // If there is a category querayparam, add it to the selector
        if(category != undefined && category.length > 0){
          selector.challengeCategories = category;
        };

        // If there is a location queryparam, add it to the selector
        if(country != undefined && country.length > 0){

        // _. extend below is not EasySearch standard syntax for adding value to selector
        // Dot notation for nested objects does not work in EasySearch.
        // See: https://docs.mongodb.org/v2.2/core/read-operations/#subdocuments
        // This has to be used whenever easysearch should filter on a nested...
        // objects property.
        _.extend(selector, {"postalAddress.country": country});
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
