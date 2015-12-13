/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// common.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

var WIN = $(window)
var WINW
var WINH
var BODY = $('body')
var WRAP = $('#wrapAll')
var MAIN = $('#main')
var HEADER = $('header')
var HEADERH = HEADER.height()
var HEADERW = HEADER.width()
var FOOTER = $('footer')
var FOOTERH = FOOTER.height()
var FOOTERW = FOOTER.width()

WIN.ready(function(){

});
WIN.load(function(){
	size_set()
	bodyHeight100()
	BODY.addClass('load')
});

WIN.resize(function(){
	size_set()
});

var SCROLL = 0
WIN.scroll(function(){
	SCROLL = WIN.scrollTop();
	// if(BODY.hasClass('page-home')){
	// 	if(SCROLL > 500){
	// 		$('#totop').addClass('scroll')
	// 	} else {
	// 		$('#totop').removeClass('scroll')
			
	// 	}
	// }
});

jQuery.event.add(window,"load",function(){
   size_set()
});

function bodyHeight100(){
	var winH=$(window).height();
	var bodyH=$("body").innerHeight()-84;
	var contentsH=$("#main").height();//CHANGE HERE
	if(winH>bodyH){
	var newContentsH=(winH-bodyH)+contentsH-60;
	$("#main").height(newContentsH);
	}
}

function size_set(){
	WINW = WIN.width()

	WINH = WIN.height()
	// CIMG_INIT()
	// if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	// 	WINH = WIN.height()/2
	// } else {
	// 	WINH = WIN.height()
	// }
	HEADERH = HEADER.height()
	HEADERW = HEADER.width()
	FOOTERH = FOOTER.height()
	FOOTERW = FOOTER.width()
	
}

var PAGE_PATH = location.pathname
var HIERARCHY = location.href.split("/"); 
var DIRECTORY = HIERARCHY[3];
var DIRECTORY2 = HIERARCHY[4];
var PAGE_PATH2 = '/'+DIRECTORY+'/'+DIRECTORY2
var GNAV = $('.gnav li a')
var GNAV_LEN = GNAV.length
var GNAV_A_LINK

for(var L = 0; L < GNAV_LEN; L++){
    GNAV_A_LINK = GNAV.eq(L).attr('href')
    if(GNAV_A_LINK == '/'+DIRECTORY+'/' || GNAV_A_LINK == PAGE_PATH || GNAV_A_LINK == PAGE_PATH2){

        // GNAV.eq(L).addClass('current').attr('href','javascript:void(0);')
        GNAV.eq(L).addClass('current')
    }
}

////////////////////////////////////////////////////////////////
// toTopボタン
////////////////////////////////////////////////////////////////
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