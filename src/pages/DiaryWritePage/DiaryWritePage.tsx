import Button from '@/components/Button';
import { getToday } from '@/utils/date';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SelectButton from './SelectButton';
import SelectModal from './SelectModal';

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

    .write-form-section {
      display: flex;
      gap: 20px;
      width: 100%;

      textarea {
        box-sizing: border-box;
        resize: none;
        min-height: 500px;
        padding: 10px;
        background-color: transparent;
        border: 1px solid black;
        flex-grow: 1;
      }
    }
  }

  .title-div {
    display: flex;
    width: 100%;
    gap: 10px;
    height: 30px;
    position: relative;

    .select-modal {
      position: absolute;
      right: 0;
      top: 40px;
      box-shadow: 4px 4px rgb(0 0 0 / 20%);
    }
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

const SelectedImage = styled.img`
  min-width: 500px;
  max-width: 500px;
  min-height: 500px;
  max-height: 500px;
  padding: 10px;
  object-fit: cover;
  border: 1px solid black;
`;

function DiaryWritePage() {
  const today = getToday();
  const fileInput = useRef(null);

  const [mood, setMood] = useState(0);
  const [weather, setWeather] = useState(0);

  const [showMoodSelectModal, setShowMoodSelectModal] = useState(false);
  const [showWeatherSelectModal, setShowWeatherSelectModal] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();

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

    /*
    // 서버 요청 시에 사용할 폼 데이터
    const requestFormData = new FormData();

    if (imageFile !== undefined) requestFormData.append('image_url', imageFile);
    requestFormData.append(
      'contents',
      new Blob([JSON.stringify(formData)], {
        type: 'application/json',
      })
    );

    // 예시 코드
    post('/write', requestFormData, {
      headers: {
        'Contents-Type': 'multipart/form-data',
      },
    });
    */
  };

  const handleAddImageButtonClick = () => {
    if (fileInput.current !== null) {
      (fileInput.current as HTMLInputElement).click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      if (image) {
        setImageUrl(URL.createObjectURL(image));
        setImageFile(image);
        setFormData({
          ...formData,
          image_url: URL.createObjectURL(image),
        });
      }
    }
  };

  const onClickMoodSelectButton = () => {
    setShowMoodSelectModal(true);
  };

  const onClickWeatherSelectButton = () => {
    setShowWeatherSelectModal(true);
  };

  const handleModalExternalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.className !== 'select-button') {
      setShowMoodSelectModal(false);
      setShowWeatherSelectModal(false);
    }
  };

  const handleRemoveImageButtonClick = () => {
    setImageUrl('');
    setFormData({
      ...formData,
      image_url: '',
    });
  };

  return (
    <Container onClick={handleModalExternalClick}>
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
          <SelectButton
            type="mood"
            index={mood}
            onClick={onClickMoodSelectButton}
          />
          {showMoodSelectModal && (
            <SelectModal
              type="mood"
              setShowSelectModal={setShowMoodSelectModal}
              setIndex={setMood}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          <SelectButton
            type="weather"
            index={weather}
            onClick={onClickWeatherSelectButton}
          />
          {showWeatherSelectModal && (
            <SelectModal
              type="weather"
              setShowSelectModal={setShowWeatherSelectModal}
              setIndex={setWeather}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        {imageUrl && (
          <Button
            fontSize={12}
            type="button"
            onClick={handleRemoveImageButtonClick}
          >
            오늘의 사진 삭제하기
          </Button>
        )}
        {imageUrl === '' && (
          <Button
            fontSize={12}
            type="button"
            onClick={handleAddImageButtonClick}
          >
            오늘의 사진 추가하기
          </Button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="write-form-section">
          {imageUrl && (
            <SelectedImage src={imageUrl} alt="preview"></SelectedImage>
          )}
          <textarea
            name="content"
            id="content"
            autoFocus={false}
            value={formData.content}
            required
            onChange={handleChange}
            placeholder="Please enter a content..."
          ></textarea>
        </div>
      </form>
    </Container>
  );
}

export default DiaryWritePage;
