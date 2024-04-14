import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import { useState } from 'react';
import styled from 'styled-components';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    margin-top: 15px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  padding: 0 10px;
  background-color: transparent;
`;

function LoginPage() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 구글 로그인 요청
  };

  const handleNaverLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 네이버 로그인 요청
  };

  const handleKakaoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 카카오 로그인 요청
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
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
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
}

export default LoginPage;
