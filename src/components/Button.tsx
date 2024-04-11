import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);
  background-color: var(--secondary);
  padding: 10px 16px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
