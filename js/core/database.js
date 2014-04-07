var db;
var dbExists = false; //could set it to true if i know the particular database exists. <- for test purposes only.

///////////////////////// BUild and open Database /////////////////////

//checks to see whether the device is ready to begin handling database transactions - called from th ebotom of each page that requires database access.

function openDB()
{
	db = window.openDatabase("niceday", "1.0", "niceday DB", 1000000);
	//alert("database open");
}

/////////////////  HANDLE INITIAL CONSTRUCTION AND IMPLEMENTATION OF TABLES //////////////

function populateDB(tx)
{
	//drop the db (maybe wont use this for testing, and will try to bypass it later)
	//tx.executeSql('DROP TABLE IF EXISTS' + databaseName);
	
	//prep the request to the db
	var sqlData = "CREATE TABLE IF NOT EXISTS "+ tbName +" (" + tbVals + ")"; //LATER MAKE IT SO THE TABLE NAME CAN BE INTERCHANGED.
	//alert(sqlData);
	//excecute request.
	tx.executeSql(sqlData);
	
	//alert("table created");
	dbexists = true;
}

//// ERROR HANDLING /////////////////

//produces an error and error code if a problem occurs
function errorCB(err)
{
    alert("Error processing SQL: "+err.code);
}

/////// template for INSERTING INTO DATABASE /////

function buildInsert(tableName , rowData)
{
	//build the database if it needed.
	//alert("build insert active");
	openDB();
	
	db.transaction(function(tx)
	{
		var formattedRowName;
		for(var i = 0; i < rowData.length; i++)
		{
			if(i == 0)
			{
				formattedRowName = rowData[i][0] + " " + rowData[i][2];
				//"id INTEGER PRIMARY KEY, "
			} else {
				if(rowData[i][2] == "NA")
				{
					formattedRowName = formattedRowName + ", " + rowData[i][0];
				} else {
					formattedRowName = formattedRowName + ", " + rowData[i][0] + " " + rowData[i][2];
				}
			}
		}
		var sqlData = "CREATE TABLE IF NOT EXISTS "+ tableName +" (" + formattedRowName + ")"; //LATER MAKE IT SO THE TABLE NAME CAN BE INTERCHANGED.
		//alert(sqlData);
		//excecute request.
		tx.executeSql(sqlData);
		//alert("table created");
		dbexists = true;
	}, errorCB, successCB);
	//alert("preparing sql insert string");
	var tableVal;
	var rowName;
	
	for(var r = 0; r < rowData.length; r++)
	{
		if(r == 0)
		{
			rowName = "";
		} else if(r == 1) {
			
			rowName = rowName + rowData[r][0];
		} else {
			rowName = rowName + ", " + rowData[r][0];
		}
	}
	for(var t = 0; t < rowData.length; t++)
	{
		if(t == 0)
		{
			tableVal = "";
		} else if(t == 1) {
			
			if(isString(rowData[t][1]))
			{
				tableVal = tableVal + "'" + rowData[t][1] + "'";
			} else {
				tableVal = tableVal + rowData[t][1];
			}
		} else {
			if(isString(rowData[t][1]))
			{
				tableVal = tableVal + ", '" + rowData[t][1] + "'";
			} else {	
				tableVal = tableVal + ", " + rowData[t][1];
			}
		}
	}
	
	var template = "INSERT INTO "+ tableName +" (" + rowName + ") VALUES(" + tableVal + ")";
	
	
	db.transaction(function(tx)
	{
		//for debugging can be deleted after.
		var txErrMsg = "tx has no value";
		var infoErrMsg = "data has no value";
		
		if(tx == null)
		{
			alert(txErrMsg);
		}
		if(tableVal == null)
		{
			alert(infoErrMsg);
		}
		
		tx.executeSql(template);
	} , errorCB , updateSuccess);
	
}

////// template for RETRIEVEING DATA FROM A DATABASE ////

function buildSelect(columnName , tableName, joined, callBack)
{
	openDB();
	var template = "SELECT " + columnName + " FROM " + tableName + "";
	//alert(template);
	
	db.transaction(function(tx)
	{
		tx.executeSql(template, [], callBack, errorCB);
	}, errorCB);
	
	//template may need to be '' instead of ""
}

