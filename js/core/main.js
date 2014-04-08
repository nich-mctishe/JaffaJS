// main.js

//this will be a class for helpers.
//may split into timeHelper , dataTypeHelper, and AJAXHElper.

var main = {
	//TIME
	formatTime: function(timeInput)
	{
		//turn peices of data into indicidual values
		
		//make sure it has passed well
		if(timeInput != null)
		{
			var toString = Object.prototype.toString;

			if(this.isString(timeInput))
			{
				var rawDate = parseInt(timeInput);
			} else {
			
				var rawDate = timeInput;
			}
			
			//for year number
			var year = new Date(rawDate).getFullYear();
			//for produce the name of the month
			var monthNum = new Date(rawDate).getMonth();
			var month = configs.months.name[monthNum];
			//gives the number of a day
			var dayNumber = new Date(rawDate).getUTCDate();
			//turns the day number into a 3 letter day word.
			var n = new Date(rawDate).toString(); 
			var dayName = n.substr(0,3); 
			
			//package each value into a new array. <---- WILL NEED A MONTH NUMBER RETURN VAL
			var timesArray = new Array(year ,monthNum, month, dayNumber, dayName);
			
		} else {
			console.log("time input may be null: here is data value " + timeInput);
		}
		
		return timesArray;
	},
	getStamp: function()
	{
		var ts = Math.round((new Date()).getTime() / 1000);
		return ts;
	},
	setStamp: function()
	{	
		var timeStamp = getStamp();
		document.location.pathname += '#' + timeStamp;
	},
	//DATATYPES
	convertToString: function(input)
	{
		var toString = Object.prototype.toString;
		var num = input;
		var number;
		
		
		if(this.isString(num))
		{
			number = Number(num);
		} 
		return number;
	},
	isString: function (obj) {
		return toString.call(obj) == '[object String]';
	},
	prepData: function(inputName)
	{
		var inputData = document.getElementById(inputName).value;
		//alert("input value is " + inputData);
		
		return inputData;
	},
	//AJAX
	_read: function(input){
		if(!input.type || input.type === null) input.type = 'GET';
		/*
		standard input format for all ajax call functions
		var input = {
			'url': '',
			'data' : '',
			'type' : '',
			'successCB' : function(),
			'failCB' : function()
		}
		*/
		$.ajax({
			url: input.url,
			type: input.type,
		}).done(input.successCB).fail(input.failCB).always(function() {console.log("complete");});
		
	},
	_write: function(input){
		if(!input.type || input.type === null) input.type = 'GET';
		$.ajax({
			url: input.url,
			type: input.type,
			data: input.data,
		}).done(input.successCB).fail(input.failCB).always(function() {console.log("complete");});
		
	},
	_update: function(input){
		if(!input.type || input.type === null) input.type = 'GET';
	},
	_delete: function(input){
		if(!input.type || input.type === null) input.type = 'GET';
		$.ajax({
			url: input.url,
			type: input.type,
		}).done(input.successCB).fail(input.failCB).always(function() {console.log("complete");});
	},
};