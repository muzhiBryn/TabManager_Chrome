import React, { Component } from 'react';
import { connect } from 'react-redux';
// import throttle from 'lodash.throttle';
import { moveTab } from '../../../../shared/actions/tabactions';

class MovingTab extends Component {
  constructor(props) {
    super(props);
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
    // throttle(() => {
    //   this.props.moveTab({ tab: this.props.movingTab.tab, x: e.pageX, y: e.pageY });
    // }, 100);
    this.props.moveTab({ tab: this.props.movingTab.tab, x: e.pageX, y: e.pageY });
    // Might cause trouble if moving too fast??
  }

  handleMouseUp() {
    setTimeout(() => this.props.moveTab(null), 200);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { movingTab } = this.props;
    console.log(movingTab);
    if (movingTab) {
      const style = {
        left: movingTab.x - 10,
        top: movingTab.y - 10,
      };
      return (
        <img id="moving-tab" style={style} alt={`${movingTab.tab.title.substr(0, 10)}...`} src={movingTab.tab.icon} />
      );
    } else return null;
  }
}

const mapStateToProps = (reduxState) => ({
  movingTab: reduxState.tabs.movingTab,
});

export default connect(mapStateToProps, { moveTab })(MovingTab);
