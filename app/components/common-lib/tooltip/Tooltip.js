/**
 * Created by amattis on 6/20/2016.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './tooltip.scss';

export class Tooltip extends Component {
  constructor (props) {
    super (props);

    this.state = {
      text: '',
      show: false,
      placement: 'top',
      trail: false,
      currentEvent: null,
      currentTarget: null,
      delayShow: 0,
      delayHide: 0,
      fixedParent: '',
      ipadId: ''
    };

    this.delayShowLoop = null;
    this.delayHideLoop = null;
  }

  componentDidMount () {
    this.bindListeners();
  }

  componentWillUnmount () {
    clearTimeout(this.delayShowLoop);
    clearTimeout(this.delayHideLoop);

    this.unbindListeners();
  }

  getTargetArray (id) {
    let targetArray;

    if (!id) {
      targetArray =
        document.querySelectorAll('[data-tooltip]:not([data-tooltip-for])');
    } else {
      targetArray =
        document.querySelectorAll(`[data-tooltip][data-tooltip-for=${id}]`);
    }

    return Object.keys(targetArray).filter(key => key !== 'length').map(key => {
      return targetArray[key];
    });
  }

  getTipContent (tip, children, multiline) {
    if (children) {
      return children;
    }

    const regexp = /<br\s*\/?>/;
    if (!multiline || multiline === 'false' || !regexp.test(tip)) {
      return tip;
    }

    return tip.split(regexp).map((d, i) => {
      return (
        <span key={i} className='multi-line'>{d}</span>
      );
    });
  }
  showTooltip (e) {
    const { children, multiline } = this.props;
    const originTooltip = e.currentTarget.getAttribute('data-tooltip');
    const isMultiline = e.currentTarget.getAttribute('data-multiline') ||
      multiline || false;
    const text = this.getTipContent(originTooltip, children, isMultiline);

    this.setState({
      text,
      placement: e.currentTarget.getAttribute('data-placement') ||
      this.props.placement || 'top',
      trail: e.currentTarget.getAttribute('data-trail') ||
      this.props.trail || false,
      offset: e.currentTarget.getAttribute('data-offset') ||
      this.props.offset || {},
      delayShow: e.currentTarget.getAttribute('data-delay-show') ||
      this.props.delayShow || 0,
      delayHide: e.currentTarget.getAttribute('data-delay-hide') ||
      this.props.delayHide || 0,
      fixedParent: e.currentTarget.getAttribute('data-fixed-parent') ||
      this.props.fixedParent || '',
      noEllipsis: e.currentTarget.getAttribute('no-ellipsis') ||
      this.props.noEllipsis || false,
      ipadId: e.currentTarget.getAttribute('ipad-id') ||
      this.props.ipadId || ''
    }, () => {
      this.updateTooltip(e);
    });
  }

  updateTooltip (e) {
    const { delayShow, show, noEllipsis } = this.state;
    const node = ReactDOM.findDOMNode(this);
    let { text } = this.state;
    const delayTime = show ? 0 : parseInt(delayShow, 10);
    const eventTarget = e.currentTarget;

    if (noEllipsis && node.clientWidth < eventTarget.clientWidth) {
      return;
    }

    clearTimeout(this.delayShowLoop);
    this.delayShowLoop = setTimeout(() => {
      if (typeof text === 'string') {
        text = text.trim();
      }
      if (Array.isArray(text) && text.length > 0 || text) {
        this.setState({
          currentEvent: e,
          currentTarget: eventTarget,
          show: true
        }, () => {
          this.updatePosition(e);
        });
      }
    }, delayTime);
  }

  hideTooltip (e) {
    if (e.srcElement.id === this.state.ipadId) {
      return;
    }
    const { delayHide } = this.state;

    clearTimeout(this.delayShowLoop);
    clearTimeout(this.delayHideLoop);
    this.delayHideLoop = setTimeout(() => {
      this.setState({
        show: false
      });
      //this.removeScrollListener()
    }, parseInt(delayHide, 10));

    document.removeEventListener('touchend', this.callTooltip);
  }

  updatePosition (e) {
    const { currentEvent, currentTarget, placement,
      trail, offset, fixedParent } = this.state;
    const node = ReactDOM.findDOMNode(this);

    const result = getPosition(currentEvent, currentTarget, node, placement,
        trail, offset, fixedParent);
    if (result.isNewState) {
      return this.setState(result.newState, () => {
        this.updatePosition(e);
      });
    }
    node.style.left = result.position.left + 'px';
    node.style.top = result.position.top + 'px';

    this.callTooltip = (e) => this.hideTooltip.call(this, e);

    document.addEventListener('touchend', this.callTooltip);
  }

  bindListeners () {
    const { id } = this.props;
    let targetArray = this.getTargetArray(id);

    targetArray.forEach(target => {
      target.removeEventListener('mouseenter', this.showTooltip);
      target.addEventListener('mouseenter', ::this.showTooltip);

      target.removeEventListener('mousemove', this.updateTooltip);
      target.addEventListener('mousemove', ::this.updateTooltip);

      target.removeEventListener('mouseleave', this.hideTooltip);
      target.addEventListener('mouseleave', ::this.hideTooltip);

      target.removeEventListener('touchstart', this.updateTooltip);
      target.addEventListener('touchstart', ::this.updateTooltip);
    });

  }
  unbindListeners () {
    const { id } = this.props;
    const targetArray = this.getTargetArray(id);

    targetArray.forEach(target => {
      target.removeEventListener('mouseenter', this.showTooltip);
      target.removeEventListener('mousemove', this.updateTooltip);
      target.removeEventListener('mouseleave', this.hideTooltip);
      target.removeEventListener('touchstart', this.updateTooltip);
    });

    document.removeEventListener('touchend', this.hideTooltip);
  }


  render () {
    const { text } = this.state;
    let show = this.state.show ? 'show' : '';
    let placement = this.state.placement ? this.state.placement : '';

    return (
      <div className={`tooltip ${placement} ${show}`} data-id='tooltip'>
        {text}
      </div>
    );
  }
}

export function getPosition (e,
                             target,
                             node,
                             placement,
                             trail,
                             offset,
                             fixedParent) {
  const tipWidth = node.clientWidth;
  const tipHeight = node.clientHeight;

  const getCurrentOffset = (e, currentTarget, trail) => {
    const boundingClientRect = currentTarget.getBoundingClientRect();
    const targetTop = boundingClientRect.top;
    const targetLeft = boundingClientRect.left;
    const targetWidth = currentTarget.clientWidth;
    const targetHeight = currentTarget.clientHeight;

    if (trail) {
      return {
        mouseX: e.clientX,
        mouseY: e.clientY
      };
    }
    return {
      mouseX: targetLeft + (targetWidth / 2),
      mouseY: targetTop + (targetHeight / 2)
    };
  };

  const getDefaultPosition = (trail, targetWidth, targetHeight,
                              tipWidth, tipHeight) => {
    let top;
    let right;
    let bottom;
    let left;
    const disToMouse = 15;
    const triangleHeight = 14;

    if (trail) {
      top = { x: -(tipWidth / 2),
        y: -(tipHeight + disToMouse - triangleHeight) };
      bottom = { x: -(tipWidth / 2), y: disToMouse };
      left = { x: -(tipWidth + disToMouse - triangleHeight),
        y: -(tipHeight / 2) };
      right = { x: disToMouse, y: -(tipHeight / 2) };
    } else {
      top = { x: -(tipWidth / 2), y: -(targetHeight / 2 + tipHeight) };
      bottom = { x: -(tipWidth / 2), y: targetHeight / 2 };
      left =  { x: -(tipWidth + targetWidth / 2), y: -(tipHeight / 2) };
      right = { x: targetWidth / 2, y: -(tipHeight / 2) };
    }

    return { top, bottom, left, right };
  };

  const calculateOffset = (offset) => {
    let extraOffsetX = 0;
    let extraOffsetY = 0;

    if (Object.prototype.toString.apply(offset) === '[object String]') {
      offset = JSON.parse(offset.toString().replace(/\'/g, '\"'));
    }
    for (let key in offset) {
      if (key === 'top') {
        extraOffsetY -= parseInt(offset[key], 10);
      } else if (key === 'bottom') {
        extraOffsetY += parseInt(offset[key], 10);
      } else if (key === 'left') {
        extraOffsetX -= parseInt(offset[key], 10);
      } else if (key === 'right') {
        extraOffsetX += parseInt(offset[key], 10);
      }
    }

    return { extraOffsetX, extraOffsetY };
  };

  const getParentPosition = (fixedParent) => {
    let parentX = 0;
    let parentY = 0;

    if (fixedParent) {
      let parent = document.querySelector(fixedParent);
      let dims = parent.getBoundingClientRect();
      let testDiv = document.getElementById('testDiv') ||
        document.createElement('div');

      testDiv.style.position = 'fixed';
      testDiv.id = 'testDiv';
      parent.appendChild(testDiv);

      if (testDiv.offsetLeft > 0) {
        parent.removeChild(testDiv);
      } else {
        parent.removeChild (testDiv);
        parentY -= parseInt(dims['top'], 10) - parseInt(parent.scrollTop, 10);
        parentX -= parseInt(dims['left'], 10);
      }
    }

    return { parentX, parentY };
  };

  const { mouseX, mouseY } = getCurrentOffset(e, target, trail);
  const defaultOffset = getDefaultPosition(trail, target.clientWidth,
    target.clientHeight, tipWidth, tipHeight);
  const { extraOffsetX, extraOffsetY } = calculateOffset(offset);
  const { parentX, parentY } = getParentPosition(fixedParent);

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const getTipOffsetLeft = (placement) => {
    const offsetX = defaultOffset[placement].x;
    return mouseX + offsetX + extraOffsetX + parentX;
  };
  const getTipOffsetTop = (placement) => {
    const offsetY = defaultOffset[placement].y;
    return mouseY + offsetY + extraOffsetY + parentY;
  };

  const outsideLeft = () => {
    return getTipOffsetLeft('left') < 0 &&
      getTipOffsetLeft('right') <= windowWidth;
  };
  const outsideRight = () => {
    return getTipOffsetLeft('right') > windowWidth &&
      getTipOffsetLeft('left') >= 0;
  };
  const outsideTop = () => {
    return getTipOffsetTop('top') < 0 &&
      getTipOffsetTop('bottom') + tipHeight <= windowHeight;
  };
  const outsideBottom = () => {
    return getTipOffsetTop('bottom') + tipHeight > windowHeight &&
      getTipOffsetTop('top') >= 0;
  };

  if (placement === 'left' && outsideLeft()) {
    return {
      isNewState: true,
      newState: { placement: 'right' }
    };
  } else if (placement === 'right' && outsideRight()) {
    return {
      isNewState: true,
      newState: { placement: 'left' }
    };
  } else if (placement === 'top' && outsideTop()) {
    return {
      isNewState: true,
      newState: { placement: 'bottom' }
    };
  } else if (placement === 'bottom' && outsideBottom()) {
    return {
      isNewState: true,
      newState: { placement: 'top' }
    };
  }

  return {
    isNewState: false,
    position: {
      left: getTipOffsetLeft(placement),
      top: getTipOffsetTop(placement)
    }
  };
}

Tooltip.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  placement: PropTypes.string,
  trail: PropTypes.bool,
  offset: PropTypes.object,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  fixedParent: PropTypes.string,
  noEllipsis: PropTypes.bool
};
