Template.singleProjectDetailed.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
  project: function () {
    return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
  },
  startupDateFormatted: function () {
    return moment(this.startupDate).format('YYYY');
  },
  websites: function () {
    const websites = jQuery.grep(this.links, function( n, i ) {
      return ( n.type === 'web' );
    });
    return websites;
  },
  socialLinks: function () {
    const websites = jQuery.grep(this.links, function( n, i ) {
      return ( n.type === 'web' ||
      n.type === 'facebook' ||
      n.type ===  'twitter' ||
      n.type === 'instagram' ||
      n.type === 'blogger' ||
      n.type === 'linkedin'
    );
  });
  var out = {};
  jQuery.each(websites,(n,i)=>{
    out[n.type] = n;
  });
  console.log(out);
  return out;
},
hasMultipleWebsites: function () {
  //TODO: Duplicated code, can we reuse instead?
  const websites = jQuery.grep(this.links, function( n, i ) {
    return ( n.type === 'web' );
  });
  return websites.length > 1;
},
isWebsite: function () {
  return this.type=='web';
},
calculateProgress: function(){
  switch (this.currentStage) {
    case "initiation":
    return 10;
    break;
    case "planning":
    return 20;
    break;
    case "implementationExecution":
    return 50;
    break;
    case "operationMonitoring":
    return 70;
    break;
    case "closing":
    return 90;
    break;
    default:
    return 0;
  }
},
pics: function () {
  return ProjectMedia.find({_id: this.id});
}
});

Template.singleProjectDetailed.events({
  'click #show-more ': function(event,template) {
    $('.content-text').addClass('visable');
    $(event).target.css({
      display:'none',
    });
  },
  "click #view-images": function(event,template) {
    if($(event.target).hasClass('active')){
      $('.image_slide_wrapper').removeClass('image_slide_wrapper_active');
      $('#view-images').removeClass('active');
      $('.projectDetailList').removeClass('inactive');
    }
    else{
      $('.image_slide_wrapper').addClass('image_slide_wrapper_active');
      $('#view-images').addClass('active');
      $('.projectDetailList').addClass('inactive');
    }
  },
  "click .projectDetailList":function(event,template) {
    $('.image_slide_wrapper').removeClass('image_slide_wrapper_active');
    $('#view-images').removeClass('active');
    $('.projectDetailList').removeClass('inactive');
  },
})

Template.singleProjectDetailed.onRendered(function () {
  $('.summary').after('<span id="show-more"> More...</span>');
});
