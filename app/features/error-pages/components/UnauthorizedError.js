/**
 * Created by amattis on 5/12/2016.
 */
import React, { Component } from 'react';

export default class UnauthorizedError extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="unauthorized-page">
        <section>
          <h1>Sorry, you don't have access to this area.</h1>
        </section>
      </div>
    );
  }
}
