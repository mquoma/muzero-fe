/**
 * Created by amattis on 12/24/2015.
 */
import React, { Component, PropTypes } from 'react';
import './dropdown.scss';

export default class Dropdown extends Component {

  static propTypes = {
    items: PropTypes.array,
    id: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    classList: PropTypes.string,
    disabled: PropTypes.bool,
    qaid: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  selectItem (item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  showList () {
    if (this.props.disabled) {
      return;
    }
    if (this.refs.dropdown) {
      if (this.props.classList) {
        this.refs.dropdown.className = this.props.classList +
          ' dropdown-container open';
      } else {
        this.refs.dropdown.className = 'dropdown-container open';
      }
    }
    document.addEventListener('click', this.hideList);
  }

  hideList = () => {
    if (this.props.classList) {
      this.refs.dropdown.className = this.props.classList +
        ' dropdown-container';
    } else {
      this.refs.dropdown.className = 'dropdown-container';
    }
    document.removeEventListener('click', this.hideList);
  };

  render () {

    let items = this.props.items.map((i, idx) => {
      return (<li key={this.props.id + idx}
                  className="level-6"
                  onClick={() => this.selectItem(i)}>{i.name}</li>);
    });
    let selectedItem = this.props.selectedItem ?
      this.props.selectedItem.name : this.props.placeholder;

    return (
      <div ref="dropdown" className={(this.props.classList ?
        this.props.classList + ' dropdown-container' : 'dropdown-container')
        + (this.props.disabled ? ' disabled' : '')}
           data-qaid={this.props.qaid ? this.props.qaid : null}>
        <div className="level-4"
             onClick={() => this.showList()}>{selectedItem}</div>
        <ul className="no-bullets dropdown-options">
          {items}
        </ul>
      </div>
    );
  }
}
