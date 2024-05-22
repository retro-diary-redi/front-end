import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import { Form } from '@/components/Form';
import useModal from '@/hooks/useModal';
import { LoginRequest, LoginResponse } from '@/models/LoginData';
import Login from '@/services/login';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { useAppDispatch } from '@/store';
import { login } from '@/store/authSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const {
    Modal: LoginSuccessModal,
    open: openLoginSuccessModal,
    close: closeLoginSuccessModal,
    isOpen: isLoginSuccessModalOpen,
  } = useModal();

  const {
    Modal: LoginFailureModal,
    open: openLoginFailureModal,
    close: closeLoginFailureModal,
    isOpen: isLoginFailureModalOpen,
  } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request: LoginRequest = {
      username: formData.id,
      password: formData.password,
    };

    const response: AxiosResponse<LoginResponse> | string =
      await Login(request);

    if (typeof response !== 'string' && response.status === 200) {
      openLoginSuccessModal('로그인 되었습니다.');
      dispatch(login());
    } else if (typeof response === 'string') {
      openLoginFailureModal(response);
      setFormData({
        id: '',
        password: '',
      });
    }
  };

  return (
    <Container width={400} height={400}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="id"
          name="id"
          value={formData.id}
          required
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <Link to="/signup">
          <p>
            {'>>'}회원가입 하러가기{'<<'}
          </p>
        </Link>
        <Button type="submit" color={'var(--secondary)'}>
          Enter
        </Button>
      </Form>

      <div className="social-login-buttons">
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#D93025' }}
        >
          <a href="http://localhost:8080/oauth2/authorization/google">
            <i className="xi-2x xi-google"></i>
          </a>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#1FC700' }}
        >
          <a href="http://localhost:8080/oauth2/authorization/naver">
            <i className="xi-2x xi-naver"></i>
          </a>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#FFEB00' }}
        >
          <a href="http://localhost:8080/oauth2/authorization/kakao">
            <i className="xi-2x xi-kakaotalk text-dark"></i>
          </a>
        </button>
      </div>

      {isLoginSuccessModalOpen && (
        <LoginSuccessModal>
          <Button
            type="button"
            color={'var(--secondary)'}
            fontSize={12}
            onClick={() => {
              closeLoginSuccessModal();
              navigate('/');
            }}
          >
            확인
          </Button>
        </LoginSuccessModal>
      )}

      {isLoginFailureModalOpen && (
        <LoginFailureModal>
          <Button
            type="button"
            color={'var(--secondary)'}
            fontSize={12}
            onClick={() => {
              closeLoginFailureModal();
            }}
          >
            확인
          </Button>
        </LoginFailureModal>
      )}
    </Container>
  );
};

const Container = styled(BoxContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  > .social-login-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    > button {
      outline: 0;
      border: 1px solid transparent;
      padding: 0.5rem !important;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
    }

    .text-dark {
      color: #343a40 !important;
    }
  }
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  padding: 0 10px;
  background-color: transparent;
`;

export default LoginPage;
