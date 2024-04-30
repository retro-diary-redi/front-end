import styled from 'styled-components';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { GetDiaries } from '@/services/diary';
import { Diaries } from '@/models/DiaryData';
import { getToday } from '@/utils/date';

const StyledButton = styled(Button)`
  position: absolute;
  left: 440px;
  top: 50px;

  width: 200px;
`;

function MainPage({ isLoggedIn }: { isLoggedIn: boolean }) {
  const navigate = useNavigate();

  const today = getToday();
  const [diaries, setDiaries] = useState<Diaries>();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 해주세요.');
      navigate('/login');
      return;
    }
    GetDiaries().then((data) => setDiaries(data!!));
  }, [isLoggedIn]);

  const handleWriteButtonClick = () => {
    if (diaries?.diaryDateList.includes(today)) {
      navigate(`/view/${today}`);
    } else {
      navigate('/write');
    }
  };

  return (
    <Calendar diaries={diaries}>
      <StyledButton onClick={handleWriteButtonClick} color={'var(--secondary)'}>
        오늘 일기 쓰러가기↗↗
      </StyledButton>
    </Calendar>
  );
}

export default MainPage;
