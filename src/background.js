chrome.extension.onConnect.addListener((port) => {
  console.log("Connected .....");
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const tab_info = tabs.map((tab) => ({
      icon: tab.favIconUrl,
      title: tab.title,
      id: tab.id,
      url: tab.url
    }));
    // console.log(tab_info);
    port.postMessage(JSON.stringify({head: 'tabs', tabs: tab_info}));

    port.onMessage.addListener((msg)=>{
      console.log(msg);
      const query = JSON.parse(msg);
      switch(query.head){
        case 'select':
          chrome.tabs.update(query.id, {highlighted: true});
          break;
        case 'close':
          chrome.tabs.remove(query.id);
          break;
      }
    })
  });
  // port.postMessage(c);
  // chrome.tabs.onCreated.addListener(function(tab)  {
  //   // console.log("background");
  //   port.postMessage("New Tab Created");
  //   // port.onMessage.addListener(function(msg) {
  //   //     console.log("message recieved" + msg);
  //   // });
  
  //   // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
  //   //     console.log(response.farewell);
  //   //   });
  //   // });
  // });
});