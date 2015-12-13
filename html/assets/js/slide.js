
////////////////////////////////////////////////////////////////
// BASE VARIABLE
////////////////////////////////////////////////////////////////

var WIN = $(window)
var WINW = WIN.width()
var WINH = WIN.height()

var PIC_WRAP = $('.slide_wrap')
var PIC = $('.slide_wrap ul.pic li')
var PIC_LEN = $('.slide_wrap ul.pic li').length
var ARROW = $('#slide .arr')
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

var SLIDE_SPEED = 500 // スライドする速度
var AUTOSLIDE_TIME = 6500 // 自動スライドの間隔
var SLIDE_EASING = 'easeInOutSine' // スライドのeasing
var FRICK_Latest = 600 // フリック時の最遅時間
var FRICK_SPEED = 0.8 // フリックを時のの加速（小さいほど速くなる）



////////////////////////////////////////////////////////////////
// LOAD / RESIZE
////////////////////////////////////////////////////////////////

WIN.load(function() {
    // PIC_WRAP.height(PIC.eq(0).find('img').height())
    for (var i = 0; i < PIC_LEN; i++) {
        CTRL_WRAP.append(CTRL_IN)
    }
    CTRL = $('#slide ul.ctrl li')
    if(PIC_LEN==1){
        PIC.eq(0).addClass('active')
        $(".arr_l").remove()
        $(".arr_r").remove()
        $(".ctrl").css('opacity',0)
    }else if(PIC_LEN==2){
        // var clone=PIC.clone()
        //  $(".slide_wrap ul.pic").append(clone)
        //  CTRL.eq(2).remove();
        //  CTRL.eq(3).remove();
         SLIDE_CLASS()
    }else{
        SLIDE_CLASS()
    }
   
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
    // PIC_WRAP.height(PIC.eq(0).find('img').height())
});

////////////////////////////////////////////////////////////////
// SLIDE_CLASS
////////////////////////////////////////////////////////////////

function SLIDE_CLASS(){
    $('.active').removeClass('active')
    $('.before').removeClass('before')
    $('.after').removeClass('after')
    PIC.eq(PIC_INDEX).addClass('active')
    if(PIC_LEN==2){
         CTRL.eq(PIC_INDEX).addClass('active')
    }else{
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
        if(PIC_LEN==2){
            PIC_INDEX = $('.slide_wrap ul.pic li').index($('.slide_wrap ul.pic li.active'))
            PIC.eq(0).stop(false, false).animate({'left':'-100%'},SLIDE_SPEED,SLIDE_EASING)
            PIC.eq(1).stop(false, false).animate({'left':'0%'},SLIDE_SPEED,SLIDE_EASING)
        }
        BEFORE.stop(false, false).animate({'left':'-100%'},SLIDE_SPEED,SLIDE_EASING)
    } else {
        AFTER.stop(false, false).animate({'left':'100%'},SLIDE_SPEED,SLIDE_EASING)
         if(PIC_LEN==2){
            PIC_INDEX = $('.slide_wrap ul.pic li').index($('.slide_wrap ul.pic li.active'))
            PIC.eq(1).stop(false, false).animate({'left':'100%'},SLIDE_SPEED,SLIDE_EASING)
            PIC.eq(0).stop(false, false).animate({'left':'0%'},SLIDE_SPEED,SLIDE_EASING)
        }
    }
    ACTIVE.stop(false, false).animate({'left':'0'},SLIDE_SPEED,SLIDE_EASING,function(){
        SLIDE_SET()
    })  
}

////////////////////////////////////////////////////////////////
// SLIDE_SET
////////////////////////////////////////////////////////////////

