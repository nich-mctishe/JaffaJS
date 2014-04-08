//localstorage.js

var localstore = {
	//write to localStorage
	addTo: function(key , value)
	{
		window.localStorage.clear();
		window.localStorage.setItem(key, value);
	},
	//remove from localStorage
	removeFrom: function(key){},
	//read from storage 
	pullFrom: function(key)
	{
		var pulledVal = window.localStorage.getItem(key);
		//clear localStorage after to make sure that no overlaping versions of key are being used.
		return pulledVal;
	},
	deleteAll : function(){}
};