function buildSelectWhere(columnName , tableName, joined, callBack, whereSpecifier, whereVal)
{
	//alert("version 2");
	openDB();
	//alert("running query");
	var template = "SELECT " + columnName + " FROM " + tableName + "";
	var joinedTemplate = " WHERE " + whereSpecifier + "=" + whereVal + "";
	var formattedTemplate = "";
	if(joined)
	{
		formattedTemplate = template + joinedTemplate;
		//alert(formattedTemplate);
	} else {
		formattedtemplate = template;
	}
	
	db.transaction(function(tx)
	{
		//alert("querying database");
	tx.executeSql(formattedTemplate, [], callBack, errorCB);
	}, errorCB);
	
	//template may need to be '' instead of ""
}

function buildSelectGreater(columnName , tableName, joined, callBack, whereSpecifier, whereVal)
{
	//alert("version 2");
	openDB();
	//alert("running query");
	var template = "SELECT " + columnName + " FROM " + tableName + "";
	var joinedTemplate = " WHERE " + whereSpecifier + ">" + whereVal + "";
	var formattedTemplate = "";
	//alert(formattedTemplate);
	if(joined)
	{
		formattedTemplate = template + joinedTemplate;
		//alert(formattedTemplate);
	} else {
		formattedtemplate = template;
	}
	db.transaction(function(tx)
	{
		//alert("querying database");
	tx.executeSql(formattedTemplate, [], callBack, errorCB);
	}, errorCB);
	
	//template may need to be '' instead of ""
}

function buildSelectBetween(tableName, columnName, specifier, data, callBack)
{
	
	var template = "SELECT " + columnName + " FROM " + tableName + " WHERE " + specifier;
	var formattedVals;
	
	for(var i = 0; i < data.length; i++)
	{
		if(i == 0)
		{
			if(isString(data[i]))
			{
				formattedVals = " BETWEEN '" + data[i] + "'";
			} else {
				formattedvals = " BETWEEN " + data[i] + "";
			}
		} else {
			if(i == 1)
			{
				if(isString(data[i]))
				{
					formattedVals = formattedVals + " AND '" + data[i] + "'";
				} else {
					formattedvals = formattedVals + " AND " + data[i] + "";
				}
			} else {
				if(isString(data[i]))
				{
					formattedVals = formattedVals + " AND '" + data[i] + "'";
				} else {
					formattedvals = formattedVals + " AND " + data[i] + "";
				}
			}
		}
	}
	
	var fullTemplate = template + formattedVals;
	if(fullTemplate != null || fullTemplate != "undefined")
	{
		db.transaction(function(tx)
		{
			//alert("retrieving from db");
			tx.executeSql(fullTemplate, [], callBack, errorCB);
		}, errorCB);
	} else {
		//alert("error building query string");
	}
}

function buildDeleteTable(TableName)
{
	var template = "DROP TABLE IF EXISTS " + tableName;
	
	db.transaction(function(tx)
	{
		//alert("deleting db");
		tx.executeSql(template, errorCB);
	}, errorCB);
}

function buildDeleteRow(tableName, WhereValues)
{
	var formattedVals;
	
	for(i = 0; i < WhereValues.length; i++)
	{
		if(i == 0)
		{
			if(isString(WhereValues[i][1]))
			{
				formattedVals = "" + WhereValues[i][0] + "='" + WhereValues[i][1]+"'";
			} else {
				formattedVals = "" + WhereValues[i][0] + "=" + WhereValues[i][1];
			}	
		} else {
			if(isString(WhereValues[i][1]))
			{
				formattedVals = formattedVals + "AND " + WhereValues[i][0] + "='" + WhereValues[i][1]+"'";
			} else {
				formattedVals = formattedVals + "AND " + WhereValues[i][0] + "=" + WhereValues[i][1];
			}
		}
	}
	
	var template = "DELETE FROM " + tableName + " WHERE " + formattedVals; //finish this function off.
	if(tableName != null || formattedVals != null)
	{
		db.transaction(function(tx)
		{
			//for debugging can be deleted after.
			var txErrMsg = "tx has no value";
			var infoErrMsg = "data has no value";
			var templateErrMsg = "template is not formatted into the value";
			
			if(tx == null)
			{
				alert(txErrMsg);
			}
			if(template == null)
			{
				alert(templateErrMsg);
			}
			
			tx.executeSql(template, action, action);
		});
	} else {
		alert("cannot delete values in the database as the query fields are empty");
	}
}

