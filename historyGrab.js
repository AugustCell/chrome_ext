//Server connection
var HOST = 'wss://projectnickname123.herokuapp.com';
var ws = new WebSocket(HOST);




/*
//This will actually get the results from history
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
*/
