/**
 * Created by amattis on 12/24/2015.
 */
import React, { Component, PropTypes } from 'react';

export default class FileProgress extends Component {

  static propTypes = {
    file: PropTypes.object,
    onDoubleClickEvt: PropTypes.func
  };

  constructor (props) {
    super(props);
  }

  render () {
    let file = this.props.file;

    return (
      <div>
        <p>
          <progress
          value={file.value}
          max={100} />
        </p>
        <div onDoubleClick={() => this.props.onDoubleClickEvt(file)}>
          {file.displayName}</div>
      </div>
    );
  }
}
