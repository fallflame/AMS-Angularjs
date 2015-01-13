$(function() {

 
    //popup delete form and pass member id to controller.
    $( "#dialog-form1" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Delete": function() {
        	
        	$( "#dialog-confirm" ).dialog( "open" );
        	
        	
        	
        	

            
            
            $( this ).dialog( "close" );

        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
      }
    });
    
    
    $( "#dialog-confirm" ).dialog({
    	autoOpen: false,
        resizable: false,
        height:140,
        modal: true,
        buttons: {
          "Delete selected Member": function() {
        	  
              var pickedId = $('#dialog-form1').val();
        	  	$.ajax({
                    type: 'DELETE',
                    url: "/ams/member/"+pickedId,
                    success: function(msg) {
                    	$('#grid').setGridParam({datatype:'json', page:1}).trigger( 'reloadGrid' );
                        //alert(msg+"Selected member has been deleted!");
                    }
                    
                  });
        	  
        	  
        	  
        	  
            $( this ).dialog( "close" );

          },
          Cancel: function() {
            $( this ).dialog( "close" );
          }
        }
      });

    
 
    $( "#delete-user" )
      .button()
      .click(function() {
    	  
    	if($('#dialog-form1').text() != ""){ 
    		$( "#dialog-form1" ).dialog( "open" );
    		$("#dialog-form1").dialog({height:'auto', width:'50%'});
        }
    	
    	else alert("Please click a member to delete!");
        
        
        
        
      });

    
    
    
  });





