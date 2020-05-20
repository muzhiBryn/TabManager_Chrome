'using strict';

// Reference: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/inspector/tabs_api.js
const e = React.createElement; // Basically it takes the place of tags(<>)
const port = chrome.extension.connect({
  name: "Tabs Comminication"
});

class TabManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabs: [],
    };
    this.updateTabs = this.updateTabs.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.jumpto = this.jumpto.bind(this);
    this.openTab = this.openTab.bind(this);
  }

  updateTabs(tabs){
    this.setState({
      tabs,
    })
  }

  handleMessage(msg){
    const query = JSON.parse(msg);
    switch(query.head){
      case 'tabs':
        this.updateTabs(query.tabs);
        break;
    }
  }

  componentDidMount(){
    port.onMessage.addListener(this.handleMessage);
  }

  componentWillUnmount(){
    port.onMessage.removeListener(this.handleMessage);
  }

  jumpto(id){
    port.postMessage(JSON.stringify({head: "select", id}));
  }

  close(id){
    port.postMessage(JSON.stringify({head: "close", id}));
  }

  openTab(url){
    port.postMessage(JSON.stringify({head: "open_tab", url}));
  }

  openTabs(urls){
    port.postMessage(JSON.stringify({head: "open_tabs", urls}));
  }

  render() {
    let testTabsUrlInFolder = this.state.tabs.map(function(tab) {
      return tab.url;
    });
    console.log(testTabsUrlInFolder);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // ATTENTION!!! Here we provided 4 fuctions: jumpto, openTab, openTabs and close. 
    // This is an example of how the client can use them.
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    const tabs = this.state.tabs.map((tab)=>
      (e('li', {'title': tab.title, 
                'onClick': ()=>{
                  this.jumpto(tab.id);
                  // this.openTab(tab.url);
                  // this.openTabs(testTabsUrlInFolder);
                  // this.close(tab.id);
                }}, 
        e('img', {'src': tab.icon}),
        e('span', null, tab.title),
        e('i', {'className':'btn fa fa-window-close', 'onClick': (e)=>{e.stopPropagation(); e.cancelBubble = true; this.close(tab.id)}})
      ))
    );
    return e(
      'ul', null, ...tabs
    );
  }
}

ReactDOM.render(e(TabManager), document.querySelector('#main'));