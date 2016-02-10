Template.rtProjectInfoSection.onRendered(function () {
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