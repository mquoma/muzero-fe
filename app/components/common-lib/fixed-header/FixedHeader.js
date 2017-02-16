/**
 * Created by amattis on 1/20/2016.
 */
import React, { Component, PropTypes } from 'react';

export default class FixedHeader extends Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    fixOffset: PropTypes.number,
    classList: PropTypes.string,
    children: PropTypes.any
  }

  componentDidMount () {
    if (!this.isPositionStickySupported()) {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    }
  }

  componentWillUnmount () {
    if (!this.isPositionStickySupported()) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  isPositionStickySupported () {
    let header = document.querySelector('.fixable-header');
    let position = window.getComputedStyle(header).getPropertyValue('position');
    return position === 'sticky' || position === '-webkit-sticky';
  }

  onScroll = () => {
    const fixOffset = this.props.fixOffset ? this.props.fixOffset :
      document.querySelector('.global-nav') ?
      document.querySelector('.global-nav').getBoundingClientRect().height :
      0;

    let elem = this.refs.fixable;
    let elemTop = (document.documentElement &&
      document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (elemTop > fixOffset) {
      if (elem.className.indexOf(' sticky') === -1) {
        elem.className += ' sticky';
      }
    } else {
      elem.className = elem.className.replace(' sticky', '');
    }
  };

  render () {
    return (
      <div ref="fixable"
           className={this.props.classList ?
            this.props.classList + ' fixable-header' : 'fixable-header'}>
        {this.props.children}
      </div>
    );
  }
}
