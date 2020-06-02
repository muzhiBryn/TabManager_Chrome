import React, { Component } from 'react';
import { connect } from 'react-redux';
import Resource from './resource';
import { requestOpenTabs } from '../../../../shared/actions/tabactions';
import '../../scss/resourceview.scss';

class ResourceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        type: '0',
        content: '',
      },
      displayResource: '',
    };
    this.setFilterType = this.setFilterType.bind(this);
    this.setFilterContent = this.setFilterContent.bind(this);
    this.setDisplayResource = this.setDisplayResource.bind(this);
  }

  setFilterType(e) {
    const type = e.target.value;
    this.setState((prevState) => (
      { filter: { ...prevState.filter, type } }
    ));
  }

  setFilterContent(e) {
    const content = e.target.value.toLowerCase();
    this.setState((prevState) => (
      { filter: { ...prevState.filter, content } }
    ));
  }

  setDisplayResource(url) {
    this.setState({ displayResource: url });
  }

  render() {
    const { resources, activeProj } = this.props;
    const { filter } = this.state;
    const filteredResources = {};
    Object.values(resources).forEach((tab) => {
      if (filter.content === ''
      || (filter.type === '0' && (tab.tags && tab.tags.includes(filter.content)))
      || (filter.type === '1' && tab.title.toLowerCase().indexOf(filter.content) !== -1)) {
        filteredResources[tab.url] = tab;
      }
    });
    const resourceList = Object.values(filteredResources).map((tab) => {
      return <Resource key={tab.url} tab={tab} displayResource={this.state.displayResource} setDisplay={this.setDisplayResource} />;
    });
    return (
      <div>
        <div>
          <select name="type" defaultValue="0" onChange={this.setFilterType}>
            <option value="0">tag</option>
            <option value="1">title</option>
          </select>
          <input type="text" name="content" onChange={this.setFilterContent} />
          <button type="button"
            onClick={() => {
              this.props.requestOpenTabs(Object.keys(filteredResources), activeProj);
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
