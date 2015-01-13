$(function () {
	$("#menudrop").hide();

	$("#membertypeclick").mouseover(function () {
	    $("#menudrop").slideDown('slow');
	});

	$("#wrapper").mouseleave(function () {
	    $("#menudrop").slideUp('slow');
	});


});
