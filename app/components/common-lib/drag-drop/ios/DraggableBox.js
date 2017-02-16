/**
 * Created by iross on 2/17/2016.
 */
import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const boxSource = {
  beginDrag (props) {
    const { id, title, left, top } = props;
    return { id, title, left, top };
  }
};

function getStyles (props) {
  const { isDragging } = props;

  return {
    position: 'relative',
    opacity: isDragging ? 0.5 : 1
  };
}

class DraggableBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.any
  };

  componentDidMount () {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render () {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className="draggable"
          key={this.props.id}
          style={getStyles(this.props)}>
        {this.props.children}
      </div>
    );
  }
};

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(DraggableBox);
