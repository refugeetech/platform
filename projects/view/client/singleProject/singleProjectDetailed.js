Template.singleProjectDetailed.helpers({
  //Using the Flowrouter package to get the route param projects/:projectId ; is set up in the Template.projectProfile.onCreated callback
    getProject: function () {
      return Projects.findOne({ _id: FlowRouter.getParam('projectId')});
    },
    //returns font awesome classes to prettyfy links, uses the ProjectsSchema.links.$ object as datacontext
    //TODO: refactor ; is also used in singleProject template
    //TODO: refactor the name ; should be called linkTypeToClass or equivalent
    typeToClass:function() {
  		if(this.type=='facebook') {
  			return 'fa fa-facebook';
  		}
  		if(this.type=='twitter') {
  			return 'fa fa-twitter';
  		}
  		if(this.type=='instagram') {
  			return 'fa fa-instagram';
  		}
  		//need to implement font awesome icon for blogger and other link types used
  		if(this.type=='blogger') {
  			return 'fa fa-blogger';
  		}
  		if(this.type=='linkedin') {
  			return 'fa fa-linkedin';
  		}
  	},
    startupDateFormatted: function () {
      return moment(this.startupDate).format('YYYY');
    },

    websites: function () {

      var websites = jQuery.grep(this.links, function( n, i ) {
        return ( n.type === 'web' );
      });
      return websites;
    },

    socialLinks: function () {

      var websites = jQuery.grep(this.links, function( n, i ) {
        return ( n.type === 'web' ||
          n.type === 'facebook' ||
          n.type ===  'twitter' ||
          n.type === 'instagram' ||
          n.type === 'blogger' ||
          n.type === 'linkedin'
        );
      });
      return websites;
    },

    hasMultipleWebsites: function () {

      //TODO: Duplicated code, can we reuse instead?
      var websites = jQuery.grep(this.links, function( n, i ) {
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
    projectMedia: function () {
      return ProjectMedia.find({_id: this.mediaId});
    }
});

Template.singleProjectDetailed.events({
    'click#show-more ': function(event,template) {
    	$('.content-text').addClass('visable');
		$(event).target.css({
			display:'none',
		});
    },
    "click#view-images": function(event,template) {
		if($(event).target.hasClass('active')){
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
    "click.projectDetailList":function(event,template) {
		$('.image_slide_wrapper').removeClass('image_slide_wrapper_active');
		$('#view-images').removeClass('active');
		$('.projectDetailList').removeClass('inactive');
    },
    
    
})

Template.singleProjectDetailed.onRendered(function () {
	$('.summary').after('<span id="show-more"> More...</span>');
	 var circle = $('.circle')
	 var animation = $('.animation')
    var timelineBlocks = $('.timeline-object'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		showBlocks(timelineBlocks, offset);
		hideBlocks(timelineBlocks, offset);
		showBlocks(circle, offset);
		hideBlocks(circle, offset);
		showBlocks(animation, offset);
		hideBlocks(animation, offset);
			});
	
	function hideBlocks(blocks, offset) {
		console.log('hide')
		blocks.each(function(){
			if($(this).offset().top >= ($(window).scrollTop()+$(window).height()*offset)){
				$(this).removeClass('active');
			}
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			if($(this).offset().top < ($(window).scrollTop()+$(window).height()*offset)){
				$(this).addClass('active');
			}
		});
	}
});