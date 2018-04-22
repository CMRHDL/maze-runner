import * as React from 'react';
import { Flex } from '../Flex';
import { Tile } from '../Tile';

const Maze = ({ tiles = [[]] }) => (
  <Flex direction="column">
    {tiles.map((rows, index) => (
      <Flex key={index}>{rows.map(props => <Tile {...props} />)}</Flex>
    ))}
  </Flex>
);

export { Maze };
