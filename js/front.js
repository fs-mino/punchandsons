;(function(){
	$(window).load(function(){
		init();
	});

	$("#chooseList li").click(function(){
		$(this).addClass('selected');
		selectAnimal(this);
	});

	function init(){
		$("body").addClass('load');
	}

	function selectAnimal(obj){
		var myFunc="setAnimal("+$("#chooseList li").index(obj)+1+");";
		$("#chooseBtn").attr("onclick",myFunc);
	}
})();
