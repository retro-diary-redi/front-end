import styled from 'styled-components';

const CalendarContainer = styled.div`
  border: 1px solid black;
  box-shadow: 3px;
`;

function MainPage() {
  return (
    <div>
      <CalendarContainer>2024.04</CalendarContainer>
    </div>
  );
}

export default MainPage;
