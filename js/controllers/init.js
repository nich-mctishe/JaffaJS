//iniital class.

var initController = {
	onDeviceReady: function() 
	{
		//this is where you put the code you wish to initialte when the app makes its first calls.
		this.controllerIcons();
	},
	controllerIcons: function(){
		//this is where you should place all the calls to external 'pages' in this script so that their init functions will run.
		alert("application ready");
	}
};

// var hg = hg || {
// 	initController
// };