// import '../../../../imports/ui/masonry.pkgd.min.js';
//var Masonry = require('masonry-layout');

Template.projectsTiles.rendered = function() {

    // var url = "https://npmcdn.com/packery@2.1/dist/packery.pkgd.min.js";
    // $.getScript( url, function() {
    //   $('.grid').packery({
    //     // options
    //     itemSelector: '.grid-item',
    //     gutter: 10
    //   });
    // });

    $('.grid').packery({
      itemSelector: '.grid-item',
      gutter: 10
    });
};
