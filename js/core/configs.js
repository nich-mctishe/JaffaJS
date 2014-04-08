var db;
var dbExists = false;
history.navigationMode = 'compatible';
var configs = {
	//set up core routes here
	"viewRoute" : "views/",
	"controllerRoute" : "js/controllers/",

	//specfiy how your main menus want to be formatted
	"menuType" : "fade", // can choose fade or slide

	"months" : {
		"name":["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December" ],
		"shortName":["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sept" , "Oct" , "Nov" , "Dec" ],
		"amount":[31,28,31,30,31,30,31,31,30,31,30,31],
		"amountLeapYear":[31,29,31,30,31,30,31,31,30,31,30,31]	
	},
};