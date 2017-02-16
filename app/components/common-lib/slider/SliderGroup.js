/**
 * Created by aboatswain on 7/22/2016.
 */
import React, { Component, PropTypes } from 'react';

export default class SliderGroup extends Component {
  constructor (props) {
    super(props);
  };

  render () {
    let childSliders = this.props.children.reduce((acc, slider, idx) => {
      let newMax = (idx === 0) ? slider.props.maxValue : acc.currentMax;
      let newPercentage = (slider.props.percentage >= newMax) ?
        newMax : slider.props.percentage;
      let newSlider = React.cloneElement(
        slider, {
          maxValue: newMax,
          key: `${this.props.name}slider${idx}`
        }
      );

      acc.currentMax = newPercentage;
      acc.sliders.push(newSlider);
      return acc;
    }, { sliders: [], currentMax: null });

    return (
      <div className="slider-group">
        {childSliders.sliders}
      </div>
    );
  }
}

SliderGroup.propTypes = {
  children: PropTypes.array,
  name: PropTypes.string
};


SliderGroup.defaultProps = {
  name: 'default'
};
