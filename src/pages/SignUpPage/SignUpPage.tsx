import BoxContainer from '@/components/BoxContainer';
import Button from '@/components/Button';
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
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  padding: 0 10px;
  background-color: transparent;
`;

function SignUpPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('button clicked');
  };

  return (
    <Container width={400} height={500}>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="email" name="email" />
        <Input type="text" placeholder="nickname" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password check" />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default SignUpPage;
