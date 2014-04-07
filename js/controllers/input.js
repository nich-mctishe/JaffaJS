
function processForm() //STILL TO FINISH
{
	//$("#inputForm").validate();
	
	//retrieve form values
	var isTodaysDate = prepData("flipDate");
	var lengthOfNice = prepData("slideLength");
	var temperature = convertToString(prepData("tempSlider"));
	var selectedDate; //make sure this value is put through a validator to allow it to convirt to the unix stamp properly. i eno one can input a value without the datepcker.
	var SelectedTime;   
	if(isTodaysDate == "off") 
	{
		$(".selectDate").css("display" , "inline");
		selectedDate = prepData("datepicker");
		isTodaysDate = 0;
	}
	if(lengthOfNice == "off") 
	{
		$(".timingsSelector").css("display" , "inline");
		selectedTime = prepData("timeSelector");
	}
	//package up the data
	var date;		//timestamp INT
	var duration;	//0.5 or 1 = FLOAT
	var period;		//"am" , "pm", or "na" STRING
	var temp;		//number INT
	
	//add values to new packages
	if(isTodaysDate == 0 || isTodaysDate == "off")
	{
		//make input date into a timestamp
		date = new Date(selectedDate).getTime();
	} else {
		date = new Date().getTime();
	}
	if(lengthOfNice === 0 || lengthOfNice === "off")
	{
		duration = 0.5;
	} else {
		duration = 1;
	}
	
	if(lengthOfNice == "off") // <--- MAKE SURE THIS VALUE WILL WORK AS THIS.
	{
		if(selectedTime == "on")
		{
			period = "am";
		} else {
			period = "pm";
		}
	} else {
		period = "na";
	}
	//call the geo-locator;
	/*navigator.geolocation.getCurrentPosition(function(position)
	{
		alert("call processed");
		longtitude = position.coords.longtitude;
		latitude = position.coords.latitude;
		alert("long = "+ longtitude +", lang = "+ latitude);
	}, function()
	{
		alert("could not capture location, I would advise you cancel this input, turn on your GPS, and try again");
	} ,{timeout:10000});	
*/
	
	//combine these values into one variable capable of being input into the database
	var data = [
	//always put id first.
	["id" , 0 , "INTEGER PRIMARY KEY"],
	["date" , date , "INT"],
	["duration" , duration, "INT"],
	["period" , period, "NA"],
	["temp" , temperature , "INT"],
	["long" , longtitude , "INT"],
	["lang" , latitude , "INT"]];
	//insert data into db.
	buildInsert("niceday" , data);
	
	//make sure these vals still exist
	loadNewPage('main.html');
}
//will need a function to check the date and redirect to the update page if an aentry for that day is found
function validate() // STILL TO FINISH <-- will have to be a slecet range between statement so that right vals can be called
{
	var date = prepData("flipDate");
	if(date == "off") 
	{
		date = prepData("datepicker");
	} else {
		date = new Date().getTime();
	}
	//make input date into a timestamp
	date = new Date(date).getTime();
	
	//convirt this timestamp into the beginnings of two days.
	var dates = formatTime(date);
	var lowerVal = new Date(dates[0], dates[1], (dates[3])).getTime();
	var upperVal = new Date(dates[0], dates[1], (dates[3]+1)).getTime();
	upperVal = upperVal - 1;
	var data = [lowerVal, upperVal];
	//build a select between statememnt to house them in.
	buildSelectBetweenCheck("niceday", "*", "date", data, entryCheck, processForm);
}

function entryCheck(tx, results)
{
	//get teh date ready for the stamp.
	var len = results.rows.length;
	if(len > 0)
	{
		alert("this entry already exists - redirecting to entry page");
		var thisDate = results.rows.item(0).date;
		isUnique = false;
		//redirect to the updatepage with the date in the url.
		var directString = "update_form.html";
		addToStorage('id' , results.rows.item(0).id);
		loadNewPage(directString);
	} else {
		processForm();
	}
}

function createStamp(dateVal)
{
	var stamp = new Date(dateVal).getTime();
	
	return stamp;
}
function timingsBlur(name, change)
{
	var lengthOfNice = prepData(change);
	if(lengthOfNice == "off") 
	{
		$(".timingsSelector").css("display" , "inline-block");
		$(".timingsSelector").css("width" , "100%");
	} else {
		$(".timingsSelector").css("display" , "none");
	}
}
function initBlur(name, change)
{
	var isTodaysDate = prepData(change);
	if(isTodaysDate == "off") 
	{
		$(".selectDate").css("display" , "inherit");
		$(".selectDate").css("padding-bottom" , "70px");
		$(".timingsSelector").css("width" , "100%");
	} else {
		$(".selectDate").css("display" , "none");
	}
}
function update_range()
{
	var newValue = $('#tempSlider').val();
	if(newValue >= 10)
	{
		$("#slide1_span").html(' '+newValue);
	} else if(newValue <= -9 || newValue > 99) {
		$("#slide1_span").html(newValue);
	}else{
		$("#slide1_span").html(' '+newValue+' ');
	}
}
