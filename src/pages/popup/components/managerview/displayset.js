/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import { switchView } from '../../../../shared/actions/preferenceactions';

const DisplaySetting = (props) => {
  return (
    <div id="display-setting">
      <input type="text" placeholder="Search for a tab..." onChange={(e) => { props.setFilter(e.target.value ? { title: e.target.value } : {}); }} />

      <input type="radio" id="listbutton" value="0" name="viewType" checked={props.displayType === '0'} onChange={(e) => { props.switchView(e.target.value); }} />
      <label htmlFor="listbutton" id="listlabel">List</label>

      <input type="radio" id="gridbutton" value="1" name="viewType" checked={props.displayType === '1'} onChange={(e) => { props.switchView(e.target.value); }} />
      <label htmlFor="gridbutton">Grid</label>
    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  displayType: reduxState.preferences.displayType,
});

export default connect(mapStateToProps, { switchView })(DisplaySetting);
