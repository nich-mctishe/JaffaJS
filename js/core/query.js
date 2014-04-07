///CLASS FOR HANDLING DATABASE QUERIES.

//////////////////////SUCCESSFUL OPERATIONS AND THEIR CALLBACKS ARE HANDLES HERE /////////////////////////

//reports uscess, but can also be made to perform other operations - cant work out if this is potentially by query or from database...
function successCB() 
{
    //alert("success!");
}

//reports a successful update of db infor if needed - perhaps a query.
function updateSuccess()
{
	//alert("Succesfully inserted the new data into the database");
	alert("done!");
}

function deleteSuccess()
{
	alert("sucessfully deleted entry");
}
////////////// END OF SUCCESS CALLBACKS //////////////////////

/////////////// MAKE TIMESTAMP - THIS CAN BE CALLED AND ADDED FOR DEBUGGING TO MAKE A PAGE UNIQUE ////////////////

function getStamp()
{
	var ts = Math.round((new Date()).getTime() / 1000);
	return ts;
}
function setStamp()
{	
	var timeStamp = getStamp();
	document.location.pathname += '#' + timeStamp;
}

//////////// END TIMESTAMP ///////////////////////
function prepData(inputVal)
{
	var inputData = document.getElementById(inputVal).value;
	//alert("input value is " + inputData);
	
	return inputData;
}

///////////////// make a fucntion here to simply handle the query call. ////////////

function execute()
{
	var data = prepData("numberInput");
	
	buildInsert("demo" , "data" , data);
}

///// to handke the retrieve call //////
///SAMPLE RETRIEVE STATMENTS //////////
function retrieve()
{
	alert("selecting request values");
	buildSelect("*" , "demo" , false , querySuccess);
}

function runQuery()
{
	alert("running query");
	retrieve();
	
}


//values for the where value have no '' if its a number and '' if it is a string.

////returning successful result query and dumping it into a function to be handled at the query end rather thaan the database end ///////////
function querySuccess(tx, results) {
	alert("query was successful - formulating data");
	var len = results.rows.length;
	alert("Demo table: " + len + " rows found.");
	if(len == 0 || db == null)
	{
		alert("db empty or null");
		$("#numbersList").html("<li> There are no numbers to display on this list, please insert some! </li>");
		$("#numbersList").listview('refresh');
	}
	else
	{
		//alert("prepping");
		for (var i=0; i<len; i++)
		{
			//alert("appending numbers");
			$("#numbersList").append("<li> Row = " + i + " Number =  " + results.rows.item(i).data + " </li>");
			$("#numbersList").listview('refresh');
		}
	}
}