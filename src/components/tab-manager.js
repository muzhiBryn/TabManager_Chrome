'using strict';

// Reference: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/tabs/inspector/tabs_api.js
const e = React.createElement; // Basically it takes the place of tags(<>)

class TabManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabs: [],
    };
    // chrome.tabs.query({active: true}, (res)=>{
    //   console.log(res);
    //   this.setState = {
    //     tabs: res,
    //   }
    // });
  }

  render() {
    return e(
      'ul', null,
      this.state.tabs.map((tab)=>{
        e('li', null, tab.title)
      })
    );
  }
}

ReactDOM.render(e(TabManager), document.querySelector('#main'));