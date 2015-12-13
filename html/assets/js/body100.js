/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// body100.js
//
// DATE   : 2015.10.16
// UPDATE : 2015.10.16
// DESC   : bodyがheight100%以下になりそうなページに適用
// LIB    : jQuery(v1.9.1)
//
/////////////////////////////////////////////////////////////////////////////////////////////////////



$(window).load(function(){
    var winH=$(window).height();
    var bodyH=$("body").innerHeight()-84;
    var contentsH=$("#main").height();//CHANGE HERE
    if(winH>bodyH){
        var newContentsH=(winH-bodyH)+contentsH;
        $("#main").height(newContentsH);
    }
});
