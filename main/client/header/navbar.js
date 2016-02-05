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
    }
    else {
      $topNav.removeClass('shrinked');
      $searchbar.removeClass('navbar-is-shrinked');
    }
  };

  //adding share-button
  let shareConfig = {
    ui: {
      flyout: 'bottom-center'
    },
    url: Meteor.absoluteUrl(),
    networks: {
      pinterest: {
        enabled: false
      },
      reddit: {
        enabled: false
      },
      whatsapp: {
        enabled: false
      }
    }
  };

  // Set up share button; attach to template instance
  instance.shareButton = new ShareButton('#js-share-button', shareConfig);
  console.log(instance.shareButton)
};

Template.mainNavbar.events({
  'click .activate-searchbar': function(event) {
    event.preventDefault();
    if(!$('#searchbar').hasClass('active')) {
        // Focus on the input of the searchbar only if it is already hidden
        $('#searchbar input').focus();
        //show autosuggestions only if input has focus
        Session.set('willShowAutoSuggestion',true);
    }
    $('#searchbar').toggleClass('active'); // Toggle the searchbar
  },
  "click #js-share-button": function () {
    // Get reference to template instance
    let instance = Template.instance();

    // toggle the share button popup
    instance.shareButton.toggle();
    console.log("clicked share");
  }
});
