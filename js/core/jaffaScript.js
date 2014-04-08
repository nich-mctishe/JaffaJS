var jaffaScript = {
	"menu_selected" : false,
	display_fade_menu : function()
	{
		if(this.menu_selected)
		{
			$('[role="drop_menu"]').fadeIn('fast' , function(){});
		} else {
			$('[role="drop_menu"]').fadeOut('fast' , function(){});
		}
	},
	display_slide_menu : function()
	{
		if(this.menu_selected)
		{
			$('[role="drop_menu"]').slideDown('fast' , function(){});
		} else {
			$('[role="drop_menu"]').slideUp('fast' , function(){});
		}
	},
	run_menus : function()
	{
		if(this.menu_selected)
		{
			this.menu_selected = false;
		} else {
			this.menu_selected = true;
		}
		if(configs.menuType == 'fade') this.display_fade_menu();
		 	else this.display_slide_menu();
	}
};