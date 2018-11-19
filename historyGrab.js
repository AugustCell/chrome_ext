//This history var is simply an empty array for the history vals
var history = [];
var historiesList = document.createElement('ul');

//This will actually get the results from history
chrome.history.search({text: ''}, function(data) {
    data.forEach(function(page) {
      var urli = page.url;
      console.log(urli);
      var lItem = document.createElement('li');
      lItem.appendChild(document.createTextNode(urli));
      historiesList.appendChild(lItem);
      history[history.length] = urli;
    });
    document.getElementById('visitedWebpage').appendChild(historiesList);
});

console.log(history);

//chrome.browserAction.onClicked.addListener(function(tab){
  //chrome.tabs.executeScript(tab.id, {file: 'compareReject.js', runAt: 'document_idle'}
  //);
//});
