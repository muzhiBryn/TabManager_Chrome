import React, { Component } from 'react';
import { connect } from 'react-redux';
import Resource from './resource';
import { requestOpenTabs } from '../../../../shared/actions/tabactions';

class ResourceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // filter: {
      //   type: 0,
      //   content: '',
      // },
    };
    this.setFilter = this.setFilter.bind(this);
  }

  // Todo: Update filter values
  setFilter(e) {
    this.setState({});
  }

  render() {
    const { resources, activeProj } = this.props;
    const resourceList = Object.values(resources).map((tab) => {
      return <Resource key={tab.url} tab={tab} />;
    });

    // Todo: filter resources and send them to resouce list
    return (
      <div>
        <div>
          <select name="type" onChange={this.setFilter}>
            <option>tag</option>
            <option>title</option>
          </select>
          <input type="text" name="content" onChange={this.setFilter} />
          <button type="button"
            onClick={() => {
              this.props.requestOpenTabs(Object.keys(resources), activeProj);
            }}
          >Open All
          </button>
        </div>
        <ul id="resource-list">{resourceList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  resources: reduxState.projects.currentProject.resources,
  activeProj: reduxState.projects.activeProj,
});

export default connect(mapStateToProps, { requestOpenTabs })(ResourceView);
