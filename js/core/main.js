// JavaScript Document
var months = 
{
	"name":["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December" ],
	"shortName":["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sept" , "Oct" , "Nov" , "Dec" ],
	"amount":[31,28,31,30,31,30,31,31,30,31,30,31],
	"amountLeapYear":[31,29,31,30,31,30,31,31,30,31,30,31]	
}

function formatTime(timeInput)
{
	//turn peices of data into indicidual values
	
	//make sure it has passed well
	if(timeInput != null)
	{
		var toString = Object.prototype.toString;

		isString = function (obj) {
  			return toString.call(obj) == '[object String]';
		}
		
		if(isString(timeInput))
		{
			var rawDate = parseInt(timeInput);
		} else {
		
			var rawDate = timeInput;
		}
		
		//for year number
		var year = new Date(rawDate).getFullYear();
		//for produce the name of the month
		var monthNum = new Date(rawDate).getMonth();
		var month = months.name[monthNum];
		//gives the number of a day
		var dayNumber = new Date(rawDate).getUTCDate();
		//turns the day number into a 3 letter day word.
		var n = new Date(rawDate).toString(); 
		var dayName = n.substr(0,3); 
		
		//package each value into a new array. <---- WILL NEED A MONTH NUMBER RETURN VAL
		var timesArray = new Array(year ,monthNum, month, dayNumber, dayName);
		
	} else {
		alert("time input may be null here is data value " + timeInput);
	}
	
	return timesArray;
}

function convertToString(input)
{
	var toString = Object.prototype.toString;
	var num = input;
	var number;
	isString = function (obj) {
		return toString.call(obj) == '[object String]';
	}
	
	if(isString(num))
	{
		number = Number(num);
	} 
	return number;
}

function runLoad()
{
	alert("loading...");
}


