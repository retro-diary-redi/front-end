import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import { Form } from '@/components/Form';
import { LoginRequest } from '@/models/LoginData';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '@/services/Oauth';
import Login from '@/services/login';
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
          <a href="#">
            <i className="xi-2x xi-google"></i>{' '}
          </a>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#1FC700' }}
        >
          <a href={NAVER_AUTH_URL}>
            <i className="xi-2x xi-naver"></i>
          </a>
        </button>
        <button
          className="btn-social-login"
          style={{ backgroundColor: '#FFEB00' }}
        >
          <a href={KAKAO_AUTH_URL}>
            <i className="xi-2x xi-kakaotalk text-dark"></i>
          </a>
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
