

Template.singleProjectBox.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
  project: function () {
    return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
  },
  startupDateFormatted: function () {
    return moment(this.startupDate).format('YYYY');
  },
  spitMeAnURL: (list,type)=> {
    
    return _.findWhere(list,{type:type}).url;
  },
  websites: function () {
    const websites = jQuery.grep(this.links, function( n, i ) {
      return ( n.type === 'web' );
    });
    return websites;
  },
  twitter: (project)=> {
    return project.links[0].url;
  },
  socialLinks: function (project,type) {
  return _.find(project.links,(n,i)=> {
    return n.type==type;
  }).url;
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
spitMeASrc: function (project) {
  var tmp = ProjectMedia.find({_id: project.mediaId}).fetch()[0].url();
  console.log(tmp);
  return tmp;
}
});

Template.singleProjectBox.events({
  'click #show-more ': function(event,template) {
    $('.content-text').addClass('visable');
    $(event).target.css({
      display:'none',
    });
  },
  "click img": function(event,template) {
    var tmp = ProjectMedia.find({_id: this.mediaId});
    console.log(tmp.fetch()[0].url());
    
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