function SLIDE_SET(){
    PIC_INDEX = $('.slide_wrap ul.pic li').index($('.slide_wrap ul.pic li.active'))
    CTRL.eq(PIC_INDEX).addClass('active')
    console.log(PIC_INDEX);
  if(PIC_LEN==2){
    if(PIC_INDEX==1){
        PIC.eq(0).css({'left':'-100%'})
        PIC.eq(1).css({'left':'0%'})
    }else if(PIC_INDEX==0){
        PIC.eq(0).css({'left':'0%'})
        PIC.eq(1).css({'left':'100%'})
    }    
  }else{
    for (var i = 0; i < PIC_LEN; i++) {
       if(i < PIC_INDEX){
            PIC.eq(i).css({'left':'-100%'})
       } else if(i > PIC_INDEX){
            PIC.eq(i).css({'left':'100%'})
       } else {
            PIC.eq(i).css({'left':'0'})
       }
    }
    if(PIC_INDEX == 0){
        PIC.eq(PIC_LEN-1).css({'left':'-100%'})
    } else  if(PIC_INDEX == PIC_LEN-1){
        PIC.eq(0).css({'left':'100%'})
    }
}

    

    CLICK_FLG = true
    clearTimeout(AUTOTIMER)

    AUTOTIMER = setTimeout(function(){
        CLICK_FLG = false
        PIC_INDEX++
        if(PIC_INDEX == PIC_LEN){
            PIC_INDEX = 0
        }
        NEXT_FLG = true
        SLIDE_CLASS()
    },AUTOSLIDE_TIME);
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
    CTRL.eq(PIC_INDEX).addClass('active')
    ACTIVE = $('.slide_wrap ul.pic li.active')
    OLD = $('.slide_wrap ul.pic li.old_active')
    if(NEXT_FLG == true){
        if(OLD_INDEX == 0 && PIC_INDEX == PIC_LEN-1){
            OLD.stop(false, false).animate({'left':'100%'},SLIDE_SPEED,SLIDE_EASING)
        } else {
            OLD.stop(false, false).animate({'left':'-100%'},SLIDE_SPEED,SLIDE_EASING)
        }
        
    } else {
        if(PIC_INDEX == 0 && OLD_INDEX == PIC_LEN-1){
            OLD.stop(false, false).animate({'left':'-100%'},SLIDE_SPEED,SLIDE_EASING)
        } else {
            OLD.stop(false, false).animate({'left':'100%'},SLIDE_SPEED,SLIDE_EASING)
        }
    }
    ACTIVE.stop(false, false).animate({'left':'0'},SLIDE_SPEED,SLIDE_EASING,function(){
        SLIDE_SET()
    })
}

////////////////////////////////////////////////////////////////
// Flick
////////////////////////////////////////////////////////////////

var startX;
var startY;
var diffX;
var diffY;
var THRESHOLD = 50;
var winpoint
var startTime;
var move_time = 0;
var spd
var now
var diffTime
var BEFORE_LEFT
var AFTER_LEFT
var PIC_W

PIC.on("touchstart touchmove touchend", touchHandler);
function touchHandler(e) {
  var touch = e.originalEvent.touches[0];
  if(CLICK_FLG == true){
      if (e.type == "touchstart") {

        PIC_INDEX = $('.slide_wrap ul.pic li').index($(this))
        PIC_W = PIC.width()
        winpoint = PIC_W / 3
        clearTimeout(AUTOTIMER) // AUTO解除
        FLICK_FLG = true // FLICK_FLGをtrue
        SLIDE_CLASS()
        AFTER_LEFT = AFTER.position().left
        BEFORE_LEFT = BEFORE.position().left
        startX = touch.pageX;
        startY = touch.pageY;
        diffTime = 0
        startTime = +new Date();
      } else if (e.type == "touchmove") {
        e.preventDefault();
        diffX =  touch.pageX - startX ;
        diffY =  touch.pageY - startY ;
        if(PIC_W > Math.abs(diffX)){
            if(THRESHOLD < diffX ){
                ACTIVE.css({'left':diffX})
                BEFORE.css({'left':BEFORE_LEFT+diffX})
            } else if(diffX < -THRESHOLD){
                ACTIVE.css({'left':diffX})
                AFTER.css({'left':AFTER_LEFT+diffX})
            }
        }
      } else if (e.type == "touchend") {
        CLICK_FLG = false
        now = +new Date(); // 現在時間
        diffTime = now - startTime; // touchstartからの経過時間
        spd = Math.abs((WINW-diffX)/(diffX/diffTime))
        if(spd > FRICK_Latest){
            spd = FRICK_Latest
        } else {
            spd = spd * FRICK_SPEED
        }
        if(diffX > winpoint || -diffX > winpoint ){
          if (diffX > THRESHOLD) {
            // PREV処理
            BEFORE.stop(false, false).animate({'left':'0'},spd,SLIDE_EASING).removeClass('before').addClass('active')
            ACTIVE.stop(false, false).animate({'left':'100%'},spd,SLIDE_EASING,function(){
                FLICK_FLG = false
                SLIDE_SET()
            }).removeClass('active')
          } else if (diffX < -THRESHOLD) {
            // NEXT処理
            AFTER.stop(false, false).animate({'left':'0'},spd,SLIDE_EASING).removeClass('after').addClass('active')
            ACTIVE.stop(false, false).animate({'left':'-100%'},spd,SLIDE_EASING,function(){
                FLICK_FLG = false
                SLIDE_SET()
            }).removeClass('active')
          }
        } else {
            if (diffX > THRESHOLD) {
                BEFORE.stop(false, false).animate({'left':'-100%'},spd,SLIDE_EASING)
            } else if (diffX < -THRESHOLD) {
                AFTER.stop(false, false).animate({'left':'100%'},spd,SLIDE_EASING)
            }
            ACTIVE.stop(false, false).animate({'left':'0'},spd,SLIDE_EASING,function(){
                FLICK_FLG = false
                SLIDE_SET()
            })
        }
        diffX = 0;
        diffY = 0;
        diffTime = 0
      }
    }
}

