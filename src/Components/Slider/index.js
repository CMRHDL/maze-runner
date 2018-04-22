import * as React from 'react';
import styled from 'styled-components';
import { getProp } from '../../lib';
import { COLORS } from '../../config';
import { Flex } from '../Flex';

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
  &:hover {
    opacity: 0.9;
  }
`;

const StyledFlex = styled(Flex).attrs({ direction: 'column' })`
  width: 10rem;
  padding: 0.25rem;
  height: 2.375rem;
`;

const Wrapper = styled(Flex).attrs({ direction: 'row' })`
  border: 0.0625rem solid ${COLORS.BORDERS};
  border-radius: 0.1875rem;
  padding: 0 .5rem;
`;

const Label = styled.label`
  margin: auto;
`;

const Slider = props => {
  const { min, max, value, onChange, label } = props;

  return (
    <Wrapper>
      <Label>{label + ': '}</Label>
      <StyledFlex>
        <Flex justifyContent="space-between">
          <div>Min: {min}</div>
          <div>{value}</div>
          <div>Max: {max}</div>
        </Flex>
        <input
          type="range"
          {...props}
          onChange={({ target: { value } }) => onChange(value)}
        />
      </StyledFlex>
    </Wrapper>
  );
};

export { Slider };
