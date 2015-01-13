$(function() {
    var 
    memberId3 = $( "#memberId3" ),
    memberTypeId3 = $( "#memberTypeId3" ),
    firstName3 = $( "#firstName3" ),
    lastName3 = $( "#lastName3" ),
    email3 = $( "#email3" ),
    nickname3 = $( "#nickname3" ),
    address3 = $( "#address3" ),
    phone3 = $( "#phone3" ),
    sex3 = $( "#sex3" ),
    description3 = $( "#description3" );
    tips = $( ".validateTips" );
    
    //pass value to controller
    $( "#dialog-form3" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Submit": function() {
          var bValid = true;
          bValid = bValid && checkLength( memberId3, "memberId3", 1, 10 );
          bValid = bValid && checkLength( memberTypeId3, "memberTypeId3", 1, 10 );
          bValid = bValid && checkLength( firstName3, "firstName3", 1, 128 );
          bValid = bValid && checkLength( lastName3, "lastName3", 1, 128 );
          bValid = bValid && checkLength( email3, "email3", 6, 128 );
          bValid = bValid && checkLength( nickname3, "nickname3", 1, 128 );
          bValid = bValid && checkLength( address3, "address3", 3, 256 );
          bValid = bValid && checkLength( phone3, "phone3", 3, 128 );
          bValid = bValid && checkLength( sex3, "sex3", 1, 1 );
          bValid = bValid && checkLength( description3, "description3", 4, 1024 );
 
          bValid = bValid && checkRegexp( email3, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "Please ReInput email address, eg. user@example.com" );
          bValid = bValid && validatePhone(phone3,"phone3");
 
          
          if ( bValid ) {
        	  
        	  
        	var desp = description3.val().replace(/\n/g, "\\n"); //  support muti line input 2014.10.21
               
            var jsonObj3 = '{"memberId" : "'+memberId3.val()+'","memberTypeId" : "'+memberTypeId3.val()+'","firstName":"'+firstName3.val()+
            '","lastName":"'+lastName3.val()+'","email":"'+email3.val()+'","nickname":"'+nickname3.val()+'","address":"'+
            address3.val()+'","phone":"'+phone3.val()+'","sex":"'+sex3.val()+'","description": "'+desp+'"}';
            $.ajax({
                url: '/ams/member/'+memberId3.val(),
                type: 'PUT',
                data: jsonObj3,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                error: function(jqXHR, textStatus, errorThrown) {
                	  console.log(textStatus, errorThrown);
                	},
                //change success to complete because success never called!?
                complete: function(msg) {
                	$('#grid').setGridParam({datatype:'json', page:1}).trigger( 'reloadGrid' );
                	//alert("Edit member has been finished. and first name is: "+firstName3.val());
                    
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
      }
    });
 
    $("#dialog-form3").dialog({height:'auto', width:'50%'});
    
    
    $( "#create-user" )
      .button()
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });
  });