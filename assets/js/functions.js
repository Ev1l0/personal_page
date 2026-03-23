// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // clicking header logo or device notification logo -> go to Home
  $('.header--logo, .device-notification--logo').click(function(e){
    e.preventDefault();

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  });

  // clicking 'Here' anchor to jump to Contact / Personal section
  $('.contact--goto').click(function(e){
    e.preventDefault();
    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        // find the index of the main-content child that contains #contact
        targetSection = $('.main-content').find('#contact').closest('.l-section'),
        nextPos = $('.main-content').children().index(targetSection);

    if (nextPos === -1) {
      // fallback: go to last item
      nextPos = lastItem;
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

    // show main icon only on Projects page (index 1)
    if (nextPos === 1) {
      $('.main-icon').addClass('is-visible');
    } else {
      $('.main-icon').removeClass('is-visible');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

  function workSlider() {

    $('.slider--prev, .slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.slider').find('.slider--item-left'),
          curLeftPos = $('.slider').children().index(curLeft),
          curCenter = $('.slider').find('.slider--item-center'),
          curCenterPos = $('.slider').children().index(curCenter),
          curRight = $('.slider').find('.slider--item-right'),
          curRightPos = $('.slider').children().index(curRight),
          totalWorks = $('.slider').children().length,
          $left = $('.slider--item-left'),
          $center = $('.slider--item-center'),
          $right = $('.slider--item-right'),
          $item = $('.slider--item');

      setTimeout(function(){

      if ($this.hasClass('slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('slider--item-left').next().addClass('slider--item-left');
          $center.removeClass('slider--item-center').next().addClass('slider--item-center');
          $right.removeClass('slider--item-right').next().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
          $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
          $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
          }
          else {
            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
          }
        }
      }

    }, 400);

    $('.slider').css('opacity', '1');

    });

  }

  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  // initialize features
  // Project expand handlers: on click expand one slider item, hide others, show full description
  function projectExpandHandlers() {

    $('.work .slider--item').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var $item = $(this);
      if ($item.hasClass('is-expanded')) return;
      // hide other items
      $('.work .slider--item').not($item).addClass('is-hidden').removeClass('is-expanded');
      // expand clicked item
      $item.addClass('is-expanded').removeClass('is-hidden');
      // hide title, description and the thumbnail image for the expanded item
      $item.find('.slider--item-title, .slider--item-description').hide();
      $item.find('.slider--item-image').hide();
      // hide the right-side thumbnail and the next arrow to match 'slider--item-left' behavior
      $('.work .slider--item.slider--item-right').find('.slider--item-image').hide();
      $('.work--lockup .slider--next').hide();

      // populate the project hero area (top of Projects page)
      var $link = $item.find('a').first();
      var title = $link.find('.slider--item-title').text() || '';
      var desc = $link.find('.slider--item-description').text() || '';
      var imgSrc = $link.find('.slider--item-image img').attr('src') || '';

      var $hero = $('.project-hero');
      $hero.find('.project-hero-image').css('background-image','url("'+imgSrc+'")');
      $hero.find('.project-hero-caption').text('tutaj link do zdjecia');
      $hero.find('.project-hero-description').text(desc || 'tutaj opis');
      $hero.attr('aria-hidden','false').addClass('is-visible');

      // ensure Projects page is visible (if user clicked slider from other context)
      var curActive = $('.side-nav').find('.is-active'),
          curPos = $('.side-nav').children().index(curActive),
          lastItem = $('.side-nav').children().length - 1,
          projPos = 1;
      updateNavs(projPos);
      updateContent(curPos, projPos, lastItem);

      // scroll Projects section so hero appears under header (slight offset)
      var $work = $('.work');
      // mark work as open to hide heading/left-arrow and shrink right image
      $work.addClass('project-open');
      window.scrollTo(0, $work.offset().top - 80);
    });

    // Close expanded project
    $(document).on('click', '.close-project', function(e){
      e.stopPropagation();
      var $item = $(this).closest('.slider--item');
      $item.removeClass('is-expanded');
      // show titles/descriptions again when closing
      $item.find('.slider--item-title, .slider--item-description').show();
      // restore all thumbnails and navigation controls
      $('.work .slider--item').find('.slider--item-image').show();
      $('.work--lockup .slider--next').show();
      $('.work .slider--item').removeClass('is-hidden');
      $('.project-hero').attr('aria-hidden','true').removeClass('is-visible');
      $('.work').removeClass('project-open');
      $(this).remove();
    });

    // Clicking outside closes expanded project
    $(document).on('click', function(e){
      if ($(e.target).closest('.slider--item.is-expanded').length === 0){
          if ($('.slider--item.is-expanded').length){
            $('.slider--item.is-expanded').each(function(){
              // restore titles/descriptions and thumbnails for items being collapsed
              $(this).find('.slider--item-title, .slider--item-description').show();
              $('.work .slider--item').find('.slider--item-image').show();
              $(this).removeClass('is-expanded');
            });
            $('.work .slider--item').removeClass('is-hidden');
            $('.close-project').remove();
            $('.project-hero').attr('aria-hidden','true').removeClass('is-visible');
            $('.work').removeClass('project-open');
            // restore global UI elements (thumbnails + next arrow)
            $('.work .slider--item').find('.slider--item-image').show();
            $('.work--lockup .slider--next').show();
          }
      }
    });

  }

  projectExpandHandlers();

  // Intro options click handler - hide other items in place
  function introOptionsHandler() {
    $('.intro--options > a').on('click', function(e) {
      e.preventDefault();
      var $clicked = $(this);
      
      // If already selected, deselect all and show all
      if ($clicked.hasClass('is-selected')) {
        $('.intro--options > a').removeClass('is-selected is-hidden');
        return;
      }
      
      // Hide all other items immediately (no animation)
      $('.intro--options > a').not($clicked).addClass('is-hidden').removeClass('is-selected');
      
      // Mark clicked item as selected
      $clicked.addClass('is-selected').removeClass('is-hidden');
    });
  }
  
  introOptionsHandler();

  outerNav();
  workSlider();
  transitionLabels();

});
