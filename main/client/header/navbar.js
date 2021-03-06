Template.mainNavbar.rendered = function () {
  // Get reference to template instance
  let instance = this;

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
      $('#main-logo').attr('src','images/RT-logo_v3.svg');
    }else {
      $topNav.removeClass('shrinked');
      $searchbar.removeClass('navbar-is-shrinked');
      $('#main-logo').attr('src','images/RT-logo_v3_white.svg');
    }

  };

};

Template.mainNavbar.events({
  // 'click .activate-searchbar': function(event) {
  //   event.preventDefault();
  //   if(!$('#searchbar').hasClass('active')) {
  //       //show input
  //       $('#searchbar input#search').css('display','block');
  //       // Focus on the input of the searchbar only if it is already hidden
  //       $('#searchbar input').focus();
  //       //show autosuggestions only if input has focus
  //       Session.set('willShowAutoSuggestion',true);
  //   }
  //   $('#searchbar').toggleClass('active'); // Toggle the searchbar
  // }
});
