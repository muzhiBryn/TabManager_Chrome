import React from 'react';

const PageManager = (props) => {
  const { turn2page } = props;
  const { pageNum } = props;
  const { curPage } = props;
  const pages = [];
  for (let i = 0; i < pageNum; i++) {
    if (curPage === i) {
      pages.push(<button type="button" className="page active" onClick={() => { turn2page(i); }} key={`pages-${i + 1}`}>{i + 1}</button>);
    } else {
      pages.push(<button type="button" className="page" onClick={() => { turn2page(i); }} key={`pages-${i + 1}`}>{i + 1}</button>);
    }
  }
  return (
    <div id="page-manager">
      { pages }
    </div>
  );
};

export default PageManager;
