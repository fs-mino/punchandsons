/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// top.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////


;(function(){

  var $pages;

  function urlChangeHandler(){
    var pageid = parseUrl( location.hash );

    $pages
      .detach()
      .filter(".page"+pageid)
      .appendTo("article");
  };

  function parseUrl(url) {
    return url.slice(1) ||1;
  };

  function init() {
    $pages = $("[data-role='page']").detach();
    // pageをDOMから外す
    $(window)
      .on("hashchange", urlChangeHandler)
      .trigger("hashchange");
       // 該当のpageをDOMにつける、load時も発火するようtrigger使う
  };

  init();

})();