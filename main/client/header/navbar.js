Meteor.startup(function() {

  // Adds class .shrinked to #top-nav
  $(window).scroll(function() {
    let topNav = $('nav#top-nav');
    if ($(document).scrollTop() > 75) topNav.addClass('shrinked');
    else topNav.removeClass('shrinked');
  });
  
  
}); // end Meteor.startup
