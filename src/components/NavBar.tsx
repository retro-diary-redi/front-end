import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';

const Wrapper = styled.div`
  border-bottom: 1px solid black;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  .right {
    margin-left: auto;
  }
`;

function NavBar() {
  // TODO: 로그인 상태에 따라 메뉴 이름 다르게 보여주기

  return (
    <Wrapper>
      <Link to="/">Home</Link>
      <p className="right">
        <Link to="/signup">SignUp</Link>
      </p>
      <Link to="/login">Login</Link>
    </Wrapper>
  );
}

export default NavBar;
