/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// location.js
//
/////////////////////////////////////////////////////////////////////////////////////////////////////


// $(function(){

//   $("#nav-location-sp li").click(function(){
//     var li_num = $("#nav-location-sp li").index($(this));
    
//     if(li_num == 0){
//       if(!$("#nav-location-sp").hasClass('cu-map')){
//         $("#nav-location-sp").removeClass('cu-access');
//         $("#nav-location-sp").addClass('cu-map');
       
//         $(".box-show").removeClass('box-show');
//         $(".column-r").eq(li_num).addClass('box-show')

//       }
//     }else if(li_num == 1){
//       if(!$("#nav-location-sp").hasClass('cu-access')){
//         $("#nav-location-sp").removeClass('cu-map');
//         $("#nav-location-sp").addClass('cu-access');

//         $(".box-show").removeClass('box-show');
//         $(".column-r").eq(li_num).addClass('box-show')

//       }
//     }
//   });
// });


$(function(){

initialize();

function initialize() {
  //緯度・経度
  var latitude = $('#box-map').data('latitude')
  var longitude = $('#box-map').data('longitude')
  

  // (latitude-0.000200, longitude)
  // (latitude-0.000325, longitude)
  // var myLatlng = new google.maps.LatLng(35.663575, 139.711761);//35.663775, 139.711761
  // var myLatlng2 = new google.maps.LatLng(35.663450, 139.711761);
  var myLatlng = new google.maps.LatLng(latitude-0.000000, longitude)
  var myLatlng2 = new google.maps.LatLng(latitude-0.000000, longitude)

  var myOptions = {
    zoom: 17,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
  	},
  	panControl: false,
    // zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  };

  // canvas
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  // maker
    var marker = new google.maps.Marker({
    position: myLatlng2, 
    map: map,
    icon: "/img/common/pin.png"
  }); 
  // if($("#main").hasClass('amoem')){
  //   var marker = new google.maps.Marker({
  //     position: myLatlng2, 
  //     map: map,

  //     icon: new google.maps.MarkerImage(
  //       '/img/salon/ico-amoem.png',
  //       new google.maps.Size(76,89), // size
  //       new google.maps.Point(0,0),  // origin
  //       new google.maps.Point(28,28) // anchor
  //     )
  //   }); 
  // } else {
  //   var marker = new google.maps.Marker({
  //     position: myLatlng2, 
  //     map: map,
  //     icon: new google.maps.MarkerImage(
  //       '/img/salon/ico-naila.png',
  //       new google.maps.Size(76,89), // size
  //       new google.maps.Point(0,0),  // origin
  //       new google.maps.Point(28,28) // anchor
  //     )
  //   }); 
  // }

  
  var styleArray = [
  {
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "stylers": [
      { "saturation": -100 },
      { "lightness": 48 }
    ]
  }
];

  var styleArray2 = [
  {
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" }
    ]
  },{
    "stylers": [
      { "saturation": -100 },
      { "lightness": 48 }
    ]
  }
];

	map.setOptions({ styles: styleArray });
  
	$("#map_canvas").hover(function(){
		map.setOptions({ styles: styleArray2 });
	},function(){
		map.setOptions({ styles: styleArray });
	});

  $('#map_canvas').on('touchstart', function() {
    map.setOptions({ styles: styleArray2 });
  });
  $('#map_canvas').on('touchend', function() {
    map.setOptions({ styles: styleArray });
  });




}
	
});

