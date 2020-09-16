(function ($) {
	"use strict";

    $(document).ready(function($){
		//Fixed nav on scroll
		$(document).on('scroll',function(e){
			var scrollTop = $(document).scrollTop();
			var ww = document.body.clientWidth;
			
			
			if (ww <= 767) {
			    $('#navbar-1').addClass('fixed-top');
				$('#navbar-1').removeClass('navbar-1');
			} else {
				if(scrollTop > $('nav').height()){
					$('#navbar-1').addClass('fixed-top');
					$('#navbar-1').removeClass('navbar-1');
				}
				else {
					$('#navbar-1').addClass('navbar-1');
					$('#navbar-1').removeClass('fixed-top');
				}
			};
			
		});
		
		
		
		var alterClass = function() {
		var ww = document.body.clientWidth;
		if (ww < 400) {
		  $('#navbar-1').addClass('fixed-top');
		} else if (ww >= 401) {
		  $('#navbar-1').removeClass('fixed-top');
		};
	  };
	  $(window).resize(function(){
		alterClass();
	  });
	  //Fire it when the page first loads:
	  alterClass();
		
		
		
		//Testimonial
		$('.testimonial-item').owlCarousel({
                loop: true,
                margin: 30,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: false
                  },
                  600: {
                    items: 2,
                    nav: false
                  },
                  1000: {
                    items: 2,
                    nav: false,
                 
                  }
                }
		});
		
		
		$('.count').each(function () {
			$(this).prop('Counter',0).animate({
					Counter: $(this).text()
			}, {
					duration: 4000,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
			});
		});
		
		new WOW().init();
        


    });


    $(window).on('load',function(){
		//Preloader
		$('.preloader').delay(500).fadeOut('slow');
        $('body').delay(500).css({'overflow':'visible'});
        
    });


}(jQuery));	