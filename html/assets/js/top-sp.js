/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// top.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//  INIT
////////////////////////////////////////////////////////////////
var WIN=$(window)
WIN.ready(function(){

});

WIN.load(function(){
	LAYOUT_SET()
});



WIN.resize(function(){
	LAYOUT_SET()
});

jQuery.event.add(window,"load",function(){
    LAYOUT_SET()
});

var STYLE_TOP
function LAYOUT_SET(){
	// CIMG_INIT()
	$('#Mainpic').height(WINH)
}

WIN.scroll(function(){
	SCROLL = WIN.scrollTop();
});

////////////////////////////////////////////////////////////////
// LATEST NEWS LOAD
////////////////////////////////////////////////////////////////
$(function(){
  var cuUrl=location.href;
  var brandUrl="http://muta.flabo.jp/";
  // var brandUrl="http://www.muta-japan.com/";
  if(cuUrl.match("https")){
    var brandUrl = "https://muta.flabo.jp/";
  }else{
    var brandUrl="http://muta.flabo.jp/";
  }
  function loadContents(){
      $("#load-news").load(brandUrl+"/newsfeed/");
      $("#load-blog").load(brandUrl+"/rss/");
    }
    loadContents();
});




////////////////////////////////////////////////////////////////
// CUT TXT(重いのであまり使わない)
////////////////////////////////////////////////////////////////
jQuery(function($) {
  $('#Blog div.list dl dd p').each(function() {
    var $target = $(this);
     var html = $target.html();
     var $clone = $target.clone();
    $clone
      .css({
        display: 'none',
        position : 'absolute',
        overflow : 'visible'
      })
      .width($target.width())
      .height('auto');
     $target.after($clone); 
    // 指定した高さになるまで、1文字ずつ消去していく
    while((html.length > 0) && ($clone.height() > $target.height())) {
      html = html.substr(0, html.length - 1);
      $clone.html(html + '...');
    } 
    $target.html($clone.html());
    $clone.remove();
  });
});

////////////////////////////////////////////////////////////////
//  NAV FIXED
////////////////////////////////////////////////////////////////
  var $win = $(window);
  var $header = $('header');
  var navfixed=$("#nav-fixed");
  var navtop=$("#nav-top");
  var winW=$win.height();
  var minHeight = winW-77;

$(function(){
 function scroll() {
    if($win.scrollTop() > minHeight) {
      navtop.hide();
      navfixed.show();
    } else {
      navtop.show();
      navfixed.hide();
    }
  }
  $win.scroll(scroll);
  scroll();
});
 
