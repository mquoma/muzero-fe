import React, { Component, PropTypes } from 'react';
import { debounce } from '../../../utilities/helpers';


// this is an inherently stateful component,
// don't get any ideas.
export  class MenuItem extends Component {
  constructor (props) {
    super(props);
  }

  static propTypes = {
    minimumWidth: PropTypes.string,
    alternateText: PropTypes.string,
    text: PropTypes.string
  };

  componentWillMount () {
    this.updateText();
    this.db = debounce(() => this.updateText(), 250);
    window.addEventListener('resize', this.db);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.db);
  }

  updateText () {
    let width = window.innerWidth;
    let text =  width < this.props.minimumWidth ?
      this.props.alternateText : this.props.text;
    this.setState({
      text
    });
  }

  render () {
    return (
      <span>
        {this.state.text}
      </span>
    );
  }
}
