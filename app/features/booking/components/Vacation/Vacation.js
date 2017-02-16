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
          <div class="alt-font balance">@mquoma, your vacation balance is <span className="bold">15 days</span></div>
          <article className="approved">
            <h3>Approved requests: <span class="bold">0</span></h3>
          </article>
          <article className="pending">
            <h3>Pending requests: <span className="bold">

              {
                this.props.vacationState &&
                this.props.vacationState.daysLeft &&
                (this.props.vacationState.daysLeft.DaysAvail + ' ')
              }

             days</span></h3>
            <table>
              <thead>
              <tr>
                <th>Start Dates</th>
                <th className="days">Requested Number of Days</th>
              </tr>
              </thead>
              <tbody>

        {
          this.props.vacationState &&
          this.props.vacationState.pendingRequests &&
          this.props.vacationState.pendingRequests.map( function (p) {
            return ( 
              <tr>
                <td>{ p.DateRequested }</td>
                <td>{ p.NumDays }</td>
              </tr>
              )
          })
        }
              </tbody>
            </table>
          </article>
        </main>
        <ul>
        </ul>
      </div>
    );
  }
}
