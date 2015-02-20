var main = function(){
	$('.arrow-next').click( function() {
		if( $('.active-slide #cat').is('.active-img') ){
			$('.active-slide #cat').removeClass('active-img');
			$('.active-slide #cat').animate({
				marginTop: "-200px"
			}, 300);
			$('.slide.active-slide').animate({
				overflow: "hidden"
			}, 300);
			$('.slider').animate({
				height: "470px"
			}, 300);
		}
		
		var currentSlide = $('.active-slide');
		var nextSlide = currentSlide.next();
		var currentDot = $('.active-dot');
		var nextDot = currentDot.next();
		
		// If current slide is the last slide, go to first slide
		if( nextSlide.length === 0 ){
			nextSlide = $('.slide').first();
			nextDot = $('.dot').first();
		}
		
		// Make current slide and dot not active
		currentSlide.fadeOut(600).removeClass('active-slide');
		currentDot.removeClass('active-dot');
		
		// Make next slide and dot active
		nextSlide.fadeIn(600).addClass('active-slide');
		nextDot.addClass('active-dot');
	});
	
	$('.arrow-prev').click( function() {
		if( $('.active-slide #cat').is('.active-img') ){
			$('.active-slide #cat').removeClass('active-img');
			$('.active-slide #cat').animate({
				marginTop: "-200px"
			}, 300);
			$('.slide.active-slide').animate({
				overflow: "hidden"
			}, 300);
			$('.slider').animate({
				height: "470px"
			}, 300);
		}
		
		var currentSlide = $('.active-slide');
		var prevSlide = currentSlide.prev();
		var currentDot = $('.active-dot');
		var prevDot = currentDot.prev();
		
		// If current slide is the first slide, go to last slide
		if( prevSlide.length === 0 ){
			prevSlide = $('.slide').last();
			prevDot = $('.dot').last();
		}
		
		// Make current slide and dot not active
		currentSlide.fadeOut(600).removeClass('active-slide');
		currentDot.removeClass('active-dot');
		
		// Make next slide and dot active
		prevSlide.fadeIn(600).addClass('active-slide');
		prevDot.addClass('active-dot');
	});
	
	$('.slider').on('click', 'img', function() {
		
		if( $('.active-slide #cat').is('.active-img') ){
			$('.active-slide #cat').removeClass('active-img');
			$('.active-slide #cat').animate({
				marginTop: "-200px"
			}, 300);
			$('.slide.active-slide').animate({
			overflow: "hidden"
			}, 300);
			$('.slider').animate({
				height: "470px"
			}, 300);
		} else {
			$('.active-slide #cat').addClass('active-img');
			$('.active-slide #cat').animate({
				marginTop: "0px"
			}, 300);
			$('.slide.active-slide').animate({
			overflow: "visible"
			}, 300);
			$('.slider').animate({
				height: $('.active-slide #cat').height()
			}, 300);
		}
	});
	
	$("body").keydown( function(event) {
		if(event.which == 37) {
			$('.arrow-prev').trigger("click");
		} else if(event.which == 39) {
			$('.arrow-next').trigger("click");
		} else if(event.which == 32) {
			$('.active-slide #cat').trigger("click");
		}
	});
};

$(document).ready(main);