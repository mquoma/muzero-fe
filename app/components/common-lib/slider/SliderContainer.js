/**
 * Created by aboatswain on 7/22/2016.
 */
import React, { Component, PropTypes } from 'react';
import Slider from './Slider';
import { xPathHelper } from '../../../utilities/helpers';

export default class SliderContainer extends Component {
  constructor (props) {
    super(props);
  };

  componentDidUpdate () {
    if (this.props.onChange && this.props.percentage > this.props.maxValue) {
      this.props.onChange(this.props.maxValue, this.props.roundNumber);
    }
  }

  render () {

    let { percentage, isDisabled, onChange, isBefore, isShowTextInput,
      onDelete, children, maxValue, containerClass } = this.props;

    if (!containerClass) {
      containerClass = '';
    }

    return (
      <div className={`slider-container ${containerClass}`}>
        { isBefore && children }
        <Slider percentage={percentage}
                isDisabled={isDisabled}
                onChange={ (value)=> onChange(value) }
                maxValue={maxValue}
                isShowTextInput={isShowTextInput} />
        { !isBefore && children }
        { onDelete &&
          <div className="remove-slider"
               onClick={ () => onDelete() }>
            <svg>
              <use xlinkHref={`${xPathHelper()}#x-icon`}/>
            </svg>
          </div>
        }
      </div>
    );
  }
}

SliderContainer.propTypes = {
  isBefore: PropTypes.bool,
  onDelete: PropTypes.func,
  percentage: PropTypes.number,
  maxValue: PropTypes.number,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  isShowTextInput: PropTypes.bool
};


SliderContainer.defaultProps = {
  isBefore: true,
  percentage: 100,
  maxValue: 100,
  isDisabled: false,
  isShowTextInput: true
};
