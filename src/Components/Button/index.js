import * as React from 'react';
import styled from 'styled-components';
import { getProp } from '../../lib';
import { COLORS } from '../../config';

const Button = styled.button`
  background-color: ${getProp('background-color', COLORS.UI.ACTION)};
  color: ${getProp('color', COLORS.UI.FONT.INVERTED)};
  border-radius: 0.1875rem;
  border: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1rem;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  margin: 0;
  height: 3rem;
  &:hover {
    opacity: 0.9;
  }
`;

export { Button };
