import styled from 'styled-components';
import Container from '@/components/BoxContainer';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const TitleContainer = styled(Container)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  bottom: 100px;
  right: 150px;
  font-size: 18px;
`;

const MainContainer = styled(Container)`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  top: 55px;
  left: 90px;
  background-color: var(--primary);
  z-index: 100;
  padding: 0 30px;

  > h3 {
    font-weight: normal;
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    > button {
      width: 100px;
    }

    > button:first-child {
      cursor: default;
    }

    > button:last-child {
      animation: blink-effect 1s step-end infinite;
    }
  }

  @keyframes blink-effect {
    50% {
      opacity: 0.5;
    }
  }
`;

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };
  return (
    <>
      <TitleContainer className="title-container" width={200} height={70}>
        Retro Re:cord
        <MainContainer width={400} height={180}>
          <h3>
            일기를 작성하시려면 로그인해야합니다.
            <br />
            로그인하시겠습니까?
          </h3>
          <div className="buttons">
            <Button color={'var(--primary)'}>아니요</Button>
            <Button color={'var(--secondary)'} onClick={handleButtonClick}>
              예
            </Button>
          </div>
        </MainContainer>
      </TitleContainer>
    </>
  );
}

export default LandingPage;
