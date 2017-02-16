/**
 * Created by amattis on 12/22/2015.
 */
import React, { Component, PropTypes } from 'react';

export default class ModalButton extends Component {

  static propTypes = {
    func: PropTypes.func,
    text: PropTypes.string,
    classList: PropTypes.string,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    qaid: PropTypes.string
  };

  render () {
    let buttonDisplay = this.props.disabled ?
      <button className={this.props.classList ? this.props.classList : null}
              onClick={ () => this.props.func() }
              data-qaid={this.props.qaid ? this.props.qaid : null}
              disabled="disabled">{this.props.text}</button> :
      <button className={this.props.classList ? this.props.classList : null}
              data-qaid={this.props.qaid ? this.props.qaid : null}
              onClick={ () => this.props.func() }>{this.props.text}</button>;
    return !this.props.hidden && buttonDisplay;
  }
}
