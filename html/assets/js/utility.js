/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// utility.js
//
// DATE   : 0000.00.00
// UPDATE : 0000.00.00
// DESC   : フォーマットサンプル
// LIB    : jQuery(v1.9.1)
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

// $(function(){
	

// 	// SHOOTH SCROLL
// 	$('a[href^=#]').click(function() {
// 		// !
// 		var speed = 700;
		
// 		var href= $(this).attr("href");
// 		var target = $(href == "#" || href == "" ? 'html' : href);
// 		var position = target.offset().top;
// 		$($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'easeInOutQuart');
// 		return false;
// 	});

// 	//----------------------------------------------------------------------

// });


$('a[href^=#]').click(function() {
        var DISTANCE = Math.abs((SCROLL))
        var SPEED = 600
        var BASEH=3177;
        var TIME = Math.floor((DISTANCE/SPEED)*100)
        var WINH=$(window).height()
        TIME=SPEED*WINH/BASEH
        var speed = 600;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        var body = 'body';
        var ua=navigator.userAgent;
        if(ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Firefox/)){
          body = 'html';
        }
        $(body).animate({scrollTop:position}, TIME, 'easeInOutSine');
        return false;
});

$("#totop").click(function(){
    var body = 'body';
    var ua=navigator.userAgent;
    if(ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Firefox/)){
      body = 'html';
    }
    var DISTANCE = Math.abs((SCROLL))
    var SPEED = 600
    var BASEH=3177;
    var TIME = Math.floor((DISTANCE/SPEED)*100)
    var WINH=$(window).height()
    TIME=SPEED*WINH/BASEH
    $(body).animate({scrollTop:0}, TIME, 'easeInOutSine')
});
   

    

   