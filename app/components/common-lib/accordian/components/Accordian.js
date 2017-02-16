/**
 * Created by isaacross on 1/31/16.
 */

import React from 'react';

let styles = {
  show: {
    display: 'inherit'
  },
  hide: {
    display: 'none'
  }
};

const Accordian = ({ title, children, activeTitle, onSelect }) => (

  <div className="accordian">
    <div className="header" onClick={() => onSelect(title)}>
      { title }
    </div>
    <div style={ title === activeTitle ? styles.show : styles.hide }
         className="accordian-body">
      { children }
    </div>
  </div>
);

export default Accordian;
