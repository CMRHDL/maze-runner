import React from 'react';

import { storiesOf } from '@storybook/react';
import { Tile } from './index';

storiesOf('Tile', module).add('simple', () => [
  <Tile color={'palevioletred'} />,
  <Tile color={'papayawhip'} />,
  <Tile color={'papayawhip'} size={5} />,
  <Tile color={'palevioletred'} size={12} />,
]);
