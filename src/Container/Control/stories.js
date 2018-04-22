import React from 'react';

import { storiesOf } from '@storybook/react';
import { Control} from './index';
import { withState, mapProps, compose } from 'recompose';

const ControlContainer = compose(
  withState('isRunning', 'onToggleRunning', false),
  withState('timeout', 'onSetSpeed', 200),
  withState('tail', 'onSetTail', 5),
)(Control);

storiesOf('Control', module).add('simple', () => <ControlContainer />);
