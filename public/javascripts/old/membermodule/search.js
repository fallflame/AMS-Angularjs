	
	
	$(function() {
	
		$("#startSearch").click(function() {
			var memberId = $('#memberId2').val();
			if(memberId.length == 0)
				memberId=0;
			var memberTypeId = $('#memberTypeId2').val();
			if(memberTypeId.length == 0)
				memberTypeId=0;
			var firstName = $('#firstName2').val();
			var lastName = $('#lastName2').val();
			var email = $('#email2').val();
			var nickname = $('#nickname2').val();
			var phone = $('#phone2').val();
			//2014.10.10 clear all fieldset;
			$('#memberId2').val('');
			$('#memberTypeId2').val('');
			$('#firstName2').val('');
			$('#lastName2').val('');
			$('#email2').val('');
			$('#nickname2').val('');
			$('#phone2').val('');
			
			
			
			if(memberId == 0 && memberTypeId == 0 && firstName =="" && lastName == "" && email == "" && nickname == "" && phone == "") {
				
				alert("Please input key word(s) in Search Area");
				$('#grid').setGridParam({datatype:'json', page:1}).trigger( 'reloadGrid' );
				//$('#grid').trigger( 'reloadGrid' );
				
				}
			else{
				
			var URL = 'member';

			jQuery("#grid2").jqGrid({
				
					
					url: URL+'/search/',
		    		postData:{
						'memberId':memberId,
						'memberTypeId':memberTypeId,
						'firstName':firstName,
						'lastName':lastName,
						'email':email,
						'nickname':nickname,
						'phone':phone
						
								},
					datatype: "json",
					mtype:'POST',
					colModel:[
   							{
   								name:'memberId',
   								label: 'Member ID',
   								index: 'memberId',
   								formatter:'integer',
   								width: 80,
   								editable: true,
   								editoptions: {disabled: true, size:5}
   							},
   							{
   								name:'memberTypeId',
   								label: 'Member Type ID',
   								index: 'memberTypeId',
   								formatter:'integer',
   								width: 100,
   								editable: true,
   								editoptions: {required: true, size:5}
   							},
   							{
   								name:'firstName',
   								label: 'First Name',
   								index: 'firstName',
   								width: 100,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'lastName',
   								label: 'Last Name',
   								index: 'lastName',
   								width: 100,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'email',
   								label: 'Email',
   								index: 'email',
   								width: 100,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'nickname',
   								label: 'Nick Name',
   								index: 'nickname',
   								width: 100,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'address',
   								label: 'Address',
   								index: 'address',
   								width: 150,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'phone',
   								label: 'Phone',
   								index: 'phone',
   								width: 100,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'sex',
   								label: 'Sex',
   								index: 'sex',
   								width: 50,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'description',
   								label: 'Description',
   								index: 'descripton',
   								editable: true,
   								width: 100,
   								edittype: 'textarea',
   								editrules: {required: true}
   							}
   						],
   					
    				
    				caption: "Members Search",
    				pager : '#pager',
    				height: 'auto',
    				loadonce: true,
    				jsonReader : {
						root: "content",
			            page: "pageNumber",
			            records: "totalElements",
			            repeatitems: false
					},
					
					
					beforeProcessing: function(data, status, xhr){ // show alert massage if there is no match result.
						
						if(data.content.length == 0){
							alert("No Match!");
							$('#grid').setGridParam({datatype:'json', page:1}).trigger( 'reloadGrid' );
							$('#grid2').jqGrid('GridUnload');//destroy grid2
							
							
						}
						else {

							$('#grid').jqGrid('GridUnload');//destroy grid

							
							
							
						}//end of else

						
						
					},

					
					});
	
			$("#grid2").jqGrid().navGrid('#pager',{edit:false,add:false,del:false,refresh:false,search:false});
			$("#grid2").setGridHeight($(window).height() - 190).trigger('reloadGrid');
			}
			
			

		});
		
		
		
		
		
	});
	
	