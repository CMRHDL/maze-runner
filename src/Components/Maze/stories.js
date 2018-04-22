import React from 'react';

import { storiesOf } from '@storybook/react';
import { Maze } from './index';

const wall = 'palevioletred';
const free = 'papayawhip';

const tiles = [
  [wall, wall, wall, wall, wall, wall, wall],
  [wall, free, free, free, free, wall, wall],
  [wall, wall, wall, wall, free, free, wall],
  [wall, wall, free, free, free, wall, wall],
  [wall, wall, wall, wall, free, wall, wall],
  [wall, free, free, free, free, free, wall],
  [wall, free, wall, wall, wall, wall, wall],
].map(rows => rows.map(color => ({ color })));

storiesOf('Maze', module).add('simple', () => <Maze tiles={tiles} />);
