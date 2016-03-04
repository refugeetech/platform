Template.sectionHowItWorksCarousel.onRendered(function() {
  const options = {
    center:true,
    navRewind:true,
    items: 1
  };
  var owl = $(".owl-carousel");
  owl.owlCarousel(options);
  // Custom Navigation Events: Not used at the moment
  /*
  $(".next").click(function(){
    owl.trigger('next.owl.carousel');
  })
  $(".prev").click(function(){
    owl.trigger('prev.owl.carousel');
  })
  */
});