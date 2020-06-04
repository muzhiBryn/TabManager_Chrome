import React from 'react';
import { connect } from 'react-redux';
import CloseTabBtn from './tabcontrols/closetabbtn';
import SaveTabBtn from './tabcontrols/savetabbtn';
import handleDragTab from './tabcontrols/handledragtab';
import { moveTab, requestSwitchTab } from '../../../../shared/actions/tabactions';

const GridTab = (props) => {
  const { tab, editing, activeTab } = props;
  return (
    <li
      title={tab.title}
      className={`grid-tab${tab.id === activeTab ? ' active' : ''}`}
      onMouseDown={(e) => { if (!editing) handleDragTab(e, props.moveTab, tab, tab.id === activeTab); }}
      onMouseUp={() => { props.requestSwitchTab(tab.id); }}
    >
      <div className={`${tab.screenshot ? 'screenshot' : 'icon'}-container`}><img alt=" " src={tab.screenshot || tab.icon} /></div>
      <div>{ tab.title.length > 30 ? `${tab.title.substr(0, 27)}...` : tab.title }</div>
      <CloseTabBtn tab={tab} />
      {editing ? (
        <SaveTabBtn tab={tab} />
      ) : null}
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeTab: reduxState.tabs.activeTab,
});

export default connect(mapStateToProps, {
  requestSwitchTab, moveTab,
})(GridTab);
