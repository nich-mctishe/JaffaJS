var db;
var dbExists = false;
history.navigationMode = 'compatible';
var configs = {
	//set up core routes here
	"viewRoute" : "views/",
	"controllerRoute" : "js/controllers/",

	"initPage" : "main.html", //this will be the first page loaded

	//Database
	"DBname" : "",
	"DBversion" : "1.0",
	"DBdisplayName" : "",
	"DBsize" : 10000000,

	//specfiy how your main menus want to be formatted
	"menuType" : "fade", // can choose fade or slide

	"months" : {
		"name":["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December" ],
		"shortName":["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sept" , "Oct" , "Nov" , "Dec" ],
		"amount":[31,28,31,30,31,30,31,31,30,31,30,31],
		"amountLeapYear":[31,29,31,30,31,30,31,31,30,31,30,31]	
	},
};
var DBSeeder = {
	//place each table in here with set up details.
	"alwaysDropTable" : false,
	"tableObj" : {
		"table": [
			{
				"name" : "",
				//make the cols in one long string or as an array to be added later?
				"columnVals" : ""
			},
			{
				"name" : "",
				//make the cols in one long string or as an array to be added later?
				"columnVals" : ""
			}
		]
	},
	seed: function(){
		//run the seed of the database based on the data in the object.
		for (var i = 0; i < this.tableObj.table.length; i++) {
			//cycle through each table obj and run the populateDB function
			database.tbName = this.tableObj.table[i].name;
			database.tbConfigVals = this.tableObj.table[i].columnVals;
			database.populateDB;
		};
	}
};