Template.projectProfile.helpers({
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

Template.projectProfile.onCreated(function(){
  var self = this;
  self.autorun(function() {
    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('singleProject', projectId);
  });
});


Template.rtProjectProfile.helpers({
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
    },
    isRTProject: ()=> this.isRTProject ? true: false //temporary until a proper schema has been developed
});

Template.rtProjectProfile.onCreated(function(){
  var self = this;
  self.autorun(function() {
    var projectId = FlowRouter.getParam('projectId');
    self.subscribe('singleProject', projectId);
  });
});
