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
    email: '',
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

  return (
    <Container width={400} height={300}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Enter</Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
