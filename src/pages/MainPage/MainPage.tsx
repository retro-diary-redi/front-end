import styled from 'styled-components';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

const StyledButton = styled(Button)`
  position: absolute;
  left: 440px;
  top: 50px;

  width: 200px;
`;

function MainPage() {
  const navigate = useNavigate();

  const handleWriteButtonClick = () => {
    console.log('write button clicked');
    navigate('/write');
  };

  return (
    <Calendar>
      <StyledButton onClick={handleWriteButtonClick}>
        오늘 일기 쓰러가기↗↗
      </StyledButton>
    </Calendar>
  );
}

export default MainPage;
