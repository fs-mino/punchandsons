/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// cimg.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

jQuery.event.add(window,"load",function(){
   size_set()
});
function size_set(){
	CIMG_INIT()
}


var CIMG_WRAP = $('.cimg_wrap')

function CIMG_INIT(){
	CIMG_WRAP.each(function(){
		var CIMG = $(this).find('img.cimg')
		var CI = new Image();
		CI.src = CIMG.attr('src')
		var CI_W = CI.width
		var CI_H = CI.height
		var CIMG_RATIO = CI_H/CI_W
		var CIMG_W = CIMG.width()
		var CIMG_H = CIMG.height()
		var CIMG_WRAP_W = $(this).width()
		var CIMG_WRAP_H = $(this).height()
		var CIMG_WRAP_RATIO = CIMG_WRAP_H/CIMG_WRAP_W

		if($(this).parent("#Mainpic2").length != 0){
			if(CIMG_RATIO >= CIMG_WRAP_RATIO){
				//縦長
				
				CIMG.css({
					'width':'100%',
					'height':'auto'
				})
				var Difference = CIMG_WRAP_H - CIMG_H

				CIMG.css({
					'left':'0',
					'top' : '0'
				})

			} else {
				//横長
				
				CIMG.css({
					'width':'auto',
					'height':'100%'
				})

				var Difference = CIMG_WRAP_W - CIMG_W

				CIMG.css({
					'top' : '0',
					'left' : Difference/2
				})
			}

		} else {
		//通常
			if(CIMG_RATIO >= CIMG_WRAP_RATIO){
				//縦長
				
				CIMG.css({
					'width':'100%',
					'height':'auto'
				})
				var Difference = CIMG_WRAP_H - CIMG_H

				CIMG.css({
					'left':'0',
					'top' : Difference/2
				})

			} else {
				//横長
				
				CIMG.css({
					'width':'auto',
					'height':'100%'
				})

				var Difference = CIMG_WRAP_W - CIMG_W

				CIMG.css({
					'top':'0',
					'left' : Difference/2
				})
			}
		}

		

	});
}

// var CR = $('.cwrap')
// var CR_LEN = CR.length
// var CR_W,CR_H,CR_RATIO,CI,CI_W,CI_H,CI_RATIO,C_DIFF
// var C_IMG = $('.cwrap img')
// var C_W,C_H

// function CIMG_INIT(){
// 	for (var I = 0; I < CR_LEN; I++) {

// 		CR_W = CR.eq(I).width()
// 		CR_H = CR.eq(I).height()
// 		CI = new Image();
// 		CI.src = CR.eq(I).find('img').attr('src')
// 		CI_W = CI.width
// 		CI_H = CI.height
// 		CR_RATIO = CR_H/CR_W
// 		CI_RATIO = CI_H/CI_W
// 		C_W = $('.cwrap img').eq(I).width()
// 		C_H = $('.cwrap img').eq(I).height()

// 		SET_CIMG(CI_RATIO, CR_RATIO, CR_W,CR_H,CI_W,CI_H,C_W,C_H,I)
// 	}
	
// }

// function SET_CIMG(CI_RATIO, CR_RATIO, CR_W,CR_H,CI_W,CI_H,C_W,C_H,I){
// 	if( CI_RATIO >= CR_RATIO){
// 		C_IMG.eq(I).css({'height':'auto','width':'100%'})
// 		C_DIFF = (CR_H-$('.cwrap img').eq(I).height())/2
// 		C_IMG.eq(I).css({'margin-top':C_DIFF,'margin-left':0})
		
// 	} else {

// 		C_IMG.eq(I).css({'height':'100%','width':'auto'})
// 		C_DIFF = (CR_W-$('.cwrap img').eq(I).width())/2
// 		C_IMG.eq(I).css({'margin-left':C_DIFF,'margin-top':0})
		
// 	}

// }

