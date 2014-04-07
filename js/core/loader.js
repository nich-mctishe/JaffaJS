//Loader.js
history.navigationMode = 'compatible';
var menu_selected = false;
$(document).ready(function()
{
	//load first page.
	loadInit();
});
function loadInit()
{
	$('#ajax_content').load("views/main.html", function() //main.html should be default
	{
		$('#ajax_content').fadeIn("fast");
	});
}
function loadNewPage(pageName)
{
	url = "views/" + pageName;
	$('#ajax_content').fadeOut("fast", function(){
		$('#ajax_content').load(url, function()
		{
			$('#ajax_content').fadeIn("fast");
		});
	});
}
$(window).on('hashchange', function() {
  extract_hash();
});
function extract_hash()
{
	var rawUrl = window.location.hash;
	var url = rawUrl.split("#");
	loadNewPage(url[1]);
}
function go_back()
{
	$('#ajax_content').fadeOut("fast", function(){
		parent.history.back();
	});
}
function display_drop_menu()
{
	if(menu_selected)
	{
		$('[role="drop_menu"]').fadeIn('fast' , function(){});
	} else {
		$('[role="drop_menu"]').fadeOut('fast' , function(){});
	}
}
function run_menus()
{
	if(menu_selected)
	{
		menu_selected = false;
	} else {
		menu_selected = true;
	}
	display_drop_menu();
}