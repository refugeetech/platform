Template.sectionHowItWorks.events({
  'click .tab a'(event) {
      event.preventDefault();
      toggleContent($(event.target).attr('data-target'));
      function toggleContent(target) {
        $('.tab-content').each(function(i,e){
          $(e).hide()
        });
        $('.tab .btn').each(function(i,e){
          $(e).removeClass('active');
        });
        $("#"+target).show();
      
      }
      $(event.target).addClass('active');
    }
});

Template.sectionHowItWorks.onRendered(function() {
  const options = {
    center:true,
    items: 1,
    nav:true
  };
  $(".owl-carousel").owlCarousel(options);
});