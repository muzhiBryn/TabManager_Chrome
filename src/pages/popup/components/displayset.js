import React from 'react';

const DisplaySetting = (props) => {
  return (
    <div>
      <input type="text" onChange={(e) => { props.setFilter({ title: e.target.value }); }} />
      <input type="radio" value="0" name="viewType" checked onChange={(e) => { props.switchView({ title: e.target.value }); }} />
      <input type="radio" value="1" name="viewType" checked onChange={(e) => { props.switchView({ title: e.target.value }); }} />
    </div>
  );
};

export default DisplaySetting;
