import React from 'react';

import { storiesOf } from '@storybook/react';
import { Slider } from './index';
import { withState, mapProps, compose } from 'recompose';

const SliderContainer = compose(
  withState('value', 'setValue', 10),
  mapProps(({ value, setValue }) => ({
    min: 5,
    max: 15,
    onChange: setValue,
    value,
  }))
)(Slider);

storiesOf('Slider', module).add('simple', () => <SliderContainer />);
