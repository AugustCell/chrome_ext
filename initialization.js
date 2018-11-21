//Verify if it is operating or not
console.log("Background script is currently running!");
var webArr = ["norton", "bitdefender", "eset", "webrootanywhere",
"kaspersky", "pandasecurity", "trendmicro", "avg", "avast", "avira",
"f-secure", "sophos", "mcafee", "checkpoint", "totalav", "scanguard",
"bullguard", "emsisoft", "comodo", "symantec", "facebook"];

/*
This function will be used to creat ea unique client
id for each person who downloads the extension. This
works by making a random integer array, and making a
256 bit array. This will then be sent through a crypto
functions to give it even more random variables.
This will then be appended to an id and changed to
base 16 which will provide us with 1-9 and A-F
*/
function clientHashId(){
  var intArr = new Uint16Array(16); //Make the random 256 bit array
  crypto.getRandomValues(intArr);   //Cryptographically randomize values
  var id = '';                      //Initialize array for id
  for(var i = 0; i < intArr.length; i++){
    id += intArr[i].toString(16);   //Change to base 16
  }
  return id;                        //Return the id for the username
}

/*
This function will be run on the first time the extension
is installed into the user is chrome app.
*/
chrome.runtime.onInstalled.addListener(function() {
  var id = clientHashId();
  chrome.storage.sync.set({'id': id, 'values': webArr}, function(){
    alert("Welcome, and thank you, for downloading this extension!")
  });
});
