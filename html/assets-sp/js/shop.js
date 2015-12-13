var TAB = $('ul.store_nav li a')
var CONTENT_WRAP = $('.content_wrap')
var CONTENT = $('.content_wrap .content')
var CONTENT_INDEX=0;
var TAB_INDEX = 0
var BTNAREA=$(".shop_select_box ul li dl dt")
var BTNAREA_INDEX = 0
var CONTENTAREA_WRAP=$(".content_wrap");
var CONTENTAREA=$(".shop_list .shop_list_wrap");
var CONTENTPREF=$(".shop_list div.active .shop_list_pref");
var BTNPREF=$(" .shop_select_box ul li dl dd")
var BTNPREF_INDEX = 0
var CUPOS=$(".shop_select_box ul").offset().top;

//INITIALIZE
$(window).load(function(){
	$('.content_wrap .content').hide()
	$('.content_wrap .content.active').show()
	TAB.removeClass('active')
	TAB.eq(TAB_INDEX).addClass('active')
	CONTENT.not(CONTENT.eq(TAB_INDEX)).removeClass('active').fadeOut()
	CONTENT.eq(TAB_INDEX).addClass('active')
	$('.shop_select_box ul li dl').removeClass("current");
	$('.content_wrap .content.active .shop_select_box ul li').eq(0).find("dl").addClass("current");
	CONTENT.eq(TAB_INDEX).find(".shop_list_wrap").eq(0).addClass("active show");
	CONTENT_WRAP.height($('.content_wrap .content.active').height()+70)
	$('.content_wrap .content.active').fadeIn()
});

//SHOP&PARTNER SEARCH
TAB.click(function(){
	CONTENT_INDEX = $('ul.store_nav li a').index(this)
	if(TAB.eq(CONTENT_INDEX).hasClass('active')){
		return false;
	} else {
		TAB.removeClass('active')
		$(this).addClass('active')
		CONTENT.not(CONTENT.eq(CONTENT_INDEX)).removeClass('active').fadeOut()
		CONTENT.eq(CONTENT_INDEX).addClass('active')
		CONTENT.eq(CONTENT_INDEX).find(".shop_list_wrap").eq(0).addClass("active show")
		CONTENT_WRAP.height($('.content_wrap .content.active').height())
		$(".content.active .shop_select_box ul li").eq(0).find("dl").addClass('current')
		$('.content_wrap .content.active').fadeIn()
	}
});

//AREA SEARCH
BTNAREA.click(function(){
	var PARENT=$(this).parents(".shop_select_box ul li")
	BTNAREA_INDEX = $(' .shop_select_box ul li').index(PARENT)
	if(BTNAREA.eq(BTNAREA_INDEX).parents("li").hasClass('current')){
		return false;
	} else {
		BTNAREA.parents("dl").removeClass('current')
		$(this).parents("dl").addClass('current')
		AREASEARCH(BTNAREA_INDEX)
	}
})

function AREASEARCH(index){
	CONTENTAREA.not(CONTENTAREA.eq(index)).removeClass('active show').fadeOut()
	CONTENTAREA.eq(index).addClass('active')
	CONTENTAREA_WRAP.height($('.content_wrap .content.active').height()+53)
	CONTENTAREA.eq(index).delay(200).queue(function() {
	    $(this).addClass('show').dequeue();
	});
}

//PREFECTURE SEARCH
BTNPREF.click(function(){
	
	var CUAREA=$(this).parents("dl")
	var ua = navigator.userAgent;
	var body = 'body';

	if(!CUAREA.hasClass("current")){
		BTNAREA.parents("dl").removeClass('current')
		CUAREA.addClass('current')
	}

	//display area
	var PARENT=$(".shop_select_box ul li dl.current").parents(".shop_select_box ul li");
	BTNAREA_INDEX = $(' .shop_select_box ul li').index(PARENT)
	AREASEARCH(BTNAREA_INDEX)
	var CONTENTPREF=$(".shop_list div.active .shop_list_pref");

	//prefecture anchor
	BTNPREF_INDEX = $('.shop_select_box ul li dl.current dd').index(this)
	if($(".content_wrap").height()<800){
		//when offset is larger than win height
		var TARGET=CONTENTPREF.eq(BTNPREF_INDEX).offset().top;
	}else{
		var TARGET=CONTENTPREF.eq(BTNPREF_INDEX).offset().top-89-20;
	}
	
	if(ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Firefox/)){
	  body = 'html';
	}
	$(body).animate({scrollTop:TARGET} , 'slow' );
})

