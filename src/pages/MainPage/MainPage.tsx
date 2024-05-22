import styled from 'styled-components';
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { GetDiaries } from '@/services/diary';
import { Diaries } from '@/models/DiaryData';
import moment from 'moment';
import { useAppSelector } from '@/store';

function MainPage() {
  const navigate = useNavigate();
  const today = moment().format('YYYY-MM-DD');
  const [diaries, setDiaries] = useState<Diaries>();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/landing');
      return;
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    GetDiaries().then((data) => setDiaries(data!!));
  }, []);

  const handleWriteButtonClick = () => {
    if (diaries?.diaryDateList.includes(today)) {
      navigate(`/view/${today}`);
    } else {
      navigate(`/write/${today}`);
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

const StyledButton = styled(Button)`
  position: absolute;
  left: 440px;
  top: 50px;
  width: 200px;
`;

export default MainPage;
