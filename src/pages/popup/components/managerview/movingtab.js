import React, { Component } from 'react';
import { connect } from 'react-redux';
// import throttle from 'lodash.throttle';
import { moveTab } from '../../../../shared/actions/tabactions';

class MovingTab extends Component {
  constructor(props) {
    super(props);
    const { movingTab } = this.props;
    this.state = {
      x: movingTab.x,
      y: movingTab.y,
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp, true);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp, true);
  }

  handleMouseMove(e) {
    const x = e.pageX;
    const y = e.pageY;
    this.setState({ x, y });
  }

  handleMouseUp() {
    setTimeout(() => this.props.moveTab(null), 200);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { x, y } = this.state;
    const { movingTab } = this.props;
    if (movingTab) {
      const style = {
        left: x - 10,
        top: y - 10,
      };
      return (
        <img id="moving-tab" style={style} alt={`${movingTab.tab.title.substr(0, 10)}...`} src={movingTab.tab.icon} />
      );
    } else return <span> </span>; // Just an empty span
  }
}

const mapStateToProps = (reduxState) => ({
  movingTab: reduxState.tabs.movingTab,
});

export default connect(mapStateToProps, { moveTab })(MovingTab);
