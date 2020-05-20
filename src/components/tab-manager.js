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
  }

  updateTabs(tabs_str){
    const tabs = JSON.parse(tabs_str);
    console.log(tabs);
    this.setState({
      tabs,
    })
  }

  componentDidMount(){
    port.onMessage.addListener(this.updateTabs);
  }

  componentWillUnmount(){
    port.onMessage.removeListener(this.updateTabs);
  }

  render() {
    const tabs = this.state.tabs.map((tab)=>
      (e('li', null, 
        e('img', {'src': tab.icon}),
        tab.title
      ))
    );
    console.log(...tabs);
    return e(
      'ul', null, ...tabs
    );
  }
}

ReactDOM.render(e(TabManager), document.querySelector('#main'));