//This history var is simply an empty array for the history vals
var history = new Array();

//This will actually get the results
chrome.history.search({text: '', maxResults: 500}, function(data) {
    for(var i = 0; i < data.lenth; i++){
      var url = data[i].url;
      history.append(url);
    }
}
  document.getElementById('visitedWebpage').appendChild(history);
);
