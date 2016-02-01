// Returns countries for location dropdown
Template.countryDropdown.helpers({
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

Template.countryDropdown.events({
  'change #country-filter': function (event) {

    // Get value from dropdown.
    let country = $('#country-filter').val();

    // Sets the queryparameter "country" to value in country dropdown
    FlowRouter.setQueryParams({country: country});
  }
});
