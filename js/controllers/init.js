// globals for this class.
var centralServerId;
var hasSpawned = false;
var longtitude = 0; //FOR LATER ON TO WORK OUT GEO-LOCATION
var latitude = 0;

function onDeviceReady() 
{
	if(!hasSpawned)
	{
		//call the geo-locator;
		navigator.geolocation.getCurrentPosition(function(position)
		{
			alert("call processed");
			longtitude = position.coords.longtitude;
			latitude = position.coords.latitude;
			alert("long = "+ longtitude +", lang = "+ latitude);
		}, function()
		{
			alert("could not capture location, Please make sure your GPS locator is active.");
		} ,{timeout:10000});	
		//alert("checking");
		initialSelect("*" , "genesis" , false, handleInitialCall);
		//alert("checked");
	}
}

function handleInitialCall(tx, results)
{
	var len = results.rows.length;
	if(len == 1)
	{
		//activate info
		var date = results.rows.item(0).date;
		var isActive = results.rows.item(0).isBuilt;
		var givenFromCentralServerId = results.rows.item(0).date;
		
		if(isActive == 0)
		{
			hasSpawned = true;
			//centralServerId = givenFromCentralServerId[0];
			updateCentralServer();
		} else {
			hasSpawned = false;
			alert("Welcome New User, building your app, please stay connected to the internet until this process is complete");
		}
		
	} else {
		hasSpawned = false;
		alert("Welcome New User, building your app, please stay connected to the internet until this process is complete");
	}
	
	return hasSpawned;
}

function buildNewUser()
{
	//get central server connection
	//FOR NOW LETS JUST BYPASS TEH CONNECTION AS LATER IT WILL NEED TO BE HANDLED USING JAVA
	//get date stamp
	var date = new Date().getTime();
	var isBuilt = 0;
	var data = [["id" , 0  , "id INTEGER PRIMARY KEY"],["date" , date , "INT"],["isBuilt" , isBuilt, "INT"]];
	
	//alert(data);
	buildInsert("genesis", data); //plus rows plus data
	//buildInsert(tableName , rowName, tableVal)
}
