import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { requestOpenTabs } from '../../../../shared/actions/tabactions';
import { requestDeleteResource, requestUpdateResource } from '../../../../shared/actions/projectactions';

const Resource = (props) => {
  const { tab, activeProj, displayResource } = props;
  if (tab.url === displayResource) {
    return (
      <li key={tab.url}>
        <div>
          <img alt=" " src={tab.icon} />
          { tab.title }
          <FontAwesomeIcon
            className="btn"
            icon="chevron-up"
            onClick={(e) => { e.stopPropagation(); props.setDisplay(''); }}
          />
        </div>
        <div><input type="text"
          className="tags-input"
          defaultValue={tab.tags.join(', ')}
          onBlur={(e) => {
            const tags = e.target.value.split(',').map((tag) => {
              return tag.replace(/(^\s*)|(\s*$)/g, '').toLowerCase();
            }).filter((tag) => {
              if (tag.length === 0) return false;
              return true;
            });
            if (tags.length > 0 || tab.tags.length !== 0) { props.requestUpdateResource(tab.url, { tags }, activeProj); }
          }}
        />
        </div>
        <div> { tab.url } </div>
        <button type="button" onClick={() => props.requestDeleteResource([tab.url], activeProj)}>Delete Resource</button>
      </li>
    );
  } else {
    return (
      <li key={tab.url} onClick={() => { props.requestOpenTabs(tab.url, activeProj); }}>
        <div>
          <img alt=" " src={tab.icon} />
          { tab.title.length > 50 ? `${tab.title.substr(0, 47)}...` : tab.title }
          <FontAwesomeIcon
            className="btn"
            icon="chevron-down"
            onClick={(e) => { e.stopPropagation(); props.setDisplay(tab.url); }}
          />
        </div>
        <div>
          { tab.tags.map((tag) => (
            <button className="tag" type="button" key={tag} onClick={(e) => { e.stopPropagation(); props.setFilterContent(tag); }}>{tag}</button>
          )) }
        </div>
      </li>
    );
  }
};

const mapStateToProps = (reduxState) => ({
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestOpenTabs, requestDeleteResource, requestUpdateResource })(Resource);
