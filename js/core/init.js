//init.js
$(document).ready(function()
{
	//load first page.
	init.loadInit();
	initController.onDeviceReady();
	jaffascript.run_menus();
});
var init = {
	loadInit: function(){
		//this is where all initial function will be placed.
		loader.loadInit();
		loader.check_hash();
	}
};
