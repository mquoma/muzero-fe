import React, { Component, PropTypes } from 'react';


import {
  getUserDaysLeft
} from '../../actions/muzero';

export default class Vacation extends Component {
  constructor (props) {
    super(props);
  };

  static propTypes = {
    start: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
    login: PropTypes.object
  }

  componentWillMount () {

    const { dispatch } = this.props;

    let eventId = 1;
    let bookerId = 1;


  }

  componentWillUnmount () {

    const { dispatch } = this.props;
  }


  render () {

    const { dispatch } = this.props;
    return (
      <div>
        <h4>
        </h4>
      </div>
    );
  }
}
