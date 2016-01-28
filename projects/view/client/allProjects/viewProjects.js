// Returns all countries for location dropdown
Template.locationDropdown.helpers({
  countries : function() {
    //returns an array of project objects
    var out =  Projects.find();
    console.log(out);
    console.log(out.fetch());
    // lets just use a list initally
    var countries = [];
    var projects = Projects.find().fetch();
    projects.forEach(function(project) {
      var country = project.postalAddress.country;
      if(countries.indexOf(country)<0) {
        countries.push(country);
      }
    });

    return countries;
  }


});
// Add the template helper to get the Vendors list
Template.viewProjects.helpers({
  'country': function() {
    return Projects.find().fetch();
  }
});
// Filters searchResult when filter dropdown value is changed
Template.viewProjects.events({
  'change .category-filter': function (e) {

    // Get reference to Template instance
    var instance = Template.instance();

    // Get value from dropdown.
    let category = $('#category-filter').val();

    // Assign searchValue to a reactive variable
    instance.category.set(category);

    // Sets the queryparameter "cat" to value in category dropdown
    UniUtils.url.setQuery("cat", category);
  },
  'change .location-filter': function (e) {
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
