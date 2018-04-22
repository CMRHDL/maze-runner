import * as React from 'react';
import styled from 'styled-components';
import { getProp } from '../../lib';
import { TILE, COLORS } from '../../config';
import { pure } from 'recompose';

const StyledTile = styled.div`
  width: ${getProp('size')}rem;
  min-width: ${getProp('size')}rem;
  height: ${getProp('size')}rem;
  min-height: ${getProp('size')}rem;
  background: ${getProp('color')};
  border: 0.0625rem solid ${COLORS.BORDERS};
  &:hover {
    opacity: 0.8;
  }
`;

const Tile = pure(({ color, size = TILE.DEFAULT_SIZE }) => (
  <StyledTile color={color} size={size} />
));

export { Tile };
