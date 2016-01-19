Meteor.startup(function() {
// Runs when the DOM is ready

  const NAVBAR_HEIGHT = 75; // original navbar height in px

  var $window = $(window),
      $document = $(document);

  $window.on('scroll', function(e) {
  // Runs whenever the page is scrolled
    toggleNavbarClass();
  });

  var toggleNavbarClass = function() {
    // Toggles a css class when the page is scrolled past NAVBAR_HEIGHT.
    // The behaviour is controlled from the .shrinked class in navbar.css
    let $topNav = $('#top-nav');
    if ($document.scrollTop() > NAVBAR_HEIGHT) $topNav.addClass('shrinked');
    else $topNav.removeClass('shrinked');
  };

}); // end Meteor.startup
