import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled(BoxContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    margin-top: 30px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  padding: 0 10px;
  background-color: transparent;
`;

function SignUpPage() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="nickname"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password check"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
