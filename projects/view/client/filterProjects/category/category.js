// Filters searchResult when filter dropdown value is changed
Template.categoryDropdown.events({
  'change #category-filter': function (event) {

    // Get value from dropdown.
    var category = $( "#category-filter" ).val();

    // Sets the queryparameter "cat" to value in category dropdown
    FlowRouter.setQueryParams({cat: category});
  }
});
