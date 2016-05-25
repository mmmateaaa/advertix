jQuery(function($) {'use strict';

	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('#main-menu a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('#main-menu').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('#main-menu li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#contact-us').click(function(){
	  $('html, body').animate({
	    scrollTop: $("#contact").offset().top
	  }, 1000);
	});

	//Slider
	$(document).ready(function() {
		var time = 7; // time in seconds

	 	var $progressBar,
	      $bar, 
	      $elem, 
	      isPause, 
	      tick,
	      percentTime;
	 
	    //Init the carousel
	    $("#main-slider").find('.owl-carousel').owlCarousel({
	      slideSpeed : 500,
	      paginationSpeed : 500,
	      singleItem : true,
	      afterInit : progressBar,
	      afterMove : moved,
	      startDragging : pauseOnDragging,
	      transitionStyle : "fadeUp"
	    });
	 
	    //Init progressBar where elem is $("#owl-demo")
	    function progressBar(elem){
	      $elem = elem;
	      //build progress bar elements
	      buildProgressBar();
	      //start counting
	      start();
	    }
	 
	    //create div#progressBar and div#bar then append to $(".owl-carousel")
	    function buildProgressBar(){
	      $progressBar = $("<div>",{
	        id:"progressBar"
	      });
	      $bar = $("<div>",{
	        id:"bar"
	      });
	      $progressBar.append($bar).appendTo($elem);
	    }
	 
	    function start() {
	      //reset timer
	      percentTime = 0;
	      isPause = false;
	      //run interval every 0.01 second
	      tick = setInterval(interval, 10);
	    };
	 
	    function interval() {
	      if(isPause === false){
	        percentTime += 1 / time;
	        $bar.css({
	           width: percentTime+"%"
	         });
	        //if percentTime is equal or greater than 100
	        if(percentTime >= 100){
	          //slide to next item 
	          $elem.trigger('owl.next')
	        }
	      }
	    }
	 
	    //pause while dragging 
	    function pauseOnDragging(){
	      isPause = true;
	    }
	 
	    //moved callback
	    function moved(){
	      //clear interval
	      clearTimeout(tick);
	      //start again
	      start();
	    }
	});

	//Initiat WOW JS
	var wow = new WOW(
        {
            //offset: 50,
            mobile: false
           // live: true
        }
    );
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	

	$(document).ready(function() {

		$("#bm-slider").find('.owl-carousel').owlCarousel({
	      slideSpeed : 300,
	      pagination: false,
	      autoPlay: 4000,
	      singleItem : true,
	      navigation : true,
			navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
			],
	      //autoHeight : true,
	      transitionStyle : "backSlide"
	    });

	    $("#pm-slider").find('.owl-carousel').owlCarousel({
	      slideSpeed : 300,
	      pagination: false,
	      autoPlay: 4000,
	      singleItem : true,
	      navigation : true,
			navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
			],
	      //autoHeight : true,
	      transitionStyle : "backSlide"
	    });

		$('.mgp-preview').magnificPopup({
	      type:'image',
	      closeBtnInside:true,
	      // Delay in milliseconds before popup is removed
	      removalDelay: 300,

	      // Class that is added to popup wrapper and background
	      // make it unique to apply your CSS animations just to this exact popup
	      mainClass: 'mfp-fade',
	      gallery: {
	          enabled: true, // set to true to enable gallery

	          preload: [0,2], // read about this option in next Lazy-loading section

	          navigateByImgClick: true,

	          //arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

	          closeMarkup: '<button title="%title%" class="mfp-close"><i class="mfp-close-icn">&times;</i></button>',

	          tPrev: 'Previous (Left arrow key)', // title for left button
	          tNext: 'Next (Right arrow key)', // title for right button
	          //tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
	        }
	   });

		//Animated Number
		$.fn.animateNumbers = function() {
			return this.each(function() {
				$(this).prop('Counter',0).animate({
			        Counter: $(this).text()
			    }, {
			        duration: 1000,
			        easing: 'swing',
			        step: function (now) {
			            $(this).text(Math.ceil(now));
			        }
			    });
			});
		};

		$('.animated-number').on('inview', function(event, isInView) {
			var $this = $(this);
			if (isInView) {
				$this.animateNumbers(); 
				$this.unbind('inview');
			}
		});
	});

	// Contact form
	if( $('.floating-labels').length > 0 ) floatLabels();

	function floatLabels() {
		var inputFields = $('.floating-labels .label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			//check if user is filling one of the form fields 
			checkVal(singleInput);
			singleInput.on('change keyup', function(){
				checkVal(singleInput);	
			});
		});
	}

	function checkVal(inputField) {
		( inputField.val() == '' ) ? inputField.prev('.label').removeClass('float') : inputField.prev('.label').addClass('float');
	}

	function clearContact(){
		$('#name').val('');
		$('#email').val('');
		$('#phone').val('');
		$('#message').val('');

		$('.label').removeClass('float');
	}

	function handleContact(response){
		if(response == 'errors') console.error('Error from contact response!');

		clearContact();
		
		$('#contact-modal').modal('toggle');
	}

	function contact(){

		var formData = $('#contact-form').serializeArray();

		$.post('sendemail.php', $('#contact-form').serialize()).done(function(response){
			handleContact(response);
		});	

	}

	jQuery(document).ready(function(){
		$('#contact-form').on('submit', function(e){
			e.preventDefault();
			contact();
		});
	});

		


	/*var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});*/
		

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	var date = new Date();
    $('#footer-year').text(date.getFullYear());

});