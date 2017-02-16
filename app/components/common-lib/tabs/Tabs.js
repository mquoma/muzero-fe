/**
 * Created by iross on 1/4/2016.
 */
import React, { Component, PropTypes } from 'react';
import './tabs.scss';
import { trackTabView } from '../../../utilities/analytics';

export const TabList = ({ children, ga, activeIndex, onActivate }) => {
  let tabListChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ga: ga,
      isActive: index === activeIndex,
      onClick: () => onActivate(index)
    });
  });
  return (
    <div className="tab-list clearfix">{tabListChildren}</div>
  );
};

export const Tab = ({ disabled, ga, onClick, isActive, children }) => (
  <div
    onClick={disabled ? null : () => trackTabView(children, ga, onClick) }
    className={ disabled ? 'tab disabled' : isActive ? 'tab active' : 'tab' }
    >
    { children }
  </div>
);

export const TabPanels = ({ children, activeIndex }) => (
  <div className="tab-panels">
    {children[activeIndex]}
  </div>
);


export const TabPanel = ({ children, panelClass }) => (
   <div className={panelClass ? panelClass + ' tab-panel' :
    'tab-panel'}>{children}</div>
);

export class Tabs extends Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
  }

  clickTabList () {
  }

  render () {
    let mappedChildren = React.Children.map(
      this.props.children, (child) => {
        if (child.type === TabPanels) {
          return React.cloneElement(child, {
            ga:this.props.ga,
            activeIndex: this.props.activeIndex
          });
        }
        else if (child.type === TabList) {
          return React.cloneElement(child, {
            ga:this.props.ga,
            activeIndex: this.props.activeIndex,
            onActivate: (activeIndex) => this.props.onActivate(activeIndex)
          });
        }
        else {
          return child;
        }
      });

    return (
      <div className={this.props.classList ? this.props.classList : null}>
      {mappedChildren}</div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
  classList: PropTypes.string,
  ga:PropTypes.object
};

Tabs.defaultProps = { activeIndex: 0 };
