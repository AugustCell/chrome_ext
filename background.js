/*
This function is just meant to redirect users to the phish form for now, when
the content scripts runs a message. THIS FILE WILL BE USED FOR LISTENING TO
SERVER SIGNALS.
*/
chrome.runtime.onMessage.addListener(function(message, sender, response){
  switch(message.action){
    case 'openPhish':
    chrome.tabs.create({url: '/phishForm.html', active: true, index: sender.tab.index + 1,
    openerTabId: sender.tab.id});
  }
});
