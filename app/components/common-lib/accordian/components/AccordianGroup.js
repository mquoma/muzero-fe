/**
 * Created by isaacross on 1/31/16.
 */

import React from 'react';

const AccordianGroup = ({ children, activeTitle, onSelect }) => {
  let accordianChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activeTitle,
      onSelect
    });
  });

  return (
    <div className="accordian-group">
      { accordianChildren }
    </div>
  );
};

export default AccordianGroup;
