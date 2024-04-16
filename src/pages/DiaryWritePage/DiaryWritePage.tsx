import Button from '@/components/Button';
import { getToday } from '@/utils/date';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 100px;
  padding: 10px 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a > button {
    margin-bottom: 5px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  form {
    margin-top: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    > button:first-child {
      align-self: flex-end;
      margin-top: -45px;
    }
  }

  .title-div {
    display: flex;
    width: 100%;
    gap: 10px;
    height: 30px;
  }

  textarea {
    box-sizing: border-box;
    resize: none;
    min-width: 100%;
    min-height: 500px;
    padding: 10px;
    background-color: transparent;
    border: 1px solid black;
  }

  textarea:focus {
    outline: none;
  }
`;

const StyledInput = styled.input`
  height: 32px;
  border: 1px solid black;
  box-shadow: 4px 4px rgb(0 0 0 / 20%);
  flex-grow: 1;
  padding: 10px;
  background: none;
`;

function DiaryWritePage() {
  const today = getToday();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: today,
    mood: 0,
    weather: 0,
    image_url: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert('저장 버튼 클릭');
    console.log(formData);

    // TODO: 일기 생성 요청 로직 추가
  };

  const handleAddImageButtonClick = () => {
    alert('이미지 추가 버튼 클릭');
  };

  return (
    <Container>
      <Link to="/">
        <button type="button">{'<'} back</button>
      </Link>
      <p>{today}</p>
      <form onSubmit={handleSubmit}>
        <Button type="submit" color={`var(--secondary)`} fontSize={12}>
          저장
        </Button>
        <div className="title-div">
          <StyledInput
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={handleChange}
            placeholder="Please enter a title"
          ></StyledInput>
          <button type="button">Mood</button>
          <button type="button">Weather</button>
        </div>
        <Button
          color={`var(--secondary)`}
          fontSize={12}
          type="button"
          onClick={handleAddImageButtonClick}
        >
          오늘의 사진 추가하기
        </Button>
        <textarea
          name="content"
          id="content"
          autoFocus={false}
          value={formData.content}
          required
          onChange={handleChange}
          placeholder="Please enter a content..."
        ></textarea>
      </form>
    </Container>
  );
}

export default DiaryWritePage;
