


$(function doSomething() {
	// show all available member id in form.
	$.getJSON( "/ams/member/", function( data ) {
		  var $select = $('#mySelectID');
		  $.each( data.content, function( key, val ) {
			var $option1 = $("<option/>").attr("value", JSON.stringify(val.memberId)).text(JSON.stringify(val.memberId+" "+val.lastName+" "+val.firstName).replace(/\"/g, ""));
		    $select.append($option1);
		  });
		  
		});
	
});