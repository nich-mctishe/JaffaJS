///PUT GLOBALS VALS HERE TO BE PASSED THROUGH
//or just push them through a return statement.
var savedDate;
var savedDuration;
var SavedTemp;
/// or pass it using a ? like ?id=(whatever the id will be) <--- serialize . 



function formatForDatePicker(timeInput)
{	
	//first check for string and convirt if neccessary
	
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
	
	var date = $.datepicker.formatDate('mm/dd/yy', new Date(rawDate));
	
	return date;
}

function retrieveFormInfo()
{
	var idVal = pullFromLocalStorage("id");
	
	//buildSelectWhere(columnName , tableName, joined, callBack, whereSpecifier, whereVal)
	buildSelectWhere("*" , "niceDay", true, retrieveQuerySuccess, "id", idVal);
	
}
function retrieveQuerySuccess(tx, results)
{	
	var len = results.rows.length;
	if(len == 1)
	{
		//get date and put it into local storage
		//activate info
		var date = formatForDatePicker(results.rows.item(0).date);
		var temp = convertToString(results.rows.item(0).temp);
		var duration = convertToString(results.rows.item(0).duration);
		var period = results.rows.item(0).period;
		//place rawdate in local storage
		var rawdate = addToStorage("date" , results.rows.item(0).date);
		var newDate = new Date().getTime();
		
		var dayNumber = new Date(newDate).getUTCDate();
		var packageDate = formatTime(results.rows.item(0).date);
		
		$('.timingsSelector').css("display" , "none");
		$('.selectDate').css("display" , "none");
		
		if(packageDate[3] == dayNumber)
		{
			$('#flipDate2').val('on');
		} else {
			$('#flipDate2').val('off');
			$('.selectDate').css("display" , "inline");
			$('#datepicker2').val(date);
		}
		if(duration == 1)
		{
			$('#slideLength2').val('on');
		} else
		{
			$('.timingsSelector').css("display" , "inline");
			$('#slideLength2').val('off');
			if(period == "am")
			{
				$('#timeSelector2').val('on');
			} else {
				$('#timeSelector2').val('off');
			}
		} 
	} else {
		alert("amount of results are too big to fit in this form");
		alert(len);
		
	}
	$("#tempSlide").append('<li><label for="slide1">Temperature (&deg;C)</label><input name="slide1" id="tempSlider" value="'+ temp +'" min="-30" max="100" type="range"></input><span id="slide1_span"> 10</span></li>');
	
	/*
	possible left over code form jQuery Mobile
	$('#flipDate2').slider('refresh');
	$('#selectDate2').slider('refresh');
	$('#datepicker2').textinput('refresh');
	$('#timeSelector2').slider('refresh');
	
	$("update").trigger('pagecreate');
  	$("ul").listview('refresh');
  	*/ 
}

function deleteQuery()
{
	// get from local storage.
	var id = pullFromLocalStorage("id");
	var idVal = convertToString(id);

	var updateKey = [
	["id", idVal]
	]
	buildDeleteRow("niceday" , updateKey);
}

function action()
{
	window.location.href = "index.html";
}

function checkFormUpdate()
{
	//check to make sure there is not another day that isnt the one being edited, that the datepicker is changing to...
	var isTodaysDate = prepData("flipDate2");
	var day;
	if(isTodaysDate == "off")
	{
		day = new Date(prepData("datepicker2")).getTime();
	} else {
		day = new Date().getTime();
	}
	var check = formatTime(day);
	var upperVal = new Date(check[0], check[1], (check[3]+1)).getTime();
	var data = [day, upperVal];
	buildSelectBetweenCheck("niceday", "*", "date", data, formChecker, processFormUpdate);
}

function formChecker(tx, results)
{
	var len = results.rows.length;
	if(len == 0)
	{
		processFormUpdate();
	} else {
		var day = convertToString(pullFromLocalStorage("date"));
		var thisDay = results.rows.item(0).date;
	
		
		if(len >= 1 && thisDay != day)
		{
			alert("the day you are choosing has already been entered, please go back and select it from the previous list");
			action();
		}else{
			processFormUpdate();
		}
	}
}

function processFormUpdate()
{
	//$("#inputForm").validate();
	var id = pullFromLocalStorage("id");
	var idVal = convertToString(id);
	//retrieve form values
	var isTodaysDate = prepData("flipDate2");
	var lengthOfNice = prepData("slideLength2");
	var temperature = prepData("tempSlider");
	var selectedDate; //make sure this value is put through a validator to allow it to convirt to the unix stamp properly. i eno one can input a value without the datepcker.
	var SelectedTime;   
	if(isTodaysDate == "off") 
	{
		$(".selectDate").css("display" , "inline");
		selectedDate =  prepData("datepicker2");
	}
	if(lengthOfNice == "off") 
	{
		$(".timingsSelector").css("display" , "inline");
		selectedTime = prepData("timeSelector2");
	}
	
	//package up the data
	var date;		//timestamp INT
	var duration;	//0.5 or 1 = FLOAT
	var period;		//"am" , "pm", or "na" STRING
	var temp;		//number INT
	var location; //FOR LATER ON TO WORK OUT GEO-LOCATION
	
	//add values to new packages
	if(isTodaysDate == "off")
	{
		//make input date into a timestamp
		date = new Date(selectedDate).getTime();
	} else {
		date = new Date().getTime();
	}
	
	if(lengthOfNice == "off")
	{
		duration = 0.5;
	} else {
		duration = 1;
	}
	temp = temperature;
	
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
	
	var data = [
    ["date", date],
    ["duration", duration],
    ["period", period],
	["temp" , temp]
	]

	
	var updateKey = [
	["id", idVal]
	]

	
	
	//insert data into db.
	buildUpdate("niceday" , data, updateKey); 
			//possi(dbName, array_of_inputs, array_for_where_specifier) 
}
function dateBlur(name, change)
{
	//alert("working");
	var isTodaysDate = prepData(change);
	if(isTodaysDate == "off") 
	{
		$(".selectDate").css("display" , "inline");
	} else {
		$(".selectDate").css("display" , "none");
	}
	
  	$(name).listview('refresh');
}
