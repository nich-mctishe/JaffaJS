//GLOBAL VALUES
var retrievedDays = [];
var retrievedYears = [];
var totalDays;
var year = 365;
var oneDay = 24*60*60*1000;
var startDate = []; // will be filled by new thing chart that will fill with formattedTimeArray [ timeStamp , dataArray...
function StatController()
{
	display_drop_menu();
	buildSelect("*" , "genesis" , false, retrieveValues);
}

function retrieveValues(tx, results)
{
	var len = results.rows.length;
	if(len == 1)
	{
		//fill sstartDate will timestamp value straight from the db plus 4 more put through input
		var rawDate = results.rows.item(0).date;
		var date = formatTime(rawDate);
		startDate = [rawDate, date[0] , date[1], date[2] , date[3] , date[4]];
	} else {
		var rawDate = results.rows.item(0).date;
		var date = formatTime(rawDate);
		startDate = [rawDate, date[0] , date[1], date[2] , date[3] , date[4]];
	}
}

function thisYearsCharts(yearName)
{
	//take yearname and pull out all entries timestamps that are between it and timestamp for year+1
	var nextYear = yearName + 1;
	var selectedDateStart = new Date(yearName, 01, 01).getTime();
	var selectedDateEnd = new Date(nextYear, 01, 01).getTime();
	var data = [selectedDateStart, selectedDateEnd] //first number the smaller and second number the larger
	//work out if that year has ended yet or not and build cahrt accordingly
	var today = new Date().getTime();
	if(today > selectedDateEnd)
	{
		buildSelectBetween("niceday", "*", "date", data, returnedSoFar);
	} else
	{
		if(selectedDateStart > startDate[0])
		{
			buildSelectGreater("*", "niceday", true, returnedSoFar, "date" , selectedDateStart);
		} else {
			buildSelectGreater("*", "niceday", true, returnedSoFar, "date" , startDate[0]);
		}
	}
	
	
	//buildSelectBetween(tableName, columnName, specifier, data, callBack)
}

function prepYearChart(tx, results) //not currently used <--- MAYBE REDUNDANT
{
	var dataArray = [];
	var len = results.rows.length;
	//work out amount of nice days.
	var niceDays = (len/year)*100;
	var badDays = year - niceDays;
	dataArray = [
			["Rest Of The Year" , badDays],
			{
				name: "Nice Days",
						y: niceDays,
						sliced: true,
						selected: true
			}
	]
	
	//buildPie("chartArea", "", dataArray, "niceDaysThatYear");
}

function soFarCharts()
{
	//firstly get start date from globals and compare it to the year val amount.
	var yearNo = new Date().getFullYear();
	var yearStart = new Date(yearNo, 01, 01).getTime();
	var today = new Date().getTime();
	if(yearStart >= startDate[0])
	{
		//get the date today, and minus the amount of days from the 01/01 of that year.
		//alert("builidng results from the start of teh year");
		buildSelectGreater("*", "niceday", true, returnedSoFar, "date" , yearStart);
	} else {
		//alert("building results form teh apps start date.");
		buildSelectGreater("*", "niceday", true, returnedSoFar, "date" , startDate[0]);
	}
	//buildSelectGreater(columnName , tableName, joined, callBack, whereSpecifier, whereVal)
}

function returnedSoFar(tx, results)
{
	var yearNo = new Date().getFullYear();
	var yearStart = new Date(yearNo, 01, 01).getTime();
	var today = new Date().getTime();
	var amountOfDays;
	var niceText, title;
	if(yearStart > startDate[0])
	{
		//get the date today, and minus the amount of days from the 01/01 of that year.
		amountOfDays = Math.round(Math.abs((yearStart - today)/(oneDay)));
		nicetext = 'Percentage of Nice Days';
		title = 'Total Nice Days That Year';
	} else {
		
		amountOfDays = Math.round(Math.abs((startDate[0] - today)/(oneDay)));
		niceText = 'nice days so far';
		title = 'Nice Days so Far This Year';
	}
	var len = results.rows.length;
	var nicePercent = ((len/amountOfDays)*100);
	var restOfYear = (100 - nicePercent);
	parseFloat(nicePercent);
	parseFloat(restOfYear);

	$(function () {
    $('.chartArea').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b><br />: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: niceText,
            data: [
                	["Rest Of The Year" , restOfYear],
					{
						name: "Nice Days",
						y: nicePercent,
						sliced: true,
						selected: true
					}
            ]
        }]
    });
});

}

function buildPie(divName, chartName, dataVals, shortName)
{
	//input data as a 2d array (use web data as a texster for this working) and unpackage it using for loops. set i=0 as the primary key, that is the default selector.
	divName = document.getElementById(divName);
	
	$(function () {
        $(divName).highcharts({
            chart: {
				type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: chartName
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
            	percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    }
                }
            },
            series: [{
                name: shortName,
                data: dataVals
            }]
        });
    });
}

