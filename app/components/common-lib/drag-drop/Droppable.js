/**
 * Created by iross on 1/15/2016.
 */
import React, { Component, PropTypes } from 'react';
import { uid } from '../../../utilities/helpers';


export default class Droppable extends Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    files: PropTypes.bool,
    onDrop: PropTypes.func.isRequired,
    dragOver: PropTypes.func,
    dragLeave: PropTypes.func,
    elementType: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.any
  }

  handleDrop (event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.props.files) {
      let fileList = event.dataTransfer.files;
      let files = [];
      for (let i = 0; i< fileList.length; i++) {
        fileList[i].id = uid();
        fileList[i].status = 'PENDING';
        fileList[i].progress = 0;
        files.push(fileList[i]);
      }
      this.props.onDrop(files);
    } else {
      let text = event.dataTransfer.getText();
      this.props.onDrop(text);
    }
    return false;
  }

  handleDragOver (event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.dragOver &&
      this.props.dragOver(event);
    return false;
  }

  handleDragLeave (event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.dragLeave &&
      this.props.dragLeave(event);
    return false;
  }

  render () {

    if (this.props.elementType) {
      let element = React.createElement(this.props.elementType, {
        style: this.props.style,
        className: this.props.className,
        children: this.props.children,
        onDrop: (e) => this.handleDrop(e),
        onDragOver: (e) => this.handleDragOver(e),
        onDragLeave: (e) => this.handleDragLeave(e)
      });
      return element;
    }

    return (<div className="droppable"
                 onDrop={(e) => this.handleDrop(e)}
                 onDragOver={(e) => this.handleDragOver(e)}
                 onDragLeave={(e) => this.handleDragLeave(e)}>
      {this.props.children}
    </div>);
  }
}
