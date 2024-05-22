import Button from '@/components/Button';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SelectButton from './SelectButton';
import SelectModal from './SelectModal';
import { DiaryFormProps } from '@/models/DiaryData';
import { Create, Delete, GetDiary, GetImage, Update } from '@/services/diary';
import useModal from '@/hooks/useModal';

const DiaryWritePage = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const params = useParams();

  const fileInput = useRef(null);

  const [showMoodSelectModal, setShowMoodSelectModal] = useState(false);
  const [showWeatherSelectModal, setShowWeatherSelectModal] = useState(false);

  const {
    Modal: AlertModal,
    open: openAlertModal,
    close: closeAlertModal,
    isOpen: isAlertModalOpen,
  } = useModal();

  const {
    Modal: ConfirmModal,
    open: openConfirmModal,
    close: closeConfirmModal,
    isOpen: isConfirmModalOpen,
  } = useModal();

  // 이미지 파일
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<DiaryFormProps>({
    title: '',
    content: '',
    date: params.date!,
    mood: 0,
    weather: 0,
    image_url: null,
  });

  // 첫 렌더링 시 조회인지 확인하고 데이터 넣어서 보여주기
  useEffect(() => {
    if (type === 'view' || type === 'edit') {
      async function getDiary(date: string) {
        const response = await GetDiary(date);
        const diaryInfo = response.data.diaryInfo;

        if (response) {
          setFormData({
            title: diaryInfo.title,
            content: diaryInfo.content,
            date: params.date!,
            mood: diaryInfo.mood,
            weather: diaryInfo.weather,
            image_url:
              diaryInfo.savedFilePaths.length > 0
                ? `http://localhost:8080${diaryInfo.savedFilePaths[0]}`
                : null,
          });
        }

        if (diaryInfo.savedFilePaths.length > 0) {
          const image = await GetImage(
            `http://localhost:8080${diaryInfo.savedFilePaths[0]}`
          );

          if (image) {
            setImageFile(image);
          }
        }
      }

      getDiary(params.date as string);
    }
  }, [type]);

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

    // 서버 요청 시에 사용할 폼 데이터
    const formDataRequest = new FormData();

    // 이미지가 있다면 이미지 추가
    if (imageFile) {
      formDataRequest.append('images', imageFile!);
    }

    const diaryWriteRequestDTO = {
      title: formData.title,
      content: formData.content,
      mood: formData.mood,
      weather: formData.weather,
    };

    /* 다이어리 작성 */
    if (type === 'write') {
      formDataRequest.append(
        'diaryWriteRequestDTO',
        new Blob([JSON.stringify(diaryWriteRequestDTO)], {
          type: 'application/json',
        })
      );

      const response = await Create(formDataRequest, params.date!);

      if (response && response.status === 201) {
        navigate(`/view/${params.date!}`);
        return;
      } else {
        openAlertModal(`${response}`);
        return;
      }
    }

    /* 다이어리 수정 */
    if (type === 'edit') {
      formDataRequest.append(
        'diaryUpdateRequestDTO',
        new Blob([JSON.stringify(diaryWriteRequestDTO)], {
          type: 'application/json',
        })
      );

      const response = await Update(formDataRequest, params.date as string);

      if (response && response.status === 200) {
        navigate(`/view/${params.date}`);
      } else {
        openAlertModal(`${response}`);
      }
    }
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
    setImageFile(null);
  };

  /* 다이어리 삭제 */
  const handleDeleteButtonClick = async () => {
    openConfirmModal('일기를 정말로 삭제하시겠습니까?');
  };

  const handleEditButtonClick = () => {
    navigate(`/edit/${params.date}`);
  };

  const handleImageClick = () => {
    window.open(formData.image_url!);
  };

  return (
    <>
      <Container onClick={handleModalExternalClick}>
        <Link to="/">
          <button type="button">{'<'} back</button>
        </Link>
        <p>{params.date}</p>
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
          {formData.image_url === null &&
            (type === 'write' || type === 'edit') && (
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
                onClick={handleImageClick}
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
      </Container>{' '}
      {isAlertModalOpen && (
        <AlertModal>
          <Button
            type="button"
            color={'var(--secondary)'}
            fontSize={12}
            onClick={closeAlertModal}
          >
            확인
          </Button>
        </AlertModal>
      )}
      {isConfirmModalOpen && (
        <ConfirmModal>
          <div className="buttons">
            <Button
              type="button"
              color={'var(--primary)'}
              fontSize={12}
              onClick={closeConfirmModal}
              width={66}
              height={31}
            >
              아니오
            </Button>
            <Button
              type="button"
              color={'var(--secondary)'}
              fontSize={12}
              onClick={async () => {
                const response = await Delete(params.date as string);

                if (response && response.status === 200) {
                  openAlertModal('일기가 삭제되었습니다.');
                  navigate('/');
                } else {
                  openAlertModal(`${response}`);
                }
                closeConfirmModal();
              }}
              width={66}
              height={31}
            >
              예
            </Button>
          </div>
        </ConfirmModal>
      )}
    </>
  );
};

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

export default DiaryWritePage;