function buildGraph(divName, subjectNames, fillData)
{
	var div = document.getElementById(divName);
	
	//bar graph version of pie chart above.
	$(function () {
        $(divName).highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: subjectNames,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'days',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' days'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -100,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: fillData
        });
    });
}
function soFarByMonth()
{
	//work out wat year we are in and drag up entries form the db that correspond to after the start of this year.
	var today = new Date().getTime();
	var thisYear = new Date().getFullYear();
	var start = new Date(thisYear, 01, 01).getTime();
	buildSelectGreater("*", "niceday", true, buildPerMonthChart, "date" , start);
	//buildSelectGreater(columnName , tableName, joined, callBack, whereSpecifier, whereVal)
}

function perMonthCharts(yearName)  
{
	//take the relevent year and publish the days per month out of the data extraced. also accoumt for if the year is not ended yet.
	var nextYear = yearName + 1;
	var selectedDateStart = new Date(yearName, 01, 01).getTime();
	var selectedDateEnd = new Date(nextYear, 01, 01).getTime();
	var data = [selectedDateStart, selectedDateEnd] //first number the smaller and second number the larger
	//work out if that year has ended yet or not and build cahrt accordingly
	var today = new Date().getTime();
	if(today > selectedDateEnd)
	{
		buildSelectBetween("niceday", "*", "date", data, buildPerMonthChart);
	} else
	{
		buildSelectGreater("*", "niceday", true, buildPerMonthChart, "date" , selectedDateStart);
	}
}

function buildPerMonthChart(tx, results)
{
	//work out if the year starts before or after the start date of teh app.
	var thisYear = new Date(convertToString(results.rows.item(0).date)).getFullYear();
	var thisYearStamp = new Date(convertToString(results.rows.item(0).date)).getTime();
	var monthNum;
	if(thisYearStamp > startDate[0])
	{
		//year started after the start date.
		monthNum = startDate[2];
	} else {
		//year began before the first use of the app.
		monthNum = 0;
	}
	//count number of days from start date to today.
	var start = new Date(thisYear, monthNum, 01).getTime(); 
	var today = new Date().getTime();
	var monthNumInc = monthNum; //this will be incremented so that thesemonths array can be filled with the month number more accurately later.
	var arrayValInc = 0; //this value is not incrementing correnctly <----use the alert statment to check <!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!READ THIS COMMENT!!!!!!!!!!
	while(today > start)
	{
		++monthNumInc;
		arrayValInc++;
		start = new Date(thisYear, monthNumInc, 01).getTime();
	}
	var goodDays = new Array(arrayValInc); //to store the number of good days per month
	var badDays = new Array(arrayValInc); //to store the number of bad days per month
	var theseMonths = new Array(arrayValInc); // the month number of each month to be translated into a an actual name and number.
	var arrayLength = 0;
	//fill the theseMonth entry with the number of each month based on the monthNumInc as a final val
	for(var i = 0; i < arrayValInc; i++)
	{
		theseMonths[i] = monthNum;
		++monthNum;
	}
	//meanwhile, work out if it will be a leap year
	var isLeap = new Date(thisYear, 1, 29).getMonth() == 1;
	var len = results.rows.length;
	//work out calculation for each month
	for(var m = 0; m < arrayValInc; m++)
	{
		var monthStart = new Date(thisYear, theseMonths[m], 01).getTime();
		var monthEnd = new Date(thisYear, (theseMonths[m]+1), 01).getTime();
		var goodDayCounter = 0; //will increment for each good day within range it finds.
		var lengthOfMonth = 0;//for determining the length of the month so i can eork out the badDays.
		//find all entries that fall between that particular time and fill goodDays with it.
		for(var r = 0; r < len; r++)
		{
			if(results.rows.item(r).date >= monthStart && results.rows.item(r).date <= monthEnd)
			{
				++goodDayCounter;
			}
		}
		goodDays[m] = goodDayCounter;
		//determine if it is a leap year or not
		if(isLeap)
		{
			lengthOfMonth = months.amountLeapYear[theseMonths[m]];
		} else {
			lengthOfMonth = months.amount[theseMonths[m]];
		}
		//make a calculation for the amount of bad days
		badDays[m] = lengthOfMonth - goodDays[m];
		if(badDays[m] <= 0)
		{
			badDays[m] = 0;
		}
	}
	
	//change the numberson theseMonths entry to their corresponding names;
	for(var names = 0; names < arrayValInc; names++)
	{
		theseMonths[names] = months.shortName[theseMonths[names]]
	}
	
	//next build a graph entry for this.
			
	$(function () {
        $('.chartArea').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: theseMonths,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'days',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' days'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -100,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: "Nice Days",
                data: goodDays
            }, {
                name: "bad Days",
                data: badDays
            }]
        });
    });
}

