    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    
    function validatePhone(o,tel) {
        var a = o.val();
        var filter = /^[0-9-+]+$/;
        if (filter.test(a)) {
            return true;
        }
        else {
        	o.addClass( "ui-state-error" );
        	updateTips( "Telephone format is invalid, Please ReInput." );
            return false;
        }
    }
    
    
    function isNotEmpty(o) {
        if (o.length!=0) return true;
        else {
        	//alert("Please pick up an ID.");
        	o.addClass( "ui-state-error" );
        	updateTips( "Pick up an ID" );//problem here
        	return false;
        }
    }
    
    
    
	  //2014.10.22 function to remove duplication options in select tag;
    function removeDuplication(o) {
	  var usedNames = {};
	  $("select[name='"+o+"'] > option").each(function () {
	      if(usedNames[this.text]) {
	          $(this).remove();
	      } else {
	          usedNames[this.text] = this.value;
	      }
	  });
	  
    }
    
    
    
    
    
    