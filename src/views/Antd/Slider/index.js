/**
 * Slider 组件
 */
import React, { PureComponent } from 'react';
import { Slider } from 'antd';

class SliderComponent extends PureComponent {
  state = {
    title: 'Slider 测试',
  }

  onChange = (val) => {
    const [min, max] = val;
    console.log(min);
    console.log(max);
  }

  render() {
    const marks = {
      1: '1W',
      3: '3W',
      5: '5W',
      7: '7W',
      10: '10W',
    };
    return (
      <div className="slider-demo">
        <h4>Slider测试</h4>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>粉丝:</div>
          <div className="" style={{ display: 'inline-block', flex: '1', marginLeft: '10px' }}>
            <Slider marks={marks} onChange={this.onChange} min={1} max={10} range step={null} />
          </div>
        </div>
      </div>
    )
  }
}

export default SliderComponent;
