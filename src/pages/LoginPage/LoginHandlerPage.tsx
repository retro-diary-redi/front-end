import Button from '@/components/Button';
import useModal from '@/hooks/useModal';
import { useAppDispatch } from '@/store';
import { login } from '@/store/authSlice';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginHandlerPage = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const result = searchParams.get('message');

  const {
    Modal: LoginFailureModal,
    open: openLoginFailureModal,
    close: closeLoginFailureModal,
    isOpen: isLoginFailureModalOpen,
  } = useModal();

  useEffect(() => {
    if (result === 'success') {
      dispatch(login());
      navigate('/');
    } else if (result === 'failure') {
      openLoginFailureModal('로그인에 실패하였습니다. 재시도해주세요.');
    }
  }, []);

  return (
    <>
      <div>로그인 중입니다. 잠시만 기다려주세요.</div>{' '}
      {isLoginFailureModalOpen && (
        <LoginFailureModal>
          <Button
            type="button"
            color={'var(--secondary)'}
            fontSize={12}
            onClick={() => {
              closeLoginFailureModal();
              navigate('/login');
            }}
          >
            확인
          </Button>
        </LoginFailureModal>
      )}
    </>
  );
};

export default LoginHandlerPage;
