	
	$(function() {
		
		
		
		$.extend($.jgrid.defaults, {
					datatype: 'json',

					jsonReader : {
						root: "content",
			            page: "pageNumber",
			            records: "totalElements",
			            repeatitems: false
					},
					prmNames: {
						page: "page.page",
						rows: "page.size",
						sort: "page.sort",
						order: "page.sort.dir"
					},
					sortname: 'name',
					sortorder: 'asc',
					height: 'auto',
					viewrecords: true,
					rowNum: '',//display all row in one page 2014-07-11
					rowList: [10, 20, 50, 100],
					altRows: true,
					loadError: function(xhr, status, error) {
						//alert(error);
					}
				});

		
		
		var URL = 'member';
		var options = {
			url: URL,
			editurl: URL,
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
   								width: 80,
   								editable: true,
   								editrules: {required: true}
   							},
   							{
   								name:'lastName',
   								label: 'Last Name',
   								index: 'lastName',
   								width: 80,
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
   								width: 80,
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
   								width: 40,
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
			caption: "Members",
			pager : '#pager',
			height: 'auto',
			loadonce: true,
			//loadonce: false,//if "false" you can reload grid when add or delete BUT the pager is not work. So change to "true" and set".setGridParam({datatype:'json', page:1})." to each add and delete js function in order to relaod grid.
			// after add delete modify, need to reload grid.
			//loadonce: true,
			ondblClickRow: function(id) {
				//alert("2->1: "+id);
				//pre populate data to form.
				var sel_id =jQuery("#grid").jqGrid ('getGridParam', 'selrow');
				var myCellData = jQuery("#grid").jqGrid('getRowData', sel_id, 'MyColName');
				$("input[name='memberId3']").val(myCellData.memberId);
				$("select[name='memberTypeId3']").val(myCellData.memberTypeId);
				$("input[name='firstName3']").val(myCellData.firstName);
				$("input[name='lastName3']").val(myCellData.lastName);
				$("input[name='email3']").val(myCellData.email);
				$("input[name='nickname3']").val(myCellData.nickname);
				$("input[name='address3']").val(myCellData.address);
				$("input[name='phone3']").val(myCellData.phone);
				$("select[name='sex3']").val(myCellData.sex);
				$("textarea[name='description3']").val(myCellData.description);
				$( "#dialog-form3" ).dialog( "open" );
				return false;//disable double click edit function in jqgrid.2014-06-07

			},
			
			onSelectRow: function(id){ 

				      
				      selRowId = jQuery('#grid').jqGrid ('getGridParam', 'selrow'),
				      celValueLastName = jQuery('#grid').jqGrid ('getCell', selRowId, 'lastName');
				      celValueFirstName = jQuery('#grid').jqGrid ('getCell', selRowId, 'firstName');
				      celValueMemberId = jQuery('#grid').jqGrid ('getCell', selRowId, 'memberId');
				      var mid= celValueMemberId;
				      $("#dialog-form1").text(celValueMemberId+": "+celValueLastName+celValueFirstName);
				      //$("#dialog-form1").text(celValueMemberId);
				      //$("#dialog-form1").get(celValueMemberId);
				      $("#dialog-form1").val(mid);
				      
				      
				      
		    }
			
		};

		$("#grid").jqGrid(options).navGrid('#pager',{edit:false,add:false,del:false,refresh:false,search:false});
		
		$("#grid").setGridHeight($(window).height() - 190).trigger('reloadGrid');


	});