////////////////////////////////////////////////////////////////
// BASE VARIABLE
////////////////////////////////////////////////////////////////

var WIN = $(window)
var WINW = WIN.width()
var WINH = WIN.height()

var PIC_WRAP = $('.slide_wrap')
var PIC = $('.slide_wrap ul.pic li')
var PIC_LEN = $('.slide_wrap ul.pic li').length
var LOGO = $('#slide ul.slide_logo li')
var ARROW = $('.slide_wrap .arr')
var CTRL_WRAP = $('#slide ul.ctrl')
var CTRL = $('#slide ul.ctrl li')
var CTRL_IN = '<li><a href="javascript:void(0)"></a></li>'
var PIC_INDEX = 0
var OLD_INDEX = 0
var FLICK_FLG = false
var NEXT_FLG = true
var LOAD_FLG = true
var CLICK_FLG = true
var ACTIVE,BEFORE,AFTER,OLD,CTRL_THIS,AUTOTIMER

////////////////////////////////////////////////////////////////
// CUSTOMIZE VARIABLE
////////////////////////////////////////////////////////////////

var TB = 979 // タブレットサイズ（使用してない）
var SP = 479 // スマホサイズ（使用してない）

var SLIDE_SPEED = 800 // スライドする速度
var AUTOSLIDE_TIME = 5500 // 自動スライドの間隔
var SLIDE_EASING = 'easeInOutSine' // スライドのeasing
var FRICK_Latest = 600 // フリック時の最遅時間
var FRICK_SPEED = 0.8 // フリックを時のの加速（小さいほど速くなる）



////////////////////////////////////////////////////////////////
// LOAD / RESIZE
////////////////////////////////////////////////////////////////

WIN.load(function() {
    WINH = WIN.height()
    // PIC_WRAP.height(PIC.eq(0).find('img').height())
    PIC_WRAP.height(WINH)
    // CR.height(PIC_WRAP.height())
    CIMG_INIT()

    for (var i = 0; i < PIC_LEN; i++) {
        CTRL_WRAP.append(CTRL_IN)
    }

    CTRL = $('#slide ul.ctrl li')
    SLIDE_CLASS()
    CTRL.click(function() {
        if(CLICK_FLG == true){
            CLICK_FLG = false
            CTRL_THIS = CTRL.index($(this))
            CTRL_CLICK()
        }
    });
});

WIN.resize(function() {
    WINW = WIN.width()
    WINH = WIN.height()
    PIC_WRAP.height(WINH)
    // CR.height(PIC_WRAP.height())
    CIMG_INIT()
});

////////////////////////////////////////////////////////////////
// SLIDE_CLASS
////////////////////////////////////////////////////////////////

function SLIDE_CLASS(){
    $('.active').removeClass('active')
    $('.before').removeClass('before')
    $('.after').removeClass('after')

    PIC.eq(PIC_INDEX).addClass('active')
    LOGO.eq(PIC_INDEX).addClass('active')

    if(PIC_INDEX == 0){
        PIC.eq(PIC_LEN-1).addClass('before')
        PIC.eq(PIC_INDEX+1).addClass('after')
    } else if(PIC_INDEX == PIC_LEN-1) {
        PIC.eq(PIC_INDEX-1).addClass('before')
        PIC.eq(0).addClass('after')
    } else {
        PIC.eq(PIC_INDEX-1).addClass('before')
        PIC.eq(PIC_INDEX+1).addClass('after')
    }

    ACTIVE = $('.slide_wrap ul.pic li.active')
    BEFORE = $('.slide_wrap ul.pic li.before')
    AFTER = $('.slide_wrap ul.pic li.after')

    if(LOAD_FLG == false){
        if(FLICK_FLG == false){
            SLIDE_IMG()
        }
    } else {
        LOAD_FLG = false
        SLIDE_SET()
    }
}

////////////////////////////////////////////////////////////////
// SLIDE
////////////////////////////////////////////////////////////////

function SLIDE_IMG(){
    if(NEXT_FLG == true){
        BEFORE.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
    } else {
        AFTER.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
    }
    ACTIVE.stop(false, false).animate({'opacity':'1'},SLIDE_SPEED,SLIDE_EASING,function(){
        SLIDE_SET()
    })  
}

