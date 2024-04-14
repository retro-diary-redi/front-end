import styled from 'styled-components';

const Button = styled.button<{ color: string }>`
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);
  padding: 10px 16px;
  text-align: center;

  background-color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
