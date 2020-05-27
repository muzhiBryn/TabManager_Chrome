/* eslint-disable no-unused-vars */

'use strict';

const DisplaySetting = (props) => {
  return e('div', null,
    e('input', { type: 'text', onChange: (e) => { props.setFilter({ title: e.target.value }); } }),
    e('input', {
      type: 'radio', value: 0, name: 'viewType', checked: true, onChange: (e) => { props.switchView({ title: e.target.value }); },
    }),
    e('input', {
      type: 'radio', value: 1, name: 'viewType', onChange: (e) => { props.switchView({ title: e.target.value }); },
    }));
};
