import * as React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  ${({ direction }) => (direction ? `flex-direction: ${direction};` : '')};
  ${({ justifyContent: jc }) => (jc ? `justify-content: ${jc};` : '')};
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')};
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap};` : '')};
`;

export { Flex };
