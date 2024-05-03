import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import { Form } from '@/components/Form';
import { LoginRequest } from '@/models/LoginData';
import Login, { GoogleLogin, KakaoLogin, NaverLogin } from '@/services/login';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

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

    const response = await Login(request);

    if (response) {
      alert('로그인 되었습니다.');
      setIsLoggedIn(true);
      navigate('/');
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: 구글 로그인 요청
    const response = await GoogleLogin();

    if (response && response.status === 'success') {
      console.log(response);
      alert('로그인 되었습니다.');
      // navigate('/');
    }
  };

  const handleNaverLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: 네이버 로그인 요청
    const response = await NaverLogin();

    if (response && response.status === 'success') {
      console.log(response);
      alert('로그인 되었습니다.');
      // navigate('/');
    }
  };

  const handleKakaoLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: 카카오 로그인 요청
    const response = await KakaoLogin();

    if (response && response.status === 'success') {
      console.log(response);
      alert('로그인 되었습니다.');
      // navigate('/');
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
          onClick={handleGoogleLogin}
        >
          <i className="xi-2x xi-google"></i>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#1FC700' }}
          onClick={handleNaverLogin}
        >
          <i className="xi-2x xi-naver"></i>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#FFEB00' }}
          onClick={handleKakaoLogin}
        >
          <i className="xi-2x xi-kakaotalk text-dark"></i>
        </button>
      </div>
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
