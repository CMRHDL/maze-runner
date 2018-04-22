import * as React from 'react';
import { Flex } from '../../Components/Flex';
import { Button } from '../../Components/Button';
import { Slider } from '../../Components/Slider';
import styled from 'styled-components';

const Wrapper = styled(Flex).attrs({ direction: 'row' })`
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Control = ({
  tileSize,
  tail,
  isRunning,
  speed,
  onSetTileSize,
  onSetTail,
  onToggleRunning,
  onSetSpeed,
}) => {
  return (
    <Wrapper>
      <Button onClick={() => onToggleRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Slider
        label="Speed"
        max="2000"
        min="50"
        onChange={onSetSpeed}
        type="range"
        value={speed}
      />
      <Slider
        label="Tail"
        max="15"
        min="0"
        onChange={onSetTail}
        type="range"
        value={tail}
      />
      <Slider
        label="Tile Size"
        max="5"
        min="1"
        onChange={onSetTileSize}
        type="range"
        value={tileSize}
      />
    </Wrapper>
  );
};

export { Control };
