import React, { Component, PropTypes } from 'react';
import '../../../../css/global.css';

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
        <header>
          <h1></h1>
          <h2>Employee Vacation Request Form</h2>
        </header>
        <main>
          <div class="alt-font balance">@mike, your vacation balance is <span class="bold">15 days</span></div>
          <article class="approved">
            <h3>Approved requests: <span class="bold">0</span></h3>
          </article>
          <article class="pending">
            <h3>Pending requests: <span class="bold">5 days</span></h3>
            <table>
              <thead>
              <tr>
                <th>Dates</th>
                <th class="days">Requested Number of Days</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>3/6/2017 - 3/8/2017</td>
                <td>3</td>
              </tr>
              <tr>
                <td>5/22/2017 - 5/23/2017</td>
                <td>2</td>
              </tr>
              </tbody>
            </table>
          </article>
        </main>
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
