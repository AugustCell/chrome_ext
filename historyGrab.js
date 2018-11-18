//This history var is simply an empty array for the history vals
var history = [];
var historiesList = document.createElement('ul');

//This will actually get the results
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

//Hello freind
