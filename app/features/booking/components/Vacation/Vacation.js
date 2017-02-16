import React, { Component, PropTypes } from 'react';


import {
  getUserDaysLeft,
  getUserPendingRequests
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

    console.log('d');

    dispatch(getUserDaysLeft('U067SS9KR'));
    dispatch(getUserPendingRequests('U067SS9KR'));


  }

  componentWillUnmount () {

    const { dispatch } = this.props;
  }


  render () {

    const { dispatch } = this.props;
    return (
      <div>
        <h4>
        {
          this.props.vacationState &&
          this.props.vacationState.daysLeft &&
          (this.props.vacationState.daysLeft.DaysAvail + ' Days Left')
        }
        </h4>
        <ul>
        {
          this.props.vacationState &&
          this.props.vacationState.pendingRequests &&
          this.props.vacationState.pendingRequests.map( function (p) {
            return ( 
              <li> {p.DateRequested} -  {p.RequestStatus} -  {p.NumDays} </li>
              )
          })
        }
        </ul>
      </div>
    );
  }
}
