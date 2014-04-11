//Loader.js
var loader = {
	loadInit : function()
	{
		$('#ajax_content').load(configs.viewRoute + configs.initPage, function() //main.html should be default
		{
			$('#ajax_content').fadeIn("fast");
		});
	},
	loadNewPage: function(pageName)
	{
		url = configs.viewRoute + pageName;
		$('#ajax_content').fadeOut("fast", function(){
			$('#ajax_content').load(url, function()
			{
				$('#ajax_content').fadeIn("fast");
			});
		});
	},
	check_hash : function()
	{
		$(window).on('hashchange', function() {
		  loader.extract_hash();
		});
	},
	extract_hash: function()
	{
		var rawUrl = window.location.hash;
		var url = rawUrl.split("#");
		this.loadNewPage(url[1]);
	},
	go_back: function()
	{
		$('#ajax_content').fadeOut("fast", function(){
			parent.history.back();
		});
	}
};
