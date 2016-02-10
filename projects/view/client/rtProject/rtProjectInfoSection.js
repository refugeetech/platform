Template.rtProjectInfoSection.onRendered(function () {
  	let circle = $('.circle');
	const animation = $('.animation')
    let timelineBlocks = $('.timeline-object'),
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

Template.rtProjectInfoSection.helpers({
	keyContributors:function() {
		return this.dataStore.keyContributors;
	},
	problemOwners:function() {
		return this.dataStore.problemOwners;
	},
	productOwners:function() {
		return this.dataStore.productOwners;
	},
	projectOwners:function() {
		return this.dataStore.projectOwners;
	},
	media:function() {
		console.log(ProjectMedia.find({_id: this.mediaId}).fetch());
		return ProjectMedia.findOne({_id:this.mediaId});
	},
	history:function() {
		return this.dataStore.history.sort(function(a,b){
			return a.date.getTime() - b.date.getTime();
		});
	}
});