/*
This is the background of the form, which will not let the user leave until they
fill out all the fields. Once they fill out all the fields, it will flip the
phishflag back to nope, signifying we ar enot trying to fish right now.
*/
alert("Please fill out form to continue");
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
    console.log("DID NOT FILL OUT FORM");
    alert("You did not fill out everything!");
  }
  else{
    alert("Thank you for filling out the form!");
    var val = "nope";
    chrome.storage.sync.set({'phishFlag': val}, function(){});
    chrome.tabs.getCurrent(function(tab){
      chrome.tabs.remove(tab.id, function(){});
    });
  }
}
