var historiesList = document.createElement('ul');

chrome.history.search({text: ''}, function(data) {
    data.forEach(function(page) {
        console.log(page.url);
        var url = document.createElement('li');
        url.appendChild(document.createTextNode(page.url));
        historiesList.appendChild(url);
    });
    document.getElementById('visitedWebpage').appendChild(historiesList);
});
