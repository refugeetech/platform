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

Template.locationDropdown.events({
  'change #location-filter': function (event) {

    // Get value from dropdown.
    let location = $('#location-filter').val();

    // Sets the queryparameter "loc" to value in location dropdown
    FlowRouter.setQueryParams({loc: location});
  }
});