function buildUpdate(tableName, values, whereVal)
{
	//tableName = string, values = 2d array , whereVal = array
	
	
	openDB();
	
	var unpackagedVals;
	var unpackagedWhere;
	for(var i =0; i < values.length; i++)
	{
		if(i == 0)
		{
			if(isString(values[i][1]))
			{
				unpackagedVals = "" + values[i][0] + "='" + values[i][1]+"'";
			} else {
				unpackagedVals = "" + values[i][0] + "=" + values[i][1];
			}
			
		} else {
			if(isString(values[i][1]))
			{
				unpackagedVals = unpackagedVals + ", " + values[i][0] + "='" + values[i][1]+"'";
			} else {
				unpackagedVals = unpackagedVals + ", " + values[i][0] + "=" + values[i][1];
			}
		}
	}
	
	for(var w = 0; w < whereVal.length; w++)
	{
		
		if(w == 0)
		{
			if(isString(whereVal[w][1]))
			{
				
				unpackagedWhere = "" + whereVal[w][0] + "='" + whereVal[w][1] + "'";
			} else {
				
				unpackagedWhere = "" + whereVal[w][0] + "=" + whereVal[w][1];
			}
		} else {
			if(isString(whereVal[w][1]))
			{
				unpackagedWhere = unpackagedWhere + " AND " + whereVal[w][0] + "='" + whereVal[w][1]+"'";
			} else {
				unpackagedWhere = unpackagedWhere + " AND " + whereVal[w][0] + "=" + whereVal[w][1];
			}
		}
	}
	
	var template = "UPDATE " + tableName + " SET "+ unpackagedVals + " WHERE " + unpackagedWhere;
	
	if(template != null)
	{
		db.transaction(function(tx)
		{
			//for debugging can be deleted after.
			var txErrMsg = "tx has no value";
			
			if(tx == null)
			{
				alert(txErrMsg);
			}
			
			tx.executeSql(template, action, action);
		}, action);
	} else {
		//alert("cannot input values into the database as they are empty");
	}
	
}

function isString(val)
{
	var isstring = false;
	
	if(val.substring)
	{
		isstring = true;
	} else {
		isstring = false;
	}
	return isstring;
}

//these are functions are constructed to be app uniqe <- perhaps the library should be able to handle these dynamically at a later date.
//could replaced joined option with name of a possible error/null callback if needed.

function initialSelect(columnName , tableName, joined, callBack)
{
	//alert("version 3");
	openDB();
	//alert("running query");
	var template = "SELECT " + columnName + " FROM " + tableName + "";
	//alert(template);
	
	db.transaction(function(tx)
	{
		//alert("querying database");
	tx.executeSql(template, [], callBack, buildNewUser);
	}, initialError);
	
	//template may need to be '' instead of ""
}

//this may be so that we can make sure that if db returns null, 
function buildSelectBetweenCheck(tableName, columnName, specifier, data, callBack, errorCallBack)
{
	openDB();
	var template = "SELECT " + columnName + " FROM " + tableName + " WHERE " + specifier;
	var formattedVals;
	
	for(var i = 0; i < data.length; i++)
	{
		//alert("building String");
		if(i === 0)
		{
			//("initial part of statement");
			if(isString(data[i]))
			{
				//alert("is Sting");
				formattedVals = " BETWEEN '" + data[i] + "'";
			} else {
				//alert("is number");
				formattedVals = " BETWEEN " + data[i] + "";
			}
			//alert(formattedVals);
		} else {
			//alert("statement part two");
			if(isString(data[i]))
			{
				//alert("is Sting");
				formattedVals = formattedVals + " AND '" + data[i] + "'";
			} else {
				//alert("is number");
				formattedVals = formattedVals + " AND " + data[i] + "";
			}
			//alert(formattedVals);
		}
		if(i >= 2)
		{
			alert("to many elements in data array to parse");
		}
	}
	//alert(formattedVals);
	var fullTemplate = template + formattedVals;
	//alert(fullTemplate);
	if(fullTemplate !== null || fullTemplate != "undefined")
	{
		db.transaction(function(tx)
		{
			tx.executeSql(fullTemplate, [], callBack, errorCallBack);
		}, errorCB);
	} else {
		alert("error building query string");
	}
}

function nullError(err)
{
	alert("the function null error was called suggesting that a null callback was used and there is nothing to worry about");
}