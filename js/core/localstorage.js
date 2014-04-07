function pushValToStorage(val)
{
	window.localStorage.clear();
	
	window.localStorage.setItem("val" , val);
}
//write to localStorage
function addToStorage(key , value)
{
	window.localStorage.clear();
	window.localStorage.setItem(key, value);
}
//remove from localStorage

//read from storage 
function pullFromLocalStorage(key)
{
	var pulledVal = window.localStorage.getItem(key);
	//clear localStorage after to make sure that no overlaping versions of key are being used.
	return pulledVal;
}