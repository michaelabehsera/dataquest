var $body,
	window_height,
	window_width,
	header,
	header_menu,
	header_menu_height,
	learn_section,
	learn_offset,
	$user_menu_butt,
	media_point_1 = 1024,
	media_point_2 = 768,
	media_point_3 = 480,
	media_point_4 = 320;


$(document).ready(function ($) {
	$body = $('body');
	header = $('#header');
	header_menu = $('#head_menu_block');
	$user_menu_butt = $('#user_menu_butt');
	learn_section = $('#learn_section_w');



	$('.scrollTo').on('click', function () {
		header_menu_height = header_menu.height();
		var firedEl = $(this);

		docScrollTo($(firedEl.attr("href")).offset().top - header_menu_height, 1000);

		return false;
	});

	$user_menu_butt.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	scroll_function();
});

$(window).on('load', function () {
	window_height = $(window).height();
	window_width = $(window).width();
	header_menu_height = header_menu.height();
	learn_offset = learn_section.offset().top;

	fadeSliderInit($('#head_slider'));

	vertSliderInit($('#reply_slider'));

	move_to_block('#learn_section_w', '#learn_scroll_link');
});

$(window).on('scroll', function () {
	scroll_function();
});


function scroll_function() {
	window_height = $(window).height();
	window_width = $(window).width();

	if ($(window).scrollTop() > (learn_offset - header_menu_height)) {
		header.addClass('fixed_mod');
	} else {
		header.removeClass('fixed_mod');
	}
}

function fadeSliderInit(target) {
	target.bxSlider({
		mode:'fade',
		controls:false,
		auto:true,
		onSlideAfter: function ($slideElement, oldIndex, newIndex) {
			$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
		}
	});
}

function vertSliderInit(target) {
	target.bxSlider({
		mode:'vertical',
		controls:false,
		pager:false,
		auto:true,
		onSlideNext: function ($slideElement, oldIndex, newIndex) {
			$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
		}
	});
}

function move_to_block(block, control) {
	var $block = $(block),
		$control = $(control);
	$control.on('click', function () {
		var $block_pos = $block.offset();
		$('body,html').animate({
			scrollTop: $block_pos.top - header_menu_height
		}, 500);
		return false;
	})
}

function docScrollTo(pos, speed, callback) {

	$('html,body').animate({'scrollTop': pos}, speed);

	if (typeof(callback) == 'function') {
		callback();
	}

}