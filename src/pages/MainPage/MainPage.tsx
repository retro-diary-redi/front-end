import styled from 'styled-components';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -30px 0;
  height: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  left: 440px;
  top: 50px;

  width: 200px;

  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);
  background-color: var(--secondary);
  padding: 10px 16px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

function MainPage() {
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    console.log('write button clicked');
    navigate('/write');
  };

  return (
    <>
      <Container>
        <Calendar>
          <StyledButton onClick={handleWriteButtonClick}>
            오늘 일기 쓰러가기↗↗
          </StyledButton>
        </Calendar>
      </Container>
    </>
  );
}

export default MainPage;
