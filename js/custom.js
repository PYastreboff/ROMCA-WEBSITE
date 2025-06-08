
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);



document.addEventListener('DOMContentLoaded', function () {
  // Select all buttons that toggle collapse
  const toggleButtons = document.querySelectorAll('button[data-bs-toggle="collapse"]');

  toggleButtons.forEach(button => {
      const targetSelector = button.getAttribute('data-bs-target');
      const collapseElement = document.querySelector(targetSelector);

      if (!collapseElement) return;

      collapseElement.addEventListener('show.bs.collapse', () => {
          if (button.textContent.trim() === 'View Details') {
              button.textContent = 'Close Details';
          } else if (button.textContent.trim() === 'Stream Now') {
              button.textContent = 'Close Stream Details';
          }

      collapseElement.addEventListener('hide.bs.collapse', () => {
          if (button.textContent.trim() === 'Close Details') {
              button.textContent = 'View Details';
          } else if (button.textContent.trim() === 'Close Stream Details') {
              button.textContent = 'Stream Now';
          }
      });
    });
  });
}
);
