$(document).ready(function(){

  // slickSlider
  // $('.carousel__inner').slick({
  //   dots: false,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   fade: true,
  //   cssEase: 'linear',
  //   centerMode: true,

  //   prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.svg"> </button>',
  //   nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.svg"> </button>',

  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         dots: true,
  //         arrows: false,
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         dots: true,
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //       }
  //     },
  //     {
  //       breakpoint: 320,
  //       settings: {
  //         dots: true,
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         arrows: false,
  //       }
  //     }
  //   ]
  // });


// tabsToggle
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

// catalogToggle
// $('.catalog-item__link').each(function(i) {
//   $(this).on('click', function(e) {
//       e.preventDefault();
//       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
// })
//   })

//   $('.catalog-item__list_back').each(function(i) {
//     $(this).on('click', function(e) {
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//   })
// });

// JS catalogToggle (optimised code)
  function toggleSlide (item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__list_back');

// MODAL

  // $('[data-modal=consultation]').on('click', function() {
  //   $('.overlay, #consultation').fadeIn('fast');
  // });

  // $('.modal__close').on('click', function() {
  //     $('.overlay, #consultation,#thanks,#order').fadeOut('slow');
  // });

  // $('.button_mini').on('click', function() {
  //   $('.overlay, #order').fadeIn('fast');
  // });
  /* Every function must be closed with brackets otherwise script won't work */
   
  $('.button_mini').each(function(i) {
    $(this/* Meaning:button that i just pushed */).on('click', function() {
      $('#order .modal__description').text($('.catalog-item__subtitles').eq(i).text());
        $('.overlay, #order').fadeIn('fast');/* eta komanda pokazyvaet modalnoe okno */
    });
  });
//  105:posle klika na knopku, #modal v nem klass .modal__description zamenyaetsya na tot subtitle,kotoryj propisan v kartochke tovara, po kotoromu kliknuli, i podstavlyaetsya v eto modalnoe okno(#order)
 

// FORM VALIDATION
  $('#consultation-form').validate();
  $('#consultation form'/* est blok s #consultation i v nem est blok formy */).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      name: "Please specify your name",
      email: {
        required: "We need you  ",
        email: "Your email  mat of name@domain.com"
      }
    }
  });
  $('#order form').validate();


// Mail


  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

// Smoothe scroll

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  // smooth
  //   $("a[href^='#']").click(function(){
  //     const _href = $(this).attr("href");
  //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  //     return false;
  // });

  // Animation.WOW
  new WOW().init();
});
 

// header__dark
 $(function() {

  let promo = $("#promo");
  let header = $("#header");/* eto pervaja obertka */
  let header__inner = $("#header__inner");/* eto vtoraja */
  let promoH = promo.innerHeight();
  let headerH = header.innerHeight();
  let scrollTop = $(window).scrollTop();

  headerScroll();

    // console.log(promoH, headerH) Zdes my smotrim,rabotaet li kod;
  
  $(window).on("scroll resize", function() {

    headerScroll();

    });

    function headerScroll() {
       
      promoH = promo.innerHeight(); /* eti dve komandy nuzhny,chtoby header menyalsya imenno na promoH!! ochen kachestvenno poluchaetsya */
      headerH = header.innerHeight();
    
        let scrollTop = $(this).scrollTop();

        if( scrollTop >= (promoH - headerH) ) {
          header.addClass("header__dark");/* tut menyaem 1 class */
        }  
        else {
          header.removeClass("header__dark");
        }

        if( scrollTop >= (promoH - headerH) ) {
          header__inner.addClass("header__inner_dark");/* tut menyaem vtoroj klass */
        }  
        else {
          header__inner.removeClass("header__inner_dark");
        }

    }



//  Smooth Scroll to ID's

$("[data-scroll]").on("click", function(event) {
  event.preventDefault();

  let scrollEl = $(this).data("scroll");
  let scrollElPos = $(scrollEl).offset().top;

  navToggle.removeClass('active');
  nav.removeClass('show');


  $("html, body").animate({
    scrollTop: scrollElPos - 10 /* otmotaet k etoj pozicii i minus 10px */
  }, 400)
 
  });


  // ScrollSpy
  
  let windowH = $(window).height();
  scrollSpy(scrollTop);

  $(window).on("scroll",function() {
 
      let scrollTop = $(this).scrollTop();
      scrollSpy(scrollTop);


   });

  function scrollSpy(scrollTop) {

      $("[data-scrollspy]").each(function() {

        let $this = $(this);
        let sectionId = $this.data('scrollspy');
        let sectionOffset = $this.offset().top;
        sectionOffset = sectionOffset - (windowH * .3);

        
        if(scrollTop >= sectionOffset) {

            $('#nav [data-scroll]').removeClass('active')
            $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
        }
        if(scrollTop == 0) {
          $('#nav [data-scroll]').removeClass('active');
        }
    });
  }
});

