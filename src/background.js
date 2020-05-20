chrome.extension.onConnect.addListener((port) => {
  console.log("Connected .....");
  
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    console.log(tabs);
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
          chrome.tabs.query({currentWindow: true}, (tabs) => {
            tabs.map((tab) => {
              if(tab.active) {
                chrome.tabs.update(tab.id, {active: false});
              }
            });
            chrome.tabs.update(query.id, {active: true});
          });
          break;
        case 'close':
          chrome.tabs.remove(query.id);
          break;
        case 'open_tab':
          chrome.tabs.create({ url: query.url });
        case 'open_tabs':
          query.urls.map((url) => {
            chrome.tabs.create({ url: url });
          })
        default:
          ;
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