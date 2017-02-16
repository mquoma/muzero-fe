/**
 * Created by amattis on 2/8/2016.
 */
import React, { Component } from 'react';

export default class Spinner extends Component {

  render () {
    let spinnerimg = require('image-webpack!./spinner.svg');
    return (
      <div className="spinner-overlay">
        <div className="spinner">
          <img src={spinnerimg} alt="" />
        </div>
      </div>
    );
  }
}
