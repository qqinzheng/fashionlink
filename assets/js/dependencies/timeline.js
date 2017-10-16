$(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	var windowHeight  = (window.innerHeight || $(window).height());

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(i){
		var $item  =$(this);
		$item.append("<div class='after'></div>");
		$item.children().first().addClass("first-child")
		$item.children().last().addClass("last-child")
		if(i%2==0){
			$item.addClass('even');
		}
		$item.find(".cd-timeline-content").each(function(){
			$(this).append("<div class='after'></div>")
		})
		if($item.offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$item.find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			var $block = $(this);
			var top = (document.body.scrollTop || document.documentElement.scrollTop) + windowHeight;
			var blockTop = $block.offset().top + ($block.height());
			if($block.find('.cd-timeline-img').hasClass('is-hidden') && blockTop <= top) {
				$block.find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});