function sumOfNiceDaysToBad() //CUURNETLY WORKING ON THIS.
{
	//extract the total amount of data from the database, and calculate the sum of the days from start of app to today and put on chart.
	//could make it more advanced by putting each year entry into its own pie entry.
	buildSelect("*", "niceday" , false , buildTheChart);
}

function buildTheChart(tx, results)
{
	var len = results.rows.length;
	var niceDays = len;
	var today = new Date().getTime();
	var badDays = (Math.round(Math.abs((startDate[0] - today)/oneDay)))-niceDays;
	if(badDays <= 0)
	{ 
		badDays = 0;
	}
	
	$(function () { 
		$('.chartArea').highcharts({
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Sum Of Good Days To Bad'
			},
			xAxis: {
				categories: ['Type of Day']
			},
			yAxis: {
				title: {
					text: 'Days'
				}
			},
			series: [{
				name: 'Nice Days',
				data: [niceDays]
			}, {
				name: 'Bad Days',
				data: [badDays]
			}]
		})
	})
	
	//buildGraph("chartArea", categories, fillDat);
}

function compareAllYears()
{
	//take everything and split it into years. in a for loop work out the year of each entry
}

function comprisonByYears()
{
	buildSelect("*", "niceday" , false , buildComparison);
}

function buildComparison(tx, results) //STILL TO WRITE 
{
	//take all instances, and retrieve the name of this year form local storage.
	var yearName = pullFromLocalStorage("val");
	
	//add that entry to an array of years
	//will need code to create a new year entry and add it to the year array.
	var len = results.rows.length;
	//work out if it will be a leap year
	var startDate = new Date(yearName, 01, 01).getTime();
	var endDate = new Date((yearName+1), 01, 01).getTime();
	var isLeap = new Date(yearName, 1, 29).getMonth() == 1;
	var thisYear = new Date().getFullYear();
	var today = new Date().getTime();
	var recentStart = new Date(thisYear, 01, 01).getTime();
	if(startDate[0] > recentStart)
	{
		recentStart = startDate[0];
	} 
	//work out good days in each year.
	var goodDays_1 = 0, goodDays_2 = 0;
	for(g = 0; g < len; g++)
	{
		if(results.rows.item(g).date >= startDate && results.rows.item(g).date <= endDate)
		{
			//increment days in first year by one
			++goodDays_1;
		}
		if(results.rows.item(g).date >= recentStart && results.rows.item(g).date <= today)
		{
			//increment days in second year by one
			++goodDays_2;
		}
	}
	//work out no of bad days each year
	var badDays_1 = 0, badDays_2 = 0;
	if(isLeap)
	{
		//write data based on leap year vals here
		badDays_1 = (366 - goodDays_1);	
		badDays_2 = Math.round(((today - recentStart)/(oneDay)) - goodDays_2);
	} else
	{
		//write data based on non leap year vals here.
		badDays_1 = (365 - goodDays_1);	
		badDays_2 = Math.round(((today - recentStart)/(oneDay)) - goodDays_2);
	}
	if(badDays_1 <= 0)
	{
		badDays_1 = 0;
	}
	if(badDays_2 <= 0)
	{
		badDays_2 = 0;
	}
	//package up date
	var goodYears = [goodDays_1 , goodDays_2];
	var badYears = [badDays_1 , badDays_2];
	//build cats for graph
	var cats = [yearName , thisYear];
	
	//buildGraph("chartArea", categories, fillDat);
	$(function () {
        $(".chartArea").highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: cats,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'days',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' days'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -100,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: "Nice Days",
                data: goodYears
            }, {
                name: "Other Days",
                data: badYears
            }]
        });
    });
}

function sort_other_years()
{
	//publish the list of available years based upon the year teh app was first used, and using calc year+1 until year value reaches that of todays date.
	var yearNo = new Date().getFullYear();
	var addedYear = startDate[1];
	
	while(addedYear <= yearNo)
	{
		//append the list entry to the relevent ul this function can go into the constructor.
		$("#prevYearsList").append('<li onclick="javacsript:pushValToStorage('+addedYear+');" class="generatedYearButton"><a href="#stat_years.html" > ' + addedYear + ' </a></li>');    //
		++addedYear;
	}
}

function build_options()
{
	var statYear = window.localStorage.getItem("val");
	
	$('#prevYearsOptions').append('<li onclick="javascript:thisYearsCharts('+ statYear +');"><a>View Total Nice Days To Bad '+ statYear + '</a></li><li onclick="javascript:perMonthCharts('+statYear+');"><a>View Nice Days Per Month ' + statYear + '</a></li><li onclick="javascript:comprisonByYears();"><a>Compare '+ statYear +' to current year</a></li>');
}
