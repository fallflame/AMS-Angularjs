


$(function doSomething() {
	// show all available member id in form.
	$.getJSON( "/ams/membertype/", function( data ) {
		  var $select = $('#memberTypeId1');
		  var $select2 = $('#memberTypeId3');
		  var $select3 = $('#memberTypeId2');
		  $.each( data.content, function( key, val ) {
			
		    var $option1 = $("<option/>").attr("value", JSON.stringify(val.memberTypeId)).text(JSON.stringify(val.memberTypeName).replace(/\"/g, ""));
		    $select.append($option1);
		    var $option2 = $("<option/>").attr("value", JSON.stringify(val.memberTypeId)).text(JSON.stringify(val.memberTypeName).replace(/\"/g, ""));
		    $select2.append($option2);
		    var $option3 = $("<option/>").attr("value", JSON.stringify(val.memberTypeId)).text(JSON.stringify(val.memberTypeName).replace(/\"/g, ""));
		    $select3.append($option3);
		  });
		  
		//2014.10.22 function to remove duplication options in select tag;
		  removeDuplication("memberTypeId1") ;
		  removeDuplication("memberTypeId2") ;
		  removeDuplication("memberTypeId3") ;
		  
		});
	
});