// MOdal

$('[data-modal]').on('click', function(event) {
  event.preventDefault();
  let modal = $(this).data('modal');

  $('body').addClass('no-scroll');
  $(modal).addClass('modal__show');

  setTimeout(function() {
    $(modal).find('.modal__content').css({
        transform: 'scale(1)',
        opacity: '1'
    });
  });
});


$('[data-modal-close]').on('click', function(event) {
      event.preventDefault();
      let modal = $(this).parents('.modal');

          modalClose(modal);
      
        modal.find('.modal__content').css({
            transform: 'scale(0.5)',
            opacity: '0'
        });
      
        setTimeout(function() {
        $('body').removeClass('no-scroll');
          modal.removeClass('modal__show');
      }, 200);
    });

  $('.modal').on('click', function() {
    let modal =  $(this);
  

    modalClose(modal);
    
});

$('.modal__content').on('click', function(event) {

  event.stopPropagation();

});

function modalClose(modal) {

  setTimeout(function() {
    $('body').removeClass('no-scroll');
      modal.removeClass('modal__show');
  }, 200);

  modal.find('.modal__content').css({
    transform: 'scale(0.5)',
    opacity: '0'
});

}
 
 
//  SLider#2

let introSlider = $("#introSlider");

introSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 500
});


$('#introSliderPrev').on('click', function() {
    introSlider.slick('slickPrev')
});

$('#introSliderNext').on('click', function() {
    introSlider.slick('slickNext')
});
 

 

   //  Reviews Slider

   let reviewsSlider = $("#reviewsSlider");

   reviewsSlider.slick({
       infinite: true,
       slidesToShow: 1,
       slidesToScroll: 1,
       arrows: false,
       dots: true,
       fade: false,
       autoplay: true,
       autoplaySpeed: 14000,
       speed: 500
   });

   // NavToggle

// let navToggle = $('#navToggle');
// let nav = $('#nav');


// let navToggle = $('#navToggle');
// let nav = $('#nav');

// navToggle.on('click', function(event) {
//     event.preventDefault();

//     $("body").toggleClass('show-nav');
//     $(this).toggleClass('active');
//     nav.toggleClass('show');
// });

// $(window).on("resize", function() {
//     $("body").removeClass('show-nav');
//     navToggle.removeClass('active');
//     nav.removeClass('show');
// });


let navToggle = $('#navToggle');
let nav = $('#nav');

navToggle.on('click', function(event) {
    event.preventDefault();

    $("body").toggleClass('show-nav');
    $(this).toggleClass('active');
    nav.toggleClass('show');
});

$(window).on("resize", function() {
    $("body").removeClass('show-nav');
    navToggle.removeClass('active');
    nav.removeClass('show');
});



let intro = $("#intro");
let header = $("#header");
let introH = intro.innerHeight();
let headerH = header.innerHeight();
let scrollTop = $(window).scrollTop();

 
   /*  Aos.js
        https://github.com/michalsnik/aos
    ===============================================*/

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 80, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
 



 