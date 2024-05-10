import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import { Form } from '@/components/Form';
import { RegisterRequest } from '@/models/RegisterData';
import Register from '@/services/register';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 닉네임 유효성 검사
    const nicknamePattern = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!nicknamePattern.test(formData.nickname)) {
      alert(
        '닉네임은 2자 이상 16자 이하, 영어와 숫자 또는 한글로 구성되어야 합니다.'
      );
      setFormData({ ...formData, nickname: '' });
      return;
    }

    // 비밀번호 입력이 다를 경우
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      setFormData({ ...formData, password: '', confirmPassword: '' });
      return;
    }

    // 비밀번호
    const pwPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
    if (!pwPattern.test(formData.password)) {
      alert(
        '비밀번호는 6자 이상 16자 이하, 영어와 숫자의 조합으로 구성되어야 합니다.'
      );
      setFormData({ ...formData, password: '', confirmPassword: '' });
      return;
    }

    const request: RegisterRequest = {
      username: formData.id,
      password: formData.password,
      nickname: formData.nickname,
      email: formData.email,
    };

    const response = await Register(request);

    if (response && response.status === 201) {
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } else {
      alert(`${response}`);
      setFormData({
        ...formData,
        email: '',
      });
    }
  };

  return (
    <Container width={400} height={480}>
      <h1>Sign Up</h1>
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
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="nickname"
          name="nickname"
          value={formData.nickname}
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
        <Input
          type="password"
          placeholder="password check"
          name="confirmPassword"
          value={formData.confirmPassword}
          required
          onChange={handleChange}
        />
        <Link to="/login">
          <p>
            {'>>'}구글, 네이버, 카카오로 로그인하기{'<<'}
          </p>
        </Link>
        <Button type="submit" color={'var(--secondary)'}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled(BoxContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  padding: 0 10px;
  background-color: transparent;
`;

export default SignUpPage;
