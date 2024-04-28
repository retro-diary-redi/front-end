import BoxContainer from '@/components/BoxContainer';
import moment from 'moment';
import { ReactElement, useState } from 'react';
import ReactCalendar from 'react-calendar';
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
    background-color: #e6e6e6;
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
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
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

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--now {
    background: var(--yellow);
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ffa9a9;
  }

  .react-calendar__tile--active {
    background: #d6e5f3;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #d6e5f3;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
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

function Calendar({ children }: { children: ReactElement }) {
  const [value, handleChange] = useState<Value>(new Date());

  const handleDayClick = (value: any, event: any) => {
    console.log(`날짜 클릭, value: ${value}`);
  };

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
        />
        {children}
      </RelativeBoxContainer>
    </>
  );
}

export default Calendar;
