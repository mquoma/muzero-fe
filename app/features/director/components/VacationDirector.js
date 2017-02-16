import React, { Component, PropTypes } from 'react';
import '../../../css/global.css';

import {
  getUserDaysLeft
} from '../actions/muzero';

export default class VacationDirector extends Component {
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
            <section class="vacation-requests">
                <h3>The following vacation requests are pending approval</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Dates</th>
                            <th class="days">Requested Number of Days</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>@mike</td>
                            <td>3/6/2017 - 3/8/2017</td>
                            <td>3</td>
                            <td>
                                <button>Approve</button>
                                <a href="#">Decline</a>
                            </td>
                        </tr>
                        <tr>
                            <td>@andre</td>
                            <td>5/22/2017 - 5/23/2017</td>
                            <td>2</td>
                            <td>
                                <button>Approve</button>
                                <a href="#">Decline</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
        <h4>
        days left
        </h4>
        {
          this.props.vacationState &&
          this.props.vacationState.daysLeft &&
          this.props.vacationState.daysLeft.DaysAvail
        }
      </div>
    );
  }
}
