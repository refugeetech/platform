if (Meteor.isClient) {

  Meteor.startup(function() {
  // Runs when the DOM is ready

    const NAVBAR_HEIGHT = 75; // original navbar height in px

    var $window    = $(window),
        $document  = $(document),
        $searchbar = $('#searchbar');

    $window.on('scroll', function(e) {
    // The scroll event is not supported yet by Meteor https://github.com/meteor/meteor/issues/3298,
    // so we use a jquery instead. 
    // This block runs whenever the page is scrolled
      toggleNavbarClass();
    });

    var toggleNavbarClass = function() {
      // Toggles a css class when the page is scrolled past NAVBAR_HEIGHT.
      // The behaviour is controlled from the .shrinked class in navbar.css
      let $topNav = $('#top-nav');
      if ($document.scrollTop() > NAVBAR_HEIGHT) {
        $topNav.addClass('shrinked');
        $searchbar.addClass('navbar-is-shrinked');
      }
      else {
        $topNav.removeClass('shrinked');
        $searchbar.removeClass('navbar-is-shrinked');
      }
    };
  }); // end Meteor.startup

  Template.mainNavbar.events({
    'click .activate-searchbar': function(event) {
      event.preventDefault();
      $('#searchbar').toggleClass('active'); // Toggle the searchbar
    }
  });
}
