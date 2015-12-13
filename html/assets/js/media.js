/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// media.js
//
// DATE   : 2015.10.22
// UPDATE : 2015.10.22
// DESC   : mediaの投稿jsonを動的に読み込む
// LIB    : jQuery(v1.9.1)
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

 var countOrder=0;
 var countEnd=10;
 var countLoaded=0;
 var clickCount=0;
 var changeFlag=false;
 var hoverFlag=false;
var BTN_MORE=$(".more");
var LI=$("a.media_link");
var LI_LEN=LI.length;

////////////////////////////////////////////////////////////////
// SHOW MORE
////////////////////////////////////////////////////////////////
 $(window).load(function(){
 	showMore();
 });

$(document).on("click",".more",function(){
	var countLoaded=$("a.media_link.set.show").length;
	callAjax(countLoaded);
});

function showMore(){
	var DELAY=150;
	var cnt=$("a.media_link.set.show").length;
	var max=$("a.media_link.set.show").length+8;
	for(cnt;cnt<max;cnt++){
	$("a.media_link").eq(cnt).addClass('set');
	$("a.media_link").eq(cnt).delay(DELAY).queue(function() {
		$(this).addClass('show').dequeue();
	});
	DELAY=DELAY+150;
	}
    if($("a.media_link").length>=8){
        $("#main").css("height","auto");
      }
}

////////////////////////////////////////////////////////////////
// MEDIA AJAX LOADING
////////////////////////////////////////////////////////////////
function callAjax(count){
$("#button-flag").remove();
$(".more").remove();
  $.ajax({
      type:"GET",
       scriptCharset: 'utf-8',
      url:"../mediaapi/",
      timeout: 3000,//milisec
      data:{
      	'media_offset':count
      },
      success: function(data) {
          $("div.list").append(data);
          if($("#button-flag").length){
         $(".section_wrap").append('<a href="javascript:void(0);" class="more"><span><img src="/img/top/btn-more.png" alt="MORE" width="90" height="90"></span></a>');
          }
      },
      error: function(request, status, err) {
          if(status == "timeout") {
              $("html").html("データをダウンロードできませんでした。");
          }
      },
      complete:function(){
      	showMore();
      }
  });
}

