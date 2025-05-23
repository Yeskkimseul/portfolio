$(function(){
    AOS.init();
    $('.ham').click(function(){
        $('.mobile_nav').fadeIn();
        $('body').addClass("no-scroll")
    });

    $('.mobile_nav .top .close').click(function(){
        $('.mobile_nav').fadeOut();
        $('body').removeClass("no-scroll")
    });

    $('#storeSearch').on('keyup', function () {
        let keyword = $(this).val().toLowerCase();
        let matched = 0;
    
        $('.storelist li').each(function () {
          let text = $(this).text().toLowerCase();
          let isMatch = text.includes(keyword);
          $(this).toggle(isMatch);
          if (isMatch) matched++;
        });
    
        if (matched === 0) {
          $('.no-result').show();
        } else {
          $('.no-result').hide();
        }
      });
});