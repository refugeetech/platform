Template.sectionWhatTheySay.helpers({
    media: function() {
        var request = $.getJSON('data/mediaAppearances.json', function(data) {
            Session.set('media', data.media);
        });
        return Session.get('media');
    }
});

Template.sectionWhatTheySay.onRendered(function() {
    const options = {
        center: true,
        items: 1,
        margin: 0,
        loop: true
    };
    $(".owl-carousel").owlCarousel(options);
});
