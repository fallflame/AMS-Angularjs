
$(function() {
	
	//create vars from form "dialog-form"
    var 
    memberTypeId1 = $( "#memberTypeId1" ),
    firstName1 = $( "#firstName1" ),
    lastName1 = $( "#lastName1" ),
    email1 = $( "#email1" ),
    nickname1 = $( "#nickname1" ),
    address1 = $( "#address1" ),
    phone1 = $( "#phone1" ),
    sex1 = $( "#sex1" ),
    description1 = $( "#description1" );
    tips = $( ".validateTips" );
 
    $("dialog-form").dialog({height:'auto', width:'auto'});
    
    
    $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Create": function() {
          var bValid = true;
          bValid = bValid && checkLength( memberTypeId1, "memberTypeId1", 1, 11 );
          bValid = bValid && checkLength( firstName1, "firstName1", 1, 128 );
          bValid = bValid && checkLength( lastName1, "lastName1", 1, 128 );
          bValid = bValid && checkLength( email1, "email1", 6, 128 );
          bValid = bValid && checkLength( nickname1, "nickname1", 0, 128 );
          bValid = bValid && checkLength( address1, "address1", 2, 256 );
          bValid = bValid && checkLength( phone1, "phone1", 3, 128 );
          bValid = bValid && checkLength( sex1, "sex1", 1, 1 );
          bValid = bValid && checkLength( description1, "description1", 4, 1024 );
 
          bValid = bValid && checkRegexp( email1, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "Please ReInput email address, eg. user@example.com" );
          bValid = bValid && validatePhone(phone1);
          
          if ( bValid ) {
        	//pass all parameters to json format
        	  
        	var desp = description1.val().replace(/\n/g, "\\n"); //  support muti line input 2014.10.21
              
            var jsonObj2 = '{"memberTypeId" : "'+memberTypeId1.val()+'","firstName":"'+firstName1.val()+
            '","lastName":"'+lastName1.val()+'","email":"'+email1.val()+'","nickname":"'+nickname1.val()+'","address":"'+
            address1.val()+'","phone":"'+phone1.val()+'","sex":"'+sex1.val()+'","description": "'+desp+'"}';
            $.ajax({
                url: '/ams/member/',
                type: 'POST',
                data: jsonObj2,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    //alert("New member has been added.");
                    $('#grid').setGridParam({datatype:'json', page:1}).trigger( 'reloadGrid' );
                }
            });
            
            
            $( this ).dialog( "close" );
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
    	  
    	  $('input,textarea','#dialog-form').val('');//2014.10.26 clear prvious data when create new record.
      }
    });
 
    $( "#create-user" )
      .button()
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
        $("#dialog-form").dialog({height:'auto', width:'50%'});
      });
  });