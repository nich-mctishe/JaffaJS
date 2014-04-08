//Loader.js
var loader = {
	loadInit : function(initPage)
	{
		if(initPage === null) initPage = "main.html"; //this may be reducndant as it could involve syntax error.
		$('#ajax_content').load(configs.viewRoute + initPage, function() //main.html should be default
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
