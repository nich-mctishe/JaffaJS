function publishInputList()
{
	buildSelect("*" , "niceday" , false , successfulInputQuery);
}

function successfulInputQuery(tx , results)
{
	//alert("query was successful - formulating data");
	var len = results.rows.length;
	
	if(len === 0)
	{
		$("#updaterList").append("<li> There are no entries to display on this list, please insert some! </li>");
		$("#updaterList").listview('refresh');
	}
	else
	{	
		//prep the results into a formatted html string dependant on the amount of resuls needed.
		for (var i=0; i<len; i++)
		{
			//put date from db into a function to extract dates from it.
			var rawDate = results.rows.item(i).date;
			var formattedTimes = formatTime(rawDate);
			//alert("appending numbers");
			var clicked = "clicked";
			$("#updaterList").append('<li><a onClick="pushToLocalStorage('+results.rows.item(i).id+')" href="#update_form.html">' + formattedTimes[4]+', '+ formattedTimes[2] +' '+ formattedTimes[3] +', '+ formattedTimes[0] +' Temp: '+results.rows.item(i).temp+'&deg;C </a></li>');
		}
		$("#updaterList").listview('refresh');
	}
}
