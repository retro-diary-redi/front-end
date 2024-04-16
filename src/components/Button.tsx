import styled from 'styled-components';

const Button = styled.button<{
  color?: string;
  width?: number;
  height?: number;
  fontSize?: number;
}>`
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);
  padding: 8px 14px;
  text-align: center;

  background-color: ${({ color }) => (color ? color : 'var(--primary)')};
  width: ${({ width }) => (width ? width + 'px' : 'auto')};
  height: ${({ height }) => (height ? height + 'px' : 'auto')};
  font-size: ${({ fontSize }) => fontSize}px;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
