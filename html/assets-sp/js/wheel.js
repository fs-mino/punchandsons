var TEXT_SECTION = $('.txt_section')
var HASH_TAG = ["#Greeting_","#About_","#Tamba_","#Exhibitor_","#Contact_"]


function HASH_CHECK(){
	for (var H = 0; H < 5; H++) {
		if(location.hash == HASH_TAG[H]){
			var HASH_INDEX = H;
			
		}
	}
	
	ANCHOR_INDEX = HASH_INDEX
	ANCHOR_BTN.removeClass('current')
	ANCHOR_BTN.eq(ANCHOR_INDEX).addClass('current')
	
	SECTION_ANCHOR_MOVE(ANCHOR_INDEX)

	BODY.addClass('load load2')
}

WIN.ready(function(){

});

WIN.load(function(){
	MEDIA_CHECK()
	SECTION_INIT()

	if(location.hash != ""){
		HASH_CHECK()
	} else {
		
		BODY.addClass('load')
	}
	
});


WIN.resize(function(){
	SECTION_INIT()
});

WIN.scroll(function(){
	SCROLL = WIN.scrollTop();
	
});

$('html').keyup(function(e){
	// if(WHEEL_FLG == true){
	// 	WHEEL_FLG = false
	switch(e.which){
		case 38: // Key[↑]
		WHEEL_GRAND_TOTAL -= 100;
		break;
		case 40: // Key[↓]
		WHEEL_GRAND_TOTAL += 200;
		break;
		case 13: // Key[Enter]
		return false;
		break;
	}
	WHEEL_MOVE(WHEEL_GRAND_TOTAL)
});

var WIN_WHEEL
var WHEEL_GRAND_TOTAL = 0
var WHEEL_FLG = true
var WHEEL_CONTENT = $('#wheel')
var WHEEL_CONTENT_H

var WHEEL_SECTION = $('#wheel section')
var WHEEL_SECTION_H = new Array();
var WHEEL_SECTION_T = new Array();
var WHEEL_SECTION_H_COUNT = 0
var VERTICAL_AREA = $('.vertical_area')


function SECTION_INIT(){
	WINW = WIN.width()
	WINH = WIN.height()
	WHEEL_SECTION_H = new Array();
	WHEEL_SECTION_T = new Array();
	WHEEL_SECTION_H_COUNT = 0
	

	TEXT_SECTION.each(function(){
		if(TEXT_SECTION.index(this) == 0){
			$(this).height($(this).find('.vertical_area').height()*3)
			$(this).find('.vertical_area').css({'top':$(this).find('.vertical_area').height()-300})
		} else {
			$(this).height($(this).find('.vertical_area').height()*3)
			$(this).find('.vertical_area').css({'top':$(this).find('.vertical_area').height()+200})
		}
		
		
	});

	WHEEL_CONTENT_H = WHEEL_CONTENT.height()

	for (var i = 0; i < WHEEL_SECTION.length; i++) {
		WHEEL_SECTION_H.push(WHEEL_SECTION.eq(i).height())

		if(i > 0){
			WHEEL_SECTION_H_COUNT+=WHEEL_SECTION.eq(i-1).height()
		}
		WHEEL_SECTION_T.push(WHEEL_SECTION_H_COUNT)
	}

	WHEEL_CONTENT_H = WHEEL_CONTENT.height()
	// console.log(WHEEL_SECTION_H)
	// alert(WHEEL_SECTION_T[4])
	// console.log(WHEEL_SECTION_T)
	// console.log(WHEEL_CONTENT_H)

}

// $(document).mousewheel(onMouseWheel);

// function onMouseWheel(eo, delta, deltaX, deltaY){
// 	// console.log(delta)
// 	BODY.removeClass('load2')
// 	if(WHEEL_FLG == true){
// 		WHEEL_FLG = false
// 		WHEEL_GRAND_TOTAL += -deltaY
// 		WHEEL_MOVE(WHEEL_GRAND_TOTAL)

// 	}
// }
var WRAP = $('#wrapAll')


WRAP.mousewheel(function(eo, deltaY) {

	
	// BODY.removeClass('load2')

	// if(OVER_FLG == true){
	// 	eo = KEEP_eo
	// }
	// console.log(eo)

	
	if(WHEEL_FLG == true){
		WHEEL_FLG = false
		// WHEEL_GRAND_TOTAL += -deltaY

		WHEEL_GRAND_TOTAL += -deltaY
		
		// if(WHEEL_GRAND_TOTAL >= WHEEL_CONTENT_H){
		// 	KEEP_eo = eo
		// 	OVER_FLG = true
		// }
		if(WHEEL_GRAND_TOTAL > WHEEL_CONTENT_H){
			WHEEL_GRAND_TOTAL = WHEEL_CONTENT_H-1
		}

		if(WHEEL_GRAND_TOTAL < 0){
			WHEEL_GRAND_TOTAL = 0
		}

		

		WHEEL_MOVE(WHEEL_GRAND_TOTAL)
		
		// return false;
	}

	
});


