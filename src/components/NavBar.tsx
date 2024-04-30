import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import API from '@/services/API';
import { Dispatch, SetStateAction } from 'react';

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

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
`;

function NavBar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    alert('현재 로그아웃 기능이 제대로 구현되어있지 않습니다.');
    /**
    API.get('/logout').then(() => {
      navigate('/landing');
    }); */
    // setIsLoggedIn(false);
  };

  return (
    <Wrapper>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <p className="right">
            <Link to="/">Profile</Link>
          </p>
          <button onClick={handleLogOutButton}>Logout</button>
        </>
      ) : (
        <>
          <p className="right">
            <Link to="/signup">SignUp</Link>
          </p>
          <Link to="/login">Login</Link>
        </>
      )}
    </Wrapper>
  );
}

export default NavBar;
