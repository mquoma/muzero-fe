import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import { DragLayer } from 'react-dnd';

const getParentPosition = (fixedParent) => {
  let parentX = 0;
  let parentY = 0;

  if (fixedParent && document.querySelector(fixedParent)) {
    let slidingPanel = document.querySelector(fixedParent);
    let testDiv = document.getElementById('testDiv') ||
      document.createElement('div');

    testDiv.style.position = 'fixed';
    testDiv.id = 'testDiv';
    slidingPanel.appendChild(testDiv);

    if (testDiv.offsetLeft > 0) {
      slidingPanel.removeChild(testDiv);
    } else {
      slidingPanel.removeChild (testDiv);
      parentY -= parseInt(slidingPanel.offsetTop, 10);
      parentX -= parseInt(slidingPanel.offsetLeft, 10);
    }
  }

  return { parentX, parentY };
};

function getItemStyles (props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;


  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderItem (type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return (
          <BoxDragPreview title={item.title} />
        );
      default:
        return null;
    }
  }

  render () {
    const { item, itemType, isDragging, fixedParent } = this.props;

    let layerStyles = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      left: getParentPosition(fixedParent).parentX + 'px',
      top: getParentPosition(fixedParent).parentY + 'px',
      width: '100%',
      height: '100%'
    };

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
