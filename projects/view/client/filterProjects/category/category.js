// Filters searchResult when filter dropdown value is changed
Template.categoryDropdown.events({
  'change #category-filter': function (event) {
    // Get value from dropdown.
    var category = $( "#category-filter" ).val();

    // Set or remove the category URL parameter
    if (category) {
      // Sets the queryparameter "category" to selected value
      FlowRouter.setQueryParams({category: category});
    } else {
      // No category selected, remove url parameter
      FlowRouter.setQueryParams({category: undefined});
    }
  }
});