////////////////////////////////////////////////////////////////
// SLIDE_SET
////////////////////////////////////////////////////////////////

function SLIDE_SET(){
    PIC_INDEX = $('.slide_wrap ul.pic li').index($('.slide_wrap ul.pic li.active'))
    CTRL.eq(PIC_INDEX).addClass('active')

    for (var i = 0; i < PIC_LEN; i++) {
       if(i < PIC_INDEX){
            PIC.eq(i).css({'opacity':'0'})
       } else if(i > PIC_INDEX){
            PIC.eq(i).css({'opacity':'0'})
       } else {
            PIC.eq(i).css({'opacity':'1'})
       }
    }

    if(PIC_INDEX == 0){
        PIC.eq(PIC_LEN-1).css({'opacity':'0'})
    } else  if(PIC_INDEX == PIC_LEN-1){
        PIC.eq(0).css({'opacity':'0'})
    }

    CLICK_FLG = true
    clearTimeout(AUTOTIMER)

   if(LOAD_FLG == false){
        AUTOTIMER = setTimeout(function(){
            CLICK_FLG = false
            PIC_INDEX++
            if(PIC_INDEX == PIC_LEN){
                PIC_INDEX = 0
            }
            NEXT_FLG = true
            SLIDE_CLASS()
        },AUTOSLIDE_TIME);
    } else {
        LOAD_FLG = false
        AUTOTIMER = setTimeout(function(){
            CLICK_FLG = false
            PIC_INDEX++
            if(PIC_INDEX == PIC_LEN){
                PIC_INDEX = 0
            }
            NEXT_FLG = true
            SLIDE_CLASS()
        },6000);
    }
}

////////////////////////////////////////////////////////////////
// ARROW　◀︎ | ▶︎
////////////////////////////////////////////////////////////////

ARROW.click(function() {
    if(CLICK_FLG == true){
        CLICK_FLG = false
        if($(this).hasClass('arr_l')){
            // PREV処理
            PIC_INDEX--
            if(PIC_INDEX < 0){
                PIC_INDEX = PIC_LEN-1
            }
            NEXT_FLG = false
        } else {
            // NEXT処理
            PIC_INDEX++
            if(PIC_INDEX == PIC_LEN){
                PIC_INDEX = 0
            }
            NEXT_FLG = true
        }
        FLICK_FLG = false
        SLIDE_CLASS()
    }
});

////////////////////////////////////////////////////////////////
// CTRL　● ○ ○ ○ ○ ○
////////////////////////////////////////////////////////////////

function CTRL_CLICK(){
    OLD_INDEX = PIC_INDEX
    if(CTRL_THIS < PIC_INDEX){
        // PREV処理
        PIC_INDEX = CTRL_THIS
        NEXT_FLG = false
    } else if(CTRL_THIS > PIC_INDEX){
        // NEXT処理
        PIC_INDEX = CTRL_THIS
        NEXT_FLG = true
    }

    FLICK_FLG = false
    SLIDE_IMG_CTRL()
}

function SLIDE_IMG_CTRL(){
    $('.old_active').removeClass('old_active')
    $('.active').addClass('old_active').removeClass('active')
    PIC.eq(PIC_INDEX).addClass('active')
    LOGO.eq(PIC_INDEX).addClass('active')
    CTRL.eq(PIC_INDEX).addClass('active')
    ACTIVE = $('.slide_wrap ul.pic li.active')
    OLD = $('.slide_wrap ul.pic li.old_active')
    if(NEXT_FLG == true){
        if(OLD_INDEX == 0 && PIC_INDEX == PIC_LEN-1){
            OLD.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
        } else {
            OLD.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
        }
        
    } else {
        if(PIC_INDEX == 0 && OLD_INDEX == PIC_LEN-1){
            OLD.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
        } else {
            OLD.stop(false, false).animate({'opacity':'0'},SLIDE_SPEED,SLIDE_EASING)
        }
    }
    ACTIVE.stop(false, false).animate({'opacity':'1'},SLIDE_SPEED,SLIDE_EASING,function(){
        SLIDE_SET()
    })
}
