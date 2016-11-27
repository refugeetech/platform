Template.sectionWhatTheySay.onCreated(function() {
    var request = $.getJSON('data/mediaAppearances.json', function(data) {
        Session.set('media', data.media);
    });
});

Template.sectionWhatTheySay.helpers({
    media: function() {
        return Session.get('media');
    }
});

Template.sectionWhatTheySay.onRendered(function() {
    //this is just a hack to the problem, we should look for a proper solution.
    //problem: the carousel doesn't render when page refreshes
    Meteor.setTimeout(function() {
      const options = {
          center: true,
          items: 1,
          margin: 0,
          loop: true
      };
      $(".owl-carousel").owlCarousel(options);
    }, 1000);
});
