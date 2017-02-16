import React, { Component, PropTypes } from 'react';
import '../../../css/global.css';

import {
  getAllUserRequests
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

    dispatch(getAllUserRequests('U050A6YNJ'));

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
            <section className="vacation-requests">
                <h3>The following vacation requests are pending approval</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Dates</th>
                            <th className="days">Requested Number of Days</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>


        {
          this.props.vacationState &&
          this.props.vacationState.allRequests &&
          this.props.vacationState.allRequests.map( function (p) {
            return ( 
              <tr>
                <td>{ '@mquoma' || p.UserId }</td>
                <td>{ p.DateRequested }</td>
                <td>{ p.NumDays }</td>
                <td>
                    <button>Approve</button>
                    <a href="#">Decline</a>
                </td>

              </tr>                    

              )
          })
        }

                    </tbody>
                </table>
            </section>
        </main>
      </div>
    );
  }
}
