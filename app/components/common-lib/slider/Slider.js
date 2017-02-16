/**
 * Created by aboatswain on 7/22/2016.
 */
import React, { Component, PropTypes } from 'react';

export default class Slider extends Component {
  constructor (props) {
    super(props);

    this.state = {
      textValue: this.props.percentage ? this.props.percentage : 0
    };
  };

  componentWillReceiveProps  (nextProps) {
    this.setState({
      textValue: nextProps.percentage
    });
  }

  handleTextChange (e) {
    this.setState({ textValue: e.target.value });
  }

  handleEnter (e) {
    // Check for enter key
    if (e.charCode === 13) {
      this.pctChanged(e);
    }
  }

  pctChanged (e) {
    let targetValue = e.target.value.trim();
    if (targetValue === '' || isNaN(targetValue)) {
      this.setState({ textValue: this.props.percentage });
      return;
    }
    targetValue = parseInt(targetValue);
    const { maxValue } = this.props;
    let newValue = (targetValue > maxValue) ? maxValue : targetValue;
    newValue = (newValue < 0) ? 0 : newValue;

    this.setState({ textValue: newValue });
    this.props.onChange(newValue);
  }

  render () {

    return (
    <div className="ts-slider">
      <input
        type="range"
        min="0"
        max="100"
        disabled={this.props.isDisabled}
        value={this.props.percentage}
        onChange={ (e) => this.pctChanged(e) }
        onMouseUp={ (e) => this.pctChanged(e) } />

      { this.props.isShowTextInput &&
      <div>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          disabled={this.props.isDisabled}
          value={this.state.textValue}
          onKeyPress={ (e) => this.handleEnter(e) }
          onChange={ (e) => this.handleTextChange(e) }
          onBlur={ (e) => this.pctChanged(e) } />
        %
      </div>
      }
    </div>
    );
  }
}

Slider.propTypes = {
  percentage: PropTypes.number,
  maxValue: PropTypes.number,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  isShowTextInput: PropTypes.bool
};
