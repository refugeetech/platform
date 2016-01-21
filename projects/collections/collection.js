Projects = new Mongo.Collection('projects');

//Add search index with easy search
ProjectsIndex  = new EasySearch.Index({
    collection: Projects,
    fields: ['name','tags','postalAddress','problemCategory'],
    engine: new EasySearch.MongoDB({
      selector: function (searchObject, options, aggregation) {
        let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
          categoryFilter = options.search.props.categoryFilter;
          // locationFilter = options.search.props.locationFilter;

          console.log(categoryFilter);
          // console.log(locationFilter);

        if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
          selector.problemCategories = categoryFilter;
        }

        //if (_.isString(locationFilter) && !_.isEmpty(locationFilter)) {
        //  selector.postalAddress.$.country= locationFilter;
        //}

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