var SECTION_NUM = 0
var SECTION_NUM_BEFORE = 0


// var SECTION_WHEEL_RATIO_4 = 0
function WHEEL_MOVE(WHEEL_GRAND_TOTAL){
	
	
	if(WHEEL_GRAND_TOTAL > 0){
		$('.bgimg').css({'top':-WINH+'px'})
		// clearTimeout(CircleTime)

		if(WHEEL_GRAND_TOTAL > WHEEL_CONTENT_H){
			WHEEL_GRAND_TOTAL = WHEEL_CONTENT_H
		} else {
			if(WHEEL_GRAND_TOTAL > WHEEL_SECTION_T[4]) {
			SECTION_NUM = 5
			} else if(WHEEL_GRAND_TOTAL > WHEEL_SECTION_T[3]) {
				SECTION_NUM = 4
			} else if(WHEEL_GRAND_TOTAL > WHEEL_SECTION_T[2]) {
				SECTION_NUM = 3
			} else if(WHEEL_GRAND_TOTAL > WHEEL_SECTION_T[1]) {
				SECTION_NUM = 2
			} else {
				SECTION_NUM = 1
			}
			if(SECTION_NUM == 4 || SECTION_NUM == 5){
				SCROLL_ARR.fadeOut()
			} else {
				SCROLL_ARR.fadeIn()
			}

			if(SECTION_NUM == 1 || SECTION_NUM == 2 || SECTION_NUM == 3){
				clearTimeout(CircleTime2)
				if(VERTICAL_AREA.eq(SECTION_NUM-1).offset().top < WINH){
					// VERTICAL_AREA.eq(SECTION_NUM-1).find('.txt,.tit').addClass('active')

					VERTICAL_AREA.eq(SECTION_NUM-1).find('.txt,.tit').css({'opacity':1})

					var VERTICAL_AREA_RATIO = (VERTICAL_AREA.eq(SECTION_NUM-1).offset().top)/WINH
					// if(VERTICAL_AREA_RATIO > 0){
						// console.log(VERTICAL_AREA_RATIO)
						VERTICAL_AREA.eq(SECTION_NUM-1).find('.tit').css({'margin-top':-(VERTICAL_AREA_RATIO*200)+80+'%'})
					// }

					if(VERTICAL_AREA.eq(SECTION_NUM-1).offset().top+VERTICAL_AREA.eq(SECTION_NUM-1).height() < 300){

						// VERTICAL_AREA.eq(SECTION_NUM-1).find('.txt,.tit').removeClass('active')
						VERTICAL_AREA.eq(SECTION_NUM-1).find('.txt,.tit').css({'opacity':0})

					}
				}
			} else if(SECTION_NUM == 4){
				$('.bgimg').css({'margin-top':-(Math.floor(((WHEEL_GRAND_TOTAL-WHEEL_SECTION_T[3])/WHEEL_SECTION_H[3])*100)*0.4)+'%'})
				// console.log(Math.floor(((WHEEL_GRAND_TOTAL-WHEEL_SECTION_T[3])/WHEEL_SECTION_H[3])*100))
			}
		}
	} else {
		WHEEL_GRAND_TOTAL = -1
		$('.bgimg').css({'top':0})
		// movecircle()
		SECTION_NUM = 0
	}

	if(SECTION_NUM_BEFORE != SECTION_NUM){
		SECTION_CHANGE(SECTION_NUM)
	}
	
	SECTION_NUM_BEFORE = SECTION_NUM
	// console.log(WHEEL_GRAND_TOTAL+' / '+WHEEL_CONTENT_H)
	// WHEEL_CONTENT.stop(false,false).animate({'top':-WHEEL_GRAND_TOTAL},1)
	WHEEL_CONTENT.css({'top':-WHEEL_GRAND_TOTAL})



	WHEEL_FLG = true
	// console.log(WHEEL_GRAND_TOTAL+'/'+WHEEL_CONTENT_H+' : '+SECTION_NUM)
}



