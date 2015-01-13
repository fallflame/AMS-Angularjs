			$(function () {
	    		$('fieldset.other').hide();
	    		var flag =0;
	    		$('button[name="other3"]').click(function () {
	        		if(flag==0){
	    			$('fieldset.other').show(); 
	    			$('#grid2').jqGrid('GridUnload');//destroy grid2(search result grid) to make another search action 2014.10.10
	    			flag=1;
    				}else{
	    			$("fieldset.other").hide();
	    			flag=0;
	    			}
	    			

	    			});
	    		
	    		$("#startSearch").click(function () {
	    			if(flag==0){
	    				$('fieldset.other').show(); flag=1;
	    			}else{
	    				$("fieldset.other").hide();flag=0;
    			}
    			

    			});
			});
			
			
			