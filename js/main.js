function openMenu() {
	$('#openMenu').show().fadeOut(200);
	$('#menu').animate({
		left: '0px'
	}, 400);
	$('body').animate({
		left: '300px'
	}, 400);
}

function closeMenu() {
	$('#menu').animate({
		left: '-300px'
	}, 400);
	$('body').animate({
		left: '0px'
	}, 400);
	$('#openMenu').animate({
		left: '0px'
	}, 100);
	$('#openMenu').hide().fadeIn(300);
}

$(document).ready(function() {
	//Set up local variables
	var collapsed = false;				//Handle collapsing menu

	//Force the page to start at top. This fixes menu problems
	$(window).scrollTop(0);

	var active = window.location.pathname;
	var current_active_class = '#index';
	
	var header_height, footer_height;

	//Load elements into the page. Load is async,
	//so we then attach the things being loaded as a callback
	$('.header').load('/includes/header.html', function() {
		header_height = $('.header').height();
		$('#navbar a').each(function() {							
			if (active === "/" + $(this).attr('href') 
			|| (active === "/" && $(this).attr('href') === "index.html")) {
				$(this).parent().addClass('active');
				$(current_active_class).parent().removeClass('active');
				current_active_class = ("#" + active.substring(1, active.length - 5));
			}
		});
	});

	$('#menu-container').load('/includes/menu.html', function() {
		$('#openMenu').click(openMenu);
		$('#closeMenu').click(closeMenu);
	});
	$('.footer').load('/includes/footer.html', function() {
		footer_height = $('.footer').height();
		$('body').css('margin-bottom', footer_height);	
	});

	$(window).scroll(function() {
		if (collapsed === false && window.pageYOffset > header_height) {
			collapsed = true;
			$('#openMenu').animate({
				top: '0px'
			}, 200);
		}
		else if (collapsed === true && window.pageYOffset <= header_height) {
			collapsed = false;
			$('#openMenu').animate({
				top: '-40px'
			}, 200);
		}
	});
});