function SECTION_CHANGE(SECTION_NUM){
	clearTimeout(AUTO_WHEEL_TIMER);

	if(SECTION_NUM == 1 || SECTION_NUM == 2 || SECTION_NUM == 3){
		AUTO_WHEEL()
		BODY.addClass('white')
		// $('.bgimg li').removeClass('active')
		$('.bgimg li').css({'opacity':'0'})
		$('.bgimg li img').css({
			'transform':'scale3d(1.05,1.05,1.05)',
			'-moz-transform':'scale3d(1.05,1.05,1.05)',
			'-webkit-transform':'scale3d(1.05,1.05,1.05)',
			'-ms-transform':'scale3d(1.05,1.05,1.05)',
			'-o-transform':'scale3d(1.05,1.05,1.05)',
		})
		$('.bgimg li').eq(SECTION_NUM-1).css({'opacity':'1'})
		$('.bgimg li').eq(SECTION_NUM-1).find('img').css({
			'transform':'scale3d(1,1,1)',
			'-moz-transform':'scale3d(1,1,1)',
			'-webkit-transform':'scale3d(1,1,1)',
			'-ms-transform':'scale3d(1,1,1)',
			'-o-transform':'scale3d(1,1,1)',
		})
		// $('.bgimg li').eq(SECTION_NUM-1).addClass('active')
	} else {
		BODY.removeClass('white')

	}

	if(SECTION_NUM != 4){
		$('.bgimg').css({'margin-top':0})
	}

	
	if(SECTION_NUM < 6){
		if(SECTION_NUM == 0){
			ANCHOR_BTN.removeClass('current')
		} else {
			ANCHOR_BTN.removeClass('current')
			ANCHOR_BTN.eq(SECTION_NUM-1).addClass('current')
		} 
		
	}
	
	if(WHEEL_FLG == false){
		WRAP.stop(true,false).animate({'opacity':1},1500,'easeInOutSine',function(){
			WHEEL_FLG = true
			FADEOUT_FLG = false
			$('.bgimg ul').stop(false,false).animate({'opacity': '1'},300)
		})
	}
}



var ANCHOR_BTN = $('a.anchor')
var ANCHOR_INDEX
var FADEOUT_FLG = false
ANCHOR_BTN.click(function(){
	if(!$(this).hasClass('current')){
		if(FADEOUT_FLG == false){
			ANCHOR_INDEX = ANCHOR_BTN.index(this)
			ANCHOR_BTN.removeClass('current')
			$(this).addClass('current')
			
			SECTION_ANCHOR_MOVE(ANCHOR_INDEX)
		}
	}
})

var SCROLL_ARR = $('.scroll_arr a')
var NAV_CURRENT_INDEX
SCROLL_ARR.click(function(){
	if(FADEOUT_FLG == false){
		NAV_CURRENT_INDEX = $('a.anchor').index($('a.anchor.current'))
		// console.log(NAV_CURRENT_INDEX)
		if(NAV_CURRENT_INDEX < 0){
			ANCHOR_INDEX = 0
		} else {
			ANCHOR_INDEX = NAV_CURRENT_INDEX+1
			
		}
		SECTION_ANCHOR_MOVE(ANCHOR_INDEX)
	}
})

function SECTION_ANCHOR_MOVE(ANCHOR_INDEX){
	WRAP.stop(true,false).animate({'opacity':0},400,'easeInOutSine',function(){
		FADEOUT_FLG = true
		WHEEL_FLG = false

		if(ANCHOR_INDEX == 0 || ANCHOR_INDEX == 1 || ANCHOR_INDEX == 2){
			if(ANCHOR_INDEX == 0){
				WHEEL_GRAND_TOTAL = WHEEL_SECTION_T[ANCHOR_INDEX]+VERTICAL_AREA.eq(ANCHOR_INDEX).height()+((WINH/3)*2)-300
			} else {
				WHEEL_GRAND_TOTAL = WHEEL_SECTION_T[ANCHOR_INDEX]+VERTICAL_AREA.eq(ANCHOR_INDEX).height()+((WINH/3)*2)
			}
			
		} else {
			WHEEL_GRAND_TOTAL = WHEEL_SECTION_T[ANCHOR_INDEX]+WINH+100
		}
		
		// console.log(WHEEL_GRAND_TOTAL)
		WHEEL_MOVE(WHEEL_GRAND_TOTAL)
	})

	// WHEEL_FLG = false
}

// WIN.click(function(){
// 	AUTO_WHEEL()
// });

var AUTO_WHEEL_TIMER
var AUTO_WHEEL_COUNT = 0
function AUTO_WHEEL(){
	// console.log('aaa')
	AUTO_WHEEL_TIMER = setTimeout(function(){
		WHEEL_GRAND_TOTAL+=1
		AUTO_WHEEL()
		WHEEL_MOVE(WHEEL_GRAND_TOTAL)
    	// SECTION_FLG = true
        // clearTimeout(AUTO_WHEEL_TIMER);
    },30);
}


VERTICAL_AREA.mouseover(function(){
	clearTimeout(AUTO_WHEEL_TIMER);
}).mouseout(function(){
	AUTO_WHEEL()
});

