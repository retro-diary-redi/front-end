import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
  positionX?: number;
  positionY?: number;
}

const BoxContainer = styled.div<Props>`
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);

  width: ${({ width }) => +width}px;
  height: ${({ height }) => +height}px;
`;

export default BoxContainer;
