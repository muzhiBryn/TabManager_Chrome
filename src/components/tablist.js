// eslint-disable-next-line no-unused-vars
const TabList = (props) => {
  // ATTENTION!!! Here we provided 4 fuctions: jumpto, openTab, openTabs and close.
  // This is an example of how the client can use them.
  const {
    tabs, jumpto, close,
  } = props;
  const tabList = tabs.map((tab) => {
    return e('li', {
      title: tab.title,
      onClick: () => {
        jumpto(tab.id);
        // this.openTab(tab.url);
        // this.openTabs(testTabsUrlInFolder);
        // this.close(tab.id);
      },
    },
    e('img', { src: tab.icon }),
    e('span', null, tab.title),
    // eslint-disable-next-line no-param-reassign
    e('i', { className: 'btn fa fa-window-close', onClick: (event) => { event.stopPropagation(); event.cancelBubble = true; close(tab.id); } }));
  });
  return e(
    'ul', null, ...tabList,
  );
};
