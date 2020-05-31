import React from 'react';
import { connect } from 'react-redux';
import requestSwitchView from '../../../shared/actions/preferenceactions';

const DisplaySetting = (props) => {
  return (
    <div id="tabtop">
      <input type="text" placeholder="Search tabs..." onChange={(e) => { props.setFilter({ title: e.target.value }); }} />
      <input type="radio" value="0" name="viewType" checked={props.displayType === '0'} onChange={(e) => { props.requestSwitchView(e.target.value); }} />
      <input type="radio" value="1" name="viewType" checked={props.displayType === '1'} onChange={(e) => { props.requestSwitchView(e.target.value); }} />
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, { requestSwitchView })(DisplaySetting);
