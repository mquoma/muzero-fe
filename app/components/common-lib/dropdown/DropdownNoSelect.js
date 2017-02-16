/**
 * Created by amattis on 12/24/2015.
 */
import React, { Component, PropTypes } from 'react';
import { xPathHelper } from '../../../utilities/helpers/index';

export default class DropdownNoSelect extends Component {

  static propTypes = {
    items: PropTypes.array,
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    onSelect: PropTypes.func,
    itemClass: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.any,
    index: PropTypes.string,
    qaid: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  selectItem (item) {
    let id = this.props.index ? this.props.index : '';
    if (item.onSelect) {
      item.onSelect(id);
    }
  }

  showList () {
    if (this.props.text) {
      this.refs.dropdown.className = 'dropdown-container open';
    } else {
      this.refs.dropdown.className = 'actions-dd-container open';
    }
    document.addEventListener('click', this.hideList);
  }

  hideList =( () => {
    if (this.refs.dropdown) {
      this.refs.dropdown.className =
        this.refs.dropdown.className.replace(' open', '');
    }
    document.removeEventListener('click', this.hideList);
  });

  render () {
    let items = this.props.items.map((i, idx) => {
      return (<li key={this.props.id + idx}
                  className={i.itemClass ? i.itemClass : null}
                  onClick={() => this.selectItem(i)}>
        {i.icon ?
          <svg><use xlinkHref={`${xPathHelper()}#${i.icon}`} /></svg>
        : null }
        {i.name}
      </li>);
    });
    let buttonContent = this.props.text ? this.props.text : this.props.children;

    return (
      <div ref="dropdown"
           className={this.props.text ?
            'dropdown-container' : 'actions-dd-container'}
           data-qaid={this.props.qaid ? this.props.qaid : null}>
        <div className="level-4"
             onClick={() => this.showList()}>{buttonContent}</div>
        <ul className="no-bullets dropdown-options">
          {items}
        </ul>
      </div>
    );
  }
}
