import React from 'react';
import { connect } from 'react-redux';
import CloseTabBtn from './tabcontrols/closetabbtn';
import SaveTabBtn from './tabcontrols/savetabbtn';
import handleDragTab from './tabcontrols/handledragtab';
import { moveTab, requestSwitchTab } from '../../../../shared/actions/tabactions';

const GridTab = (props) => {
  const { tab, editing } = props;
  return (
    <li
      title={tab.title}
      onMouseDown={(e) => { handleDragTab(e, props.moveTab, tab); }}
      onMouseUp={() => { props.requestSwitchTab(tab.id); }}
    >
      <img alt=" " src={tab.icon} />
      <span>{tab.title}</span>
      {editing ? (
        <SaveTabBtn tab={tab} />
      ) : null}
      <CloseTabBtn tab={tab} />
    </li>
  );
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, {
  requestSwitchTab, moveTab,
})(GridTab);
