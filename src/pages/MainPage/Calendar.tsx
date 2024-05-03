import BoxContainer from '@/components/BoxContainer';
import { Diaries } from '@/models/DiaryData';
import moment from 'moment';
import { ReactElement, useCallback, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const StyledCalendar = styled(ReactCalendar)`
  position: relative;
  width: 370px;
  flex-grow: 1;

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 30px;
    margin-top: 25px;
    justify-content: center;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: transparent !important;
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    display: flex;
    align-items: flex-end;
  }

  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow {
    border: none;
    font-size: 28px;
  }

  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    font-size: 33px;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;

    border-left: 1px solid black;
    border-top: 1px solid black;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 15px 10px;

    // 요일 밑줄 제거
    abbr {
      text-decoration: none;
    }

    border-right: 1px solid black;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days {
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }

  // 일요일 글씨 빨간색으로 지정
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'] {
    color: var(--red);
  }

  // 토요일 글씨 파란색으로 지정
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='토요일'] {
    color: var(--blue);
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #ababab;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__year-view__months {
    border-bottom: 1px solid black;
    border-left: 1px solid black;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 15px 10px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
    border: none;
    border-right: 1px solid black;
    border-top: 1px solid black;
  }

  // 일기가 있는 날짜의 배경 색 변경
  .diary-exist {
    background-color: var(--secondary);
  }

  // 현재 날짜 타일 스타일
  .react-calendar__tile--now {
    background: none;
    abbr {
      text-decoration: underline;
    }
  }

  // 날짜 타일 호버 스타일
  .react-calendar__tile:enabled:hover {
    background-color: #e6e6e6;
  }
`;

const RelativeBoxContainer = styled(BoxContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  padding: 10px 0;

  .top-decoration {
    display: flex;
    width: 95%;
    flex-direction: column;

    .line {
      width: 100%;
      height: 1px;
      margin-top: 1.2px;
      background-color: black;
    }
  }
`;

function Calendar({
  children,
  diaries,
}: {
  children: ReactElement;
  diaries?: Diaries;
}) {
  const navigate = useNavigate();
  const [value, handleChange] = useState<Value>(new Date());

  const handleDayClick = (value: any, _: any) => {
    const clickedDay = moment(new Date(value));
    const stringDate = clickedDay.format('YYYY-MM-DD');

    if (diaries?.diaryDateList.includes(stringDate)) {
      navigate(`/view/${stringDate}`);
    } else {
      if (moment().isBefore(clickedDay)) {
        alert('미래의 일기는 작성할 수 없습니다.');
        return;
      }
      if (
        confirm(
          '해당 날짜에 작성된 일기가 없습니다. 새로 일기를 작성하시겠습니까?'
        )
      ) {
        navigate(`/write/${stringDate}`);
      }
    }
  };

  // 일기가 작성된 날에만 배경 색 변경하기
  const tileClassName = useCallback(
    ({ date, view }: { date: any; view: any }) => {
      if (view === 'month') {
        if (
          diaries?.diaryDateList.find(
            (day) => day === moment(date).format('YYYY-MM-DD')
          )
        ) {
          return 'diary-exist';
        }
      }
    },
    [diaries]
  );

  return (
    <>
      <RelativeBoxContainer width={400} height={500}>
        <div className="top-decoration">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <StyledCalendar
          onChange={handleChange}
          onClickDay={handleDayClick} // 날짜 클릭 이벤트 핸들러
          value={value}
          formatDay={(_, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
          formatYear={(_, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(_, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          calendarType="gregory" // 일요일 부터 시작
          showFixedNumberOfWeeks={true} // 항상 6주 고정으로 표시
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          tileClassName={tileClassName}
        />
        {children}
      </RelativeBoxContainer>
    </>
  );
}

export default Calendar;
