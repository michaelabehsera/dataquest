var rem = 1,
	$body,
	window_height,
	window_width,
	header,
	header_menu,
	header_menu_height,
	learn_section,
	learn_offset,
	$user_menu_butt,
	main_slider_array = [],
	main_slider_active_el = 0,
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
	$('.head_slider_item', target).each(function () {
		var $this = $(this),
			$this_index = $this.index();

		var array_push_var={
			'element': $this,
			'element_text_1': $('.head_slide_fist_part', $this),
			'element_text_2': $('.head_slide_sec_part', $this),
			'element_state':$this_index + 1,
			'element_number':$this_index + 1
		};
		main_slider_array.push(array_push_var);

		console.log(main_slider_array);
	});

	target.bxSlider({
		mode: 'fade',
		speed:333,
		pause:6000,
		controls: false,
		onlystate: true,
		auto: true,
		onSliderLoad: function () {
			state_anim(0);
		},
		onSlideNext: function ($slideElement, oldIndex, newIndex) {
			//console.log($slideElement, oldIndex, newIndex);


		},
		onSlidePrev: function ($slideElement, oldIndex, newIndex) {
			console.log($slideElement, oldIndex, newIndex);
		},
		onSlideBefore: function ($slideElement, oldIndex, newIndex) {

		},
		onSlideAfter: function ($slideElement, oldIndex, newIndex) {
			state_anim(newIndex);
		}

	});

	//array.rocket.snabbt({
	//			fromPosition: [0, 0, 0],
	//			position: [0, -array.rocket_coords + 2 * rem, 0],
	//			duration: anim_duration
	//
	//		}).then({
	//			fromPosition: [0, -array.rocket_coords + 2 * rem, 0],
	//			position: [0, -array.rocket_coords, 0],
	//			easing: 'easeOut',
	//			duration: second_d,
	//			callback: function () {
	//				footer();
	//			}
	//		});
}

function state_anim(active){

	for (var i = 0; i < main_slider_array.length; i++) {

		console.log(main_slider_array[i].element_state);
		var step_x_from = 28 * rem,
				step_x_to = 28 * rem,
				step_y_from = 30 * rem,
				step_y_to = 30 * rem,
				$opacity_from = 0,
				$opacity_to = 0,
				$duration = 330,
				$zindex;

		//if (main_slider_active_el < active) {
			main_slider_active_el = active;
			if(main_slider_array[i].element_state == 1){

				main_slider_array[i].element_state = main_slider_array.length;

				step_x_from = 0;
				step_x_to = step_x_to * -1;
				step_y_from = 0;
				step_y_to = step_y_to * -1;
				$opacity_from = 1;
				$opacity_to = 0;
				$zindex = 0;

				main_slider_array[i].element_text_1.removeClass('active_mod');
				main_slider_array[i].element_text_2.removeClass('active_mod');

			} else if(main_slider_array[i].element_state == 2){
				main_slider_array[i].element_state = 1;

				//step_x_from = step_x_from;
				step_x_to = 0;
				//step_y_from = step_y_from;
				step_y_to = 0;
				$opacity_from = .5;
				$opacity_to = 1;
				$zindex = 50;

				main_slider_array[i].element_text_1.addClass('active_mod');
				main_slider_array[i].element_text_2.addClass('active_mod');

			} else if(main_slider_array[i].element_state == 3){
				main_slider_array[i].element_state = 2;

				step_x_from = step_x_from * 2;
				//step_x_to = step_x_to;
				step_y_from = step_y_from * 2;
				//step_y_to = step_y_to;
				$opacity_from = .1;
				$opacity_to = .5;
				$zindex = 2;

			} else if (main_slider_array[i].element_state == 4) {
				main_slider_array[i].element_state = 3;

				step_x_from = step_x_from * 3;
				step_x_to = step_x_to * 2;
				step_y_from = step_y_from * 3;
				step_y_to = step_y_to * 2;
				$opacity_from = 0;
				$opacity_to = .1;
				$zindex = 1;

			} else if (main_slider_array[i].element_state > 4) {
				main_slider_array[i].element_state = main_slider_array[i].element_state - 1;

				step_x_from = 0;
				step_x_to = step_x_to * 3;
				step_y_from = 0;
				step_y_to = step_y_to * 3;
				$opacity_from = 0;
				$opacity_to = 0;
				$duration = 0;
				$zindex = 0;
			}
			console.log(main_slider_array[i].element);

			main_slider_array[i].element.css('zIndex', $zindex).snabbt({
				fromPosition: [step_x_from, step_y_from, 0],
				position: [step_x_to, step_y_to, 0],
				fromOpacity: $opacity_from,
				opacity: $opacity_to,
				easing: 'easeOut',
				duration: $duration
			});

		//} else if(main_slider_active_el > active) {
		//	main_slider_active_el = active;
		//}
	}
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
			scrollTop: $block_pos.top
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