/**
 * Created by iross on 12/21/2015.
 */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { CommonIcons } from '../CommonIcons';
import { xPathHelper } from '../../../utilities/helpers/index';
import ButtonGroup from './ButtonGroup';

export default class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    hasButtons: PropTypes.bool,
    classes: PropTypes.string,
    children: PropTypes.any,
    buttons: PropTypes.array,
    onCancel: PropTypes.func.isRequired
  };

  componentDidMount () {
    if (this.props.isOpen) {
      this.doImperativeWork();
    }
  }

  componentDidUpdate () {
    if (this.props.isOpen) {
      this.doImperativeWork();
    }
  }

  closeModal () {
    this.props.onCancel();
    let modal = findDOMNode(this.refs.modal);
    modal.className = modal.className.replace(' open', '');
  }

  doImperativeWork () {
    let modal = findDOMNode(this.refs.modal);
    let myclass = this.props.isOpen && this.props.classes ?
      this.props.classes + ' modal open' :
      this.props.isOpen ? 'modal open' :
      modal.className.replace(' open', '');
    modal.className = myclass;
  }

  render () {

    let modalClass = this.props.classes ?
      'modal ' + this.props.classes :
      'modal';
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <div className={modalClass} ref="modal">
        <CommonIcons />
        <div className="overlay"></div>
        <div className="ie-min-height-wrapper for-max">
          <div className="modal-content">
            <a className="modal-close-btn" onClick={() => this.closeModal()}>
              <svg className="icon">
                <use xlinkHref={`${xPathHelper()}#x-icon`} />
              </svg>
            </a>
            <div className="modal-header">
              <h2 className="title">{this.props.title}</h2>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            {this.props.buttons &&
              <ButtonGroup>
                {this.props.buttons}</ButtonGroup>}
          </div>
        </div>
      </div>
    );
  }
}
