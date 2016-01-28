// Returns countries for location dropdown
Template.locationDropdown.helpers({
  countries : function() {
    var countries = [];
    var projects = Projects.find().fetch();
    // For every project in collection...
    projects.forEach(function(project) {
      var country = project.postalAddress.country;
      // Check if projects array contain country, if not...
      if(countries.indexOf(country)<0) {
        // Add it to the array
        countries.push(country);
      }
    });
    // Returns a String Array with all unique countries in Projects collection
    return countries;
  }


});

// Filters searchResult when filter dropdown value is changed
Template.categoryDropdown.events({
  'change #category-filter': function (event) {

    // Get reference to Template instance
    var instance = Template.instance();

    // Get value from dropdown.
    let category = $('#category-filter').val();

    // Assign searchValue to a reactive variable
    instance.category.set(category);

    // Sets the queryparameter "cat" to value in category dropdown
    UniUtils.url.setQuery("cat", category);
  }
});

Template.locationDropdown.events({
  'change #location-filter': function (event) {
    // Get reference to Template instance
    var instance = Template.instance();

    // Get value from dropdown.
    let location = $('#location-filter').val();

    // Assign searchValue to a reactive variable
    instance.location.set(location);

    // Sets the queryparameter "loc" to value in location dropdown
    UniUtils.url.setQuery("loc", location);
  }
});
