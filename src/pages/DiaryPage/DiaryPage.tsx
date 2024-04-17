import Button from '@/components/Button';
import { getToday } from '@/utils/date';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SelectButton from './SelectButton';
import SelectModal from './SelectModal';
import sampleData from '@/utils/sampleData.json';
import { DiaryFormProps } from '@/models/DiaryData';

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

    .view-buttons {
      align-self: flex-end;
      margin-top: -45px;

      > button:first-child {
        margin-right: 10px;
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

const DiaryWritePage = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const params = useParams();

  const today = getToday();
  const fileInput = useRef(null);

  const [showMoodSelectModal, setShowMoodSelectModal] = useState(false);
  const [showWeatherSelectModal, setShowWeatherSelectModal] = useState(false);

  // 혹시 나중에 이미지 상태를 따로 관리해야 할 경우를 대비해 살려둠
  const [imageFile, setImageFile] = useState<File>();

  const [formData, setFormData] = useState<DiaryFormProps>({
    title: '',
    content: '',
    date: today,
    mood: 0,
    weather: 0,
    image_url: '',
  });

  const allData = sampleData;

  // 첫 렌더링 시 조회인지 확인하고 데이터 넣어서 보여주기
  useEffect(() => {
    if (type === 'view' || type === 'edit') {
      const data = allData.find((data) => data.date === params.date);
      if (data) {
        setFormData(data);
      } else {
        // 보려는 날짜에 작성된 일기가 없으면 경고 창을 띄우고 되돌아간다.
        alert('해당 날짜에 작성된 일기가 없습니다.');
        navigate('/');
      }
    }
  }, []);

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

    // 서버 요청 시에 사용할 폼 데이터
    const requestFormData = new FormData();

    // 이미지가 있다면 이미지 추가
    if (imageFile !== undefined) requestFormData.append('image_url', imageFile);

    // Blob 객체로 만든 버전
    // requestFormData.append(
    //   'contents',
    //   new Blob([JSON.stringify(formData)], {
    //     type: 'application/json',
    //   })
    // );

    // 직렬화만 해준 버전 -> 이렇게 해야 아래 console.log로 내용 확인 가능해서 테스트 차 넣어봄
    requestFormData.append('contents', JSON.stringify(formData));

    // requestFormData 확인
    console.log(requestFormData.get('contents'));
    console.log(requestFormData.get('image_url'));

    /*
    // 예시 코드
    post('/write', requestFormData, {
      headers: {
        'Contents-Type': 'multipart/form-data',
      },
    });
    */

    // TODO: URL 라우팅 처리 필요
    navigate(`/view/${params.date || today}`);
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
    setShowWeatherSelectModal(false);
  };

  const onClickWeatherSelectButton = () => {
    setShowWeatherSelectModal(true);
    setShowMoodSelectModal(false);
  };

  const handleModalExternalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.className !== 'select-button') {
      setShowMoodSelectModal(false);
      setShowWeatherSelectModal(false);
    }
  };

  const handleRemoveImageButtonClick = () => {
    setFormData({
      ...formData,
      image_url: '',
    });
  };

  const handleDeleteButtonClick = () => {
    alert('삭제 버튼 클릭');

    // TODO: 일기 삭제 요청 로직 추가
  };

  const handleEditButtonClick = () => {
    alert('수정 버튼 클릭');

    // TODO: 일기 수정 요청 로직 추가

    navigate(`/edit/${params.date}`);
  };

  return (
    <Container onClick={handleModalExternalClick}>
      <Link to="/">
        <button type="button">{'<'} back</button>
      </Link>
      <p>{today}</p> {/* TODO: 날짜 올바르게 보이도록 수정 */}
      <form onSubmit={handleSubmit}>
        {(type === 'write' || type === 'edit') && (
          <Button type="submit" color={`var(--secondary)`} fontSize={12}>
            저장
          </Button>
        )}
        {type === 'view' && (
          <div className="view-buttons">
            <Button
              type="button"
              className="view-edit-button"
              fontSize={12}
              onClick={handleEditButtonClick}
            >
              수정
            </Button>
            <Button
              type="button"
              className="view-delete-button"
              color={`var(--secondary)`}
              fontSize={12}
              onClick={handleDeleteButtonClick}
            >
              삭제
            </Button>
          </div>
        )}

        <div className="title-div">
          <StyledInput
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={handleChange}
            disabled={type === 'view'}
            placeholder="Please enter a title"
          ></StyledInput>
          <SelectButton
            status={type}
            type="mood"
            index={formData.mood}
            onClick={onClickMoodSelectButton}
          />
          {showMoodSelectModal && (
            <SelectModal
              type="mood"
              setShowSelectModal={setShowMoodSelectModal}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          <SelectButton
            status={type}
            type="weather"
            index={formData.weather}
            onClick={onClickWeatherSelectButton}
          />
          {showWeatherSelectModal && (
            <SelectModal
              type="weather"
              setShowSelectModal={setShowWeatherSelectModal}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        {formData.image_url && (type === 'write' || type === 'edit') && (
          <Button
            fontSize={12}
            type="button"
            onClick={handleRemoveImageButtonClick}
          >
            {type === 'write' ? '오늘의 사진 삭제하기' : '사진 삭제하기'}
          </Button>
        )}
        {formData.image_url === '' && (type === 'write' || type === 'edit') && (
          <Button
            fontSize={12}
            type="button"
            onClick={handleAddImageButtonClick}
          >
            {type === 'write' ? '오늘의 사진 추가하기' : '사진 추가하기'}
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
          {formData.image_url && (
            <SelectedImage
              src={formData.image_url}
              alt="preview"
            ></SelectedImage>
          )}
          <textarea
            name="content"
            id="content"
            autoFocus={false}
            value={formData.content}
            required
            onChange={handleChange}
            disabled={type === 'view'}
            placeholder="Please enter a content..."
          ></textarea>
        </div>
      </form>
    </Container>
  );
};

export default DiaryWritePage;
