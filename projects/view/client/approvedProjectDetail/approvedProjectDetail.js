Template.approvedProjectDetail.onRendered(function () {
	// Get reference to template instance
	// Subscribe to all projects
	$('.summary').after('<span id="show-more"> More...</span>');
	$('#show-more').click(function(){
		$('.content-text').addClass('visable');
		$(this).css({
			display:'none',
		})
	});
	$('#view-images').click(function(){
		if($(this).hasClass('active')){
			$('.image_slide_wrapper').removeClass('image_slide_wrapper_active');
			$('#view-images').removeClass('active');
			$('.projectDetailList').removeClass('inactive');
		}
		else{
			$('.image_slide_wrapper').addClass('image_slide_wrapper_active');
			$('#view-images').addClass('active');
			$('.projectDetailList').addClass('inactive');	
		}
	})
	$('.projectDetailList').click(function(){
		$('.image_slide_wrapper').removeClass('image_slide_wrapper_active');
		$('#view-images').removeClass('active');
		$('.projectDetailList').removeClass('inactive');
	})
    var timelineBlocks = $('.timeline-object'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		showBlocks(timelineBlocks, offset);
		hideBlocks(timelineBlocks, offset);
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

