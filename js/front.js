;(function(){
	$(window).load(function(){
		init();
	});

	$("#chooseAnimal li").click(function(){
		$("#chooseAnimal li").not(this).removeClass('selected');
		$(this).toggleClass('selected');
		selectAnimal();
	});

	function init(){
		$("body").addClass('load');
	}

	function selectAnimal(){
		var selected=$(".selected");
		var myFunc="setAnimal("+($("#chooseAnimal li").index(selected)+1)+");";
		$("#chooseBtn").attr("onclick",myFunc);
	}
})();
