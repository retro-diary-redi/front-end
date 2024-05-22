import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import API from '@/services/API';
import useModal from '@/hooks/useModal';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/authSlice';

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

function NavBar() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const {
    Modal: ConfirmModal,
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isConfirmModalOpen,
  } = useModal();

  const handleLogOutButton = () => {
    openConfirmModal('정말로 로그아웃하시겠습니까?');
  };

  const handleLogout = () => {
    API.post('/auth/logout')
      .then(() => {
        closeConfirmModal();
        dispatch(logout());
        navigate('/landing');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Wrapper>
        <Link to="/">Home</Link>
        {auth.isLoggedIn ? (
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
      {isConfirmModalOpen && (
        <ConfirmModal>
          <div className="buttons">
            <Button
              type="button"
              color={'var(--primary)'}
              fontSize={12}
              onClick={closeConfirmModal}
              width={66}
              height={31}
            >
              아니오
            </Button>
            <Button
              type="button"
              color={'var(--secondary)'}
              fontSize={12}
              onClick={handleLogout}
              width={66}
              height={31}
            >
              예
            </Button>
          </div>
        </ConfirmModal>
      )}
    </>
  );
}

export default NavBar;
